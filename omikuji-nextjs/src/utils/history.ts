import { OmikujiType, OmikujiResult } from '@/data/omikujiData'

export interface OmikujiHistory {
  id: string
  date: string
  type: OmikujiType
  result: OmikujiResult
  timestamp: number
}

const STORAGE_KEY = 'omikuji-history'

// 履歴を保存する
export const saveOmikujiHistory = (type: OmikujiType, result: OmikujiResult): void => {
  if (typeof window === 'undefined') return

  const history: OmikujiHistory = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('ja-JP'),
    type,
    result,
    timestamp: Date.now()
  }

  const existingHistory = getOmikujiHistory()
  const newHistory = [history, ...existingHistory].slice(0, 50) // 最新50件まで保存

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
}

// 履歴を取得する
export const getOmikujiHistory = (): OmikujiHistory[] => {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('履歴の取得に失敗しました:', error)
    return []
  }
}

// 履歴をクリアする
export const clearOmikujiHistory = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

// 今日の履歴を取得する
export const getTodayHistory = (): OmikujiHistory[] => {
  const today = new Date().toLocaleDateString('ja-JP')
  return getOmikujiHistory().filter(item => item.date === today)
}

// 特定の日付の履歴を取得する
export const getHistoryByDate = (date: string): OmikujiHistory[] => {
  return getOmikujiHistory().filter(item => item.date === date)
}