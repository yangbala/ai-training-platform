export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  id: number
  title: string
  difficulty: Difficulty
  objective: string
  context: string
  examplePrompt: string
  exampleResponse: string
  task: string
  checklist: string[]
}

export interface SkillProgress {
  status: 'locked' | 'unlocked' | 'completed'
  checkedItems: boolean[]
}

export type ProgressMap = Record<number, SkillProgress>
