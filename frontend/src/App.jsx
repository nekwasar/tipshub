import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const containerRef = useRef(null)
  
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <div ref={containerRef} className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden transition-colors duration-500`}>
      {/* Animated grid */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-[linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px,transparent 1px),linear-gradient(90deg,${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px,transparent 1px)] [background-size:60px_60px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top] opacity-40`} />
      </div>
      
      {/* Glassmorphism orbs */}
      <motion.div 
        style={{ x: mousePosition.x * 50, y: mousePosition.y * 50 }}
        className={`absolute top-[10%] left-[20%] w-96 h-96 ${isDark ? 'bg-white/5' : 'bg-black/5'} rounded-full blur-[120px] pointer-events-none backdrop-blur-md transition-colors duration-500`}
      />
      <motion.div 
        style={{ x: mousePosition.x * -30, y: mousePosition.y * -30 }}
        className={`absolute bottom-[20%] right-[10%] w-64 h-64 ${isDark ? 'bg-white/3' : 'bg-black/3'} rounded-full blur-[100px] pointer-events-none backdrop-blur-sm transition-colors duration-500`}
      />
      
      {/* Floating geometric shapes */}
      <motion.div 
        style={{ y: y1, x: mousePosition.x * 20 }}
        className={`absolute top-20 left-[10%] w-px h-40 bg-gradient-to-b from-transparent ${isDark ? 'via-white/20' : 'via-black/20'} to-transparent`}
      />
      <motion.div 
        style={{ y: y2, x: mousePosition.x * -20 }}
        className={`absolute top-40 right-[15%] w-24 h-px bg-gradient-to-r from-transparent ${isDark ? 'via-white/10' : 'via-black/10'} to-transparent`}
      />

      {/* Corner accents */}
      <div className={`absolute top-0 left-0 w-20 h-20 border-l border-t ${isDark ? 'border-white/20' : 'border-black/20'}`} />
      <div className={`absolute top-0 right-0 w-20 h-20 border-r border-t ${isDark ? 'border-white/20' : 'border-black/20'}`} />
      <div className={`absolute bottom-0 left-0 w-20 h-20 border-l border-b ${isDark ? 'border-white/20' : 'border-black/20'}`} />
      <div className={`absolute bottom-0 right-0 w-20 h-20 border-r border-b ${isDark ? 'border-white/20' : 'border-black/20'}`} />

      {/* Main content - Balanced layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-12 py-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className={`w-10 h-10 border ${isDark ? 'border-white/30' : 'border-black/30'} flex items-center justify-center backdrop-blur-sm ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <span className={`font-mono text-lg font-medium ${isDark ? 'text-white' : 'text-black'}`}>T</span>
            </div>
            <span className={`font-mono text-sm tracking-[0.25em] uppercase ${isDark ? 'text-white' : 'text-black'}`}>TipsHub</span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}
            >
              0.1.0 // COMING SOON
            </motion.div>
            
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} backdrop-blur-sm transition-all duration-300`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}
              >
                {isDark ? '🌙' : '☀️'}
              </motion.div>
            </motion.button>
          </div>
        </header>

        {/* Hero - Centered balanced layout */}
        <main className="flex-1 flex items-center justify-center px-12">
          <div className="max-w-3xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className={`font-mono text-xs tracking-[0.4em] ${isDark ? 'text-white/50' : 'text-black/50'} uppercase`}>
                /// Online Earnings Directory
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`font-mono text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-none ${isDark ? 'text-white' : 'text-black'}`}
            >
              <span className="block">EARN.</span>
              <span className={`block ${isDark ? 'text-white/30' : 'text-black/30'}`}>DIRECTORY.</span>
              <span className="block">PROFIT.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`font-sans text-base ${isDark ? 'text-white/60' : 'text-black/60'} max-w-lg mx-auto mb-10 leading-relaxed`}
            >
              Discover verified ways to earn money online. Surveys, cashback, microtasks & referrals — all in one curated directory.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <AnimatePresence mode='wait'>
                {isSubmitted ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={`font-mono text-sm tracking-wider ${isDark ? 'text-white/70' : 'text-black/70'}`}
                  >
                    /// You're on the list! We'll notify you when we launch.
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="flex items-center max-w-md w-full"
                  >
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      required
                      className={`flex-1 ${isDark ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' : 'bg-black/5 border-black/20 text-black placeholder:text-black/40'} border backdrop-blur-sm py-4 px-5 font-sans text-sm focus:outline-none transition-all rounded-l-lg`}
                    />
                    <button 
                      type="submit"
                      className={`font-sans text-sm font-medium px-8 py-4 ${isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'} transition-colors rounded-r-lg`}
                    >
                      Get Early Access
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              
              <div className="flex gap-8 mt-10 font-mono text-xs">
                <span className={isDark ? 'text-white/40' : 'text-black/40'}>50+ Platforms</span>
                <span className={isDark ? 'text-white/20' : 'text-black/20'}>|</span>
                <span className={isDark ? 'text-white/40' : 'text-black/40'}>6 Categories</span>
                <span className={isDark ? 'text-white/20' : 'text-black/20'}>|</span>
                <span className={isDark ? 'text-white/40' : 'text-black/40'}>100% Verified</span>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-12 py-8 flex justify-center items-end">
          <div className={`font-mono text-xs ${isDark ? 'text-white/30' : 'text-black/30'} flex gap-6`}>
            <a href="#" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Privacy</a>
            <a href="mailto:hello@tipshub.com" className={`hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Contact</a>
            <span>© 2026 TipsHub</span>
          </div>
        </footer>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
    </div>
  )
}

export default App
