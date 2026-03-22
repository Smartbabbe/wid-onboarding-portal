import { useState } from 'react'

const STEPS = [
  {
    id: 'wallet',
    title: 'Set Up Your Wallet',
    emoji: '👛',
    duration: '10 min',
    desc: 'Your wallet is your identity in Web3. We\'ll help you create one safely.',
    content: [
      { heading:'What is a crypto wallet?', body:'A wallet stores your private keys — the passwords that prove ownership of your crypto. It never holds your coins directly; those live on the blockchain.' },
      { heading:'Choose your first wallet', body:'We recommend MetaMask for beginners. It\'s free, secure, and works with most DeFi applications on Ethereum and compatible chains.' },
      { heading:'The Golden Rule', body:'Your seed phrase (12-24 words) is the master key to your wallet. Write it on paper, store it safely, and NEVER share it with anyone — not even us.' },
    ],
    quiz: { q:'What should you NEVER share with anyone?', options:['Your wallet address','Your seed phrase','Your username','Your email'], answer:1 },
    resources: [{ label:'Download MetaMask', url:'https://metamask.io' }, { label:'Watch: Wallet Setup Guide', url:'#' }],
  },
  {
    id: 'defi',
    title: 'Understanding DeFi',
    emoji: '🏦',
    duration: '15 min',
    desc: 'DeFi (Decentralised Finance) lets you access financial services without banks.',
    content: [
      { heading:'What is DeFi?', body:'DeFi protocols are smart contracts that automate financial services — lending, borrowing, trading, and earning yield — without intermediaries.' },
      { heading:'Key protocols to know', body:'Uniswap (DEX for swapping tokens), Aave (lending & borrowing), Compound (earn interest), and Yearn (automated yield strategies).' },
      { heading:'Understanding risk', body:'DeFi offers real rewards but carries risks: smart contract bugs, liquidation risk in lending, and impermanent loss in liquidity pools. Start small.' },
    ],
    quiz: { q:'What does DEX stand for?', options:['Digital Exchange','Decentralised Exchange','Direct Exchange','Dynamic Exchange'], answer:1 },
    resources: [{ label:'Explore Uniswap', url:'https://uniswap.org' }, { label:'DeFi Safety Checklist', url:'#' }],
  },
  {
    id: 'tools',
    title: 'Essential Tools',
    emoji: '🛠️',
    duration: '12 min',
    desc: 'Master the tools that every DeFi user needs in their research toolkit.',
    content: [
      { heading:'Price & market data', body:'CoinGecko and CoinMarketCap give you price data, market cap rankings, and exchange listings. Always verify contract addresses here before trading.' },
      { heading:'Protocol analytics', body:'DefiLlama tracks TVL (Total Value Locked) across DeFi protocols — a key indicator of protocol health and adoption.' },
      { heading:'On-chain research', body:'Etherscan lets you verify transactions, check token contracts, and track wallet activity. Bubblemaps shows token distribution to spot red flags.' },
    ],
    quiz: { q:'What does TVL stand for?', options:['Total Value Listed','Total Volume Locked','Total Value Locked','Token Verified Level'], answer:2 },
    resources: [{ label:'DefiLlama', url:'https://defillama.com' }, { label:'Etherscan', url:'https://etherscan.io' }],
  },
  {
    id: 'safety',
    title: 'Staying Safe',
    emoji: '🛡️',
    duration: '8 min',
    desc: 'Security is non-negotiable in DeFi. Learn to protect yourself.',
    content: [
      { heading:'Common scams to avoid', body:'Phishing sites that look like real protocols, fake token airdrop DMs, and "too good to be true" APY offers. If you didn\'t seek it out, be suspicious.' },
      { heading:'Smart contract safety', body:'Always verify you\'re on the official website. Bookmark DeFi sites — never click links from social media or DMs. Revoke approvals you no longer use.' },
      { heading:'Start small, learn fast', body:'Use small amounts when trying new protocols. Check DeFiSafety.com for protocol security ratings. Never invest more than you can afford to lose.' },
    ],
    quiz: { q:'What should you do before interacting with a DeFi protocol?', options:['Just trust the link someone sent you','Verify the official website URL','Send all your funds immediately','Skip the security check'], answer:1 },
    resources: [{ label:'DeFi Safety Ratings', url:'https://defisafety.com' }, { label:'Revoke Approvals', url:'https://revoke.cash' }],
  },
]

