'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProgressMap, SkillProgress } from '@/types'
import { vsCodeSkills } from '@/data/vscode-skills'

const STORAGE_KEY = 'vscode-progress'
const TOTAL = vsCodeSkills.length

function buildInitial(): ProgressMap {
  return vsCodeSkills.reduce<ProgressMap>((acc, skill, i) => {
    acc[skill.id] = {
      status: i === 0 ? 'unlocked' : 'locked',
      checkedItems: Array(skill.checklist.length).fill(false),
    }
    return acc
  }, {})
}

export function useVSCodeProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => {
    if (typeof window === 'undefined') return buildInitial()
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : buildInitial()
    } catch {
      return buildInitial()
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const toggleCheckItem = useCallback((skillId: number, index: number) => {
    setProgress(prev => {
      const current = prev[skillId]
      const checkedItems = [...current.checkedItems]
      checkedItems[index] = !checkedItems[index]
      return { ...prev, [skillId]: { ...current, checkedItems } }
    })
  }, [])

  const completeSkill = useCallback((skillId: number) => {
    setProgress(prev => {
      const updated = { ...prev, [skillId]: { ...prev[skillId], status: 'completed' as const } }
      const nextSkill = vsCodeSkills.find(s => s.id === skillId + 1)
      if (nextSkill && updated[nextSkill.id]?.status === 'locked') {
        updated[nextSkill.id] = { ...updated[nextSkill.id], status: 'unlocked' }
      }
      return updated
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(buildInitial())
  }, [])

  const completedCount = Object.values(progress).filter(p => p.status === 'completed').length

  return { progress, toggleCheckItem, completeSkill, resetProgress, completedCount, totalCount: TOTAL }
}
