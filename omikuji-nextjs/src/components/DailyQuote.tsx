'use client'

import { motion } from 'framer-motion'
import { getTodayQuote, getRandomQuote, DailyQuote as DailyQuoteType } from '@/data/luckyItems'
import { useEffect, useState } from 'react'

export default function DailyQuote() {
  const [quote, setQuote] = useState<DailyQuoteType | null>(null)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    setQuote(getTodayQuote())
  }, [])

  const handleRandomQuote = async () => {
    setIsChanging(true)
    
    // アニメーション効果のための短い待機
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setQuote(getRandomQuote())
    setIsChanging(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'movie': return '🎬'
      case 'anime': return '🎌'
      case 'drama': return '📺'
      default: return '💭'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'movie': return '映画'
      case 'anime': return 'アニメ'
      case 'drama': return 'ドラマ'
      default: return ''
    }
  }

  if (!quote) return null

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 shadow-xl mb-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{
            rotate: isChanging ? [0, 360] : [0, 5, -5, 0],
            scale: isChanging ? [1, 1.3, 1] : [1, 1.1, 1]
          }}
          transition={{
            duration: isChanging ? 0.6 : 2,
            repeat: isChanging ? 0 : Infinity,
            repeatType: "reverse"
          }}
        >
          {getCategoryIcon(quote.category)}
        </motion.div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.h2
            className="text-2xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            今日の一言
          </motion.h2>
          
          <motion.button
            onClick={handleRandomQuote}
            disabled={isChanging}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {isChanging ? (
              <motion.div
                className="flex items-center space-x-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              >
                <span>🔄</span>
                <span>変更中...</span>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>🎲</span>
                <span>別の名言</span>
              </div>
            )}
          </motion.button>
        </div>

        <motion.div
          className="mb-4"
          key={quote.quote} // キーを追加してアニメーションをトリガー
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.blockquote
            className="text-lg text-gray-700 italic mb-3 leading-relaxed"
          >
            「{quote.quote}」
          </motion.blockquote>
          
          <motion.div className="flex flex-col items-center space-y-1">
            <motion.cite
              className="text-sm text-gray-600 font-medium"
            >
              - {quote.author}
            </motion.cite>
            
            <motion.div
              className="flex items-center space-x-2 text-xs text-gray-500"
            >
              <span className="bg-white/50 px-2 py-1 rounded-full">
                {getCategoryIcon(quote.category)} {getCategoryName(quote.category)}
              </span>
              <span className="bg-white/50 px-2 py-1 rounded-full">
                📽️ {quote.source}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}