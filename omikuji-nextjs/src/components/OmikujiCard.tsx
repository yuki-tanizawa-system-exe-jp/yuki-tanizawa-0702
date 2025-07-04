'use client'

import { motion } from 'framer-motion'
import { OmikujiType, OmikujiData } from '@/data/omikujiData'

interface OmikujiCardProps {
  type: OmikujiType
  data: OmikujiData
  onDraw: (type: OmikujiType) => void
  isDrawing: boolean
}

export default function OmikujiCard({ type, data, onDraw, isDrawing }: OmikujiCardProps) {
  const handleDraw = () => {
    if (!isDrawing) {
      onDraw(type)
    }
  }

  return (
    <motion.div
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl card-hover relative overflow-hidden"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* グラデーションボーダー */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse" />
      
      {/* アイコン */}
      <motion.div
        className="text-6xl mb-6"
        animate={{ 
          rotate: isDrawing ? 360 : 0,
          scale: isDrawing ? [1, 1.2, 1] : 1
        }}
        transition={{ 
          rotate: { duration: 2, repeat: isDrawing ? Infinity : 0, ease: "linear" },
          scale: { duration: 1, repeat: isDrawing ? Infinity : 0, ease: "easeInOut" }
        }}
      >
        {data.icon}
      </motion.div>

      {/* タイトル */}
      <motion.h3 
        className="text-2xl font-bold text-gray-800 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {data.name}
      </motion.h3>

      {/* 説明 */}
      <motion.p 
        className="text-gray-600 mb-6 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {getDescription(type)}
      </motion.p>

      {/* ボタン */}
      <motion.button
        onClick={handleDraw}
        disabled={isDrawing}
        className={`
          px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300
          ${isDrawing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl'
          }
        `}
        whileHover={!isDrawing ? { scale: 1.05 } : {}}
        whileTap={!isDrawing ? { scale: 0.95 } : {}}
        animate={isDrawing ? { 
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.4)",
            "0 0 40px rgba(168, 85, 247, 0.8)",
            "0 0 20px rgba(168, 85, 247, 0.4)"
          ]
        } : {}}
        transition={{ duration: 1, repeat: isDrawing ? Infinity : 0 }}
      >
        {isDrawing ? (
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            引いています...
          </motion.span>
        ) : (
          'おみくじを引く'
        )}
      </motion.button>

      {/* 装飾的な要素 */}
      <motion.div
        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  )
}

function getDescription(type: OmikujiType): string {
  const descriptions = {
    love: '恋の行方を占います',
    work: '仕事の運勢を占います',
    health: '健康状態を占います',
    money: 'お金の運勢を占います',
    study: '学習の成果を占います',
    general: '全体的な運勢を占います'
  }
  return descriptions[type]
}