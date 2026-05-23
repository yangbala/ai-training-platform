'use client'

import { skills } from '@/data/skills'
import { useProgress } from '@/hooks/useProgress'
import SkillCard from '@/components/SkillCard'
import ProgressBar from '@/components/ProgressBar'

const sectionConfig = [
  { difficulty: 'beginner', label: '初級', emoji: '🌱', desc: '基本文字處理（關卡 1-8）' },
  { difficulty: 'intermediate', label: '中級', emoji: '📋', desc: '文件製作與資料整理（關卡 9-20）' },
  { difficulty: 'advanced', label: '進階', emoji: '🚀', desc: '策略、創作與系統化應用（關卡 21-30）' },
]

export default function HomePage() {
  const { progress, completedCount, totalCount, resetProgress } = useProgress()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                🤖 AI 行政技能 30 關挑戰
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                學會 AI 工具，讓每天的辦公室工作更輕鬆
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('確定要重置所有進度嗎？此操作無法復原。')) {
                  resetProgress()
                }
              }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-300"
            >
              重置進度
            </button>
          </div>
          <ProgressBar completed={completedCount} total={totalCount} />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {sectionConfig.map(({ difficulty, label, emoji, desc }) => {
          const sectionSkills = skills.filter((s) => s.difficulty === difficulty)
          return (
            <section key={difficulty}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{emoji}</span>
                <div>
                  <h2 className="text-base font-bold text-gray-800">{label}</h2>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {sectionSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    progress={progress[skill.id] ?? { status: 'locked', checkedItems: [] }}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400">
        完成所有 30 個關卡，成為 AI 行政達人！
      </footer>
    </main>
  )
}
