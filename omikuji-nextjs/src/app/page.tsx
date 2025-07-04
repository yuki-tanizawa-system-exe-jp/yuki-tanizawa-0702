'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OmikujiCard from '@/components/OmikujiCard'
import OmikujiModal from '@/components/OmikujiModal'
import LuckyItems from '@/components/LuckyItems'
import DailyQuote from '@/components/DailyQuote'
import OmikujiHistoryComponent from '@/components/OmikujiHistory'
import AuthModal from '@/components/AuthModal'
import FortuneGacha from '@/components/FortuneGacha'
import ThemeSelector from '@/components/ThemeSelector'
import FortuneStats from '@/components/FortuneStats'
import { omikujiData, OmikujiType, OmikujiResult } from '@/data/omikujiData'
import { saveOmikujiHistory } from '@/utils/history'
import { getCurrentUser, incrementOmikujiCount, User } from '@/utils/auth'

export default function Home() {
  const [selectedResult, setSelectedResult] = useState<{
    type: OmikujiType
    result: OmikujiResult
    isGachaResult?: boolean
  } | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [showGacha, setShowGacha] = useState(false)
  const [gachaType, setGachaType] = useState<OmikujiType>('love')

  // ユーザー情報を初期化
  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  const drawOmikuji = async (type: OmikujiType) => {
    setIsDrawing(true)
    
    // 演出のための待機時間
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const data = omikujiData[type]
    const randomIndex = Math.floor(Math.random() * data.results.length)
    const result = data.results[randomIndex]
    
    // 履歴に保存
    saveOmikujiHistory(type, result)
    
    // ログインユーザーの場合、おみくじ回数を増加
    if (currentUser) {
      incrementOmikujiCount(currentUser.id)
      // ユーザー情報を更新
      setCurrentUser(getCurrentUser())
    }
    
    setSelectedResult({ type, result })
    setIsDrawing(false)
    
    // 履歴コンポーネントを更新
    if (typeof window !== 'undefined' && (window as any).refreshOmikujiHistory) {
      (window as any).refreshOmikujiHistory()
    }
  }

  const closeModal = () => {
    setSelectedResult(null)
  }

  const retryOmikuji = () => {
    if (selectedResult) {
      closeModal()
      setTimeout(() => {
        if (selectedResult.isGachaResult) {
          // ガチャ結果の場合はガチャを再度開く
          openGacha(selectedResult.type)
        } else {
          // 通常のおみくじの場合は通常のおみくじを引く
          drawOmikuji(selectedResult.type)
        }
      }, 300)
    }
  }

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthModalOpen(false)
  }

  const handleGachaResult = (result: OmikujiResult) => {
    // ガチャ結果を履歴に保存
    saveOmikujiHistory(gachaType, result)
    
    // ログインユーザーの場合、おみくじ回数を増加
    if (currentUser) {
      incrementOmikujiCount(currentUser.id)
      setCurrentUser(getCurrentUser())
    }
    
    setSelectedResult({ type: gachaType, result, isGachaResult: true })
    setShowGacha(false)
    
    // 履歴コンポーネントを更新
    if (typeof window !== 'undefined' && (window as any).refreshOmikujiHistory) {
      (window as any).refreshOmikujiHistory()
    }
  }

  const openGacha = (type: OmikujiType) => {
    setGachaType(type)
    setShowGacha(true)
  }

  const getTodayString = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    return `${year}年${month}月${date}日`
  }

  const encouragementMessages = [
    "今日も素敵な一日になりますように！",
    "あなたの笑顔が周りを明るくします",
    "小さな幸せを見つけてくださいね",
    "今日という日は二度と来ません。大切に過ごしてください",
    "あなたならきっと大丈夫です！"
  ]

  const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* ヘッダー */}
        <motion.header 
          className="text-center mb-12 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-start mb-4">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-800"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🎋 おみくじの館 🎋
            </motion.h1>
            
            {/* ログイン状態に応じたボタン表示 */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* ガチャボタン */}
              <motion.button
                onClick={() => openGacha('love')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">🎰</span>
                <span className="hidden md:inline">ガチャ</span>
              </motion.button>

              {currentUser ? (
                // ログイン済みの場合: ユーザー名とログアウトボタン
                <>
                  <motion.button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">👤</span>
                    <span className="hidden md:inline">{currentUser.username}</span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      handleLogout()
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">🚪</span>
                    <span className="hidden md:inline">ログアウト</span>
                  </motion.button>
                </>
              ) : (
                // 未ログインの場合: ログインボタンのみ
                <motion.button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">🔐</span>
                  <span className="hidden md:inline">ログイン</span>
                </motion.button>
              )}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-xl text-gray-600 mb-2">
              {getTodayString()}の運勢を占います
            </p>
            <p className="text-sm text-gray-500">
              {randomMessage}
            </p>
            {currentUser && (
              <p className="text-sm text-purple-600 mt-2">
                ようこそ、{currentUser.username}さん！ (おみくじ回数: {currentUser.totalOmikuji}回)
              </p>
            )}
          </motion.div>
        </motion.header>

        {/* 今日の一言 */}
        <DailyQuote />

        {/* ラッキーアイテム */}
        <LuckyItems />

        {/* おみくじカードグリッド */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(omikujiData).map(([key, data], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <OmikujiCard
                  type={key as OmikujiType}
                  data={data}
                  onDraw={drawOmikuji}
                  isDrawing={isDrawing}
                />
              </motion.div>
            ))}
          </div>
        </motion.main>

        {/* フッター */}
        <motion.footer 
          className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-gray-600">
            &copy; 2025 おみくじの館 - 毎日の運勢をお届けします
          </p>
        </motion.footer>
      </div>

      {/* おみくじ結果モーダル */}
      <AnimatePresence>
        {selectedResult && (
          <OmikujiModal
            type={selectedResult.type}
            result={selectedResult.result}
            onClose={closeModal}
            onRetry={retryOmikuji}
          />
        )}
      </AnimatePresence>

      {/* 描画中のオーバーレイ */}
      <AnimatePresence>
        {isDrawing && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-12 text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                🎋
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold text-gray-800 mb-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                おみくじを引いています...
              </motion.h2>
              <motion.div
                className="flex justify-center space-x-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-purple-500 rounded-full"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 履歴コンポーネント */}
      <OmikujiHistoryComponent />

      {/* ガチャモーダル */}
      <AnimatePresence>
        {showGacha && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGacha(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowGacha(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
              
              <FortuneGacha
                type={gachaType}
                onResult={handleGachaResult}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 認証モーダル */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onAuthSuccess={handleAuthSuccess}
        onLogout={handleLogout}
      />

      {/* テーマセレクター */}
      <ThemeSelector />

      {/* 統計ダッシュボード */}
      <FortuneStats />
    </div>
  )
}