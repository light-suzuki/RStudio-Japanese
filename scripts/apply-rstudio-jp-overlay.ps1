param(
    [Parameter(Mandatory = $true)]
    [string]$BaseRoot,

    [Parameter(Mandatory = $true)]
    [string]$TargetRoot,

    [string]$OverlaySourceRoot,

    [switch]$Force,
    [switch]$UpdateDesktopShortcut
)

$ErrorActionPreference = "Stop"

function Resolve-FullPath([string]$Path) {
    $executionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($Path)
}

function Test-IsChildPath([string]$Parent, [string]$Child) {
    $parentFull = [System.IO.Path]::GetFullPath($Parent).TrimEnd('\') + '\'
    $childFull = [System.IO.Path]::GetFullPath($Child).TrimEnd('\') + '\'
    return $childFull.StartsWith($parentFull, [System.StringComparison]::OrdinalIgnoreCase)
}

function Assert-SafeTargetRemoval([string]$Path, [string]$WorkspaceRoot) {
    if (-not (Test-Path -LiteralPath $Path)) {
        return
    }

    $item = Get-Item -LiteralPath $Path
    if (-not $item.PSIsContainer) {
        throw "TargetRoot exists but is not a directory: $Path"
    }
    if (-not (Test-IsChildPath $WorkspaceRoot $Path)) {
        throw "Refusing to remove TargetRoot outside this repository workspace: $Path"
    }

    $leaf = Split-Path -Leaf $Path
    $hasOverlayManifest = Test-Path -LiteralPath (Join-Path $Path "jp-overlay-manifest.json")
    $isKnownGeneratedRoot = $leaf -in @("rstudio-jp-desktop", "candidate-rstudio-jp-desktop")
    if (-not ($hasOverlayManifest -or $isKnownGeneratedRoot)) {
        throw "Refusing to remove TargetRoot without an overlay manifest or known generated folder name: $Path"
    }
}

function Copy-RequiredFile([string]$Source, [string]$Destination) {
    if (-not (Test-Path -LiteralPath $Source)) {
        throw "Required overlay file was not found: $Source"
    }
    $parent = Split-Path -Parent $Destination
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
    Copy-Item -LiteralPath $Source -Destination $Destination -Force
}

function Copy-OptionalFile([string]$Source, [string]$Destination) {
    if (-not (Test-Path -LiteralPath $Source)) {
        return $false
    }
    $parent = Split-Path -Parent $Destination
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
    Copy-Item -LiteralPath $Source -Destination $Destination -Force
    return $true
}

function Ensure-JpAssetTags([string]$IndexPath) {
    if (-not (Test-Path -LiteralPath $IndexPath)) {
        throw "RStudio index.htm was not found: $IndexPath"
    }
    $html = Get-Content -LiteralPath $IndexPath -Raw
    if ($html -notmatch 'jp-customize\.css') {
        $html = $html -replace '(<link type="text/css" rel="stylesheet" href="css/icons\.css" />)', "`$1`r`n  <link type=""text/css"" rel=""stylesheet"" href=""jp-customize.css"" />"
    }
    if ($html -notmatch 'jp-customize\.js') {
        $html = $html -replace '(<script src="js/js-yaml\.min\.js"></script>)', "  <script src=""jp-customize.js""></script>`r`n  `$1"
    }
    Set-Content -LiteralPath $IndexPath -Value $html -Encoding UTF8
}

function Update-PackageMetadata([string]$PackagePath) {
    $package = Get-Content -LiteralPath $PackagePath -Raw | ConvertFrom-Json
    $versionPath = Join-Path (Split-Path -Parent $PackagePath) "VERSION"
    $version = if (Test-Path -LiteralPath $versionPath) {
        (Get-Content -LiteralPath $versionPath -TotalCount 1).Trim()
    } else {
        $package.version
    }

    $package.name = "rstudio-jp-desktop"
    $package.productName = "Japanese Overlay for RStudio Desktop"
    $package.version = $version
    $package.description = "Unofficial local Japanese overlay for RStudio Desktop"
    $package | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $PackagePath -Encoding UTF8
}

$scriptRoot = Split-Path -Parent $PSCommandPath
$workspace = Split-Path -Parent $scriptRoot
if (-not $OverlaySourceRoot) {
    $OverlaySourceRoot = Join-Path $workspace "overlays\rstudio-jp"
}

$base = Resolve-FullPath $BaseRoot
$target = Resolve-FullPath $TargetRoot
$overlay = Resolve-FullPath $OverlaySourceRoot

if (-not (Test-Path -LiteralPath (Join-Path $base "resources\app\package.json"))) {
    throw "BaseRoot does not look like an unpacked RStudio xcopy folder: $base"
}
if (-not (Test-Path -LiteralPath (Join-Path $base "rstudio.exe"))) {
    throw "BaseRoot is missing rstudio.exe: $base"
}
if (-not (Test-Path -LiteralPath (Join-Path $overlay "jp-overlay-manifest.json"))) {
    throw "OverlaySourceRoot does not look like the JP overlay folder: $overlay"
}
if ($base -eq $target) {
    throw "BaseRoot and TargetRoot must be different. Build into a fresh wrapper folder."
}
if ((Test-Path -LiteralPath $target) -and -not $Force) {
    throw "TargetRoot already exists. Re-run with -Force after checking the path: $target"
}

if (Test-Path -LiteralPath $target) {
    Assert-SafeTargetRemoval $target $workspace
    Remove-Item -LiteralPath $target -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $target | Out-Null

robocopy $base $target /E /COPY:DAT /R:2 /W:1 /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -gt 7) {
    throw "robocopy failed with exit code $LASTEXITCODE"
}

Copy-RequiredFile (Join-Path $overlay "resources\app\www\jp-customize.css") (Join-Path $target "resources\app\www\jp-customize.css")
Copy-RequiredFile (Join-Path $overlay "resources\app\www\jp-customize.js") (Join-Path $target "resources\app\www\jp-customize.js")
$sessionOverlay = Join-Path $overlay "resources\app\bin\rsession-jp-utf8.exe"
if (Test-Path -LiteralPath $sessionOverlay) {
    Copy-Item -LiteralPath (Join-Path $target "resources\app\bin\rsession-utf8.exe") -Destination (Join-Path $target "resources\app\bin\rsession-utf8-upstream.exe") -Force
    Copy-RequiredFile $sessionOverlay (Join-Path $target "resources\app\bin\rsession-utf8.exe")
    Copy-RequiredFile $sessionOverlay (Join-Path $target "resources\app\bin\rsession-jp-utf8.exe")
}
Copy-OptionalFile (Join-Path $overlay "resources\app\jp-assets\rstudio-jp.ico") (Join-Path $target "resources\app\jp-assets\rstudio-jp.ico") | Out-Null
Copy-OptionalFile (Join-Path $overlay "resources\app\jp-assets\rstudio-jp.png") (Join-Path $target "resources\app\jp-assets\rstudio-jp.png") | Out-Null
Copy-RequiredFile (Join-Path $overlay "jp-overlay-manifest.json") (Join-Path $target "jp-overlay-manifest.json")

Ensure-JpAssetTags (Join-Path $target "resources\app\www\index.htm")
Update-PackageMetadata (Join-Path $target "resources\app\package.json")
if ($UpdateDesktopShortcut) {
    $shortcutPath = Join-Path ([Environment]::GetFolderPath("Desktop")) "Japanese Overlay for RStudio Desktop.lnk"
    $scriptPath = Join-Path $workspace "scripts\start-rstudio-jp-desktop.ps1"
    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = "$env:WINDIR\System32\WindowsPowerShell\v1.0\powershell.exe"
    $shortcut.Arguments = "-ExecutionPolicy Bypass -File `"$scriptPath`""
    $shortcut.WorkingDirectory = $target
    $iconPath = Join-Path $target "resources\app\jp-assets\rstudio-jp.ico"
    if (Test-Path -LiteralPath $iconPath) {
        $shortcut.IconLocation = $iconPath + ",0"
    }
    $shortcut.Description = "Unofficial local Japanese overlay for RStudio Desktop"
    $shortcut.Save()
}

[pscustomobject]@{
    BaseRoot = $base
    TargetRoot = $target
    Version = (Get-Content -LiteralPath (Join-Path $target "resources\app\VERSION") -TotalCount 1).Trim()
    Exe = Join-Path $target "rstudio.exe"
    OverlayApplied = $true
}
