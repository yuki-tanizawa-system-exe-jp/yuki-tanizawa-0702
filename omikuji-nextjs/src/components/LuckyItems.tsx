'use client'

import { motion } from 'framer-motion'
import { getTodayLuckyItems, LuckyItems as LuckyItemsType } from '@/data/luckyItems'
import { useEffect, useState } from 'react'

export default function LuckyItems() {
  const [luckyItems, setLuckyItems] = useState<LuckyItemsType | null>(null)

  useEffect(() => {
    setLuckyItems(getTodayLuckyItems())
  }, [])

  // アイテムクリック時の処理
  const handleItemClick = (label: string, value: string) => {
    let searchUrl = ''
    
    switch (label) {
      case 'ラッキーカラー':
        searchUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(value)}+アイテム`
        break
      case 'ラッキーナンバー':
        searchUrl = `https://www.amazon.co.jp/s?k=ナンバー+${value}+グッズ`
        break
      case 'ラッキーフード':
        searchUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(value)}`
        break
      case 'ラッキーアイテム':
        searchUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(value)}`
        break
      case 'ラッキー方角':
        searchUrl = `https://www.amazon.co.jp/s?k=コンパス+方位磁針`
        break
      default:
        searchUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(value)}`
    }
    
    window.open(searchUrl, '_blank')
  }

  if (!luckyItems) return null

  const items = [
    { label: 'ラッキーカラー', value: luckyItems.color, icon: '🎨', color: 'bg-red-100' },
    { label: 'ラッキーナンバー', value: luckyItems.number.toString(), icon: '🔢', color: 'bg-blue-100' },
    { label: 'ラッキーフード', value: luckyItems.food, icon: '🍀', color: 'bg-green-100' },
    { label: 'ラッキーアイテム', value: luckyItems.item, icon: '✨', color: 'bg-yellow-100' },
    { label: 'ラッキー方角', value: luckyItems.direction, icon: '🧭', color: 'bg-purple-100' }
  ]

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        🍀 今日のラッキーアイテム 🍀
      </motion.h2>
      
      <motion.p
        className="text-sm text-gray-600 text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        💡 アイテムをクリックすると関連商品を検索できます
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => handleItemClick(item.label, item.value)}
            className={`${item.color} rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300 focus:outline-none focus:border-purple-500`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="text-3xl mb-2"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
            <div className="text-sm font-medium text-gray-600 mb-1">{item.label}</div>
            <div className="text-lg font-bold text-gray-800 mb-2">{item.value}</div>
            <motion.div
              className="text-xs text-purple-600 font-medium"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              🛒 商品を探す
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}