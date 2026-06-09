'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { vsCodeSkills } from '@/data/vscode-skills'
import { useVSCodeProgress } from '@/hooks/useVSCodeProgress'
import SkillContent from '@/components/SkillContent'

const INSTALL_REMINDER = (
  <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6 text-yellow-200 text-sm">
    ⚠️ 此關需要：已安裝 VS Code（繁體中文介面）及 OpenAI Codex CLI。
    若尚未安裝，請先完成關卡 1。
  </div>
)

export default function VSCodeSkillPage() {
  const { id } = useParams()
  const router = useRouter()
  const skillId = Number(id)
  const skill = vsCodeSkills.find(s => s.id === skillId)
  const { progress, toggleCheckItem, completeSkill } = useVSCodeProgress()

  if (!skill) return <div className="text-white p-10">找不到此關卡</div>

  const skillProgress = progress[skillId]

  if (skillProgress?.status === 'locked') {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link href="/vscode-agent" className="text-gray-400 text-sm hover:text-white mb-6 inline-block">
            ← 返回模組首頁
          </Link>
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-xl font-bold mb-2">此關卡尚未解鎖</h2>
            <p className="text-gray-400 text-sm">請先完成上一個關卡，才能解鎖此關。</p>
          </div>
        </div>
      </div>
    )
  }

  if (!skillProgress) return null

  const handleComplete = () => {
    completeSkill(skillId)
    const next = vsCodeSkills.find(s => s.id === skillId + 1)
    if (next) router.push(`/vscode-agent/skill/${next.id}`)
    else router.push('/vscode-agent')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <Link href="/vscode-agent" className="text-gray-400 text-sm hover:text-white mb-6 inline-block">
          ← 返回模組首頁
        </Link>

        {skillId <= 2 && INSTALL_REMINDER}

        <SkillContent
          skill={skill}
          checked={skillProgress.checkedItems}
          status={skillProgress.status}
          onToggle={(index) => toggleCheckItem(skillId, index)}
          onComplete={handleComplete}
        />

        {/* 上下關導航 */}
        <div className="flex justify-between mt-8">
          {skillId > 1 && (
            <Link href={`/vscode-agent/skill/${skillId - 1}`}
              className="text-gray-400 hover:text-white text-sm">
              ← 上一關
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
