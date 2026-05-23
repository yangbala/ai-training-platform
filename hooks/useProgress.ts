'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProgressMap, SkillProgress } from '@/types'
import { skills } from '@/data/skills'

const STORAGE_KEY = 'ai-skills-progress'

function buildDefaultProgress(): ProgressMap {
  const map: ProgressMap = {}
  skills.forEach((skill, index) => {
    map[skill.id] = {
      status: index === 0 ? 'unlocked' : 'locked',
      checkedItems: new Array(skill.checklist.length).fill(false),
    }
  })
  return map
}

function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return buildDefaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildDefaultProgress()
    const parsed = JSON.parse(raw) as ProgressMap
    // Ensure all skills have entries (handles new skills added later)
    const defaults = buildDefaultProgress()
    skills.forEach((skill) => {
      if (!parsed[skill.id]) {
        parsed[skill.id] = defaults[skill.id]
      }
    })
    return parsed
  } catch {
    return buildDefaultProgress()
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(buildDefaultProgress)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  const saveProgress = useCallback((next: ProgressMap) => {
    setProgress(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const toggleCheckItem = useCallback(
    (skillId: number, itemIndex: number) => {
      setProgress((prev) => {
        const entry = prev[skillId]
        if (!entry || entry.status === 'locked') return prev
        const checkedItems = [...entry.checkedItems]
        checkedItems[itemIndex] = !checkedItems[itemIndex]
        const next = { ...prev, [skillId]: { ...entry, checkedItems } }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    []
  )

  const completeSkill = useCallback(
    (skillId: number) => {
      setProgress((prev) => {
        const entry = prev[skillId]
        if (!entry || entry.status !== 'unlocked') return prev

        const next: ProgressMap = {
          ...prev,
          [skillId]: { ...entry, status: 'completed' },
        }

        // Unlock the next skill
        const currentIndex = skills.findIndex((s) => s.id === skillId)
        if (currentIndex !== -1 && currentIndex + 1 < skills.length) {
          const nextSkill = skills[currentIndex + 1]
          if (next[nextSkill.id]?.status === 'locked') {
            next[nextSkill.id] = {
              ...next[nextSkill.id],
              status: 'unlocked',
            }
          }
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    []
  )

  const resetProgress = useCallback(() => {
    const fresh = buildDefaultProgress()
    saveProgress(fresh)
  }, [saveProgress])

  const completedCount = Object.values(progress).filter(
    (p) => p.status === 'completed'
  ).length

  return {
    progress,
    toggleCheckItem,
    completeSkill,
    resetProgress,
    completedCount,
    totalCount: skills.length,
  }
}
