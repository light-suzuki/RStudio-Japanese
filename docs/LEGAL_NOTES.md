# Legal Notes

This is a practical publication note for this repository. It is not legal
advice.

## What this repository publishes

This repository publishes only:

- PowerShell scripts for local setup and update checks
- Overlay JavaScript and CSS
- A small JSON manifest describing the overlay
- Documentation

It does not publish RStudio Desktop itself.

## RStudio Desktop license

RStudio Desktop is developed by Posit Software, PBC. The upstream RStudio
repository states that RStudio is licensed under AGPLv3 and that the license
terms are included in the upstream `COPYING` file.

Users should review the upstream RStudio license before redistributing modified
copies of RStudio Desktop.

## Trademark and logo handling

Posit's trademark guidelines state that Posit, RStudio, Shiny, and related logos
or marks are Posit trademarks. The guidelines distinguish copyright licensing
from trademark permission.

For that reason, this repository intentionally avoids:

- bundling RStudio Desktop
- bundling official Posit / RStudio logos or icons
- presenting this project as an official Posit product
- making a public download site for modified Posit binaries

The project name describes compatibility with RStudio Desktop in a factual way:
Japanese Overlay for RStudio Desktop. The README and NOTICE state that this
project is unofficial and unaffiliated with Posit Software, PBC.

## Local overlay approach

The setup script downloads the official Windows xcopy build on the user's
machine, verifies the SHA256 value from Posit's Daily build index, and applies
this overlay locally.

If you publish a prebuilt modified RStudio binary yourself, you must separately
review the upstream AGPLv3 obligations and Posit trademark requirements.

## Checked sources

- RStudio upstream repository: https://github.com/rstudio/rstudio
- Posit Support article about the RStudio IDE license: https://support.posit.co/hc/en-us/articles/217801078-What-license-is-the-RStudio-IDE-available-under
- Posit Trademark Guidelines: https://posit.co/about/trademark-guidelines
