param(
    [string]$AppRoot,
    [string]$LatestApi = "https://dailies.rstudio.com/rstudio/latest/index.json",
    [ValidateSet("windows", "windows-xcopy")]
    [string]$Platform = "windows-xcopy"
)

$ErrorActionPreference = "Stop"

if (-not $AppRoot) {
    $scriptRoot = Split-Path -Parent $PSCommandPath
    $workspace = Split-Path -Parent $scriptRoot
    $AppRoot = Join-Path $workspace "rstudio-jp-desktop"
}

$appResources = Join-Path $AppRoot "resources\app"
$versionFile = Join-Path $appResources "VERSION"
$sourceFile = Join-Path $appResources "SOURCE"
$packageFile = Join-Path $appResources "package.json"
$manifestFile = Join-Path $AppRoot "jp-overlay-manifest.json"

if (-not (Test-Path -LiteralPath $versionFile)) {
    throw "RStudio VERSION file was not found: $versionFile"
}
if (-not (Test-Path -LiteralPath $packageFile)) {
    throw "RStudio package.json was not found: $packageFile"
}

$localVersion = (Get-Content -LiteralPath $versionFile -TotalCount 1).Trim()
$package = Get-Content -LiteralPath $packageFile -Raw | ConvertFrom-Json
$sourceText = if (Test-Path -LiteralPath $sourceFile) { Get-Content -LiteralPath $sourceFile -Raw } else { "" }
$localCommit = ""
if ($sourceText -match "github\.com/rstudio/rstudio/tree/([0-9a-f]{7,40})") {
    $localCommit = $Matches[1]
}

$latest = Invoke-RestMethod -Uri $LatestApi -TimeoutSec 30
$platformInfo = $latest.products.electron.platforms.$Platform
if (-not $platformInfo) {
    throw "Platform '$Platform' was not found in $LatestApi"
}

$customFiles = @()
if (Test-Path -LiteralPath $manifestFile) {
    $manifest = Get-Content -LiteralPath $manifestFile -Raw | ConvertFrom-Json
    foreach ($relativePath in $manifest.customFiles) {
        $path = Join-Path $AppRoot $relativePath
        $customFiles += [pscustomobject]@{
            Path = $relativePath
            Exists = Test-Path -LiteralPath $path
            LastWriteTime = if (Test-Path -LiteralPath $path) { (Get-Item -LiteralPath $path).LastWriteTime } else { $null }
        }
    }
}

$isVersionDifferent = $localVersion -ne $platformInfo.version
$isCommitDifferent = $localCommit -and ($localCommit -ne $platformInfo.commit)

[pscustomobject]@{
    LocalVersion = $localVersion
    PackageVersion = $package.version
    LocalCommit = $localCommit
    LatestVersion = $platformInfo.version
    LatestCommit = $platformInfo.commit
    LatestChannel = $platformInfo.channel
    LatestDate = $platformInfo.date
    LatestFilename = $platformInfo.filename
    LatestSha256 = $platformInfo.sha256
    LatestDownload = $platformInfo.link
    UpdateAvailable = [bool]($isVersionDifferent -or $isCommitDifferent)
    CustomFilesPresent = ($customFiles | Where-Object { -not $_.Exists } | Measure-Object).Count -eq 0
    MissingCustomFiles = @($customFiles | Where-Object { -not $_.Exists } | Select-Object -ExpandProperty Path)
}
