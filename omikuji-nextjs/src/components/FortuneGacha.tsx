'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { OmikujiType, OmikujiResult, omikujiData } from '@/data/omikujiData'

interface FortuneGachaProps {
  type: OmikujiType
  onResult: (result: OmikujiResult) => void
}

export default function FortuneGacha({ type, onResult }: FortuneGachaProps) {
  const [gachaCount, setGachaCount] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showRareEffect, setShowRareEffect] = useState(false)
  const maxGacha = 3

  useEffect(() => {
    // ユーザー別の今日のガチャ回数をlocalStorageから取得
    const today = new Date().toDateString()
    const currentUser = localStorage.getItem('currentUser')
    const userId = currentUser ? JSON.parse(currentUser).id : 'guest'
    const gachaKey = `gachaData_${userId}`
    
    const savedData = localStorage.getItem(gachaKey)
    if (savedData) {
      const data = JSON.parse(savedData)
      if (data.date === today) {
        setGachaCount(data.count)
      } else {
        // 日付が変わったらリセット
        localStorage.setItem(gachaKey, JSON.stringify({ date: today, count: 0 }))
        setGachaCount(0)
      }
    } else {
      localStorage.setItem(gachaKey, JSON.stringify({ date: today, count: 0 }))
    }
  }, [])

  const performGacha = async () => {
    if (gachaCount >= maxGacha || isSpinning) return

    setIsSpinning(true)
    
    // ガチャアニメーション
    await new Promise(resolve => setTimeout(resolve, 2000))

    // レア運勢の確率計算
    const rareChance = Math.random()
    let selectedResult: OmikujiResult

    if (rareChance < 0.1) { // 10%の確率でレア運勢
      // 超大吉などのレア運勢
      const rareResults = [
        { level: '超大吉', levelClass: 'daikichi', message: '今日は奇跡的な一日になりそうです！何をやってもうまくいく最高の運勢です。', advice: '積極的に行動し、新しいことにチャレンジしてみましょう。' },
        { level: '神吉', levelClass: 'daikichi', message: '神様に愛されているような素晴らしい運勢です！', advice: '感謝の気持ちを忘れずに、周りの人にも優しさを分けてあげましょう。' },
        { level: '黄金吉', levelClass: 'daikichi', message: '金運が最高潮に達しています！お金に関することが好転します。', advice: '投資や買い物のタイミングとしては最適です。' }
      ]
      selectedResult = rareResults[Math.floor(Math.random() * rareResults.length)]
      setShowRareEffect(true)
      setTimeout(() => setShowRareEffect(false), 3000)
    } else {
      // 通常の運勢
      const data = omikujiData[type]
      const randomIndex = Math.floor(Math.random() * data.results.length)
      selectedResult = data.results[randomIndex]
    }

    // ユーザー別のガチャ回数を更新
    const newCount = gachaCount + 1
    setGachaCount(newCount)
    const today = new Date().toDateString()
    const currentUser = localStorage.getItem('currentUser')
    const userId = currentUser ? JSON.parse(currentUser).id : 'guest'
    const gachaKey = `gachaData_${userId}`
    localStorage.setItem(gachaKey, JSON.stringify({ date: today, count: newCount }))

    setIsSpinning(false)
    onResult(selectedResult)
  }

  return (
    <div className="text-center mb-6">
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-white font-bold text-xl mb-2">🎰 運勢ガチャ</h3>
        <p className="text-yellow-100 text-sm mb-4">
          1日3回まで運勢を引き直せます！レア運勢が出るかも？
        </p>
        
        <div className="flex justify-center items-center space-x-2 mb-4">
          {[...Array(maxGacha)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i < gachaCount ? 'bg-red-500' : 'bg-white/30'
              }`}
              animate={i < gachaCount ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <motion.button
          onClick={performGacha}
          disabled={gachaCount >= maxGacha || isSpinning}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
            gachaCount >= maxGacha || isSpinning
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-white text-orange-500 hover:bg-yellow-50 shadow-lg hover:shadow-xl'
          }`}
          whileHover={gachaCount < maxGacha && !isSpinning ? { scale: 1.05 } : {}}
          whileTap={gachaCount < maxGacha && !isSpinning ? { scale: 0.95 } : {}}
        >
          {isSpinning ? (
            <motion.div
              className="flex items-center space-x-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <span>🎰</span>
              <span>ガチャ中...</span>
            </motion.div>
          ) : gachaCount >= maxGacha ? (
            '本日の回数終了'
          ) : (
            `ガチャを引く (残り${maxGacha - gachaCount}回)`
          )}
        </motion.button>
      </motion.div>

      {/* レアエフェクト */}
      <AnimatePresence>
        {showRareEffect && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl font-bold text-yellow-400"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              ✨ RARE ✨
            </motion.div>
            
            {/* レア用花火 */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [1, 1, 0],
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}