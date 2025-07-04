'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getOmikujiHistory, clearOmikujiHistory, OmikujiHistory } from '@/utils/history'
import { omikujiData } from '@/data/omikujiData'

export default function OmikujiHistoryComponent() {
  const [history, setHistory] = useState<OmikujiHistory[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    setHistory(getOmikujiHistory())
  }, [])

  const handleClearHistory = () => {
    clearOmikujiHistory()
    setHistory([])
    setShowConfirm(false)
  }

  const refreshHistory = () => {
    setHistory(getOmikujiHistory())
  }

  // 外部から履歴を更新するためのグローバル関数を設定
  useEffect(() => {
    (window as any).refreshOmikujiHistory = refreshHistory
    return () => {
      delete (window as any).refreshOmikujiHistory
    }
  }, [])

  const getLevelColor = (level: string) => {
    switch (level) {
      case '大吉': return 'text-red-600 bg-red-100'
      case '吉': return 'text-orange-600 bg-orange-100'
      case '中吉': return 'text-yellow-600 bg-yellow-100'
      case '小吉': return 'text-green-600 bg-green-100'
      case '凶': return 'text-gray-600 bg-gray-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📜</span>
          <span className="hidden md:inline font-medium">履歴</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">📜 おみくじ履歴</h2>
                <div className="flex space-x-2">
                  {history.length > 0 && (
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                    >
                      クリア
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                  >
                    閉じる
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[60vh]">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">🎋</div>
                    <p>まだおみくじを引いていません</p>
                    <p className="text-sm mt-2">おみくじを引くと、ここに履歴が表示されます</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{omikujiData[item.type].icon}</span>
                            <div>
                              <h3 className="font-bold text-gray-800">{omikujiData[item.type].name}</h3>
                              <p className="text-sm text-gray-600">{item.date}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getLevelColor(item.result.level)}`}>
                            {item.result.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.result.message}</p>
                        <p className="text-xs text-gray-600 mt-2 italic">{item.result.advice}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 削除確認ダイアログ */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">履歴を削除しますか？</h3>
              <p className="text-gray-600 mb-6">この操作は取り消せません。</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleClearHistory}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  削除
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}