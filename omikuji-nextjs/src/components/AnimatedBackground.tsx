'use client'

import { useEffect, useState } from 'react'

interface AnimatedBackgroundProps {
  theme: string
}

export default function AnimatedBackground({ theme }: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getBackgroundComponent = () => {
    switch (theme) {
      case '海':
        return <OceanBackground />
      case '森':
        return <ForestBackground />
      case '桜':
        return <SakuraBackground />
      case '夕焼け':
        return <SunsetBackground />
      case 'ダークモード':
        return <DarkBackground />
      default:
        return <DefaultBackground />
    }
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {getBackgroundComponent()}
    </div>
  )
}

// 海の背景 - 超強化版
function OceanBackground() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-cyan-300 via-blue-500 to-blue-800">
      {/* 大きな波のアニメーション */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-40 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
            style={{
              top: `${10 + i * 12}%`,
              animation: `bigWave ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${i * 2}deg)`,
            }}
          />
        ))}
      </div>
      
      {/* 小さな波のレイヤー */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-20 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent"
            style={{
              top: `${5 + i * 8}%`,
              animation: `smallWave ${1.5 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      {/* 大量の泡 */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            left: `${Math.random() * 100}%`,
            bottom: '0%',
            animation: `bubble ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      {/* 魚のシルエット */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-60"
          style={{
            left: `${-10 + Math.random() * 120}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `fish ${8 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          🐟
        </div>
      ))}

      {/* 光の筋 */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-full bg-gradient-to-b from-yellow-200/60 to-transparent"
          style={{
            left: `${10 + i * 15}%`,
            animation: `lightRay ${4 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            transform: `rotate(${10 + i * 5}deg)`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes bigWave {
          0%, 100% { transform: translateX(-100%) scaleY(1) rotate(0deg); }
          50% { transform: translateX(100%) scaleY(1.5) rotate(2deg); }
        }
        @keyframes smallWave {
          0%, 100% { transform: translateX(-50%) scaleY(0.8); opacity: 0.3; }
          50% { transform: translateX(50%) scaleY(1.2); opacity: 0.8; }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1.5) rotate(360deg); opacity: 0; }
        }
        @keyframes fish {
          0% { transform: translateX(-100px) scaleX(1); }
          50% { transform: translateX(50vw) scaleX(-1); }
          100% { transform: translateX(calc(100vw + 100px)) scaleX(1); }
        }
        @keyframes lightRay {
          0%, 100% { opacity: 0.2; transform: scaleX(0.5); }
          50% { opacity: 0.8; transform: scaleX(1.5); }
        }
      `}</style>
    </div>
  )
}

// 森の背景 - 超強化版
function ForestBackground() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-green-200 via-green-500 to-green-800">
      {/* 大量の葉っぱ */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10%',
            animation: `fall ${6 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 12}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {['🍃', '🌿', '🍀', '🌱', '🍂'][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      {/* 風のエフェクト（複数レイヤー） */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-16 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            style={{
              top: `${10 + i * 12}%`,
              animation: `wind ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* 蝶々 */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
            animation: `butterfly ${8 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          🦋
        </div>
      ))}

      {/* 光の粒子 */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle ${3 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg) scale(1); }
          25% { transform: translateY(25vh) rotate(90deg) scale(1.2); }
          50% { transform: translateY(50vh) rotate(180deg) scale(0.8); }
          75% { transform: translateY(75vh) rotate(270deg) scale(1.1); }
          100% { transform: translateY(110vh) rotate(360deg) scale(1); }
        }
        @keyframes wind {
          0%, 100% { transform: translateX(-100%) skewX(0deg); opacity: 0; }
          50% { transform: translateX(100%) skewX(10deg); opacity: 1; }
        }
        @keyframes butterfly {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(50px) translateY(-20px) rotate(10deg); }
          50% { transform: translateX(100px) translateY(0) rotate(-10deg); }
          75% { transform: translateX(50px) translateY(20px) rotate(5deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  )
}

// 桜の背景 - 超強化版
function SakuraBackground() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-pink-100 via-pink-300 to-pink-500">
      {/* 大量の桜の花びら */}
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute text-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-5%',
            animation: `sakura ${8 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 16}s`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
        >
          🌸
        </div>
      ))}

      {/* 春風のエフェクト（強化版） */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-12 bg-gradient-to-r from-transparent via-pink-200/40 to-transparent"
            style={{
              top: `${10 + i * 9}%`,
              animation: `springWind ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      {/* 光の粒子 */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-pink-200/80 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pinkSparkle ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      {/* 蝶々（桜バージョン） */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
            animation: `butterflyPink ${10 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          🦋
        </div>
      ))}

      <style jsx>{`
        @keyframes sakura {
          0% { transform: translateY(-5vh) translateX(0) rotate(0deg) scale(1); }
          20% { transform: translateY(20vh) translateX(20px) rotate(72deg) scale(1.2); }
          40% { transform: translateY(40vh) translateX(-15px) rotate(144deg) scale(0.8); }
          60% { transform: translateY(60vh) translateX(25px) rotate(216deg) scale(1.1); }
          80% { transform: translateY(80vh) translateX(-10px) rotate(288deg) scale(0.9); }
          100% { transform: translateY(105vh) translateX(0) rotate(360deg) scale(1); }
        }
        @keyframes springWind {
          0%, 100% { transform: translateX(-50%) skewX(0deg); opacity: 0; }
          50% { transform: translateX(50%) skewX(5deg); opacity: 1; }
        }
        @keyframes pinkSparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(2) rotate(180deg); }
        }
        @keyframes butterflyPink {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateX(80px) translateY(-30px) rotate(15deg) scale(1.2); }
          50% { transform: translateX(160px) translateY(0) rotate(-15deg) scale(0.8); }
          75% { transform: translateX(80px) translateY(30px) rotate(10deg) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

// 夕焼けの背景 - 超強化版
function SunsetBackground() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-yellow-200 via-orange-400 to-red-600">
      {/* 太陽（強化版） */}
      <div
        className="absolute w-40 h-40 bg-yellow-300 rounded-full top-16 right-16"
        style={{
          animation: 'sunset 15s ease-in-out infinite',
          boxShadow: '0 0 100px rgba(255, 255, 0, 0.8), 0 0 200px rgba(255, 165, 0, 0.6)',
        }}
      />

      {/* 太陽の光線 */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-32 bg-yellow-200/60"
          style={{
            left: '85%',
            top: '20%',
            transformOrigin: 'bottom',
            transform: `rotate(${i * 30}deg)`,
            animation: `sunRay ${3 + i * 0.2}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* 大量の雲 */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-5xl opacity-80"
          style={{
            left: `${-20 + Math.random() * 140}%`,
            top: `${5 + Math.random() * 50}%`,
            animation: `clouds ${10 + Math.random() * 15}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
            fontSize: `${Math.random() * 30 + 30}px`,
          }}
        >
          ☁️
        </div>
      ))}

      {/* 鳥の群れ */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${10 + Math.random() * 40}%`,
            animation: `birds ${12 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 12}s`,
          }}
        >
          🕊️
        </div>
      ))}

      {/* 光の粒子 */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-200/70 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `goldenSparkle ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes sunset {
          0%, 100% { transform: translateY(0) scale(1); filter: hue-rotate(0deg); }
          50% { transform: translateY(20px) scale(1.2); filter: hue-rotate(30deg); }
        }
        @keyframes sunRay {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
          50% { opacity: 1; transform: scaleY(1.5); }
        }
        @keyframes clouds {
          0% { transform: translateX(-200px) scale(1); }
          50% { transform: translateX(50vw) scale(1.2); }
          100% { transform: translateX(calc(100vw + 200px)) scale(1); }
        }
        @keyframes birds {
          0% { transform: translateX(-100px) translateY(0) rotate(0deg); }
          25% { transform: translateX(25vw) translateY(-20px) rotate(5deg); }
          50% { transform: translateX(50vw) translateY(0) rotate(-5deg); }
          75% { transform: translateX(75vw) translateY(-10px) rotate(3deg); }
          100% { transform: translateX(calc(100vw + 100px)) translateY(0) rotate(0deg); }
        }
        @keyframes goldenSparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(2) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// ダークモードの背景 - 超強化版
function DarkBackground() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-purple-900 via-blue-900 to-black">
      {/* 大量の星 */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${1 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      {/* 流れ星（大量） */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            animation: `shootingStar ${2 + Math.random() * 3}s linear infinite`,
            animationDelay: `${Math.random() * 15}s`,
          }}
        />
      ))}

      {/* 月 */}
      <div
        className="absolute w-32 h-32 bg-yellow-100 rounded-full top-10 left-20"
        style={{
          animation: 'moon 20s ease-in-out infinite',
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.5)',
        }}
      />

      {/* 星座 */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + Math.random() * 40}%`,
            animation: `constellation ${15 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* オーロラ */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-20 opacity-40"
          style={{
            top: `${20 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, ${
              ['#00ff88', '#0088ff', '#8800ff', '#ff0088', '#ffaa00'][i]
            }, transparent)`,
            animation: `aurora ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* 宇宙の塵 */}
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-300/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `cosmicDust ${3 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(2); }
        }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0) scale(0); opacity: 1; }
          10% { transform: translateX(100px) translateY(100px) scale(1); opacity: 1; }
          100% { transform: translateX(500px) translateY(500px) scale(0); opacity: 0; }
        }
        @keyframes moon {
          0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
          50% { transform: translateY(-10px) scale(1.1); filter: brightness(1.3); }
        }
        @keyframes constellation {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
        }
        @keyframes aurora {
          0%, 100% { transform: translateX(-100%) skewX(0deg); opacity: 0; }
          50% { transform: translateX(100%) skewX(20deg); opacity: 0.6; }
        }
        @keyframes cosmicDust {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// デフォルトの背景 - 超強化版
function DefaultBackground() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* 大量の虹色パーティクル */}
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 15 + 5}px`,
            height: `${Math.random() * 15 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
            animation: `float ${3 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 12}s`,
          }}
        />
      ))}

      {/* 虹のアーク */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-96 h-96 border-8 rounded-full opacity-30"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
            borderColor: `hsl(${i * 120}, 70%, 60%)`,
            animation: `rainbow ${10 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* 光の爆発 */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-20 h-20 rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, hsl(${Math.random() * 360}, 100%, 70%), transparent)`,
            animation: `explosion ${4 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}

      {/* 魔法の粒子 */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `magic ${5 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          ✨
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-30px) scale(1.5) rotate(180deg); opacity: 1; }
        }
        @keyframes rainbow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }
        @keyframes explosion {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(2) rotate(360deg); opacity: 1; }
        }
        @keyframes magic {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(2) rotate(360deg); opacity: 1; }
        }
      `}</style>
    </div>
  )
}