import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  DollarSign, 
  Globe, 
  Clock, 
  ChevronRight, 
  Mail,
  Menu,
  X,
  ExternalLink,
  TrendingUp,
  CreditCard,
  Gift,
  Video,
  CheckCircle,
  Star
} from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background-primary relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">T</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">TipsHub</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-smooth">Features</a>
            <a href="#about" className="text-sm text-text-secondary hover:text-text-primary transition-smooth">About</a>
            <a href="mailto:hello@tipshub.com" className="text-sm text-text-secondary hover:text-text-primary transition-smooth">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-b border-border bg-background-secondary"
          >
            <div className="flex flex-col p-6 gap-4">
              <a href="#features" className="text-sm text-text-secondary">Features</a>
              <a href="#about" className="text-sm text-text-secondary">About</a>
              <a href="mailto:hello@tipshub.com" className="text-sm text-text-secondary">Contact</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-full mb-8">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-xs text-text-muted uppercase tracking-wider">Coming Soon</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 leading-tight"
            >
              Earn money online.<br />
              <span className="text-text-secondary">The complete directory.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12"
            >
              A curated directory of verified earning platforms. 
              Surveys, cashback, microtasks — all in one place.
            </motion.p>

            {/* Email Signup */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              {isSubmitted ? (
                <div className="flex items-center justify-center gap-2 text-text-secondary">
                  <CheckCircle size={20} />
                  <span>We'll notify you when we launch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-white/30 focus:outline-none transition-smooth text-white placeholder:text-text-muted"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-smooth"
                  >
                    Join
                  </button>
                </form>
              )}
              <p className="text-xs text-text-muted mt-4">
                Join 2,000+ others waiting for launch. No spam.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">What we're building</h2>
              <p className="text-text-secondary max-w-xl">
                A modern, fast directory to find legitimate ways to earn money online.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureCard 
                icon={Search}
                title="Search & Filter"
                description="Find platforms by earning type, payout method, minimum payout, and more."
                delay={0.1}
              />
              <FeatureCard 
                icon={Globe}
                title="Nigeria Focus"
                description="Special filters for Lagos and Nigeria availability. Know what's accessible."
                delay={0.2}
              />
              <FeatureCard 
                icon={Clock}
                title="Last Verified"
                description="Every platform checked for availability. No dead links or scams."
                delay={0.3}
              />
              <FeatureCard 
                icon={DollarSign}
                title="Earnings Info"
                description="Minimum payouts and average earnings reported by users."
                delay={0.4}
              />
              <FeatureCard 
                icon={TrendingUp}
                title="Status Tracking"
                description="Active, low-paying, or avoid. Know the current status of each platform."
                delay={0.5}
              />
              <FeatureCard 
                icon={ExternalLink}
                title="Quick Signup"
                description="One-click links to sign up. Get started instantly."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Earning Methods Preview */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">Platforms by category</h2>
              <p className="text-text-secondary max-w-xl">
                Discover earning opportunities across multiple categories.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <CategoryPill icon={Video} label="Surveys" />
              <CategoryPill icon={Gift} label="Cashback" />
              <CategoryPill icon={CreditCard} label="Microtasks" />
              <CategoryPill icon={DollarSign} label="Referrals" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem number="50+" label="Verified Platforms" />
              <StatItem number="6" label="Categories" />
              <StatItem number="4" label="Payout Methods" />
              <StatItem number="100%" label="Curated" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">Why TipsHub?</h2>
            <p className="text-text-secondary leading-relaxed">
              We built TipsHub because finding legitimate ways to earn money online is hard. 
              Scams, dead links, and outdated information waste your time. 
              We're building a curated, always-up-to-date directory so you can focus on earning.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-border">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">Get early access</h2>
            <p className="text-text-secondary mb-8">
              Be the first to know when we launch. Early users get exclusive features.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              {isSubmitted ? (
                <div className="flex items-center justify-center gap-2 text-text-secondary py-3">
                  <CheckCircle size={20} />
                  <span>You're on the list!</span>
                </div>
              ) : (
                <>
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-background-secondary border border-border rounded-lg focus:border-white/30 focus:outline-none transition-smooth text-white placeholder:text-text-muted"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-smooth flex items-center gap-2"
                  >
                    Join <ChevronRight size={16} />
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">T</span>
            </div>
            <span className="text-sm text-text-muted">© 2026 TipsHub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <a href="#" className="hover:text-text-primary transition-smooth">Privacy</a>
            <a href="#" className="hover:text-text-primary transition-smooth">Terms</a>
            <a href="mailto:hello@tipshub.com" className="hover:text-text-primary transition-smooth">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-6 bg-background-secondary border border-border rounded-xl hover:border-border-light transition-smooth group"
    >
      <Icon className="w-5 h-5 text-text-muted mb-4 group-hover:text-text-primary transition-smooth" />
      <h3 className="font-medium text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  )
}

function CategoryPill({ icon: Icon, label }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-2 px-4 py-3 bg-background-secondary border border-border rounded-lg hover:border-border-light transition-smooth"
    >
      <Icon className="w-4 h-4 text-text-muted" />
      <span className="text-sm text-text-secondary">{label}</span>
    </motion.div>
  )
}

function StatItem({ number, label }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="font-display text-3xl md:text-4xl font-semibold mb-1">{number}</div>
      <div className="text-sm text-text-muted">{label}</div>
    </motion.div>
  )
}

export default App
