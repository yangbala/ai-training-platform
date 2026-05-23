'use client'

import { useParams, useRouter, notFound } from 'next/navigation'
import Link from 'next/link'
import { skills } from '@/data/skills'
import { useProgress } from '@/hooks/useProgress'
import SkillContent from '@/components/SkillContent'

const difficultyLabel: Record<string, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '進階',
}

const difficultyColor: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-orange-100 text-orange-700',
  advanced: 'bg-purple-100 text-purple-700',
}

export default function SkillPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const skill = skills.find((s) => s.id === id)
  const { progress, toggleCheckItem, completeSkill } = useProgress()

  if (!skill) return notFound()

  const skillProgress = progress[skill.id]
  if (!skillProgress) return null

  if (skillProgress.status === 'locked') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-md">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">關卡尚未解鎖</h2>
          <p className="text-gray-500 mb-6">請先完成前一個關卡，才能進入此關卡。</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            回到關卡地圖
          </Link>
        </div>
      </main>
    )
  }

  const prevSkill = skills.find((s) => s.id === id - 1)
  const nextSkill = skills.find((s) => s.id === id + 1)
  const nextProgress = nextSkill ? progress[nextSkill.id] : null

  const handleComplete = () => {
    completeSkill(skill.id)
    if (nextSkill) {
      setTimeout(() => router.push(`/skill/${nextSkill.id}`), 300)
    } else {
      setTimeout(() => router.push('/'), 300)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Previous */}
          {prevSkill ? (
            <Link
              href={`/skill/${prevSkill.id}`}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
            >
              ← 關卡 {prevSkill.id}
            </Link>
          ) : (
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← 返回首頁
            </Link>
          )}

          {/* Center: title */}
          <div className="text-center">
            <p className="text-xs text-gray-400">
              關卡 {skill.id} / {skills.length}
            </p>
            <p className="text-sm font-semibold text-gray-800 max-w-[180px] truncate">
              {skill.title}
            </p>
          </div>

          {/* Next */}
          {nextSkill && nextProgress && nextProgress.status !== 'locked' ? (
            <Link
              href={`/skill/${nextSkill.id}`}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
            >
              關卡 {nextSkill.id} →
            </Link>
          ) : (
            <span className="text-sm text-gray-300">
              {nextSkill ? `關卡 ${nextSkill.id} 🔒` : '最終關卡'}
            </span>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Skill header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[skill.difficulty]}`}
            >
              {difficultyLabel[skill.difficulty]}
            </span>
            <span className="text-xs text-gray-400">關卡 {skill.id} / {skills.length}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{skill.title}</h1>
        </div>

        <SkillContent
          skill={skill}
          checked={skillProgress.checkedItems}
          status={skillProgress.status}
          onToggle={(i) => toggleCheckItem(skill.id, i)}
          onComplete={handleComplete}
        />

        {/* Back to map */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← 返回關卡地圖
          </Link>
        </div>
      </div>
    </main>
  )
}
