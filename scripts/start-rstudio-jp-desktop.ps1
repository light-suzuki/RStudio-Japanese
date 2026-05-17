param(
    [string]$Workspace,
    [string]$AppRoot,
    [string]$StateRoot,
    [switch]$NoLaunch,
    [switch]$SkipUpdate
)

$ErrorActionPreference = "Stop"

$ScriptRoot = Split-Path -Parent $PSCommandPath
if (-not $Workspace) {
    $Workspace = Split-Path -Parent $ScriptRoot
}
if (-not $AppRoot) {
    $AppRoot = Join-Path $Workspace "rstudio-jp-desktop"
}
if (-not $StateRoot) {
    $StateRoot = Join-Path $Workspace "rstudio-jp-state"
}

$Root = $AppRoot
$Exe = Join-Path $Root "rstudio.exe"
$LogDir = Join-Path $Workspace "output\rstudio-jp-logs"
$ConfigHome = Join-Path $StateRoot "config"
$DataHome = Join-Path $StateRoot "data"
$ElectronUserData = Join-Path $StateRoot "electron"
$PrefsDir = Join-Path $ConfigHome "RStudio"
$Prefs = Join-Path $PrefsDir "rstudio-prefs.json"
$SourcePrefs = Join-Path $env:APPDATA "RStudio\rstudio-prefs.json"
$UpdateWorkRoot = Join-Path $Workspace "output\rstudio-jp-update"
$CheckScript = Join-Path $Workspace "scripts\check-rstudio-jp-upstream.ps1"
$ApplyOverlayScript = Join-Path $Workspace "scripts\apply-rstudio-jp-overlay.ps1"

function Stop-RStudioJpProcesses {
    Get-Process -ErrorAction SilentlyContinue |
        Where-Object { $_.Path -like (Join-Path $Root "*") } |
        Stop-Process -Force
}

function Expand-RStudioZip([string]$ZipPath, [string]$DestinationPath) {
    New-Item -ItemType Directory -Force -Path $DestinationPath | Out-Null
    $tar = Get-Command tar.exe -ErrorAction SilentlyContinue
    if ($tar) {
        & $tar.Source -xf $ZipPath -C $DestinationPath
        if ($LASTEXITCODE -ne 0) {
            throw "tar.exe failed to extract $ZipPath with exit code $LASTEXITCODE"
        }
        return
    }

    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($ZipPath, $DestinationPath)
}

