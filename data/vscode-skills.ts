import { Skill } from '@/types'

export const vsCodeSkills: Skill[] = [
  {
    id: 1,
    title: '安裝 VS Code 與 OpenAI Codex 擴充套件',
    difficulty: 'beginner',
    objective: '在 15 分鐘內安裝 VS Code，從擴充套件市集搜尋並安裝 Codex，再用 ChatGPT 帳號登入，完成後即可在 VS Code 裡直接使用 AI Agent。',
    context: 'Codex 是 OpenAI 在 VS Code 擴充套件市集推出的工具，不需要輸入任何指令或安裝額外軟體，也不需要 API Key。只要在 VS Code 的擴充套件面板搜尋「Codex」安裝後，用既有的 ChatGPT 帳號登入，就能在 VS Code 裡直接對話、讓 AI 幫你讀取和處理電腦上的檔案。',
    examplePrompt: `你好！我是公司的行政人員，請告訴我你能幫我處理哪些日常辦公室工作？`,
    exampleResponse: `你好！我是 Codex，很高興認識你！我可以幫你處理許多日常行政工作，例如：

📊 資料整理：讀取 Excel / CSV，清理格式不一致的欄位，統一日期、電話格式。
📄 文件摘要：讀取 Word、PDF、TXT，快速提取重點條列。
🔍 跨檔搜尋：在多個資料夾中搜尋包含特定關鍵字的段落。
📋 報告彙整：把多份週報的結論段落自動合併成一份摘要文件。
🗂️ 批次命名：依照日期或規則批次重新命名照片或掃描文件。
📁 資料夾整理：依副檔名自動分類，把混亂的資料夾整理乾淨。

你有什麼任務想先試試看？`,
    task: '依照上方步驟完成安裝與登入。完成後，在 Codex 聊天面板輸入「你好，請自我介紹你能幫我做什麼？」，確認 Codex 有回應。',
    checklist: [
      '我已安裝 VS Code 並成功開啟',
      '我在 VS Code 擴充套件面板搜尋「Codex」並完成安裝',
      '我用 ChatGPT 帳號登入，Codex 面板已出現在左側',
      '我在 Codex 面板輸入一句話後有收到回覆',
    ],
  },
  {
    id: 2,
    title: '認識 Codex 三種模式',
    difficulty: 'beginner',
    objective: '了解 Codex 的 Chat、Agent、Agent Full Access 三種模式的差異，並用 Agent 模式完成第一個真實任務。',
    context: 'Codex 提供三種模式，適用不同情境。日常行政任務建議從 Agent 模式開始，讓 AI 幫你完成工作，同時保有確認控制權。',
    examplePrompt: `在 Codex 面板右上角切換到「Agent」模式後，輸入：

請在我目前開啟的資料夾中，建立一個名為「我的第一個Codex任務.txt」的檔案，
內容寫上：
- 今天的日期
- 我學會了使用 VS Code Codex Agent
- 這個工具可以幫我處理哪三種類型的任務（根據你的理解）`,
    exampleResponse: `✓ 已建立「我的第一個Codex任務.txt」

檔案內容：
日期：2026 年 6 月 9 日

我學會了使用 VS Code Codex Agent！

這個工具可以幫我處理三種類型的任務：
1. 資料整理與格式化（讀取 Excel、CSV，統一欄位格式）
2. 文件搜尋與彙整（跨資料夾搜尋關鍵字、合併報告）
3. 批次自動化作業（批次重新命名、整理資料夾結構）`,
    task: '在 VS Code 開啟一個工作資料夾（檔案 → 開啟資料夾），切換到 Agent 模式，讓 Codex 建立一個文字檔並寫入今天的學習心得。',
    checklist: [
      '我已在 VS Code 開啟一個工作資料夾',
      '我找到並切換到 Agent 模式（Codex 面板右上角）',
      'Codex 成功在我的資料夾建立了文字檔案',
      '我嘗試了 Chat 模式詢問一個問題，確認它不會建立檔案',
    ],
  },
  {
    id: 3,
    title: '讓 Codex 讀取政府統計 CSV 並產生摘要',
    difficulty: 'beginner',
    objective: '從政府資料開放平臺下載機械業出口統計 CSV，讓 Codex 讀取並自動產生趨勢摘要與重點分析。',
    context: '經濟部統計處每月公布機械設備出口統計，這些數據以 CSV 格式發布於政府資料開放平臺（data.gov.tw）。行政人員可以直接下載，讓 Codex 分析出口趨勢、年度比較、成長率等重點，節省大量手動整理時間，也讓主管報告更有數據支撐。',
    examplePrompt: `【取得資料步驟】
前往 data.gov.tw → 搜尋「機械設備出口」→ 下載 CSV 檔案
存入 VS Code 開啟的資料夾，檔名例如 machinery_export.csv

（切換到 Agent 模式，輸入：）

請讀取 machinery_export.csv，告訴我：
1. 資料涵蓋哪些年月範圍，共幾筆
2. 哪一個月出口值最高，哪一個月最低
3. 與去年同期相比，今年整體出口趨勢是成長還是衰退
4. 用 3 句話寫一段可以直接貼進週報的摘要`,
    exampleResponse: `✓ 已讀取 machinery_export.csv

📊 資料概況：
- 涵蓋期間：2025 年 1 月 ～ 2026 年 3 月（共 15 筆）
- 欄位：年月、機械設備出口值（百萬美元）、較上年同月增減率(%)、主要出口目的地

📈 出口高低點：
- 最高：2025 年 10 月，出口值 2,147 百萬美元（+12.3%）
- 最低：2026 年 2 月，出口值 1,432 百萬美元（-4.1%，農曆春節因素）

📉 年度趨勢：
- 2025 全年平均月出口值：1,923 百萬美元，較 2024 年成長約 9.2%
- 2026 年 Q1 平均月出口值：1,768 百萬美元，較去年同期略降 2.1%

📋 週報摘要（可直接複製）：
2025 年機械設備出口整體呈成長趨勢，全年平均月出口值達 19.2 億美元，
年增率 9.2%；進入 2026 年後受全球需求放緩影響，Q1 出口較去年同期
微幅下降 2.1%，後續走勢有待觀察。`,
    task: '前往 data.gov.tw 搜尋「機械設備出口」或「機械工業統計」，下載一份 CSV 數據，放到 VS Code 資料夾，讓 Codex 幫你分析並產出一段可直接使用的週報摘要。',
    checklist: [
      '我從 data.gov.tw 下載了機械業相關的 CSV 統計檔案',
      'Codex 成功讀取 CSV 並告訴我資料的年月範圍',
      'Codex 正確找出出口最高與最低的月份',
      'Codex 產出一段可直接貼入週報的文字摘要',
    ],
  },
  {
    id: 4,
    title: '讓 Codex 讀取多種格式的檔案內容',
    difficulty: 'beginner',
    objective: '讓 Codex Agent 讀取 Word（.docx）、PDF、或純文字（.txt）檔案，並摘要出重點。',
    context: '公司常常有各種格式的報告和文件，如 Word、PDF、TXT 等常見格式，以前要先打開每份文件才能知道內容，現在只要把檔案放到 VS Code 開啟的資料夾裡，直接在 Codex 對話框輸入檔名，Codex 就會幫你讀出重點。',
    examplePrompt: `請讀取「台灣機械產業進出口速報_202604.pdf」，摘要這份報告的主要重點，用 3-5 個條列項目呈現，每個重點不超過 2 句話，並標示數據來源月份。`,
    exampleResponse: `✓ 已讀取「台灣機械產業進出口速報_202604.pdf」（共 8 頁）

📄 2026 年 4 月進出口速報重點：
• 本月機械產品出口值為 38.7 億美元，較上月增加 4.2%，較去年同期成長 11.8%。
• 主要出口市場依序為：美國（占 23%）、中國大陸（占 19%）、歐盟（占 15%）。
• 工具機出口表現亮眼，單月出口值創近 14 個月新高，主因美國製造業回流帶動需求。
• 進口值為 21.3 億美元，月增 1.9%；主要進口來源為日本、德國，以關鍵零組件為主。
• 本月出超（出口減進口）為 17.4 億美元，貿易順差較上月擴大。`,
    task: '前往台灣機械工業同業公會（TAMI）或 data.gov.tw 下載最新一期進出口速報，放入 VS Code 資料夾，讓 Codex 幫你摘要重點。',
    checklist: [
      '我下載了台灣機械產業進出口速報（PDF 或 Word 格式）',
      'Codex 成功讀取報告並產出 3-5 個條列重點',
      '摘要中有標示具體數字（出口值、成長率等）',
      '我追加指令聚焦特定品項，Codex 能給出對應段落',
    ],
  },
  {
    id: 5,
    title: '讓 Codex 整理 Excel 欄位格式',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 讀取 Excel 檔案，自動清除空白、統一格式，並輸出新的整理後檔案。',
    context: '從各部門收集來的 Excel 表格常常有格式不一致的問題：姓名前後有空格、電話格式五花八門、日期格式不統一。以前要一格一格修，現在在 Codex 對話框說清楚你要什麼格式，幾秒鐘搞定。Codex 會把整理好的資料存成新檔案，原始檔不會被動到。',
    examplePrompt: `（確認 staff_list.xlsx 在 VS Code 資料夾中，Agent 模式輸入：）

請讀取 staff_list.xlsx，幫我做以下整理：
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
    task: '準備一份有格式不一致問題的 Excel 檔（至少有一個欄位需要格式統一），讓 Codex 幫你整理並輸出新檔案。完成後打開新檔案確認格式。',
    checklist: [
      'Codex 成功讀取我的 Excel 檔案',
      'Codex 正確清除姓名或文字欄位的多餘空白',
      'Codex 輸出了新的 _cleaned.xlsx 檔案',
      '我打開新檔案確認格式已統一，原始檔案沒有被修改',
    ],
  },
  {
    id: 6,
    title: '讓 Codex 將資料視覺化並存成圖表',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 讀取資料並自動產生長條圖或圓餅圖，存成 PNG 圖檔。',
    context: '每個月要向主管報告數字，光看表格不夠直觀。在 Codex 對話框描述你想要的圖表樣式，Codex 就會讀取你的資料、產生圖表、存成 PNG 圖檔，直接貼到簡報或 Email 即可用，整個過程不需要開 Excel 圖表功能或學 Python。',
    examplePrompt: `（確認 monthly_sales.csv 在 VS Code 資料夾中，Agent 模式輸入：）

請讀取 monthly_sales.csv，
產生一張長條圖：
- X 軸是月份（1月到6月）
- Y 軸是銷售金額（單位：萬元）
- 標題：2026 上半年銷售趨勢
執行後將圖表存成 sales_chart.png 在同一資料夾。`,
    exampleResponse: `✓ 已讀取 monthly_sales.csv
✓ 正在產生圖表...
✓ 已儲存為 sales_chart.png（1200×800px）

圖表包含：6 個月份長條、Y 軸數值標籤、圖表標題「2026 上半年銷售趨勢」`,
    task: '用你工作中有數字的 CSV 或 Excel，讓 Codex 產生一張長條圖存為 PNG，然後追加指令「改成圓餅圖」試試看圖表類型切換。',
    checklist: [
      'Codex 成功讀取資料並產生 PNG 圖檔',
      '圖表的 X 軸和 Y 軸標籤正確顯示',
      '圖檔已儲存在同一個資料夾中',
      '我嘗試追加指令改變圖表類型（長條圖／折線圖／圓餅圖）',
    ],
  },
  {
    id: 7,
    title: '讓 Codex 在多份文件中搜尋關鍵字',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 跨多個資料夾搜尋包含特定關鍵字的檔案，並列出檔名與對應句子。',
    context: '合約快到期了，但不記得放在哪個資料夾？讓 Codex 幫你掃描工作資料夾裡所有文件，找出包含「合約到期」、「需要更新」等關鍵字的段落，省去一個一個打開檢查的時間。只要把工作資料夾在 VS Code 開啟，Codex 就能進行跨檔案搜尋。',
    examplePrompt: `（在 VS Code 開啟你的工作資料夾，Agent 模式輸入：）

請在目前資料夾（含所有子資料夾）中，
搜尋所有 .docx 和 .txt 檔案，
找出包含「合約到期」這個詞的檔案，
列出：檔名、所在路徑、包含該詞的完整句子。`,
    exampleResponse: `✓ 已掃描 47 個檔案

搜尋結果（共 3 個檔案包含「合約到期」）：

📄 contracts/vendor_A_2025.docx
   路徑：D:/工作資料/contracts/vendor_A_2025.docx
   →「供應商 A 的合約到期日為 2026 年 8 月 31 日，需於 60 天前決定是否續約。」

📄 hr/employment_summary.txt
   路徑：D:/工作資料/hr/employment_summary.txt
   →「以下員工合約到期時間需注意：陳○○（2026/07）、林○○（2026/09）。」

📄 admin/2026_Q1_review.docx
   路徑：D:/工作資料/admin/2026_Q1_review.docx
   →「IT 設備租賃合約到期後需重新議價，預算已列入 Q3 規劃。」`,
    task: '在你的工作資料夾中搜尋一個常用關鍵字（例如公司名稱、專案名稱、特定日期），讓 Codex 找出所有相關段落，確認結果正確後再試一個不同的關鍵字。',
    checklist: [
      'Codex 成功跨資料夾掃描所有 .docx/.txt 檔案',
      '搜尋結果列出了檔名和完整路徑',
      '搜尋結果包含包含關鍵字的完整句子',
      '我搜尋了第二個關鍵字確認功能正常',
    ],
  },
  {
    id: 8,
    title: '讓 Codex 彙整多份報告成一份摘要',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 讀取資料夾內所有報告，提取指定段落，合併成一份摘要文件。',
    context: '每個月各部門各自交一份週報，你需要整合成一份給主管的總結報告。以前要一份一份打開、複製、整理；現在在 Codex 說清楚你要提取哪個段落，Codex 自動讀完所有檔案，把「本週重點」或「結論」段落彙整成一份新文件存下來。',
    examplePrompt: `（在 VS Code 開啟包含 reports 資料夾的工作目錄，Agent 模式輸入：）

請讀取 reports 資料夾中所有的 .docx 檔案，
把每份報告的「本週重點」段落提取出來，
格式如下：
【檔名（不含副檔名）】
提取的內容

全部合併後儲存為 weekly_summary.docx 在同一資料夾中。`,
    exampleResponse: `✓ 已讀取 reports/ 資料夾中 6 份報告

✓ 已建立 weekly_summary.docx，包含：

【業務部週報_0603】
本週新開發客戶 3 家，預計下週完成 2 份合約簽署。

【財務部週報_0603】
Q2 費用核銷截止日為 6/15，請各部門確認送件。

【人資部週報_0603】
新進員工 2 名已完成報到，教育訓練安排至 6/20。

（以下略）`,
    task: '建立一個 reports 資料夾，放入至少 3 份有「本週重點」或「結論」段落的 Word 文件，讓 Codex 自動彙整成 weekly_summary.docx，然後打開確認內容正確。',
    checklist: [
      'Codex 成功讀取 reports 資料夾中所有 .docx 檔案',
      '每份報告的指定段落都被正確提取',
      '輸出的 weekly_summary.docx 格式清晰、段落標題正確',
      '我確認彙整內容與各報告原文一致，沒有遺漏',
    ],
  },
  {
    id: 9,
    title: '讓 Codex 批次重新命名檔案',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 將資料夾中的多個檔案依照統一規則批次重新命名。',
    context: '從相機或手機下載的照片、掃描的文件，檔名常常是亂碼或流水號。在 Codex 對話框描述你想要的命名規則，Codex 會先列出所有原檔名和新檔名讓你確認，確認後才執行重新命名，安全又不怕出錯。',
    examplePrompt: `（在 VS Code 開啟包含 photos 資料夾的目錄，Agent 模式輸入：）

請把 photos 資料夾中所有 .jpg 和 .png 檔案，
依照「YYYY-MM-DD_序號」的格式重新命名，
日期用今天的日期，序號從 001 開始，不足三位補零。
執行前先列出原檔名和新檔名讓我確認，確認後再執行重新命名。`,
    exampleResponse: `✓ 找到 photos/ 資料夾中 8 個圖片檔案

預計重新命名如下（請確認後輸入「確認執行」）：
  IMG_4521.jpg  →  2026-06-09_001.jpg
  IMG_4522.jpg  →  2026-06-09_002.jpg
  DSC_0034.jpg  →  2026-06-09_003.jpg
  IMG_0102.png  →  2026-06-09_004.png
  （共 8 筆...）

[你輸入：確認執行]

✓ 已完成重新命名，8 個檔案處理完畢。`,
    task: '建立一個資料夾，放入至少 5 個名稱雜亂的圖片或文件，讓 Codex 先預覽重新命名結果、確認後執行。再試試看換一個不同的命名規則。',
    checklist: [
      'Codex 先列出原檔名和新檔名讓我預覽',
      '我確認無誤後輸入「確認執行」，Codex 才開始重新命名',
      '所有檔案都依照指定格式命名完成',
      '我嘗試了第二種命名規則（例如加上部門名稱前綴）',
    ],
  },
  {
    id: 10,
    title: '讓 Codex 整理資料夾結構',
    difficulty: 'intermediate',
    objective: '讓 Codex Agent 掃描指定資料夾，依照副檔名自動建立子資料夾並分類移動檔案。',
    context: '桌面或下載資料夾堆滿了各種檔案？在 Codex 對話框告訴它你的分類規則，Codex 會先告訴你會移動幾個檔案、建立哪些子資料夾，確認後才執行。資料夾瞬間整齊清爽，日後也方便搜尋。建議先在測試資料夾練習，熟悉後再用在真實工作資料夾。',
    examplePrompt: `（在 VS Code 開啟包含混亂檔案的資料夾，Agent 模式輸入：）

請掃描目前資料夾中的檔案（只處理最上層，不進入子資料夾），
依照以下規則建立子資料夾並移動檔案：
- .pdf → PDF文件/
- .docx, .doc → Word文件/
- .xlsx, .xls → Excel試算表/
- .jpg, .png, .jpeg → 圖片/
- .pptx, .ppt → 簡報/
- 其他格式 → 其他檔案/

執行前先告訴我會移動幾個檔案，確認後再執行。`,
    exampleResponse: `✓ 已掃描目前資料夾最上層

準備移動 34 個檔案（請確認後輸入「確認執行」）：
- PDF文件/：12 個 .pdf 檔案
- Word文件/：8 個 .docx 檔案
- Excel試算表/：6 個 .xlsx 檔案
- 圖片/：5 個圖片檔案
- 簡報/：3 個 .pptx 檔案
- 其他檔案/：0 個

[你輸入：確認執行]

✓ 已完成分類！建立 5 個子資料夾，移動 34 個檔案。`,
    task: '建立一個測試資料夾，放入各種不同格式的檔案（至少 10 個），讓 Codex 幫你依副檔名分類整理。觀察它如何處理你沒有預先定義格式的檔案。',
    checklist: [
      'Codex 正確掃描資料夾並告知將移動的檔案數量與分類',
      '我確認無誤後 Codex 才執行移動',
      '所有檔案都被移動到對應的子資料夾',
      '我確認沒有檔案遺失，並嘗試用自訂的分類規則再執行一次',
    ],
  },
]
