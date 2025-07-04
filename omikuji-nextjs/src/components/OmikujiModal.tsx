'use client'

import { motion } from 'framer-motion'
import { OmikujiType, OmikujiResult, omikujiData } from '@/data/omikujiData'
import FortuneBasedLuckyItems from './FortuneBasedLuckyItems'
import { useState, useEffect } from 'react'

interface OmikujiModalProps {
  type: OmikujiType
  result: OmikujiResult
  onClose: () => void
  onRetry: () => void
}

export default function OmikujiModal({ type, result, onClose, onRetry }: OmikujiModalProps) {
  const data = omikujiData[type]
  const [showShopping, setShowShopping] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    // 結果表示時に花火エフェクトを表示
    setShowFireworks(true)
    const timer = setTimeout(() => setShowFireworks(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const getLevelColor = (levelClass: string) => {
    const colors = {
      daikichi: 'from-red-500 to-orange-500',
      kichi: 'from-yellow-500 to-pink-500',
      chukichi: 'from-blue-500 to-cyan-500',
      shokichi: 'from-green-500 to-emerald-500',
      kyo: 'from-purple-500 to-indigo-500'
    }
    return colors[levelClass as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  // 花火エフェクト用のパーティクル
  const createFireworks = () => {
    const particles = []
    for (let i = 0; i < 25; i++) {
      particles.push(
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{
            scale: 0,
            opacity: 1
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200
          }}
          transition={{
            duration: 2.5,
            delay: Math.random() * 1.5,
            ease: "easeOut"
          }}
        />
      )
    }
    return particles
  }

  return (
    <motion.div
      className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-500 ${
          showShopping ? 'max-w-6xl w-full max-h-[90vh] overflow-y-auto' : 'max-w-md w-full'
        }`}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 花火エフェクト */}
        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {createFireworks()}
          </div>
        )}

        {/* キラキラエフェクト */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>

        {/* 閉じるボタン */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>

        {/* 装飾的な背景 */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
        
        {/* コンテンツ */}
        <div className="relative z-10 text-center">
          {/* アイコン */}
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              y: [0, -10, 0]
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 300,
              delay: 0.2,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {data.icon}
          </motion.div>

          {/* タイトル */}
          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {data.name}
          </motion.h2>

          {/* 運勢レベル */}
          <motion.div
            className={`inline-block px-6 py-3 rounded-full text-white font-bold text-xl mb-6 bg-gradient-to-r ${getLevelColor(result.levelClass)}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              delay: 0.4 
            }}
          >
            {result.level}
          </motion.div>

          {/* メッセージ */}
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 mb-6 border-l-4 border-purple-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-700 leading-relaxed">
              {result.message}
            </p>
          </motion.div>

          {/* アドバイス */}
          <motion.div
            className="bg-green-50 rounded-2xl p-6 mb-8 border-l-4 border-green-500"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-green-700 font-semibold mb-2 text-lg">
              今日のアドバイス
            </h4>
            <p className="text-green-600 text-sm leading-relaxed">
              {result.advice}
            </p>
          </motion.div>

          {/* ボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setShowShopping(!showShopping)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              🛍️ {showShopping ? 'ショッピングを閉じる' : '運気アップアイテムを見る'}
            </motion.button>
            
            <motion.button
              onClick={onRetry}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              もう一度引く
            </motion.button>
          </div>
        </div>

        {/* ラッキーアイテムショッピングセクション */}
        {showShopping && (
          <motion.div
            className="mt-8 border-t border-gray-200 pt-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FortuneBasedLuckyItems
              fortuneResult={result}
              fortuneType={type}
            />
          </motion.div>
        )}

        {/* 装飾的な要素 */}
        {!showShopping && (
          <>
            <motion.div
              className="absolute top-8 right-8 w-4 h-4 bg-yellow-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-8 left-8 w-3 h-3 bg-pink-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute top-1/2 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-40"
              animate={{
                y: [-10, 10, -10],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}