# Japanese Overlay for RStudio Desktop

日本語で RStudio Desktop を使いやすくするための、非公式 Windows 向け overlay です。

RStudio 本体をこのリポジトリに含めず、公式の Windows xcopy build をローカルで取得してから、軽量な JavaScript / CSS / PowerShell script を重ねます。更新時も公式 build を取り直して overlay を再適用する方針です。

> This is an unofficial overlay for RStudio Desktop. It is not affiliated with or endorsed by Posit Software, PBC.

## できること

- よく使う RStudio UI ラベルの日本語表示補助
- Ace editor 上の構造ミニマップ
- R コードの行種別ハイライト
  - セクション見出し
  - 関数定義
  - `if` / `for` / `while` などの制御構文
  - `library()` / `require()`
  - `%>%` / `|>` などのパイプ
  - `data.frame()` / `matrix()` / `read.csv()` などのデータ処理
  - `plot()` / `matplot()` / `ggplot()` / `legend()` などの可視化
  - `cat()` / `print()` / `summary()` などの出力・確認
  - `stop()` / `warning()` / `tryCatch()` などのガード処理
  - Ace diagnostics による warning / error 行
- `()` / `[]` / `{}` のネスト深度ガイド
- 公式 RStudio Daily build への更新確認とローカル再適用

## 入っていないもの

この repository には以下を含めません。

- RStudio Desktop 本体
- Posit / RStudio のバイナリ、DLL、配布 ZIP
- Posit / RStudio のロゴ、アイコン、商標素材
- 個人環境の設定、ログ、作業データ

## 使い方

PowerShell で実行します。

```powershell
git clone https://github.com/light-suzuki/Rsutudio-Japanese.git
cd Rsutudio-Japanese

powershell -ExecutionPolicy Bypass -File .\scripts\install-rstudio-jp-desktop.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-rstudio-jp-desktop.ps1
```

初回セットアップでは、公式 RStudio Daily の Windows xcopy ZIP を取得し、SHA256 を確認してから `.\rstudio-jp-desktop` に overlay を適用します。

更新確認だけ行う場合:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-rstudio-jp-upstream.ps1
```

既に展開済みの公式 RStudio xcopy folder に手動で overlay を適用する場合:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\apply-rstudio-jp-overlay.ps1 `
  -BaseRoot "C:\path\to\official\RStudio" `
  -TargetRoot ".\rstudio-jp-desktop" `
  -Force
```

## 権利とライセンス

- この repository 内の overlay code と scripts は MIT License です。
- RStudio Desktop は Posit Software, PBC の製品で、RStudio 側の license に従います。
- RStudio upstream repository と Posit Support は RStudio IDE が AGPLv3 で提供されていることを説明しています。
- Posit / RStudio の商標・ロゴは AGPLv3 とは別扱いです。この repository はロゴや公式バイナリを再配布せず、公式 download 元から利用者のローカル環境に取得する方式にしています。

詳しくは [NOTICE](NOTICE) と [docs/LEGAL_NOTES.md](docs/LEGAL_NOTES.md) を見てください。

## English Summary

Japanese Overlay for RStudio Desktop is an unofficial Windows overlay. It
downloads an official RStudio Windows xcopy build locally, verifies the download
hash, and applies small JavaScript/CSS customizations for Japanese UI assistance
and editor readability.

This repository does not redistribute RStudio Desktop, Posit binaries, official
archives, logos, or trademarks.

## Credits

- Idea and direction: light-suzuki
- Implementation support: OpenAI Codex / GPT models
- RStudio Desktop: Posit Software, PBC
