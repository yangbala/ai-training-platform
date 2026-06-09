'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { skills } from '@/data/skills'
import { useProgress } from '@/hooks/useProgress'
import SkillCard from '@/components/SkillCard'
import ProgressBar from '@/components/ProgressBar'

const AUTH_KEY = 'aiplus-auth'
const CORRECT_CODE = 'AIPLUS2026'

const sectionConfig = [
  { difficulty: 'beginner', label: '初級', emoji: '🌱', desc: '基本文字處理（關卡 1-8）' },
  { difficulty: 'intermediate', label: '中級', emoji: '📋', desc: '文件製作與資料整理（關卡 9-20）' },
  { difficulty: 'advanced', label: '進階', emoji: '🚀', desc: '策略、創作與系統化應用（關卡 21-31）' },
]

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim().toUpperCase() === CORRECT_CODE) {
      localStorage.setItem(AUTH_KEY, '1')
      onLogin()
    } else {
      setError('驗證碼錯誤，請確認後重新輸入')
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-2xl font-bold text-gray-900">AI 行政技能挑戰</h1>
          <p className="text-gray-500 mt-2">請輸入驗證碼以進入課程</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError('') }}
              placeholder="輸入驗證碼"
              className={`w-full border-2 rounded-xl px-4 py-3 text-center text-xl tracking-[0.3em] uppercase text-black focus:outline-none transition-all ${
                error
                  ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                  : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
              } ${shaking ? 'animate-bounce' : ''}`}
              autoComplete="off"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-lg"
          >
            進入課程 →
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          AI 行政技能 31 關挑戰平台
        </p>
      </div>
    </main>
  )
}

function SkillPlatform({ onLogout }: { onLogout: () => void }) {
  const { progress, completedCount, totalCount, resetProgress } = useProgress()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                🤖 AI 行政技能 31 關挑戰
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                學會 AI 工具，讓每天的辦公室工作更輕鬆
              </p>
            </div>
            <div className="flex items-center gap-2">
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
              <button
                onClick={() => {
                  localStorage.removeItem(AUTH_KEY)
                  onLogout()
                }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-400"
              >
                登出
              </button>
            </div>
          </div>
          <ProgressBar completed={completedCount} total={totalCount} />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* 雙學習路徑入口 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="text-xs text-blue-400 font-semibold mb-1 uppercase tracking-wide">經典路線</div>
            <h3 className="text-lg font-bold mb-1">AI 行政技能 30 關挑戰</h3>
            <p className="text-gray-400 text-sm mb-4">用 ChatGPT / Claude 處理日常辦公任務</p>
            <a href="#skills" className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg">
              繼續挑戰 →
            </a>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-purple-700">
            <div className="text-xs text-purple-400 font-semibold mb-1 uppercase tracking-wide">新路線</div>
            <h3 className="text-lg font-bold mb-1">VS Code Codex Agent 實戰</h3>
            <p className="text-gray-400 text-sm mb-4">3 小時學會用 AI Agent 處理批次行政任務</p>
            <Link href="/vscode-agent" className="inline-block bg-purple-600 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded-lg">
              進入模組 →
            </Link>
          </div>
        </div>
        <div id="skills" />
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
        完成所有 31 個關卡，成為 AI 行政達人！
      </footer>
    </main>
  )
}

export default function HomePage() {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === '1')
  }, [])

  if (authed === null) return null

  if (!authed) {
    return <LoginPage onLogin={() => setAuthed(true)} />
  }

  return <SkillPlatform onLogout={() => setAuthed(false)} />
}
