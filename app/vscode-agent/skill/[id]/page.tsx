'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { vsCodeSkills } from '@/data/vscode-skills'
import { useVSCodeProgress } from '@/hooks/useVSCodeProgress'
import SkillContent from '@/components/SkillContent'

const INSTALL_STEPS = [
  {
    num: 1,
    icon: '💻',
    title: '下載並安裝 VS Code',
    steps: [
      '前往 code.visualstudio.com',
      '點擊「Download for Windows」下載安裝檔',
      '執行安裝程式，一路點「下一步」完成安裝',
    ],
  },
  {
    num: 2,
    icon: '🌐',
    title: '設定繁體中文介面',
    steps: [
      '開啟 VS Code，按 Ctrl + Shift + P',
      '在命令面板輸入「Configure Display Language」',
      '從清單選擇「zh-tw（中文（繁體））」',
      '點擊「重新啟動」讓語言生效',
    ],
  },
  {
    num: 3,
    icon: '🔌',
    title: '安裝 OpenAI Codex 擴充套件',
    steps: [
      '點擊左側欄位的「擴充套件」圖示（四個方塊）',
      '在搜尋欄輸入「OpenAI」',
      '找到帶有黑底白色 OpenAI logo 的官方套件',
      '點擊「安裝」按鈕',
    ],
  },
  {
    num: 4,
    icon: '🔑',
    title: '用 ChatGPT 帳號登入',
    steps: [
      '安裝完成後，左側會出現 Codex 圖示',
      '點擊 Codex 圖示，選擇「Sign in with ChatGPT」',
      '瀏覽器會跳出 OpenAI 的授權頁面，登入你的 ChatGPT 帳號',
      '授權完成後回到 VS Code，即可看到 Codex 聊天面板',
    ],
  },
]

function InstallGuide() {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-500 mb-4">
        🛠️ 安裝步驟
      </h2>
      <div className="space-y-3">
        {INSTALL_STEPS.map(({ num, icon, title, steps }) => (
          <div key={num} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {num}
              </div>
              <span className="text-lg">{icon}</span>
              <h3 className="font-semibold text-gray-800">{title}</h3>
            </div>
            <ul className="space-y-1.5 pl-10">
              {steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
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

export default function VSCodeSkillPage() {
  const { id } = useParams()
  const router = useRouter()
  const skillId = Number(id)
  const skill = vsCodeSkills.find(s => s.id === skillId)
  const { progress, toggleCheckItem, completeSkill } = useVSCodeProgress()

  useEffect(() => {
    if (!localStorage.getItem('aiplus-auth')) router.replace('/')
  }, [router])

  if (!skill) return <div className="text-gray-800 p-10">找不到此關卡</div>

  const skillProgress = progress[skillId]

  if (skillProgress?.status === 'locked') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-md">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">關卡尚未解鎖</h2>
          <p className="text-gray-500 mb-6">請先完成前一個關卡，才能進入此關卡。</p>
          <Link
            href="/vscode-agent"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            回到關卡地圖
          </Link>
        </div>
      </main>
    )
  }

  if (!skillProgress) return null

  const prevSkill = vsCodeSkills.find(s => s.id === skillId - 1)
  const nextSkill = vsCodeSkills.find(s => s.id === skillId + 1)

  const handleComplete = () => {
    completeSkill(skillId)
    if (nextSkill) router.push(`/vscode-agent/skill/${nextSkill.id}`)
    else router.push('/vscode-agent')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          {prevSkill ? (
            <Link
              href={`/vscode-agent/skill/${prevSkill.id}`}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← 關卡 {prevSkill.id}
            </Link>
          ) : (
            <Link
              href="/vscode-agent"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← 返回模組
            </Link>
          )}

          <div className="text-center">
            <p className="text-xs text-gray-400">關卡 {skillId} / {vsCodeSkills.length}</p>
            <p className="text-sm font-semibold text-gray-800 max-w-[180px] truncate">
              {skill.title}
            </p>
          </div>

          {nextSkill ? (
            <Link
              href={`/vscode-agent/skill/${nextSkill.id}`}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              關卡 {nextSkill.id} →
            </Link>
          ) : (
            <span className="text-sm text-gray-300">最終關卡</span>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Skill header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[skill.difficulty]}`}>
              {difficultyLabel[skill.difficulty]}
            </span>
            <span className="text-xs text-gray-400">關卡 {skillId} / {vsCodeSkills.length}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{skill.title}</h1>
        </div>

        {skillId === 1 && <InstallGuide />}

        <SkillContent
          skill={skill}
          checked={skillProgress.checkedItems}
          status={skillProgress.status}
          onToggle={(index) => toggleCheckItem(skillId, index)}
          onComplete={handleComplete}
        />

        {/* Back to map */}
        <div className="mt-10 text-center">
          <Link
            href="/vscode-agent"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← 返回關卡地圖
          </Link>
        </div>
      </div>
    </main>
  )
}
