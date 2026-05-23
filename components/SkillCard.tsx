import Link from 'next/link'
import { Skill } from '@/types'
import { SkillProgress } from '@/types'

interface SkillCardProps {
  skill: Skill
  progress: SkillProgress
}

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

export default function SkillCard({ skill, progress }: SkillCardProps) {
  const { status } = progress
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'

  const cardBase =
    'relative rounded-xl border-2 p-4 flex flex-col gap-2 transition-all duration-200'
  const cardStyle = isCompleted
    ? `${cardBase} border-green-400 bg-green-50 hover:shadow-md`
    : isLocked
    ? `${cardBase} border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed`
    : `${cardBase} border-blue-400 bg-white hover:shadow-lg hover:-translate-y-0.5 cursor-pointer`

  const content = (
    <div className={cardStyle}>
      {/* Status icon */}
      <div className="absolute top-3 right-3 text-lg">
        {isCompleted ? '✅' : isLocked ? '🔒' : '🔓'}
      </div>

      {/* Skill number */}
      <span className="text-xs text-gray-400 font-medium">關卡 {skill.id}</span>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 leading-snug pr-6">
        {skill.title}
      </h3>

      {/* Difficulty badge */}
      <span
        className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[skill.difficulty]}`}
      >
        {difficultyLabel[skill.difficulty]}
      </span>

      {/* Checklist progress for unlocked */}
      {!isLocked && !isCompleted && (
        <p className="text-xs text-blue-500 mt-1">點擊開始學習 →</p>
      )}
      {isCompleted && (
        <p className="text-xs text-green-600 mt-1 font-medium">已完成</p>
      )}
    </div>
  )

  if (isLocked) return content

  return <Link href={`/skill/${skill.id}`}>{content}</Link>
}
