param(
    [string]$Workspace,
    [string]$TargetRoot,
    [string]$LatestApi = "https://dailies.rstudio.com/rstudio/latest/index.json",
    [ValidateSet("windows", "windows-xcopy")]
    [string]$Platform = "windows-xcopy",
    [switch]$Force,
    [switch]$NoLaunch
)

$ErrorActionPreference = "Stop"

$ScriptRoot = Split-Path -Parent $PSCommandPath
if (-not $Workspace) {
    $Workspace = Split-Path -Parent $ScriptRoot
}
if (-not $TargetRoot) {
    $TargetRoot = Join-Path $Workspace "rstudio-jp-desktop"
}

$workRoot = Join-Path $Workspace "output\rstudio-jp-install"
$applyScript = Join-Path $Workspace "scripts\apply-rstudio-jp-overlay.ps1"
$startScript = Join-Path $Workspace "scripts\start-rstudio-jp-desktop.ps1"

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

if (-not (Test-Path -LiteralPath $applyScript)) {
    throw "Overlay apply script was not found: $applyScript"
}
if ((Test-Path -LiteralPath $TargetRoot) -and -not $Force) {
    throw "TargetRoot already exists. Re-run with -Force after checking it: $TargetRoot"
}

New-Item -ItemType Directory -Force -Path $workRoot | Out-Null

$latest = Invoke-RestMethod -Uri $LatestApi -TimeoutSec 30
$platformInfo = $latest.products.electron.platforms.$Platform
if (-not $platformInfo) {
    throw "Platform '$Platform' was not found in $LatestApi"
}

$zip = Join-Path $workRoot $platformInfo.filename
if (-not (Test-Path -LiteralPath $zip)) {
    Invoke-WebRequest -Uri $platformInfo.link -OutFile $zip -TimeoutSec 1800
}

$hash = (Get-FileHash -LiteralPath $zip -Algorithm SHA256).Hash.ToLowerInvariant()
if ($hash -ne $platformInfo.sha256) {
    Remove-Item -LiteralPath $zip -Force -ErrorAction SilentlyContinue
    throw "Downloaded file hash mismatch: $($platformInfo.filename)"
}

$versionSlug = ($platformInfo.version -replace '[^0-9A-Za-z._+-]', '_')
$extractRoot = Join-Path $workRoot ("upstream-$versionSlug-" + [guid]::NewGuid().ToString("N"))
Expand-RStudioZip $zip $extractRoot

$baseRoot = Get-ChildItem -Path $extractRoot -Recurse -Filter "rstudio.exe" -File |
    Where-Object { Test-Path -LiteralPath (Join-Path $_.DirectoryName "resources\app\package.json") } |
    Select-Object -First 1 -ExpandProperty DirectoryName
if (-not $baseRoot) {
    throw "Could not find an unpacked RStudio xcopy root in $extractRoot"
}

& $applyScript -BaseRoot $baseRoot -TargetRoot $TargetRoot -Force:$Force

if (-not $NoLaunch) {
    & $startScript -Workspace $Workspace -AppRoot $TargetRoot -SkipUpdate
}
