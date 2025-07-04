'use client'

import { motion } from 'framer-motion'
import { purchasableLuckyItems, LuckyItem } from '@/data/luckyItems'
import { OmikujiResult } from '@/data/omikujiData'
import { useState } from 'react'

interface FortuneBasedLuckyItemsProps {
  fortuneResult: OmikujiResult
  fortuneType: string
}

export default function FortuneBasedLuckyItems({ fortuneResult, fortuneType }: FortuneBasedLuckyItemsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'color' | 'food' | 'item'>('all')

  // 運勢レベルに基づいてアイテムを選択
  const getRecommendedItems = (): LuckyItem[] => {
    const allItems: LuckyItem[] = []
    
    // 運勢レベルに応じてアイテム数を調整
    const itemCount = fortuneResult.level === '大吉' ? 6 : 
                     fortuneResult.level === '吉' ? 4 : 
                     fortuneResult.level === '中吉' ? 3 : 2

    // 各カテゴリからランダムにアイテムを選択
    Object.values(purchasableLuckyItems).forEach(items => {
      allItems.push(...items)
    })

    // 運勢タイプに応じて特定のアイテムを優先
    const priorityItems = getPriorityItemsByFortuneType(fortuneType)
    const otherItems = allItems.filter(item => !priorityItems.includes(item))

    // 優先アイテムから選択し、不足分を他のアイテムで補完
    const selectedItems = [...priorityItems.slice(0, Math.min(priorityItems.length, itemCount))]
    const remainingCount = itemCount - selectedItems.length
    
    if (remainingCount > 0) {
      const shuffledOthers = otherItems.sort(() => Math.random() - 0.5)
      selectedItems.push(...shuffledOthers.slice(0, remainingCount))
    }

    return selectedItems.slice(0, itemCount)
  }

  // 運勢タイプに応じた優先アイテムを取得
  const getPriorityItemsByFortuneType = (type: string): LuckyItem[] => {
    const priorityItems: LuckyItem[] = []
    
    switch (type) {
      case 'love':
        // 恋愛運にはピンク、赤系のアイテムを優先
        priorityItems.push(...(purchasableLuckyItems['ピンク'] || []))
        priorityItems.push(...(purchasableLuckyItems['赤'] || []))
        priorityItems.push(...(purchasableLuckyItems['香水'] || []))
        priorityItems.push(...(purchasableLuckyItems['鏡'] || []))
        break
      case 'work':
        // 仕事運には青、黒系のアイテムを優先
        priorityItems.push(...(purchasableLuckyItems['青'] || []))
        priorityItems.push(...(purchasableLuckyItems['黒'] || []))
        priorityItems.push(...(purchasableLuckyItems['ペン'] || []))
        priorityItems.push(...(purchasableLuckyItems['手帳'] || []))
        break
      case 'money':
        // 金運には金、黄色系のアイテムを優先
        priorityItems.push(...(purchasableLuckyItems['金'] || []))
        priorityItems.push(...(purchasableLuckyItems['黄'] || []))
        priorityItems.push(...(purchasableLuckyItems['財布'] || []))
        break
      case 'health':
        // 健康運には緑系のアイテムを優先
        priorityItems.push(...(purchasableLuckyItems['緑'] || []))
        priorityItems.push(...(purchasableLuckyItems['緑茶'] || []))
        break
      case 'study':
        // 学業運には青、紫系のアイテムを優先
        priorityItems.push(...(purchasableLuckyItems['青'] || []))
        priorityItems.push(...(purchasableLuckyItems['紫'] || []))
        priorityItems.push(...(purchasableLuckyItems['ペン'] || []))
        priorityItems.push(...(purchasableLuckyItems['手帳'] || []))
        break
      default:
        // 総合運にはバランス良く
        priorityItems.push(...(purchasableLuckyItems['金'] || []))
        priorityItems.push(...(purchasableLuckyItems['緑'] || []))
        break
    }
    
    return priorityItems
  }

  const recommendedItems = getRecommendedItems()
  const filteredItems = selectedCategory === 'all' 
    ? recommendedItems 
    : recommendedItems.filter(item => item.category === selectedCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case '大吉': return 'from-yellow-400 to-orange-500'
      case '吉': return 'from-green-400 to-blue-500'
      case '中吉': return 'from-blue-400 to-purple-500'
      case '小吉': return 'from-purple-400 to-pink-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="text-center mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={`inline-block bg-gradient-to-r ${getLevelColor(fortuneResult.level)} text-white px-6 py-2 rounded-full text-lg font-bold mb-4`}>
          {fortuneResult.level}運勢に基づくおすすめアイテム
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          🛍️ 運気アップショッピング 🛍️
        </h2>
        <p className="text-gray-600 mt-2">
          あなたの{fortuneResult.level}運勢に最適なアイテムをご紹介します
        </p>
      </motion.div>

      {/* カテゴリフィルター */}
      <div className="flex justify-center mb-6 space-x-2">
        {[
          { key: 'all', label: 'すべて', icon: '🌟' },
          { key: 'color', label: 'カラー', icon: '🎨' },
          { key: 'food', label: 'フード', icon: '🍀' },
          { key: 'item', label: 'アイテム', icon: '✨' }
        ].map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.key
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* アイテムグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={`${item.name}-${index}`}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{item.image}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
              <div className="text-xl font-bold text-purple-600 mb-4">{item.price}</div>
              
              <motion.a
                href={item.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🛒 購入する
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">選択したカテゴリにはアイテムがありません</p>
        </div>
      )}

      <motion.div
        className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">💡</div>
          <h4 className="font-bold text-gray-800 mb-2">運気アップのコツ</h4>
          <p className="text-sm text-gray-600">
            {fortuneResult.advice}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}