(function () {
  "use strict";

  const labelMap = new Map([
    ["File", "ファイル"],
    ["Edit", "編集"],
    ["Code", "コード"],
    ["View", "表示"],
    ["Plots", "プロット"],
    ["Session", "セッション"],
    ["Build", "ビルド"],
    ["Debug", "デバッグ"],
    ["Profile", "プロファイル"],
    ["Tools", "ツール"],
    ["Help", "ヘルプ"],
    ["Addins", "アドイン"],
    ["Browse Addins", "アドインを参照"],
    ["Install Package and Restart", "パッケージをインストールして再起動"],
    ["Go to file/function", "ファイル/関数へ移動"],
    ["Go to File/Function", "ファイル/関数へ移動"],
    ["Filter by file or function name", "ファイル名または関数名で絞り込み"],
    ["Source", "ソース"],
    ["Console", "コンソール"],
    ["Terminal", "ターミナル"],
    ["Environment", "環境"],
    ["History", "履歴"],
    ["Connections", "接続"],
    ["Files", "ファイル"],
    ["Packages", "パッケージ"],
    ["Viewer", "ビューア"],
    ["Presentation", "プレゼン"],
    ["Presentations", "プレゼン"],
    ["Tutorial", "チュートリアル"],
    ["Jobs", "ジョブ"],
    ["Tests", "テスト"],
    ["R Markdown", "R Markdown"],
    ["R Script", "Rスクリプト"],
    ["Text File", "テキストファイル"],
    ["Project", "プロジェクト"],
    ["Global Environment", "グローバル環境"],
    ["Data", "データ"],
    ["Values", "値"],
    ["Functions", "関数"],
    ["Objects", "オブジェクト"],
    ["Memory Usage", "メモリ使用量"],
    ["Free Unused Memory", "未使用メモリを解放"],
    ["Show Memory Usage", "メモリ使用量を表示"],
    ["Find in Files", "ファイル内検索"],
    ["Markers", "マーカー"],
    ["Posit Assistant", "Posit アシスタント"],
    ["New", "新規"],
    ["New File", "新規ファイル"],
    ["New Directory", "新規ディレクトリ"],
    ["New Folder", "新規フォルダ"],
    ["New R Script", "新規Rスクリプト"],
    ["New Text File", "新規テキストファイル"],
    ["New Quarto Document", "新規Quartoドキュメント"],
    ["New R Markdown", "新規R Markdown"],
    ["New Notebook", "新規ノートブック"],
    ["New Terminal", "新規ターミナル"],
    ["New Session", "新規セッション"],
    ["Save", "保存"],
    ["Save As...", "名前を付けて保存..."],
    ["Save All", "すべて保存"],
    ["Save all open documents", "開いているすべてのドキュメントを保存"],
    ["Save Workspace", "ワークスペースを保存"],
    ["Save Workspace As...", "ワークスペースを保存..."],
    ["Print...", "印刷..."],
    ["Print the current file", "現在のファイルを印刷"],
    ["Open File...", "ファイルを開く..."],
    ["Open an existing file", "既存ファイルを開く"],
    ["Open an existing file (Ctrl+O)", "既存ファイルを開く (Ctrl+O)"],
    ["Open Recent", "最近使った項目を開く"],
    ["Open recent files", "最近使ったファイルを開く"],
    ["Open in New Window", "新しいウィンドウで開く"],
    ["Open in New Session", "新しいセッションで開く"],
    ["New Project...", "新規プロジェクト..."],
    ["Create a project", "プロジェクトを作成"],
    ["Open Project...", "プロジェクトを開く..."],
    ["Recent Projects", "最近使ったプロジェクト"],
    ["Close Project", "プロジェクトを閉じる"],
    ["Close", "閉じる"],
    ["Close All", "すべて閉じる"],
    ["Quit Session...", "セッションを終了..."],
    ["Quit", "終了"],
    ["Exit", "終了"],
    ["Restart R", "R を再起動"],
    ["Restart R Session", "Rセッションを再起動"],
    ["Terminate R", "Rを終了"],
    ["Suspend Session", "セッションを一時停止"],
    ["Clear Console", "コンソールを消去"],
    ["Interrupt R", "R を中断"],
    ["Set Working Directory", "作業ディレクトリを設定"],
    ["To Source File Location", "ソースファイルの場所へ"],
    ["To Files Pane Location", "ファイルペインの場所へ"],
    ["Choose Directory...", "ディレクトリを選択..."],
    ["Run", "実行"],
    ["Run Current Line", "現在行を実行"],
    ["Run Current Line or Selection", "現在行または選択範囲を実行"],
    ["Run the current line or selection", "現在行または選択範囲を実行"],
    ["Run Selected Line(s)", "選択行を実行"],
    ["Run All Code in Current Source File", "現在のソースファイルの全コードを実行"],
    ["Run Current Document", "現在のドキュメントを実行"],
    ["Run Current Chunk", "現在のチャンクを実行"],
    ["Run All", "すべて実行"],
    ["Run Previous", "前を実行"],
    ["Run Next", "次を実行"],
    ["Run Tests", "テストを実行"],
    ["Run App", "アプリを実行"],
    ["Knit", "Knit実行"],
    ["Render", "レンダー"],
    ["Preview", "プレビュー"],
    ["Publish", "公開"],
    ["Source on Save", "保存時にソース実行"],
    ["Source with Echo", "エコー付きでソース実行"],
    ["Source the active document", "アクティブなドキュメントをソース実行"],
    ["Source options", "ソース実行オプション"],
    ["Save current document", "現在のドキュメントを保存"],
    ["Save Current Document", "現在のドキュメントを保存"],
    ["Save Current Document with Encoding...", "エンコーディングを指定して保存..."],
    ["Save the current file with a different encoding", "現在のファイルを別のエンコーディングで保存"],
    ["Open a file", "ファイルを開く"],
    ["Create a new file", "新しいファイルを作成"],
    ["View plot after saving", "保存後にプロットを表示"],
    ["Code Search Error", "コード検索エラー"],
    ["Show Document Outline", "ドキュメントアウトラインを表示"],
    ["Show Diagnostics", "診断を表示"],
    ["Comment/Uncomment Lines", "行をコメント/解除"],
    ["Reformat Code", "コードを整形"],
    ["Reindent Lines", "行のインデントを整える"],
    ["Rename in Scope", "スコープ内で名前変更"],
    ["Extract Function", "関数を抽出"],
    ["Extract Local Variable", "ローカル変数を抽出"],
    ["Jump to Matching Bracket", "対応する括弧へ移動"],
    ["Insert Section", "セクションを挿入"],
    ["Find...", "検索..."],
    ["Replace...", "置換..."],
    ["Find Next", "次を検索"],
    ["Find Previous", "前を検索"],
    ["Find in Document", "ドキュメント内検索"],
    ["Find in Help Topic", "ヘルプトピック内検索"],
    ["Search for", "検索語"],
    ["Replace with", "置換後"],
    ["Case Sensitive", "大文字/小文字を区別"],
    ["Whole Word", "単語単位"],
    ["Regular Expression", "正規表現"],
    ["Check Spelling", "スペルチェック"],
    ["Show All Files", "すべてのファイルを表示"],
    ["Working Directory", "作業ディレクトリ"],
    ["Home", "ホーム"],
    ["Import Dataset", "データセットをインポート"],
    ["Import Dataset from File...", "ファイルからデータセットをインポート..."],
    ["Import Dataset from URL...", "URLからデータセットをインポート..."],
    ["From Text (base)...", "テキストから(base)..."],
    ["From Text (readr)...", "テキストから(readr)..."],
    ["From Excel...", "Excelから..."],
    ["From SPSS...", "SPSSから..."],
    ["From SAS...", "SASから..."],
    ["From Stata...", "Stataから..."],
    ["From Local File...", "ローカルファイルから..."],
    ["From Web URL...", "Web URLから..."],
    ["Export", "エクスポート"],
    ["Export Plot", "プロットをエクスポート"],
    ["Save as Image...", "画像として保存..."],
    ["Save as PDF...", "PDFとして保存..."],
    ["Copy to Clipboard...", "クリップボードへコピー..."],
    ["Clear", "消去"],
    ["Clear All", "すべて消去"],
    ["Clear Plots", "プロットを消去"],
    ["Remove Plot", "プロットを削除"],
    ["List", "一覧"],
    ["Grid", "グリッド"],
    ["Clear Workspace", "ワークスペースを消去"],
    ["Remove Objects...", "オブジェクトを削除..."],
    ["Load Workspace...", "ワークスペースを読み込み..."],
    ["Install", "インストール"],
    ["Install Packages...", "パッケージをインストール..."],
    ["Update Packages...", "パッケージを更新..."],
    ["Check for Package Updates...", "パッケージ更新を確認..."],
    ["Load Package", "パッケージを読み込み"],
    ["Unload Package", "パッケージをアンロード"],
    ["Update", "更新"],
    ["Restart", "再起動"],
    ["Search", "検索"],
    ["Search Help", "ヘルプを検索"],
    ["Search R Help", "Rヘルプを検索"],
    ["Options...", "オプション..."],
    ["Global Options...", "グローバルオプション..."],
    ["Project Options...", "プロジェクトオプション..."],
    ["Code Snippets...", "コードスニペット..."],
    ["Keyboard Shortcuts Help", "キーボードショートカットヘルプ"],
    ["Modify Keyboard Shortcuts...", "キーボードショートカットを変更..."],
    ["Pane Layout", "ペイン配置"],
    ["Zoom Source", "ソースを拡大"],
    ["Zoom Console", "コンソールを拡大"],
    ["Zoom Environment", "環境を拡大"],
    ["Zoom History", "履歴を拡大"],
    ["Zoom Files", "ファイルを拡大"],
    ["Zoom Plots", "プロットを拡大"],
    ["Zoom Packages", "パッケージを拡大"],
    ["Zoom Help", "ヘルプを拡大"],
    ["Zoom Viewer", "ビューアを拡大"],
    ["Zoom Terminal", "ターミナルを拡大"],
    ["Zoom Tutorial", "チュートリアルを拡大"],
    ["Zoom", "ズーム"],
    ["Zoom In", "拡大"],
    ["Zoom Out", "縮小"],
    ["Actual Size", "等倍"],
    ["More", "その他"],
    ["Refresh", "更新"],
    ["Refresh Environment", "環境を更新"],
    ["Refresh Files", "ファイルを更新"],
    ["Refresh Packages", "パッケージを更新"],
    ["Refresh Plot", "プロットを更新"],
    ["Reload", "再読み込み"],
    ["Copy", "コピー"],
    ["Copy Image", "画像をコピー"],
    ["Copy Image Address", "画像アドレスをコピー"],
    ["Copy Path", "パスをコピー"],
    ["Cut", "切り取り"],
    ["Paste", "貼り付け"],
    ["Select All", "すべて選択"],
    ["Undo", "元に戻す"],
    ["Redo", "やり直し"],
    ["Delete", "削除"],
    ["Rename", "名前変更"],
    ["Move", "移動"],
    ["Upload", "アップロード"],
    ["Download", "ダウンロード"],
    ["Show in New Window", "新しいウィンドウで表示"],
    ["Show in Files Pane", "ファイルペインに表示"],
    ["Load Workspace", "ワークスペースを読み込み"],
    ["No file selected", "ファイル未選択"],
    ["All Files", "すべてのファイル"],
    ["Choose File", "ファイルを選択"],
    ["Choose Files", "ファイルを選択"],
    ["Choose Folder", "フォルダを選択"],
    ["Choose R Installation", "Rのインストールを選択"],
    ["R Executable", "R実行ファイル"],
    ["Rendering Engine", "レンダリングエンジン"],
    ["Auto-detect (recommended)", "自動検出(推奨)"],
    ["Desktop", "デスクトップ"],
    ["Software", "ソフトウェア"],
    ["Retry", "再試行"],
    ["Warning", "警告"],
    ["Error", "エラー"],
    ["Information", "情報"],
    ["Question", "確認"],
    ["Working on it...", "処理中..."],
    ["Cancel", "キャンセル"],
    ["OK", "OK"],
    ["Yes", "はい"],
    ["No", "いいえ"],
    ["None", "なし"],
    ["Browse...", "参照..."]
  ]);

  const attrNames = ["title", "aria-label", "alt", "placeholder"];
  const replacementEntries = Array.from(labelMap.entries()).sort((a, b) => b[0].length - a[0].length);
  const skipSelector = [
    ".ace_editor",
    ".xterm",
    ".rstudio-themes-flat",
    "pre",
    "code",
    "textarea"
  ].join(",");

  const isExactText = (value) => {
    const trimmed = value.replace(/\s+/g, " ").trim();
    return labelMap.has(trimmed) ? trimmed : null;
  };

  function translateText(value) {
    if (!value) return value;
    const normalized = value.replace(/\s+/g, " ").trim();
    if (!normalized) return value;
    if (labelMap.has(normalized)) return value.replace(normalized, labelMap.get(normalized));
    if (normalized.length > 80) return value;

    let translated = value;
    for (const [from, to] of replacementEntries) {
      if (from.length < 4) continue;
      translated = translated.replaceAll(from, to);
    }
    return translated;
  }

  function shouldSkipTextNode(node) {
    const parent = node && node.parentElement;
    return !parent || parent.closest(skipSelector);
  }

  function translateTextNode(node) {
    if (!node || shouldSkipTextNode(node)) return;
    const value = node.textContent || "";
    if (!value.trim()) return;
    const nextValue = translateText(value);
    if (nextValue !== value) node.textContent = nextValue;
  }

  function translateNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;

    for (const attr of attrNames) {
      const value = node.getAttribute(attr);
      if (!value) continue;
      const key = isExactText(value);
      const nextValue = key ? labelMap.get(key) : translateText(value);
      if (nextValue !== value) node.setAttribute(attr, nextValue);
    }

    if (node.closest && node.closest(skipSelector)) return;

    if (node.childNodes.length === 1 && node.firstChild.nodeType === Node.TEXT_NODE) {
      const key = isExactText(node.textContent || "");
      const nextText = key ? labelMap.get(key) : translateText(node.textContent || "");
      if (nextText !== node.textContent) node.textContent = nextText;
    }
  }

  function translateTree(root) {
    translateNode(root);
    if (!root.querySelectorAll) return;
    root.querySelectorAll("*").forEach(translateNode);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return shouldSkipTextNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(translateTextNode);
  }

  function translateAllFrames() {
    translateTree(document.documentElement);
    for (const frame of document.querySelectorAll("iframe")) {
      try {
        if (frame.contentDocument) translateTree(frame.contentDocument.documentElement);
      } catch (error) {
        // Cross-origin frames are expected in a few preview panes.
      }
    }
  }

  function setBox(el, styles) {
    if (!el) return;
    Object.assign(el.style, styles);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function storedRatio(key, fallback) {
    const value = Number(window.localStorage.getItem(key));
    return Number.isFinite(value) && value > 0 && value < 1 ? value : fallback;
  }

  function setStoredRatio(key, value) {
    window.localStorage.setItem(key, String(value));
  }

  function workbenchChildFor(element, workbench) {
    let current = element;
    while (current && current.parentElement && current.parentElement !== workbench) {
      current = current.parentElement;
    }
    return current && current.parentElement === workbench ? current : null;
  }

  function normalizeAncestorsBetween(element, stopElement) {
    let current = element && element.parentElement;
    while (current && current !== stopElement) {
      setBox(current, {
        position: "absolute",
        overflow: "hidden",
        inset: "0px",
        width: "auto",
        height: "auto"
      });
      current = current.parentElement;
    }
  }

  let resizeNotifyTimer = 0;
  function scheduleResizeNotify() {
    if (resizeNotifyTimer) window.clearTimeout(resizeNotifyTimer);
    resizeNotifyTimer = window.setTimeout(() => {
      resizeNotifyTimer = 0;
      window.dispatchEvent(new Event("resize"));
      document.querySelectorAll(".ace_editor").forEach((editorEl) => {
        const editor = editorEl.env && editorEl.env.editor;
        if (editor && editor.resize) editor.resize(true);
        if (editor && editor.renderer && editor.renderer.updateFull) {
          editor.renderer.updateFull(true);
        }
      });
    }, 40);
  }

  function attachColumnDrag(handle, key, getRatioFromEvent) {
    if (!handle || handle.dataset.jpResizable === key) return;
    handle.dataset.jpResizable = key;
    handle.style.cursor = handle.style.cursor || "col-resize";
    handle.style.pointerEvents = "auto";
    handle.title = "ドラッグして幅を変更";

    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      handle.setPointerCapture && handle.setPointerCapture(event.pointerId);

      const onMove = (moveEvent) => {
        const ratio = getRatioFromEvent(moveEvent);
        if (Number.isFinite(ratio)) {
          window.localStorage.setItem(key, String(clamp(ratio, 0.15, 0.85)));
          applyFourPaneLayout();
          scheduleResizeNotify();
        }
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove, true);
        window.removeEventListener("pointerup", onUp, true);
        window.removeEventListener("pointercancel", onUp, true);
      };

      window.addEventListener("pointermove", onMove, true);
      window.addEventListener("pointerup", onUp, true);
      window.addEventListener("pointercancel", onUp, true);
    }, true);
  }

  function ensureResizeHandle(parent, id, cursor, title, key, getRatioFromEvent) {
    if (!parent) return null;
    let handle = document.getElementById(id);
    if (!handle) {
      handle = document.createElement("div");
      handle.id = id;
      handle.className = "jp-rstudio-resize-handle";
      parent.appendChild(handle);
    } else if (handle.parentElement !== parent) {
      parent.appendChild(handle);
    }
    setBox(handle, {
      position: "absolute",
      zIndex: "50",
      background: "transparent",
      opacity: "0",
      pointerEvents: "auto",
      cursor
    });
    handle.title = title;
    attachColumnDrag(handle, key, getRatioFromEvent);
    return handle;
  }

  function applyFourPaneLayout() {
    const workbench = document.querySelector(".gwt-SplitLayoutPanel-ワークベンチ")
      || document.querySelector(".gwt-SplitLayoutPanel");
    if (!workbench) return;

    const sourcePane = document.getElementById("rstudio_ソース_pane")
      || document.getElementById("rstudio_Source_pane");
    const consolePane = document.getElementById("rstudio_コンソール_pane")
      || document.getElementById("rstudio_Console_pane");
    const topRightPane = document.getElementById("rstudio_TabSet1_pane");
    const bottomRightPane = document.getElementById("rstudio_TabSet2_pane");
    if (!consolePane || !topRightPane || !bottomRightPane) return;

    const leftColumn = consolePane.parentElement && consolePane.parentElement.parentElement;
    const leftGroup = workbenchChildFor(consolePane, workbench);
    const rightColumn = topRightPane.parentElement && topRightPane.parentElement.parentElement;
    const rightGroup = workbenchChildFor(topRightPane, workbench);
    if (!leftGroup || !rightGroup || leftGroup === rightGroup) return;

    const total = workbench.getBoundingClientRect().width || 1;
    const gutter = 8;
    const rightRatio = storedRatio("rstudioJp.rightWidthRatio", 0.44);
    const rightWidth = clamp(Math.round(total * rightRatio), 520, Math.max(521, total - 620));
    const leftWidth = Math.max(720, total - rightWidth - gutter);

    Array.from(workbench.querySelectorAll('[class*="SplitLayoutPanel-HDragger"], [class*="SplitLayoutPanel-VDragger"]'))
      .forEach((el) => {
        setBox(el, {
          background: "transparent",
          border: "0",
          boxShadow: "none",
          opacity: "0",
          pointerEvents: "none"
        });
      });

    setBox(rightGroup, {
      position: "absolute",
      overflow: "hidden",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "",
      width: rightWidth + "px",
      zIndex: "0"
    });
    normalizeAncestorsBetween(topRightPane, rightGroup);
    normalizeAncestorsBetween(bottomRightPane, rightGroup);

    const middleSplitter = Array.from(workbench.children).find((el) =>
      el.className && String(el.className).includes("HDragger") && el.getBoundingClientRect().height > 100
    );
    setBox(middleSplitter, {
      position: "absolute",
      overflow: "hidden",
      top: "0px",
      right: rightWidth + "px",
      bottom: "0px",
      left: "",
      width: gutter + "px",
      zIndex: "-10",
      pointerEvents: "none"
    });

    const mainHandle = ensureResizeHandle(
      workbench,
      "jp-rstudio-main-width-handle",
      "col-resize",
      "ドラッグして左右の幅を変更",
      "rstudioJp.rightWidthRatio",
      (event) => {
        const rect = workbench.getBoundingClientRect();
        const right = rect.right - event.clientX;
        return clamp(right, 520, Math.max(521, rect.width - 620)) / Math.max(1, rect.width);
      }
    );
    setBox(mainHandle, {
      top: "0px",
      right: rightWidth + "px",
      bottom: "0px",
      width: gutter + "px"
    });

    attachColumnDrag(mainHandle, "rstudioJp.rightWidthRatio", (event) => {
      const rect = workbench.getBoundingClientRect();
      const right = rect.right - event.clientX;
      return clamp(right, 520, Math.max(521, rect.width - 620)) / Math.max(1, rect.width);
    });

    setBox(leftGroup, {
      position: "absolute",
      overflow: "hidden",
      top: "0px",
      left: "0px",
      bottom: "0px",
      right: (rightWidth + gutter) + "px",
      width: leftWidth + "px",
      zIndex: "0"
    });

    const layout = consolePane.parentElement && consolePane.parentElement.parentElement;
    if (!layout) return;
    setBox(layout, { position: "relative", width: "100%", height: "100%" });

    const sourceWrap = sourcePane && sourcePane.parentElement;
    const consoleWrap = consolePane.parentElement;
    const leftInnerWidth = leftGroup.getBoundingClientRect().width || leftWidth;
    const sourceRatio = storedRatio("rstudioJp.sourceWidthRatio", 0.48);
    const sourceWidth = sourcePane
      ? clamp(Math.round(leftInnerWidth * sourceRatio), 260, Math.max(261, leftInnerWidth - 260 - gutter))
      : 0;

    if (sourcePane && sourceWrap) {
      setBox(sourceWrap, {
        position: "absolute",
        overflow: "hidden",
        zIndex: "0",
        top: "0px",
        left: "0px",
        bottom: "0px",
        right: "",
        width: sourceWidth + "px",
        height: "auto"
      });
      setBox(sourcePane, { position: "absolute", inset: "0px", width: "auto", height: "auto" });
    }

    const consoleLeft = sourcePane ? sourceWidth + gutter : 0;
    setBox(consoleWrap, {
      position: "absolute",
      overflow: "hidden",
      zIndex: "0",
      top: "0px",
      left: consoleLeft + "px",
      right: "0px",
      bottom: "0px",
      width: "auto",
      height: "auto"
    });
    setBox(consolePane, { position: "absolute", inset: "0px", width: "auto", height: "auto" });

    Array.from(layout.children).forEach((el) => {
      if (el !== sourceWrap && el !== consoleWrap && el.textContent && /ソース|Source|コンソール|Console/.test(el.textContent)) {
        setBox(el, { zIndex: "-10", width: "0px", height: "0px", overflow: "hidden" });
      }
      if (el.className && String(el.className).includes("Dragger")) {
        setBox(el, {
          position: "absolute",
          top: "0px",
          bottom: "0px",
          left: sourceWidth + "px",
          right: "",
          width: gutter + "px",
          height: "auto",
          zIndex: "-10",
          pointerEvents: "none"
        });
      }
    });

    const sourceHandle = ensureResizeHandle(
      layout,
      "jp-rstudio-source-width-handle",
      "col-resize",
      "ドラッグしてSourceとConsoleの幅を変更",
      "rstudioJp.sourceWidthRatio",
      (event) => {
        const rect = layout.getBoundingClientRect();
        const width = event.clientX - rect.left;
        return clamp(width, 260, Math.max(261, rect.width - 260 - gutter)) / Math.max(1, rect.width);
      }
    );
    setBox(sourceHandle, {
      top: "0px",
      bottom: "0px",
      left: sourceWidth + "px",
      width: gutter + "px"
    });

    const rightLayout = topRightPane.parentElement && topRightPane.parentElement.parentElement;
    if (rightLayout) {
      const rightRect = rightGroup.getBoundingClientRect();
      const topRatio = storedRatio("rstudioJp.rightTopHeightRatio", 0.35);
      const topHeight = clamp(Math.round(rightRect.height * topRatio), 180, Math.max(181, rightRect.height - 220 - gutter));
      const topWrap = topRightPane.parentElement;
      const bottomWrap = bottomRightPane.parentElement;
      setBox(rightLayout, {
        position: "absolute",
        overflow: "hidden",
        inset: "0px",
        width: "auto",
        height: "auto"
      });
      normalizeAncestorsBetween(topRightPane, rightGroup);
      normalizeAncestorsBetween(bottomRightPane, rightGroup);
      setBox(topWrap, {
        position: "absolute",
        overflow: "hidden",
        zIndex: "0",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "",
        height: topHeight + "px"
      });
      setBox(bottomWrap, {
        position: "absolute",
        overflow: "hidden",
        zIndex: "0",
        top: (topHeight + gutter) + "px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        height: "auto"
      });
      setBox(topRightPane, { position: "absolute", inset: "0px", width: "auto", height: "auto" });
      setBox(bottomRightPane, { position: "absolute", inset: "0px", width: "auto", height: "auto" });

      Array.from(rightLayout.children).forEach((el) => {
        if (el.className && String(el.className).includes("Dragger")) {
          setBox(el, { zIndex: "-10", pointerEvents: "none", height: "0px", overflow: "hidden" });
        }
      });

      const rightHeightHandle = ensureResizeHandle(
        rightLayout,
        "jp-rstudio-right-height-handle",
        "row-resize",
        "ドラッグして右側上下の高さを変更",
        "rstudioJp.rightTopHeightRatio",
        (event) => {
          const rect = rightLayout.getBoundingClientRect();
          const height = event.clientY - rect.top;
          return clamp(height, 180, Math.max(181, rect.height - 220 - gutter)) / Math.max(1, rect.height);
        }
      );
      setBox(rightHeightHandle, {
        left: "0px",
        right: "0px",
        top: topHeight + "px",
        height: gutter + "px"
      });
    }
    scheduleResizeNotify();
  }

  const layoutPresets = {
    standard: { right: 0.44, source: 0.48, rightTop: 0.35 },
    code: { right: 0.30, source: 0.62, rightTop: 0.32 },
    console: { right: 0.30, source: 0.36, rightTop: 0.32 },
    output: { right: 0.52, source: 0.44, rightTop: 0.58 }
  };

  function applyLayoutPreset(name) {
    const preset = layoutPresets[name] || layoutPresets.standard;
    setStoredRatio("rstudioJp.rightWidthRatio", preset.right);
    setStoredRatio("rstudioJp.sourceWidthRatio", preset.source);
    setStoredRatio("rstudioJp.rightTopHeightRatio", preset.rightTop);
    window.localStorage.setItem("rstudioJp.layoutPreset", name);
    applyFourPaneLayout();
    scheduleResizeNotify();
  }

  function findAceEditor(element) {
    if (!element) return null;
    if (element.env && element.env.editor) return element.env.editor;
    if (element.closest) {
      const editorEl = element.closest(".ace_editor");
      if (editorEl && editorEl.env && editorEl.env.editor) return editorEl.env.editor;
    }
    return null;
  }

  function activeEditor() {
    const focused = document.activeElement && document.activeElement.closest && document.activeElement.closest(".ace_editor");
    if (focused && focused.env && focused.env.editor) return focused.env.editor;
    const editors = Array.from(document.querySelectorAll(".ace_editor"))
      .map((el) => el.env && el.env.editor)
      .filter(Boolean);
    return editors[0] || null;
  }

  function hasRCall(line, names) {
    return names.some((name) => new RegExp("(^|[^\\w.])" + name.replace(".", "\\.") + "\\s*\\(").test(line));
  }

  function lineKind(line, row, annotations, warnings) {
    if (annotations.has(row)) return "error";
    if (warnings && warnings.has(row)) return "warning";
    if (/^\s*#\s*=+\s*$/.test(line) || /^\s*#.*-{3,}\s*$/.test(line)) return "section";
    if (/^\s*[A-Za-z._][\w.]*\s*(<-|=)\s*function\s*\(/.test(line)) return "function";
    if (/^\s*(library|require)\s*\(/.test(line)) return "library";
    if (/^\s*(if|for|while|repeat|else|switch)\b/.test(line)) return "control";
    if (/(%>%|%<>%|%T>%|%\$%|\|>)/.test(line)) return "pipe";
    if (hasRCall(line, ["stop", "warning", "stopifnot", "tryCatch", "suppressWarnings", "suppressMessages"])) return "guard";
    if (hasRCall(line, ["plot", "matplot", "ggplot", "qplot", "hist", "boxplot", "barplot", "lines", "points", "abline", "grid", "legend"])) return "plot";
    if (hasRCall(line, ["data.frame", "matrix", "list", "tibble", "cbind", "rbind", "read.csv", "read.table", "as.data.frame", "colnames", "rownames"])) return "data";
    if (/(^|[^\w.])(readr|dplyr|tidyr|data\.table)::/.test(line)) return "data";
    if (hasRCall(line, ["cat", "print", "message", "str", "summary", "glimpse", "head", "tail"])) return "message";
    if (/^\s*#/.test(line)) return "comment";
    if (!line.trim()) return "blank";
    return "code";
  }

  function updateNestingDepth(line, currentDepth) {
    let depth = currentDepth;
    let quote = "";
    let escaped = false;
    let comment = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (comment) break;
      if (quote) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === quote) quote = "";
        continue;
      }
      if (char === "#" && (i === 0 || line[i - 1] !== "\\")) {
        comment = true;
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === "(" || char === "[" || char === "{") {
        depth += 1;
      } else if (char === ")" || char === "]" || char === "}") {
        depth = Math.max(0, depth - 1);
      }
    }
    return depth;
  }

  function buildStructureRows(lines, annotations, warnings) {
    const rows = [];
    let depth = 0;
    for (let row = 0; row < lines.length; row++) {
      const line = lines[row] || "";
      const trimmed = line.trim();
      const leading = line.match(/^\s*/)[0].replace(/\t/g, "    ").length;
      const openingDepth = Math.max(0, depth);
      const nextDepth = updateNestingDepth(line, depth);
      const kind = lineKind(line, row, annotations, warnings);
      const labelMatch = trimmed.match(/^#\s*(.+?)\s*(?:[-=]{3,})?\s*$/) ||
        trimmed.match(/^([A-Za-z._][\w.]*)\s*(?:<-|=)\s*function\s*\(/);
      rows.push({
        row,
        kind,
        indent: Math.min(9, Math.floor(leading / 2)),
        depth: Math.min(10, Math.max(openingDepth, nextDepth)),
        hasParen: /[()[\]{}]/.test(line),
        label: labelMatch ? labelMatch[1].trim().slice(0, 36) : ""
      });
      depth = nextDepth;
    }
    return rows;
  }

  function annotationRows(session, type) {
    return new Set((session.getAnnotations && session.getAnnotations() || [])
      .filter((item) => item && item.type === type)
      .map((item) => item.row));
  }

  function clearCodeAidClasses(lineEl) {
    lineEl.classList.remove(
      "jp-code-line--section",
      "jp-code-line--function",
      "jp-code-line--library",
      "jp-code-line--control",
      "jp-code-line--pipe",
      "jp-code-line--plot",
      "jp-code-line--data",
      "jp-code-line--message",
      "jp-code-line--guard",
      "jp-code-line--comment",
      "jp-code-line--error",
      "jp-code-line--warning",
      "jp-code-line--nested"
    );
  }

  function isSourceEditor(editorEl) {
    if (!editorEl || !editorEl.querySelector(".ace_gutter")) return false;
    if (editorEl.closest("[id*='console'], [class*='console'], [id*='terminal'], [class*='terminal']")) return false;
    const text = editorEl.textContent || "";
    return /\bfunction\b|<-|#|library\s*\(|require\s*\(|\bfor\s*\(|\bif\s*\(|\|>|%>%|data\.frame\s*\(|plot\s*\(|tryCatch\s*\(|stop\s*\(/.test(text) || text.length < 2000;
  }

  function updateEditorCodeAids(editorEl, editor) {
    if (!editorEl || !editor || !editor.session || !editor.renderer) return;
    const session = editor.session;
    const config = editor.renderer.layerConfig || {};
    const firstRow = Number.isFinite(config.firstRow) ? config.firstRow : editor.renderer.getFirstVisibleRow();
    const renderedLines = editorEl.querySelectorAll(".ace_text-layer .ace_line");
    if (!renderedLines.length) return;

    const errors = annotationRows(session, "error");
    const warnings = annotationRows(session, "warning");
    let depth = 0;
    const depthByRow = [];
    for (let row = 0; row < session.getLength(); row++) {
      const line = session.getLine(row);
      const nextDepth = updateNestingDepth(line, depth);
      depthByRow[row] = Math.min(10, Math.max(depth, nextDepth));
      depth = nextDepth;
    }

    renderedLines.forEach((lineEl, index) => {
      const row = firstRow + index;
      const line = session.getLine(row) || "";
      const kind = lineKind(line, row, errors, warnings);
      clearCodeAidClasses(lineEl);
      lineEl.style.setProperty("--jp-depth", String(depthByRow[row] || 0));
      if (kind !== "code" && kind !== "blank") lineEl.classList.add("jp-code-line--" + kind);
      if (/[()[\]{}]/.test(line)) lineEl.classList.add("jp-code-line--nested");
    });
  }

  function renderMinimapRows(container, rows) {
    const fragment = document.createDocumentFragment();
    rows.forEach((row) => {
      const span = document.createElement("span");
      span.className = "jp-minimap__row jp-minimap__row--" + row.kind + (row.hasParen ? " jp-minimap__row--nested" : "");
      span.style.setProperty("--jp-depth", String(row.depth));
      span.style.setProperty("--jp-indent", String(row.indent));
      span.dataset.row = String(row.row);
      if (row.label) span.title = row.label;
      fragment.appendChild(span);
    });
    container.replaceChildren(fragment);
  }

  function collectOutline(editor) {
    if (!editor || !editor.session) return [];
    const items = [];
    const lineCount = editor.session.getLength();
    for (let i = 0; i < lineCount; i++) {
      const line = editor.session.getLine(i);
      const section = line.match(/^\s*#\s*(.+?)\s*-{3,}\s*$/);
      const fn = line.match(/^\s*([A-Za-z._][\w.]*)\s*(?:<-|=)\s*function\s*\(/);
      if (section) items.push({ row: i, label: "§ " + section[1].trim().slice(0, 48) });
      else if (fn) items.push({ row: i, label: "ƒ " + fn[1] });
    }
    return items.slice(0, 80);
  }

  function toggleMinimap() {
    const hidden = document.body.classList.toggle("jp-minimap-hidden");
    window.localStorage.setItem("rstudioJp.minimapVisible", hidden ? "false" : "true");
    scheduleResizeNotify();
  }

  function attachMinimap(editorEl) {
    if (!editorEl || editorEl.classList.contains("jp-minimap-enabled")) return;
    if (!isSourceEditor(editorEl)) return;
    const editor = findAceEditor(editorEl);
    if (!editor || !editor.session || !editor.renderer) return;

    editorEl.classList.add("jp-minimap-enabled");

    const minimap = document.createElement("div");
    minimap.className = "jp-minimap";
    minimap.title = "コード全体のミニマップ";

    const rows = document.createElement("div");
    rows.className = "jp-minimap__rows";
    const viewport = document.createElement("div");
    viewport.className = "jp-minimap__viewport";

    minimap.appendChild(rows);
    minimap.appendChild(viewport);
    editorEl.appendChild(minimap);

    const update = () => {
      const session = editor.session;
      const lineCount = session.getLength();
      const lines = [];
      for (let i = 0; i < lineCount; i++) lines.push(session.getLine(i));
      const annotations = annotationRows(session, "error");
      const warnings = annotationRows(session, "warning");

      renderMinimapRows(rows, buildStructureRows(lines, annotations, warnings));
      updateEditorCodeAids(editorEl, editor);

      const height = Math.max(1, minimap.clientHeight);
      const lineHeight = Math.max(1, editor.renderer.lineHeight || 16);
      const visibleRows = Math.max(1, Math.floor(editor.renderer.$size.scrollerHeight / lineHeight));
      const firstVisible = Math.max(0, Math.floor(editor.renderer.getScrollTop() / lineHeight));
      const ratioTop = firstVisible / Math.max(1, lineCount);
      const ratioHeight = Math.min(1, visibleRows / Math.max(1, lineCount));

      viewport.style.top = Math.round(height * ratioTop) + "px";
      viewport.style.height = Math.max(8, Math.round(height * ratioHeight)) + "px";
    };

    const jump = (event) => {
      const rect = minimap.getBoundingClientRect();
      const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
      const line = Math.floor((y / Math.max(1, rect.height)) * editor.session.getLength());
      editor.scrollToLine(line, true, true, function () {});
      editor.focus();
      update();
    };

    minimap.addEventListener("mousedown", jump);
    editor.session.on("change", update);
    editor.session.on("changeScrollTop", update);
    editor.renderer.on("afterRender", update);
    window.addEventListener("resize", update);
    setTimeout(update, 0);
  }

  function scanEditors() {
    document.querySelectorAll(".ace_editor").forEach(attachMinimap);
  }

  function installDomHooks() {
    if (window.__rstudioJpDomHooksInstalled) return;
    window.__rstudioJpDomHooksInstalled = true;

    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function (child) {
      if (child && child.nodeType === Node.TEXT_NODE) {
        const parent = this.nodeType === Node.ELEMENT_NODE ? this : null;
        if (!parent || !parent.closest || !parent.closest(skipSelector)) {
          const nextText = translateText(child.textContent || "");
          if (nextText !== child.textContent) child.textContent = nextText;
        }
      } else if (child && child.nodeType === Node.ELEMENT_NODE) {
        translateTree(child);
      }
      return originalAppendChild.call(this, child);
    };

    const originalSetAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name, value) {
      const nextValue = attrNames.includes(name) ? translateText(String(value)) : value;
      return originalSetAttribute.call(this, name, nextValue);
    };
  }

  function boot() {
    installDomHooks();
    if (window.localStorage.getItem("rstudioJp.minimapVisible") === "false") {
      document.body.classList.add("jp-minimap-hidden");
    }
    document.title = "RStudio JP Desktop";
    translateAllFrames();
    applyFourPaneLayout();
    scanEditors();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              translateTree(node);
              if (node.matches && node.matches(".ace_editor")) attachMinimap(node);
              if (node.querySelectorAll) node.querySelectorAll(".ace_editor").forEach(attachMinimap);
            } else if (node.nodeType === Node.TEXT_NODE) {
              translateTextNode(node);
            }
          });
        } else if (mutation.type === "attributes") {
          translateNode(mutation.target);
        } else if (mutation.type === "characterData" && mutation.target.parentNode) {
          if (!shouldSkipTextNode(mutation.target)) translateNode(mutation.target.parentNode);
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false,
      attributeFilter: attrNames
    });

    window.addEventListener("resize", () => {
      applyFourPaneLayout();
      scanEditors();
    }, { passive: true });

    let stabilizationRuns = 0;
    const stabilizationTimer = window.setInterval(() => {
      translateAllFrames();
      applyFourPaneLayout();
      scanEditors();
      stabilizationRuns += 1;
      if (stabilizationRuns >= 20) window.clearInterval(stabilizationTimer);
    }, 1000);

    window.setInterval(() => {
      translateAllFrames();
      scanEditors();
    }, 10000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
