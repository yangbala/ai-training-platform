'use client'

import Link from 'next/link'
import { vsCodeSkills } from '@/data/vscode-skills'
import { useVSCodeProgress } from '@/hooks/useVSCodeProgress'
import SkillCard from '@/components/SkillCard'
import ProgressBar from '@/components/ProgressBar'

const HOUR_SECTIONS = [
  { label: '第一小時：使用環境建置', desc: '安裝工具、熟悉 Codex Agent 介面（約 60 分鐘）', ids: [1, 2] },
  { label: '第二小時：基礎資料操作', desc: '讀取檔案、整理 Excel、產生圖表（約 60 分鐘）', ids: [3, 4, 5, 6] },
  { label: '第三小時：進階批次操作', desc: '跨檔搜尋、彙整報告、批次自動化（約 60 分鐘）', ids: [7, 8, 9, 10] },
]

export default function VSCodeAgentPage() {
  const { progress, completedCount, totalCount } = useVSCodeProgress()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* 標題區 */}
        <div className="mb-8">
          <Link href="/" className="text-gray-400 text-sm hover:text-white mb-4 inline-block">
            ← 返回首頁
          </Link>
          <h1 className="text-3xl font-bold mb-2">VS Code Codex Agent 實戰</h1>
          <p className="text-gray-400">學會用 AI Agent 處理日常行政工作，3 小時從安裝到實戰</p>
        </div>

        {/* 整體進度 */}
        <div className="mb-10">
          <ProgressBar completed={completedCount} total={totalCount} />
        </div>

        {/* 安裝提示 */}
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-8 text-yellow-200 text-sm">
          ⚠️ 開始前需要：VS Code（繁體中文介面）+ OpenAI API Key。
          從關卡 1 開始，裡面有完整的安裝說明。
        </div>

        {/* 三個時段區塊 */}
        {HOUR_SECTIONS.map(section => (
          <section key={section.label} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-300 mb-1">{section.label}</h2>
            <p className="text-sm text-gray-500 mb-4">{section.desc}</p>
            <div className="grid gap-4">
              {vsCodeSkills
                .filter(s => section.ids.includes(s.id))
                .map(skill => (
                  <SkillCard key={skill.id} skill={skill} progress={progress[skill.id]} basePath="/vscode-agent/skill" />
                ))}
            </div>
          </section>
        ))}

      </div>
    </div>
  )
}
