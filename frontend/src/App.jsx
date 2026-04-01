import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:60px_60px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top] opacity-40" />
      </div>
      
      {/* Floating geometric shapes */}
      <motion.div 
        style={{ y: y1, x: mousePosition.x * 20 }}
        className="absolute top-20 left-[10%] w-px h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
      <motion.div 
        style={{ y: y2, x: mousePosition.x * -20 }}
        className="absolute top-40 right-[15%] w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <motion.div 
        style={{ x: mousePosition.x * 30, y: mousePosition.y * 30 }}
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-60"
      />
      <motion.div 
        style={{ x: mousePosition.x * -40, y: mousePosition.y * -40 }}
        className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full"
      />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l border-t border-white/20" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-white/20" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l border-b border-white/20" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-white/20" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
              <span className="font-mono text-sm">T</span>
            </div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase">TipsHub</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-xs text-white/40"
          >
            0.1.0 // COMING SOON
          </motion.div>
        </header>

        {/* Hero */}
        <main className="flex-1 flex flex-col justify-center items-center px-8">
          <motion.div style={{ opacity }} className="text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase">
                /// ONLINE EARNINGS DIRECTORY
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-mono text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-[0.9]"
            >
              <span className="block">EARN.</span>
              <span className="block text-white/30">DIRECTORY.</span>
              <span className="block">PROFIT.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-mono text-xs text-white/40 max-w-md mx-auto mb-12 leading-relaxed"
            >
              Curated platforms for surveys, cashback, microtasks & referrals. 
              All verified. All accessible.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-mono text-xs text-white/60 tracking-wider"
                >
                  /// ACCESS REQUESTED
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
                  <input 
                    type="email" 
                    placeholder="email@domain"
                    required
                    className="flex-1 bg-transparent border-b border-white/20 py-3 px-2 font-mono text-sm text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none transition-colors"
                  />
                  <button 
                    type="submit"
                    className="font-mono text-xs text-white/60 hover:text-white transition-colors px-4 tracking-wider"
                  >
                    JOIN_
                  </button>
                </form>
              )}
              
              <div className="flex gap-8 font-mono text-[10px] text-white/30">
                <span>50+ PLATFORMS</span>
                <span>///</span>
                <span>6 CATEGORIES</span>
                <span>///</span>
                <span>VERIFIED</span>
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 flex justify-between items-end">
          <div className="font-mono text-[10px] text-white/20">
            <div>NIGERIA FOCUS</div>
            <div>LAFPS /// NG</div>
          </div>
          
          <div className="font-mono text-[10px] text-white/20">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
              <a href="mailto:hello@tipshub.com" className="hover:text-white transition-colors">CONTACT</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
    </div>
  )
}

export default App
