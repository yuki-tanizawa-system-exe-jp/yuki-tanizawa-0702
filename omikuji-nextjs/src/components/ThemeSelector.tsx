'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import AnimatedBackground from './AnimatedBackground'

interface Theme {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  emoji: string
}

const themes: Theme[] = [
  {
    name: 'デフォルト',
    primary: 'from-purple-400 to-pink-400',
    secondary: 'from-blue-400 to-cyan-400',
    accent: 'from-yellow-400 to-orange-400',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    emoji: '🌈'
  },
  {
    name: 'ダークモード',
    primary: 'from-gray-700 to-gray-900',
    secondary: 'from-blue-800 to-purple-900',
    accent: 'from-yellow-600 to-orange-700',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    emoji: '🌙'
  },
  {
    name: '桜',
    primary: 'from-pink-300 to-rose-400',
    secondary: 'from-pink-200 to-pink-300',
    accent: 'from-rose-400 to-pink-500',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    emoji: '🌸'
  },
  {
    name: '海',
    primary: 'from-blue-400 to-cyan-500',
    secondary: 'from-teal-300 to-blue-400',
    accent: 'from-cyan-400 to-teal-500',
    background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    emoji: '🌊'
  },
  {
    name: '森',
    primary: 'from-green-400 to-emerald-500',
    secondary: 'from-lime-300 to-green-400',
    accent: 'from-emerald-400 to-green-500',
    background: 'linear-gradient(135deg, #a8e6cf 0%, #00b894 100%)',
    emoji: '🌲'
  },
  {
    name: '夕焼け',
    primary: 'from-orange-400 to-red-500',
    secondary: 'from-yellow-300 to-orange-400',
    accent: 'from-red-400 to-pink-500',
    background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
    emoji: '🌅'
  }
]

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // ローカルストレージからテーマを読み込み
    const savedTheme = localStorage.getItem('selectedTheme')
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme) || themes[0]
      setCurrentTheme(theme)
      applyTheme(theme)
    }
  }, [])

  const applyTheme = (theme: Theme) => {
    // CSS変数を更新
    const root = document.documentElement
    root.style.setProperty('--theme-primary', theme.primary)
    root.style.setProperty('--theme-secondary', theme.secondary)
    root.style.setProperty('--theme-accent', theme.accent)
    
    // body要素のクラスを更新
    document.body.className = theme.name === 'ダークモード' ? 'dark' : ''
  }

  const selectTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme(theme)
    localStorage.setItem('selectedTheme', theme.name)
    setIsOpen(false)
  }

  return (
    <>
      {/* 動的背景 */}
      <AnimatedBackground theme={currentTheme.name} />
      
      {/* テーマセレクターボタン - 位置を調整（履歴ボタンと被らないように） */}
      <div className="fixed bottom-20 right-4 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-gradient-to-r ${currentTheme.primary} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          {currentTheme.emoji}
        </motion.button>

        <motion.div
          className={`absolute bottom-16 right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl ${
            isOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            scale: isOpen ? 1 : 0.8, 
            y: isOpen ? 0 : 20 
          }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-sm font-bold text-gray-800 mb-3 text-center">
            🎨 テーマ選択
          </h3>
          
          <div className="grid grid-cols-2 gap-2 w-48">
            {themes.map((theme) => (
              <motion.button
                key={theme.name}
                onClick={() => selectTheme(theme)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  currentTheme.name === theme.name
                    ? 'ring-2 ring-purple-500 ring-offset-2'
                    : 'hover:scale-105'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${theme.primary.replace('from-', '').replace('to-', ', ')})`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-white text-center">
                  <div className="text-lg mb-1">{theme.emoji}</div>
                  <div className="text-xs font-medium">{theme.name}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}