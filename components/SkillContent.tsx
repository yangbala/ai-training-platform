'use client'

import { useState } from 'react'
import { Skill } from '@/types'
import Checklist from './Checklist'

interface SkillContentProps {
  skill: Skill
  checked: boolean[]
  status: 'unlocked' | 'completed'
  onToggle: (index: number) => void
  onComplete: () => void
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
    >
      {copied ? '✓ 已複製' : '複製 Prompt'}
    </button>
  )
}

export default function SkillContent({
  skill,
  checked,
  status,
  onToggle,
  onComplete,
}: SkillContentProps) {
  const [showExample, setShowExample] = useState(false)
  const allChecked = checked.every(Boolean)
  const isCompleted = status === 'completed'

  return (
    <div className="space-y-8">
      {/* 學習目標 */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-500 mb-2">
          🎯 學習目標
        </h2>
        <p className="text-gray-800 font-medium text-xl leading-relaxed">
          {skill.objective}
        </p>
      </section>

      {/* 情境說明 */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
          📖 為什麼這個技能重要
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">{skill.context}</p>
      </section>

      {/* 示範 Prompt */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            💡 示範 Prompt
          </h2>
          <CopyButton text={skill.examplePrompt} />
        </div>
        <pre className="whitespace-pre-wrap text-base bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 leading-relaxed font-sans">
          {skill.examplePrompt}
        </pre>
      </section>

      {/* AI 回應範例（可展開） */}
      <section>
        <button
          onClick={() => setShowExample((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700 transition-colors"
        >
          <span>✅ AI 回應範例</span>
          <span className="text-base">{showExample ? '▲' : '▼'}</span>
        </button>
        {showExample && (
          <pre className="mt-2 whitespace-pre-wrap text-base bg-green-50 border border-green-200 rounded-xl p-4 text-gray-700 leading-relaxed font-sans">
            {skill.exampleResponse}
          </pre>
        )}
      </section>

      {/* 實作任務 */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
          🏋️ 實作任務
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p className="text-gray-700 text-lg leading-relaxed">{skill.task}</p>
        </div>
      </section>

      {/* 自評清單 */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
          📋 自評清單
        </h2>
        {isCompleted ? (
          <div className="space-y-3">
            {skill.checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 flex-shrink-0 rounded bg-green-500 border-2 border-green-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-base text-gray-400 line-through leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <Checklist items={skill.checklist} checked={checked} onToggle={onToggle} />
        )}
      </section>

      {/* 完成按鈕 */}
      {!isCompleted && (
        <section className="pt-2">
          <button
            onClick={onComplete}
            disabled={!allChecked}
            className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 ${
              allChecked
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allChecked ? '完成此關卡，解鎖下一關 →' : `請先完成所有自評項目（${checked.filter(Boolean).length}/${checked.length}）`}
          </button>
        </section>
      )}

      {isCompleted && (
        <section className="pt-2">
          <div className="w-full py-4 rounded-xl bg-green-100 text-green-700 font-semibold text-base text-center">
            ✅ 此關卡已完成！
          </div>
        </section>
      )}
    </div>
  )
}
