# Publishing Checklist

Before pushing a release or tag, check:

- `git status -sb`
- `git ls-files`
- `git ls-files | Select-String -Pattern '\.(exe|dll|zip|ico|png|pdb)$'`
- `node --check .\overlays\rstudio-jp\resources\app\www\jp-customize.js`
- `powershell -ExecutionPolicy Bypass -File .\scripts\install-rstudio-jp-desktop.ps1 -NoLaunch`
- `powershell -ExecutionPolicy Bypass -File .\scripts\check-rstudio-jp-upstream.ps1`

Do not publish:

- `rstudio-jp-desktop/`
- `rstudio-jp-state/`
- `output/`
- official RStudio archives
- modified RStudio binaries
- Posit / RStudio logos or icons
- local logs, preferences, or screenshots that expose personal paths