export default function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed,   setCompleted]   = useState<Set<number>>(new Set())
  const [quizAnswer,  setQuizAnswer]  = useState<number|null>(null)
  const [showQuiz,    setShowQuiz]    = useState(false)
  const [tab,         setTab]         = useState<'learn'|'register'|'resources'>('learn')
  const [form,        setForm]        = useState({ name:'', email:'', twitter:'', experience:'beginner' })
  const [submitted,   setSubmitted]   = useState(false)

  const step = STEPS[currentStep]
  const allDone = completed.size === STEPS.length

  const completeStep = () => {
    setCompleted(prev => new Set([...prev, currentStep]))
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowQuiz(false)
      setQuizAnswer(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f4] text-gray-900" style={{fontFamily:"'Outfit',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');`}</style>

      {/* Header */}
      <header className="bg-white border-b border-stone-100 px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-base" style={{background:'linear-gradient(135deg,#b87333,#d4956a)'}}>W</div>
          <div>
            <p className="font-bold text-gray-900 text-base leading-none">Women in DeFi</p>
            <p className="text-stone-400 text-[10px] tracking-widest uppercase leading-none mt-0.5">Enugu Chapter</p>
          </div>
        </div>
        <div className="flex gap-1 bg-stone-100 rounded-xl p-1">
          {(['learn','register','resources'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${tab===t?'bg-white text-amber-700 shadow-sm':'text-stone-500 hover:text-stone-700'}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* LEARN */}
      {tab==='learn' && (
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">

          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-700 text-sm">{completed.size}/{STEPS.length} modules complete</p>
              {allDone && <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">🎉 All done!</span>}
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{width:`${(completed.size/STEPS.length)*100}%`,background:'linear-gradient(to right,#b87333,#d4956a)'}}/>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-3 mb-8">
            {STEPS.map((s, i) => (
              <button key={s.id} onClick={()=>{setCurrentStep(i);setShowQuiz(false);setQuizAnswer(null)}}
                className={`p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] ${currentStep===i?'border-amber-300 bg-amber-50':'border-stone-200 bg-white hover:border-stone-300'} ${completed.has(i)?'border-emerald-200 bg-emerald-50':''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{s.emoji}</span>
                  {completed.has(i)
                    ? <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</span>
                    : <span className="text-[10px] text-stone-400">{s.duration}</span>
                  }
                </div>
                <p className={`font-semibold text-xs leading-snug ${currentStep===i?'text-amber-800':completed.has(i)?'text-emerald-700':'text-gray-700'}`}>{s.title}</p>
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-stone-100" style={{background:'linear-gradient(135deg,#fdf6ef,#fae8d4)'}}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{step.emoji}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1">Module {currentStep+1} of {STEPS.length}</p>
                  <h2 className="font-bold text-2xl text-gray-900">{step.title}</h2>
                  <p className="text-stone-600 text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            </div>
            <div className="px-8 py-8">
              <div className="space-y-6 mb-8">
                {step.content.map((c,i)=>(
                  <div key={i}>
                    <h3 className="font-bold text-gray-900 mb-2">{c.heading}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="flex flex-wrap gap-3 mb-8">
                {step.resources.map(r=>(
                  <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                    {r.label} ↗
                  </a>
                ))}
              </div>

              {/* Quiz */}
              {!showQuiz && !completed.has(currentStep) && (
                <button onClick={()=>setShowQuiz(true)}
                  className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-98"
                  style={{background:'linear-gradient(135deg,#b87333,#d4956a)'}}>
                  Take the Quick Quiz →
                </button>
              )}

              {showQuiz && !completed.has(currentStep) && (
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <p className="font-semibold text-gray-800 mb-4">{step.quiz.q}</p>
                  <div className="space-y-2 mb-4">
                    {step.quiz.options.map((opt,i)=>(
                      <button key={i} onClick={()=>setQuizAnswer(i)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          quizAnswer===null?'border-stone-200 hover:border-amber-300 hover:bg-amber-50':
                          i===step.quiz.answer?'border-emerald-300 bg-emerald-50 text-emerald-700':
                          quizAnswer===i?'border-rose-300 bg-rose-50 text-rose-700':
                          'border-stone-200 text-stone-400'
                        }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {quizAnswer !== null && (
                    <div className="space-y-3">
                      <p className={`text-sm font-semibold ${quizAnswer===step.quiz.answer?'text-emerald-600':'text-rose-600'}`}>
                        {quizAnswer===step.quiz.answer?'✓ Correct! Well done.':'✗ Not quite — the correct answer is highlighted above.'}
                      </p>
                      <button onClick={completeStep}
                        className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                        style={{background:'linear-gradient(135deg,#b87333,#d4956a)'}}>
                        {currentStep<STEPS.length-1?'Next Module →':'Complete Course 🎉'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {completed.has(currentStep) && (
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-emerald-700">Module Complete!</p>
                    <p className="text-emerald-600 text-xs">Great work — keep going.</p>
                  </div>
                  {currentStep<STEPS.length-1 && (
                    <button onClick={()=>{setCurrentStep(currentStep+1);setShowQuiz(false);setQuizAnswer(null)}}
                      className="ml-auto text-xs font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
                      style={{background:'linear-gradient(135deg,#b87333,#d4956a)'}}>
                      Next →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REGISTER */}
      {tab==='register' && (
        <div className="max-w-xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <span className="text-5xl block mb-4">🌸</span>
            <h2 className="font-bold text-3xl mb-2" style={{fontFamily:'Playfair Display,serif'}}>Join the Community</h2>
            <p className="text-stone-500">Register for the next Women in DeFi Enugu cohort</p>
          </div>
          {submitted ? (
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-10 text-center">
              <span className="text-5xl block mb-4">🎉</span>
              <p className="font-bold text-xl mb-2">You're on the list!</p>
              <p className="text-stone-500 text-sm">We'll be in touch with details about the next cohort. Welcome to the community!</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
              <div className="space-y-4">
                {[{label:'Full Name',key:'name',type:'text',placeholder:'Your name'},{label:'Email Address',key:'email',type:'email',placeholder:'you@email.com'},{label:'Twitter / X Handle',key:'twitter',type:'text',placeholder:'@yourhandle (optional)'}].map(f=>(
                  <div key={f.key}>
                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">{f.label}</label>
                    <input type={f.type} value={(form as any)[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.placeholder}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors"/>
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">DeFi Experience</label>
                  <select value={form.experience} onChange={e=>setForm(p=>({...p,experience:e.target.value}))}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-colors">
                    <option value="beginner">Complete Beginner</option>
                    <option value="basic">I have a wallet but haven't used DeFi</option>
                    <option value="intermediate">I've tried some DeFi protocols</option>
                    <option value="experienced">I'm fairly experienced in DeFi</option>
                  </select>
                </div>
                <button
                  onClick={()=>form.name&&form.email&&setSubmitted(true)}
                  className="w-full py-4 rounded-2xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-98 mt-2"
                  style={{background:'linear-gradient(135deg,#b87333,#d4956a)'}}>
                  Register for Next Cohort →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESOURCES */}
      {tab==='resources' && (
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="font-bold text-3xl mb-8" style={{fontFamily:'Playfair Display,serif'}}>Resource Library</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { emoji:'📚', title:'DeFi Basics Guide', desc:'A comprehensive PDF covering wallets, DEXs, lending, and yield farming from scratch.', tag:'PDF' },
              { emoji:'🔒', title:'Wallet Security Checklist', desc:'12 essential security steps every DeFi user must follow to protect their funds.', tag:'Checklist' },
              { emoji:'🦙', title:'DefiLlama Tutorial', desc:'Step-by-step guide to using DefiLlama for protocol research and TVL analysis.', tag:'Tutorial' },
              { emoji:'🎥', title:'Cohort 1 Recordings', desc:'Full video recordings from our first cohort — available exclusively to registered members.', tag:'Video' },
              { emoji:'📊', title:'DeFi Tools Comparison Sheet', desc:'Side-by-side comparison of the top 20 DeFi tools across 8 categories.', tag:'Sheet' },
              { emoji:'🤝', title:'Telegram Community', desc:'Join 200+ women learning DeFi together. Daily alpha, questions, and support.', tag:'Community' },
            ].map(r=>(
              <div key={r.title} className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-amber-200 transition-colors hover:shadow-sm cursor-pointer group">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{r.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{r.tag}</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-300 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-0.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