function Invoke-RStudioJpAutoUpdate {
    if ($SkipUpdate -or -not (Test-Path -LiteralPath $CheckScript) -or -not (Test-Path -LiteralPath $ApplyOverlayScript)) {
        return
    }

    try {
        $status = & $CheckScript
        if (-not $status.UpdateAvailable) {
            return
        }

        New-Item -ItemType Directory -Force -Path $UpdateWorkRoot | Out-Null
        $zip = Join-Path $UpdateWorkRoot $status.LatestFilename
        if (-not (Test-Path -LiteralPath $zip)) {
            Invoke-WebRequest -Uri $status.LatestDownload -OutFile $zip -TimeoutSec 1800
        }

        $hash = (Get-FileHash -LiteralPath $zip -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($hash -ne $status.LatestSha256) {
            Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
            throw "Downloaded update hash mismatch for $($status.LatestFilename)"
        }

        $versionSlug = ($status.LatestVersion -replace '[^0-9A-Za-z._+-]', '_')
        $extract = Join-Path $UpdateWorkRoot "upstream-$versionSlug"
        $candidate = Join-Path $UpdateWorkRoot "candidate-rstudio-jp-desktop"
        if (Test-Path -LiteralPath $extract) { Remove-Item -LiteralPath $extract -Recurse -Force }
        if (Test-Path -LiteralPath $candidate) { Remove-Item -LiteralPath $candidate -Recurse -Force }

        New-Item -ItemType Directory -Force -Path $extract | Out-Null
        Expand-RStudioZip $zip $extract
        $base = (Get-ChildItem -Path $extract -Recurse -Filter "rstudio.exe" -File |
            Where-Object { Test-Path -LiteralPath (Join-Path $_.DirectoryName "resources\app\package.json") } |
            Select-Object -First 1 -ExpandProperty DirectoryName)
        if (-not $base) {
            throw "Could not find an unpacked RStudio root in $extract"
        }

        & $ApplyOverlayScript -BaseRoot $base -TargetRoot $candidate -Force | Out-Null
        if (-not (Test-Path -LiteralPath (Join-Path $candidate "rstudio.exe"))) {
            throw "Updated RStudio JP candidate was not created correctly: $candidate"
        }

        Stop-RStudioJpProcesses
        $localVersion = if (Test-Path -LiteralPath (Join-Path $Root "resources\app\VERSION")) {
            (Get-Content -LiteralPath (Join-Path $Root "resources\app\VERSION") -TotalCount 1).Trim()
        } else {
            "unknown"
        }
        $backup = Join-Path $Workspace ("rstudio-jp-desktop-backup-$localVersion-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
        Move-Item -LiteralPath $Root -Destination $backup
        Move-Item -LiteralPath $candidate -Destination $Root
    } catch {
        $message = "[RStudio JP auto-update] " + $_.Exception.Message
        New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
        Add-Content -LiteralPath (Join-Path $LogDir "auto-update.log") -Value ("{0} {1}" -f (Get-Date -Format o), $message)
    }
}

if (-not (Test-Path -LiteralPath $Exe)) {
    throw "RStudio Desktop executable was not found: $Exe"
}

New-Item -ItemType Directory -Force -Path $LogDir, $PrefsDir, (Join-Path $DataHome "RStudio"), $ElectronUserData | Out-Null
if (-not (Test-Path -LiteralPath $Prefs)) {
    if (Test-Path -LiteralPath $SourcePrefs) {
        Copy-Item -LiteralPath $SourcePrefs -Destination $Prefs -Force
    } else {
        "{}" | Set-Content -LiteralPath $Prefs -Encoding UTF8
    }
}

if ($NoLaunch) {
    [pscustomobject]@{
        Exe = $Exe
        Prefs = $Prefs
        ConfigHome = $ConfigHome
        DataHome = $DataHome
        ElectronUserData = $ElectronUserData
        LogDir = $LogDir
        Exists = $true
    }
    return
}

$existing = Get-Process -ErrorAction SilentlyContinue |
    Where-Object { $_.Path -eq $Exe -and $_.MainWindowHandle -ne 0 } |
    Select-Object -First 1
if ($existing) {
    Add-Type -Namespace Win32 -Name NativeMethods -MemberDefinition @"
[System.Runtime.InteropServices.DllImport("user32.dll")]
public static extern bool ShowWindowAsync(System.IntPtr hWnd, int nCmdShow);
[System.Runtime.InteropServices.DllImport("user32.dll")]
public static extern bool SetForegroundWindow(System.IntPtr hWnd);
"@
    [void][Win32.NativeMethods]::ShowWindowAsync($existing.MainWindowHandle, 9)
    [void][Win32.NativeMethods]::SetForegroundWindow($existing.MainWindowHandle)
    return
}

Invoke-RStudioJpAutoUpdate

if (-not (Test-Path -LiteralPath $Exe)) {
    throw "RStudio Desktop executable was not found after update check: $Exe"
}

$oldConfigHome = $env:RSTUDIO_CONFIG_HOME
$oldDataHome = $env:RSTUDIO_DATA_HOME
try {
    $env:RSTUDIO_CONFIG_HOME = $ConfigHome
    $env:RSTUDIO_DATA_HOME = $DataHome
    Start-Process -FilePath $Exe -WorkingDirectory $Root -ArgumentList @(
        "--user-data-dir=$ElectronUserData",
        "--log-dir=$LogDir",
        "--log-level=INFO"
    )
} finally {
    $env:RSTUDIO_CONFIG_HOME = $oldConfigHome
    $env:RSTUDIO_DATA_HOME = $oldDataHome
}
