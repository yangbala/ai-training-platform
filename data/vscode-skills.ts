import { Skill } from '@/types'

export const vsCodeSkills: Skill[] = [
  {
    id: 1,
    title: '安裝 VS Code 與 Codex CLI',
    difficulty: 'beginner',
    objective: '在 10 分鐘內完成 VS Code 繁體中文環境設置，並成功安裝 OpenAI Codex CLI。',
    context: 'Codex CLI 是 OpenAI 推出的終端機 AI Agent，能直接讀取本機檔案並執行任務。使用前需先安裝 VS Code 及 Node.js，整個過程約 10-15 分鐘，無需任何程式背景。',
    examplePrompt: `# 安裝步驟（在 VS Code 整合終端機執行）

# 步驟 1：確認 Node.js 已安裝（需 v18 以上）
node --version

# 步驟 2：安裝 Codex CLI
npm install -g @openai/codex

# 步驟 3：設定 API Key
codex config set api-key YOUR_OPENAI_API_KEY

# 步驟 4：確認安裝成功
codex --version`,
    exampleResponse: `v0.1.x  ← 看到版本號表示安裝成功

✓ Codex CLI 已就緒，可以開始使用 Agent 模式。`,
    task: '依照上方步驟在你的電腦完成安裝。VS Code 語言請設定為繁體中文（按 Ctrl+Shift+P → 輸入 "Configure Display Language" → 選 zh-tw）。',
    checklist: [
      '我已安裝 VS Code 並設定為繁體中文介面',
      '我已安裝 Node.js v18 以上版本',
      '我已安裝 Codex CLI 並執行 codex --version 看到版本號',
      '我已設定 OpenAI API Key',
    ],
  },
  {
    id: 2,
    title: '第一次啟動 Codex Agent',
    difficulty: 'beginner',
    objective: '成功在 VS Code 終端機啟動 Codex Agent 模式，並完成第一次自然語言對話。',
    context: 'Codex CLI 的 Agent 模式（--approval-mode auto-edit）讓 AI 可以直接對你的檔案進行操作。第一次啟動時只需一行指令，之後用自然語言下指示即可，不需要記指令語法。',
    examplePrompt: `# 在 VS Code 整合終端機輸入以下指令啟動 Agent
codex --approval-mode auto-edit

# Agent 啟動後，輸入以下測試指令
請在目前資料夾建立一個名為 hello.txt 的檔案，內容寫「我的第一次 Codex Agent 操作，日期：今天」`,
    exampleResponse: `✓ 已建立 hello.txt
內容：我的第一次 Codex Agent 操作，日期：2026-06-09

Agent 完成任務後會顯示綠色確認訊息。`,
    task: '在 VS Code 的整合終端機（Ctrl+` 開啟）啟動 Codex Agent，並讓 Agent 在你選定的資料夾建立一個測試文字檔。',
    checklist: [
      '我成功用 Ctrl+` 開啟 VS Code 整合終端機',
      '我成功啟動 Codex Agent（codex --approval-mode auto-edit）',
      '我輸入自然語言指令，Agent 成功建立了 hello.txt',
      '我打開 hello.txt 確認內容正確',
    ],
  },
  {
    id: 3,
    title: '讓 Codex 讀取 CSV 並產生摘要',
    difficulty: 'beginner',
    objective: '讓 Codex Agent 讀取一份 CSV 檔案，並自動產生資料筆數、空值欄位、重點摘要。',
    context: '每個月都要整理銷售或出勤 CSV 資料？以前需要用 Excel 手動篩選，現在讓 Codex 在 30 秒內告訴你資料的基本概況，你只需提供檔名即可。',
    examplePrompt: `請讀取目前資料夾中的 sales.csv，告訴我：
1. 總共有幾筆資料
2. 哪些欄位有空值，各有幾筆
3. 用條列方式列出前 5 筆資料的重要欄位內容`,
    exampleResponse: `✓ 已讀取 sales.csv

📊 資料概況：
- 總筆數：248 筆
- 空值欄位：「備註」欄有 31 筆空值，「電話」欄有 8 筆空值

📋 前 5 筆資料：
1. 2026-01-03｜王小明｜產品A｜$12,500｜已付款
2. 2026-01-04｜李美玲｜產品B｜$8,200｜待確認
3. 2026-01-05｜張大偉｜產品A｜$12,500｜已付款
4. 2026-01-06｜陳淑芬｜產品C｜$3,800｜已付款
5. 2026-01-07｜林志豪｜產品B｜$8,200｜退款`,
    task: '準備一份你工作中實際用到的 CSV 檔案（或從網路下載範例 CSV），啟動 Codex Agent 後複製上方指令，把 sales.csv 換成你的檔名，執行看看。',
    checklist: [
      '我準備好一份 CSV 檔案並放到 VS Code 開啟的資料夾中',
      'Codex 成功讀取 CSV 並告訴我總筆數',
      'Codex 正確識別出有空值的欄位',
      '我嘗試把指令換成「只列出金額超過 10,000 的資料」，Codex 也能回答',
    ],
  },
  {
    id: 4,
    title: '讓 Codex 讀取多種格式的檔案內容',
    difficulty: 'beginner',
    objective: '讓 Codex Agent 讀取 Word（.docx）、PDF、或純文字（.txt）檔案，並摘要出重點。',
    context: '公司常常有各種格式的報告和文件。以前要先打開每份文件才能知道內容，現在直接告訴 Codex 檔名，它就能幫你讀出重點，適用於 Word、PDF、TXT 等常見格式。',
    examplePrompt: `請讀取 report.docx，
摘要這份文件的主要重點，用 3-5 個條列項目呈現，
每個重點不超過 2 句話。`,
    exampleResponse: `✓ 已讀取 report.docx（共 12 頁）

📄 文件重點摘要：
• 第一季營收較去年同期成長 15%，主要來自新客戶開發。
• 客戶滿意度調查結果為 4.2/5，服務回應速度是最大改善項目。
• 預計 Q2 推出新產品線，目標市場鎖定中小企業。
• 人力資源方面計畫增聘 3 名業務人員，預算已核准。
• 下季重點目標：提升舊客戶回購率至 30%。`,
    task: '找一份你工作中常用的 Word 文件或 PDF 報告，放到 VS Code 開啟的資料夾，讓 Codex 幫你摘要。試試看換不同的指示，例如「只摘要關於財務的部分」。',
    checklist: [
      '我讓 Codex 成功讀取一份 .docx 或 .pdf 檔案',
      'Codex 產生的摘要符合文件的實際內容',
      '我嘗試修改指令讓摘要聚焦在特定主題',
      '我確認 Codex 沒有捏造文件中不存在的資訊',
    ],
  },
  {
    id: 5,
    title: '讓 Codex 整理 Excel 欄位格式',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 讀取 Excel 檔案，自動清除空白、統一格式，並輸出新的整理後檔案。',
    context: '從各部門收集來的 Excel 表格常常有格式不一致的問題：姓名前後有空格、電話格式五花八門、日期格式不統一。以前要一格一格修，現在交給 Codex 幾秒鐘搞定。',
    examplePrompt: `請讀取 staff_list.xlsx，幫我做以下整理：
1. 把「姓名」欄位的前後多餘空白去掉
2. 把「電話」欄位統一格式為 09XX-XXX-XXX
3. 把「生日」欄位統一格式為 YYYY/MM/DD
完成後輸出為 staff_list_cleaned.xlsx 存在同一資料夾。`,
    exampleResponse: `✓ 已處理 staff_list.xlsx

整理結果：
- 姓名欄位：修正 12 筆（去除前後空白）
- 電話欄位：統一格式 47 筆（0912345678 → 0912-345-678）
- 生日欄位：統一格式 50 筆

✓ 已儲存為 staff_list_cleaned.xlsx`,
    task: '準備一份有格式不一致問題的 Excel 檔（至少有一個欄位需要格式統一），讓 Codex 幫你整理並輸出新檔案。',
    checklist: [
      'Codex 成功讀取我的 Excel 檔案',
      'Codex 正確清除姓名或文字欄位的多餘空白',
      'Codex 輸出了新的 _cleaned.xlsx 檔案',
      '我打開新檔案確認格式已統一',
    ],
  },
  {
    id: 6,
    title: '讓 Codex 將資料視覺化並存成圖表',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 讀取資料並自動產生長條圖或圓餅圖，存成 PNG 圖檔。',
    context: '每個月要向主管報告數字，光看表格不夠直觀。讓 Codex 把 CSV 或 Excel 的數字直接變成圖表圖檔，貼到簡報或 Email 裡就完成了，整個過程不需要開 Excel 或 Python。',
    examplePrompt: `請讀取 monthly_sales.csv，
產生一張長條圖：
- X 軸是月份（1月到6月）
- Y 軸是銷售金額（單位：萬元）
- 標題：2026 上半年銷售趨勢
執行後將圖表存成 sales_chart.png 在同一資料夾。`,
    exampleResponse: `✓ 已讀取 monthly_sales.csv
✓ 已產生長條圖並執行腳本
✓ 已儲存為 sales_chart.png（1200x800px）

圖表包含：6 個月份長條、Y 軸數值標籤、圖表標題`,
    task: '用你工作中有數字的 CSV 或 Excel，讓 Codex 產生一張圖表存為 PNG，然後試試看改成圓餅圖（把「長條圖」換成「圓餅圖」）。',
    checklist: [
      'Codex 成功讀取資料並產生 PNG 圖檔',
      '圖表的 X 軸和 Y 軸標籤正確',
      '圖檔已儲存在我指定的資料夾',
      '我嘗試改變圖表類型（長條圖/折線圖/圓餅圖）',
    ],
  },
  {
    id: 7,
    title: '讓 Codex 在多份文件中搜尋關鍵字',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 跨多個資料夾搜尋包含特定關鍵字的檔案，並列出檔名與對應句子。',
    context: '合約快到期了，但不記得放在哪個資料夾？讓 Codex 幫你掃描所有文件，找出包含「合約到期」、「需要更新」等關鍵字的段落，省去一個一個打開檢查的時間。',
    examplePrompt: `請在目前資料夾（含所有子資料夾）中，
搜尋所有 .docx 和 .txt 檔案，
找出包含「合約到期」這個詞的檔案，
列出：檔名、所在路徑、包含該詞的完整句子。`,
    exampleResponse: `✓ 已掃描 47 個檔案

搜尋結果（共 3 個檔案包含「合約到期」）：

📄 contracts/vendor_A_2025.docx
→「供應商 A 的合約到期日為 2026 年 8 月 31 日，需於 60 天前決定是否續約。」

📄 hr/employment_contracts/summary.txt
→「以下員工合約到期時間需注意：陳○○（2026/07）、林○○（2026/09）。」

📄 admin/2026_Q1_review.docx
→「IT 設備租賃合約到期後需重新議價，預算已列入 Q3 規劃。」`,
    task: '在你的工作資料夾中搜尋一個你常用的關鍵字（例如公司名稱、專案名稱、特定日期），讓 Codex 找出所有相關段落。',
    checklist: [
      'Codex 成功跨資料夾掃描所有 .docx/.txt 檔案',
      '搜尋結果列出了檔名和所在路徑',
      '搜尋結果包含包含關鍵字的完整句子',
      '我嘗試搜尋第二個關鍵字確認功能正常',
    ],
  },
  {
    id: 8,
    title: '讓 Codex 彙整多份報告成一份摘要',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 讀取資料夾內所有報告，提取指定段落，合併成一份摘要文件。',
    context: '每個月各部門各自交一份週報，你需要整合成一份給主管的總結報告。以前要一份一份打開、複製、整理，現在讓 Codex 自動讀完所有檔案，把「結論」或「重點」段落匯總成一份文件。',
    examplePrompt: `請讀取 reports 資料夾中所有的 .docx 檔案，
把每份報告的「本週重點」段落提取出來，
格式如下：
【檔名（不含副檔名）】
提取的內容

全部合併後儲存為 weekly_summary.docx。`,
    exampleResponse: `✓ 已讀取 reports/ 資料夾中 6 份報告

✓ 已建立 weekly_summary.docx 包含：

【業務部週報_0603】
本週新開發客戶 3 家，預計下週完成 2 份合約簽署。

【財務部週報_0603】
Q2 費用核銷截止日為 6/15，請各部門確認送件。

... （以下省略）`,
    task: '建立一個 reports 資料夾，放入至少 3 份有「本週重點」或「結論」段落的 Word 文件，讓 Codex 自動彙整成一份摘要文件。',
    checklist: [
      'Codex 成功讀取 reports 資料夾中所有 .docx 檔案',
      '每份報告的指定段落都被正確提取',
      '輸出的 weekly_summary.docx 格式清晰',
      '我確認摘要內容與各報告原文一致',
    ],
  },
  {
    id: 9,
    title: '讓 Codex 批次重新命名檔案',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 將資料夾中的多個檔案依照統一規則批次重新命名。',
    context: '從相機或手機下載的照片、掃描的文件，檔名常常是亂碼或流水號。讓 Codex 幫你依照「日期_序號」或「部門_類別_序號」的格式批次重新命名，整個資料夾幾秒鐘整理完畢。',
    examplePrompt: `請把 photos 資料夾中所有 .jpg 和 .png 檔案，
依照「YYYY-MM-DD_序號」的格式重新命名，
日期用今天的日期（2026-06-09），
序號從 001 開始，不足三位補零。
執行前先列出原檔名和新檔名讓我確認，
確認後再執行重新命名。`,
    exampleResponse: `✓ 找到 photos/ 資料夾中 8 個圖片檔案

預計重新命名如下（請確認後輸入「確認執行」）：
IMG_4521.jpg  →  2026-06-09_001.jpg
IMG_4522.jpg  →  2026-06-09_002.jpg
DSC_0034.jpg  →  2026-06-09_003.jpg
...（共 8 筆）

[使用者輸入：確認執行]

✓ 已完成重新命名，8 個檔案處理完畢。`,
    task: '建立一個資料夾，放入至少 5 個名稱雜亂的圖片或文件，讓 Codex 幫你依照統一格式重新命名。記得先讓 Codex 列出預覽再執行。',
    checklist: [
      'Codex 先列出原檔名和新檔名讓我預覽',
      '我確認無誤後 Codex 才執行重新命名',
      '所有檔案都依照指定格式命名完成',
      '我嘗試改用不同的命名規則（例如加上部門名稱）',
    ],
  },
  {
    id: 10,
    title: '讓 Codex 整理資料夾結構',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 掃描指定資料夾，依照副檔名自動建立子資料夾並分類移動檔案。',
    context: '桌面或下載資料夾堆滿了各種檔案？讓 Codex 一次掃描，自動把 PDF、Word、Excel、圖片分別移入各自的子資料夾，資料夾瞬間整齊清爽，日後也方便搜尋。',
    examplePrompt: `請掃描 Downloads 資料夾（只處理最上層，不進入子資料夾），
依照以下規則建立子資料夾並移動檔案：
- .pdf → PDF文件/
- .docx, .doc → Word文件/
- .xlsx, .xls → Excel試算表/
- .jpg, .png, .jpeg → 圖片/
- .pptx, .ppt → 簡報/
- 其他格式 → 其他檔案/

執行前先告訴我會移動幾個檔案，確認後再執行。`,
    exampleResponse: `✓ 已掃描 Downloads/ 最上層

準備移動 34 個檔案（請確認後輸入「確認執行」）：
- PDF文件/：12 個 .pdf 檔案
- Word文件/：8 個 .docx 檔案
- Excel試算表/：6 個 .xlsx 檔案
- 圖片/：5 個圖片檔案
- 其他檔案/：3 個其他格式

[使用者輸入：確認執行]

✓ 已完成分類，建立 5 個子資料夾，移動 34 個檔案。`,
    task: '選擇你電腦中一個混亂的資料夾（建議先備份），讓 Codex 幫你整理分類。觀察它如何處理你沒有預期到的檔案格式。',
    checklist: [
      'Codex 正確掃描資料夾並告知將移動的檔案數量',
      'Codex 依照副檔名建立了正確的子資料夾',
      '所有檔案都被移動到對應的子資料夾',
      '我確認沒有檔案遺失或放錯位置',
    ],
  },
]
