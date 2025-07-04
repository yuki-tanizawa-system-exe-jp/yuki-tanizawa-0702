'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import UserProfile from './UserProfile'
import { User } from '@/utils/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  currentUser: User | null
  onAuthSuccess: (user: User) => void
  onLogout: () => void
}

type ModalView = 'login' | 'register' | 'profile'

export default function AuthModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onAuthSuccess, 
  onLogout 
}: AuthModalProps) {
  const [currentView, setCurrentView] = useState<ModalView>('login')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleAuthSuccess = () => {
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      onClose()
      // ページをリロードして最新の状態を反映
      window.location.reload()
    }, 2000)
  }

  const handleRegisterSuccess = () => {
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      onClose()
      // ページをリロードして最新の状態を反映
      window.location.reload()
    }, 2000)
  }

  const handleLogout = () => {
    onLogout()
    setCurrentView('login')
    onClose()
    // ページをリロードして最新の状態を反映
    window.location.reload()
  }

  const handleSwitchToRegister = () => {
    setCurrentView('register')
  }

  const handleSwitchToLogin = () => {
    setCurrentView('login')
  }

  if (!isOpen) return null

  // ログイン済みの場合は直接プロフィールを表示
  const viewToShow = currentUser ? 'profile' : currentView

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
            {showSuccessMessage ? (
              <motion.div
                key="success"
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.6, repeat: 1 }}
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentView === 'register' ? '登録完了！' : 'ログイン成功！'}
                </h2>
                <p className="text-gray-600">
                  {currentView === 'register'
                    ? 'アカウントが作成されました。おみくじをお楽しみください！'
                    : 'おかえりなさい！おみくじをお楽しみください！'
                  }
                </p>
              </motion.div>
            ) : viewToShow === 'profile' && currentUser ? (
              <UserProfile
                key="profile"
                user={currentUser}
                onLogout={handleLogout}
                onClose={onClose}
              />
            ) : viewToShow === 'register' ? (
              <RegisterForm
                key="register"
                onSuccess={handleRegisterSuccess}
                onSwitchToLogin={handleSwitchToLogin}
                onClose={onClose}
              />
            ) : (
              <LoginForm
                key="login"
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={handleSwitchToRegister}
                onClose={onClose}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}