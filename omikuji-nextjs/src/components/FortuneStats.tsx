'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getOmikujiHistory } from '@/utils/history'

interface StatData {
  level: string
  count: number
  percentage: number
  color: string
}

export default function FortuneStats() {
  const [isOpen, setIsOpen] = useState(false)
  const [stats, setStats] = useState<StatData[]>([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if (isOpen) {
      calculateStats()
    }
  }, [isOpen])

  const calculateStats = () => {
    const history = getOmikujiHistory()
    const levelCounts: { [key: string]: number } = {}
    
    // 運勢レベルごとにカウント
    history.forEach(item => {
      const level = item.result.level
      levelCounts[level] = (levelCounts[level] || 0) + 1
    })

    const total = history.length
    setTotalCount(total)

    // 統計データを作成
    const statsData: StatData[] = Object.entries(levelCounts).map(([level, count]) => ({
      level,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      color: getLevelColor(level)
    })).sort((a, b) => b.count - a.count)

    setStats(statsData)
  }

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      '大吉': 'bg-red-500',
      '超大吉': 'bg-yellow-500',
      '神吉': 'bg-purple-500',
      '黄金吉': 'bg-yellow-600',
      '中吉': 'bg-blue-500',
      '小吉': 'bg-green-500',
      '吉': 'bg-teal-500',
      '末吉': 'bg-pink-500',
      '凶': 'bg-gray-500'
    }
    return colors[level] || 'bg-gray-400'
  }

  const getRecentTrend = () => {
    const history = getOmikujiHistory()
    const recent = history.slice(-7) // 最近7回
    const goodLevels = ['大吉', '超大吉', '神吉', '黄金吉', '中吉', '小吉', '吉']
    const goodCount = recent.filter(item => goodLevels.includes(item.result.level)).length
    
    if (goodCount >= 5) return { text: '絶好調！', emoji: '🔥', color: 'text-red-500' }
    if (goodCount >= 3) return { text: '好調', emoji: '✨', color: 'text-green-500' }
    if (goodCount >= 1) return { text: '普通', emoji: '😊', color: 'text-blue-500' }
    return { text: '要注意', emoji: '💪', color: 'text-gray-500' }
  }

  const trend = getRecentTrend()

  return (
    <>
      {/* 統計ボタン */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        📊
      </motion.button>

      {/* 統計モーダル */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  📊 運勢統計ダッシュボード
                </h2>
                <p className="text-gray-600">
                  あなたの運勢の傾向を分析します
                </p>
              </div>

              {totalCount === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎋</div>
                  <p className="text-gray-500 text-lg">
                    まだおみくじを引いていません
                  </p>
                  <p className="text-gray-400 text-sm">
                    おみくじを引いて統計を確認しましょう！
                  </p>
                </div>
              ) : (
                <>
                  {/* 概要統計 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.div
                      className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {totalCount}
                      </div>
                      <div className="text-sm text-gray-600">総おみくじ回数</div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-2xl mb-2">
                        <span className={trend.color}>{trend.emoji}</span>
                      </div>
                      <div className={`text-lg font-bold ${trend.color} mb-1`}>
                        {trend.text}
                      </div>
                      <div className="text-sm text-gray-600">最近の調子</div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-2xl font-bold text-orange-600 mb-2">
                        {stats.length > 0 ? stats[0].level : '-'}
                      </div>
                      <div className="text-sm text-gray-600">最多の運勢</div>
                    </motion.div>
                  </div>

                  {/* 運勢分布グラフ */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      🎯 運勢分布
                    </h3>
                    <div className="space-y-3">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.level}
                          className="flex items-center space-x-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <div className="w-16 text-sm font-medium text-gray-700">
                            {stat.level}
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                            <motion.div
                              className={`h-full ${stat.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.percentage}%` }}
                              transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                              {stat.count}回 ({stat.percentage.toFixed(1)}%)
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* アドバイス */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h4 className="text-lg font-bold text-purple-700 mb-2">
                      💡 運勢アドバイス
                    </h4>
                    <p className="text-purple-600 text-sm">
                      {trend.text === '絶好調！' && '素晴らしい運気の流れです！この調子で積極的に行動しましょう。'}
                      {trend.text === '好調' && '良い運気が続いています。新しいことにチャレンジするのに良い時期です。'}
                      {trend.text === '普通' && '安定した運気です。地道な努力が実を結ぶでしょう。'}
                      {trend.text === '要注意' && '運気が低迷気味です。無理をせず、準備期間と考えて過ごしましょう。'}
                    </p>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}