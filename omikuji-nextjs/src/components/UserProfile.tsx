'use client'

import { motion } from 'framer-motion'
import { User, logoutUser } from '@/utils/auth'

interface UserProfileProps {
  user: User
  onLogout: () => void
  onClose: () => void
}

export default function UserProfile({ user, onLogout, onClose }: UserProfileProps) {
  const handleLogout = () => {
    logoutUser()
    onLogout()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getOmikujiLevel = (count: number) => {
    if (count >= 100) return { level: 'おみくじマスター', icon: '🏆', color: 'text-yellow-600' }
    if (count >= 50) return { level: 'おみくじ上級者', icon: '🥇', color: 'text-orange-600' }
    if (count >= 20) return { level: 'おみくじ中級者', icon: '🥈', color: 'text-gray-600' }
    if (count >= 5) return { level: 'おみくじ初級者', icon: '🥉', color: 'text-amber-600' }
    return { level: 'おみくじ初心者', icon: '🌱', color: 'text-green-600' }
  }

  const levelInfo = getOmikujiLevel(user.totalOmikuji)

  return (
    <motion.div
      className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <motion.div
        className="text-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">プロフィール</h2>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* ユーザー情報 */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">ユーザー名</label>
              <p className="text-lg font-semibold text-gray-800">{user.username}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">メールアドレス</label>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">登録日</label>
              <p className="text-gray-800">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* おみくじ統計 */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">おみくじ統計</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">総おみくじ回数</span>
              <span className="text-2xl font-bold text-purple-600">{user.totalOmikuji}回</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">レベル</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{levelInfo.icon}</span>
                <span className={`font-bold ${levelInfo.color}`}>{levelInfo.level}</span>
              </div>
            </div>
            {user.favoriteCategory && (
              <div className="flex items-center justify-between">
                <span className="text-gray-700">お気に入り</span>
                <span className="font-semibold text-gray-800">{user.favoriteCategory}</span>
              </div>
            )}
          </div>
        </div>

        {/* 次のレベルまでの進捗 */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">次のレベルまで</h4>
          {user.totalOmikuji < 100 ? (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>現在: {user.totalOmikuji}回</span>
                <span>次: {user.totalOmikuji < 5 ? 5 : user.totalOmikuji < 20 ? 20 : user.totalOmikuji < 50 ? 50 : 100}回</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, (user.totalOmikuji / (user.totalOmikuji < 5 ? 5 : user.totalOmikuji < 20 ? 20 : user.totalOmikuji < 50 ? 50 : 100)) * 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">最高レベルに到達しました！🎉</p>
          )}
        </div>

        {/* ボタン */}
        <motion.div
          className="space-y-3 pt-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            ログアウト
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
          >
            閉じる
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}