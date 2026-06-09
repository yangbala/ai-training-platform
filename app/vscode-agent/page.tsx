'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const { progress, completedCount, totalCount } = useVSCodeProgress()

  useEffect(() => {
    if (!localStorage.getItem('aiplus-auth')) router.replace('/')
  }, [router])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  ← 返回首頁
                </Link>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                💻 VS Code Codex Agent 實戰
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                3 小時學會用 AI Agent 處理日常行政工作
              </p>
            </div>
          </div>
          <ProgressBar completed={completedCount} total={totalCount} />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* 安裝提示 */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-yellow-800 text-sm">
          ⚠️ 開始前需要：VS Code + OpenAI Codex 擴充套件（用 ChatGPT 帳號登入，免 API Key）。
          從關卡 1 開始，裡面有完整的安裝步驟說明。
        </div>

        {/* 三個時段區塊 */}
        {HOUR_SECTIONS.map(section => (
          <section key={section.label}>
            <div className="flex items-center gap-2 mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-800">{section.label}</h2>
                <p className="text-sm text-gray-500">{section.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {section.ids
                .map(id => vsCodeSkills.find(s => s.id === id))
                .filter((s): s is typeof vsCodeSkills[0] => s !== undefined)
                .map(skill => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    progress={progress[skill.id] ?? { status: 'locked', checkedItems: [] }}
                    basePath="/vscode-agent/skill"
                  />
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400">
        完成全部 10 個關卡，成為 AI 行政自動化達人！
      </footer>
    </main>
  )
}
