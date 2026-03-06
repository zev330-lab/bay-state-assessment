import { useState, useEffect, useRef } from 'react'
import {
  Crosshair, ClipboardList, Home, Building2, Search, Eye,
  DollarSign, TrendingUp, Database, Filter, Users, Mail, Target,
  Zap, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft, ArrowRight,
  Clock, BarChart3, Shield, Layers
} from 'lucide-react'

const FORMSPREE = 'https://formspree.io/f/xgejqkqd'

// ─── Shared Components ───

function ProgressBar({ step, total }) {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
        <span>Step {step} of {total}</span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-500 rounded-full transition-all duration-300"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'Continue', nextDisabled = false, showBack = true }) {
  return (
    <div className="flex gap-3 mt-8">
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 transition min-h-[44px] cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        {nextLabel} <ArrowRight size={16} />
      </button>
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  )
}

function Remarks({ value, onChange, label = "Anything else?", placeholder = "Optional — add any context" }) {
  return (
    <div className="mt-6">
      <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-y text-sm"
      />
    </div>
  )
}

function RadioGroup({ options, value, onChange, name }) {
  return (
    <div className="space-y-2.5">
      {options.map(opt => {
        const val = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        return (
          <label key={val} className="flex items-start gap-3 p-3 rounded-xl border border-slate-700 hover:border-slate-500 cursor-pointer transition has-[:checked]:border-cyan-500 has-[:checked]:bg-cyan-950/30">
            <input type="radio" name={name} value={val} checked={value === val} onChange={() => onChange(val)} className="mt-0.5 accent-cyan-500" />
            <span className="text-sm text-slate-200">{label}</span>
          </label>
        )
      })}
    </div>
  )
}

function CheckboxGroup({ options, values, onChange }) {
  const toggle = val => {
    onChange(values.includes(val) ? values.filter(v => v !== val) : [...values, val])
  }
  return (
    <div className="space-y-2.5">
      {options.map(opt => {
        const val = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        return (
          <label key={val} className="flex items-start gap-3 p-3 rounded-xl border border-slate-700 hover:border-slate-500 cursor-pointer transition has-[:checked]:border-cyan-500 has-[:checked]:bg-cyan-950/30">
            <input type="checkbox" checked={values.includes(val)} onChange={() => toggle(val)} className="mt-0.5 accent-cyan-500" />
            <span className="text-sm text-slate-200">{label}</span>
          </label>
        )
      })}
    </div>
  )
}

function SelectInput({ value, onChange, options, placeholder = "Select..." }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 text-sm appearance-none cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function TextInput({ value, onChange, placeholder, helper }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
      />
      {helper && <p className="text-xs text-slate-500 mt-1.5">{helper}</p>}
    </div>
  )
}


// ─── Screen Components ───

function Screen1({ onNext }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center">
        <Crosshair size={32} className="text-cyan-400" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Lead Generation Assessment</h1>
      <p className="text-cyan-400 text-sm mb-6">Prepared for Bay State Remodeling</p>
      <p className="text-slate-300 text-sm leading-relaxed mb-8">
        Zion — based on our conversation, we've done a deep dive into the lead generation landscape for remodeling companies in Greater Boston. This assessment will walk you through what we found, show you your real options, and then collect the information we need to build your custom strategy.
      </p>
      <div className="space-y-3 mb-8 text-left">
        {[
          { n: 1, title: 'Your Options', desc: "What's available, what it costs, and who it's best for" },
          { n: 2, title: 'Your Market', desc: "Why Greater Boston is ideal for the approach you're exploring" },
          { n: 3, title: 'Your Assessment', desc: 'A few questions so we can scope your custom solution' },
        ].map(item => (
          <Card key={item.n}>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">{item.n}</span>
              <div>
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition min-h-[44px] cursor-pointer"
      >
        Get Started →
      </button>
    </div>
  )
}

function Screen2({ onNext, onBack }) {
  const signals = [
    { icon: ClipboardList, color: 'cyan', title: 'Building Permit Filed', desc: 'A homeowner in Newton just filed for a kitchen plumbing permit. They\'re actively planning a renovation.' },
    { icon: Home, color: 'amber', title: 'Recent Home Purchase', desc: 'Someone closed on a 1965 colonial in Wellesley last month. Odds are high they\'ll want updates.' },
    { icon: Building2, color: 'emerald', title: 'Aging High-Value Home', desc: 'A $1.2M home in Lexington built in 1958. Major systems are due for replacement.' },
    { icon: Search, color: 'purple', title: 'Renovation Intent Signals', desc: 'A homeowner in your area has been browsing kitchen design content online.' },
  ]
  const colors = { cyan: 'border-cyan-700 bg-cyan-950/20', amber: 'border-amber-700 bg-amber-950/20', emerald: 'border-emerald-700 bg-emerald-950/20', purple: 'border-purple-700 bg-purple-950/20' }
  const iconColors = { cyan: 'text-cyan-400', amber: 'text-amber-400', emerald: 'text-emerald-400', purple: 'text-purple-400' }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">What Is Lead Scraping?</h1>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        Lead scraping uses technology to find people who are likely to need your services — before they find you. Instead of waiting for someone to search "kitchen remodeler near me" and hoping they pick you, scraping identifies homeowners based on real signals that they may need renovation work.
      </p>
      <div className="space-y-3 mb-6">
        {signals.map(s => (
          <div key={s.title} className={`border-l-4 ${colors[s.color]} rounded-xl p-4`}>
            <div className="flex items-center gap-2.5 mb-1.5">
              <s.icon size={18} className={iconColors[s.color]} />
              <span className="font-semibold text-white text-sm">{s.title}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-slate-400 text-sm italic mb-6">
        This is the approach you've been researching. The question is how to execute it well — and how it compares to your other options.
      </p>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen3({ onNext, onBack }) {
  const options = [
    {
      label: 'Option A',
      title: 'Lead Platforms',
      badge: 'Angi / Thumbtack / Google LSA',
      color: 'amber',
      points: [
        'You sign up, set a budget, and the platform sends you leads.',
        'Cost: $30-$170 per lead depending on platform',
        'Most leads are shared with 3-5 other contractors',
        'Close rate: 5-15% on shared leads, up to 31% on Google LSA',
        'Monthly spend: typically $2,000-$5,000 for 30-80 leads',
        "Best for: Getting leads immediately, if you don't mind competing for each one",
      ]
    },
    {
      label: 'Option B',
      title: 'Marketing Agency',
      badge: 'SEO / Google Ads / Content',
      color: 'blue',
      points: [
        'An agency builds your online presence and generates inbound leads over time.',
        'Cost: $3,000-$7,000/month retainer plus $2,000-$5,000/month ad spend',
        'Results take 3-6 months to materialize',
        'Most agencies require 6-12 month contracts and own the infrastructure',
        'Close rate: 10-20% on paid leads, higher on organic',
        'Best for: Companies with budget for a long-term brand investment',
      ]
    },
    {
      label: 'Option C',
      title: 'Managed Scraping Pipeline',
      badge: "What We're Exploring Together",
      color: 'cyan',
      points: [
        'A system that pulls homeowner data from public records — building permits, property sales, assessor databases — in your target zip codes.',
        'Every lead is exclusive to you — no other contractor gets the same contact',
        'You own the data and it grows over time',
        'Leads flow within 2-3 weeks of setup',
        'Month-to-month, no long-term contract',
        'Best for: Remodelers who want a proprietary lead source they control',
      ]
    },
  ]

  const borderColors = { amber: 'border-amber-600', blue: 'border-blue-600', cyan: 'border-cyan-600' }
  const badgeColors = { amber: 'bg-amber-900/40 text-amber-300', blue: 'bg-blue-900/40 text-blue-300', cyan: 'bg-cyan-900/40 text-cyan-300' }

  const comparison = [
    { label: 'Leads exclusive?', a: 'No (shared 3-5x)', b: 'Yes (if organic)', c: 'Yes (always)' },
    { label: 'You own the data?', a: 'No', b: 'Usually no', c: 'Yes' },
    { label: 'Time to first lead', a: 'Immediate', b: '1-6 months', c: '2-3 weeks' },
    { label: 'Contract required?', a: 'Varies', b: '6-12 months', c: 'Month-to-month' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Three Ways to Get More Leads</h1>
      <p className="text-slate-400 text-sm mb-6">Here's what the market looks like and where each approach fits.</p>

      <div className="space-y-4 mb-6">
        {options.map(opt => (
          <div key={opt.label} className={`border ${borderColors[opt.color]} rounded-2xl p-5 bg-slate-800/40`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-400">{opt.label}</span>
              <span className="text-white font-semibold text-sm">{opt.title}</span>
            </div>
            <span className={`inline-block text-xs px-2.5 py-1 rounded-full mb-3 ${badgeColors[opt.color]}`}>{opt.badge}</span>
            <ul className="space-y-2">
              {opt.points.map((p, i) => (
                <li key={i} className="text-slate-300 text-xs leading-relaxed flex gap-2">
                  <span className="text-slate-500 mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Comparison - stacked cards on mobile */}
      <div className="space-y-3 mb-6">
        {comparison.map(row => (
          <Card key={row.label}>
            <p className="text-xs font-semibold text-white mb-2">{row.label}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><span className="text-slate-500 block">Platforms</span><span className="text-amber-400">{row.a}</span></div>
              <div><span className="text-slate-500 block">Agency</span><span className="text-blue-400">{row.b}</span></div>
              <div><span className="text-slate-500 block">Scraping</span><span className="text-cyan-400">{row.c}</span></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-400 italic">There's no single right answer — it depends on your goals, budget, and timeline. That's what the assessment will help us figure out.</p>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen4({ onNext, onBack }) {
  const stats = [
    { icon: Home, label: 'Housing Over 55 Years Old', value: '59%', sub: "of Waltham's 26,898 units" },
    { icon: DollarSign, label: 'Median Household Income', value: '$116K', sub: 'Waltham households' },
    { icon: Building2, label: 'Newton Home Values', value: '$1.4M+', sub: 'Median, with premium renovation budgets' },
    { icon: TrendingUp, label: 'MA Remodeling Market', value: '$5.4B', sub: 'Annual market size' },
  ]

  const towns = [
    { name: 'Newton', val: '$1.4M' },
    { name: 'Lexington', val: '$2.0M' },
    { name: 'Wellesley', val: '$1.97M' },
    { name: 'Brookline', val: '$1.1M' },
    { name: 'Cambridge', val: '$1.0M+' },
    { name: 'Waltham', val: '$757K-$900K' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Why Greater Boston Is Perfect for This</h1>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        Your service area has three things that make lead scraping work exceptionally well: aging housing stock that needs renovation, high home values that support premium project budgets, and publicly available permit data.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {stats.map(s => (
          <Card key={s.label}>
            <s.icon size={18} className="text-cyan-400 mb-2" />
            <p className="text-xs text-slate-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="mb-4">
        <p className="text-xs font-semibold text-white mb-3">Service Area — Median Home Values</p>
        <div className="space-y-2">
          {towns.map(t => (
            <div key={t.name} className="flex justify-between text-sm">
              <span className="text-slate-300">{t.name}</span>
              <span className="text-cyan-400 font-semibold">{t.val}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="border-l-4 border-cyan-600 bg-cyan-950/20 rounded-xl p-4 mb-3">
        <p className="text-xs text-slate-300 leading-relaxed">
          Boston publishes building permit data going back to 2009 through its open data portal — completely free and public. This lets us identify homeowners who are actively investing in their properties before any competitor reaches them.
        </p>
      </div>

      <div className="border-l-4 border-amber-600 bg-amber-950/20 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-300 leading-relaxed">
          Massachusetts has one of the worst construction labor shortages in the country — 70% of construction laborers are expected to retire by 2030. Companies that respond fast and show up professionally win a disproportionate share of the work.
        </p>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen5({ onNext, onBack }) {
  const steps = [
    { icon: Database, color: 'text-blue-400 bg-blue-950/40 border-blue-800/30', title: 'Data Collection', desc: 'We pull building permits, property sales records, and assessor data from public databases in your target zip codes.' },
    { icon: Filter, color: 'text-purple-400 bg-purple-950/40 border-purple-800/30', title: 'Filtering', desc: 'We filter for signals that matter: permit type, home age, home value, recent purchase date, and location within your service area.' },
    { icon: Users, color: 'text-amber-400 bg-amber-950/40 border-amber-800/30', title: 'Enrichment', desc: 'Raw addresses become full profiles — homeowner name, mailing address, estimated home value, year built, and where available, contact information.' },
    { icon: Mail, color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/30', title: 'Outreach', desc: 'We either deliver clean lead lists for your team to work, or manage outreach on your behalf through direct mail, email, or both.' },
    { icon: Target, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/30', title: 'Qualified Leads', desc: 'Homeowners who respond are warm, interested, and exclusive to you. They go directly into your sales process.' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">How It Actually Works</h1>
      <p className="text-slate-400 text-sm mb-6">From public data to qualified leads in five steps.</p>

      <div className="relative mb-8">
        {/* Vertical line */}
        <div className="absolute left-5 top-5 bottom-5 w-px bg-slate-700" />
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={i} className="relative flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center z-10 ${s.color}`}>
                <s.icon size={18} />
              </div>
              <div className="pt-1">
                <p className="font-semibold text-white text-sm">{s.title}</p>
                <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample lead card */}
      <div className="bg-slate-900 border border-slate-600 rounded-xl p-4 mb-6 font-mono text-xs">
        <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">Sample Lead Record</p>
        <div className="space-y-1.5">
          <div className="flex"><span className="text-slate-500 w-16">Name</span><span className="text-slate-200">Jane Smith</span></div>
          <div className="flex"><span className="text-slate-500 w-16">Address</span><span className="text-slate-200">42 Oak Street, Newton MA</span></div>
          <div className="flex"><span className="text-slate-500 w-16">Home</span><span className="text-slate-200">1962 Colonial • 3BR/2BA</span></div>
          <div className="flex"><span className="text-slate-500 w-16">Value</span><span className="text-emerald-400">$1,340,000</span></div>
          <div className="flex"><span className="text-slate-500 w-16">Signal</span><span className="text-cyan-400">Kitchen permit filed March 2026</span></div>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-300 leading-relaxed">
          Unlike platform leads, these contacts are never shared with other contractors. And unlike an agency arrangement, you own this data — it's yours to use however you want, forever.
        </p>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen6({ onNext, onBack }) {
  const funnel = [
    { label: '200-500 targeted contacts per month', w: '100%', color: 'bg-cyan-700' },
    { label: '1-3% respond → 5-15 responses', w: '60%', color: 'bg-cyan-600' },
    { label: '~40% become real conversations → 2-6 appointments', w: '35%', color: 'bg-cyan-500' },
    { label: 'At your close rate → 1-3+ new jobs per month', w: '18%', color: 'bg-emerald-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Setting Realistic Expectations</h1>
      <p className="text-slate-400 text-sm mb-6">Here's what the numbers actually look like — we believe in transparency.</p>

      <div className="space-y-2 mb-8">
        {funnel.map((f, i) => (
          <div key={i}>
            <div className={`${f.color} rounded-lg py-2.5 px-4 transition-all`} style={{ width: f.w }}>
              <p className="text-[11px] text-white font-medium leading-tight">{f.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Card className="mb-6">
        <p className="text-xs text-slate-400 mb-1">If your average project is</p>
        <p className="text-2xl font-bold text-white mb-3">$35,000</p>
        <p className="text-xs text-slate-400 mb-1">And this pipeline adds 2 jobs/month</p>
        <p className="text-3xl font-bold text-emerald-400 mb-1">$70,000</p>
        <p className="text-xs text-slate-400">in additional monthly revenue from a single lead channel you fully own</p>
      </Card>

      {/* Prominent honesty box */}
      <div className="bg-amber-950/30 border border-amber-700/50 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={18} className="text-amber-400" />
          <p className="font-semibold text-amber-300 text-sm">Important: Honest Expectations</p>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          This is not a magic button. Scraped leads are "cold" — these are people who didn't contact you first. Response rates are lower than inbound leads from Google. But the cost per lead is dramatically lower, every lead is exclusively yours, and the volume is high enough that even modest conversion rates produce strong returns. The single biggest factor in success is how fast and professionally your team follows up with responses.
        </p>
      </div>

      <p className="text-xs text-slate-500 mb-4">
        For cabinet and countertop sales specifically, the lead profiles and outreach strategies differ from full remodeling projects. We'll tailor everything based on your priorities — which is what the next section is about.
      </p>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen7({ onNext, onBack }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center">
        <BarChart3 size={32} className="text-cyan-400" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Now Let's Talk About Your Business</h1>
      <p className="text-slate-300 text-sm leading-relaxed mb-8">
        The next few screens will ask about your goals, your market, and how you operate. This takes about 5 minutes and gives us everything we need to prepare your custom strategy.
      </p>
      <button
        onClick={onNext}
        className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition min-h-[44px] cursor-pointer"
      >
        Let's Go →
      </button>
      <button
        onClick={onBack}
        className="mt-3 text-slate-400 text-sm hover:text-slate-200 transition cursor-pointer"
      >
        ← Go back
      </button>
    </div>
  )
}

// Assessment screens (8-13)
function Screen8({ data, setField, onNext, onBack }) {
  const services = [
    'Kitchen remodels', 'Bathroom remodels', 'Full home renovations',
    'Additions & extensions', 'Basement finishing',
    'Cabinet & countertop sales (no installation required)',
    'Countertop fabrication & installation only',
    'Design consultations', 'Other'
  ]
  const sizes = ['Under $5K', '$5K-$10K', '$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K-$250K', '$250K+']

  return (
    <div>
      <ProgressBar step={1} total={6} />
      <h1 className="text-xl font-bold mb-1">Your Business Goals</h1>
      <p className="text-xs text-slate-400 mb-6">Understanding your priority helps us target the right prospects with the right message.</p>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-white mb-3">What's your primary goal right now?</p>
          <RadioGroup
            name="goal"
            value={data.primaryGoal}
            onChange={v => setField('primaryGoal', v)}
            options={[
              'Get more full remodeling projects (kitchens, baths, whole-home)',
              'Sell more cabinets and countertops through the showroom',
              'Both — grow remodeling work and showroom sales',
              'Something else',
            ]}
          />
          {data.primaryGoal === 'Something else' && (
            <div className="mt-2">
              <TextInput value={data.primaryGoalOther || ''} onChange={v => setField('primaryGoalOther', v)} placeholder="Tell us more..." />
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Which services do you want leads for?</p>
          <CheckboxGroup
            options={services}
            values={data.services || []}
            onChange={v => setField('services', v)}
          />
          {(data.services || []).includes('Other') && (
            <div className="mt-2">
              <TextInput value={data.servicesOther || ''} onChange={v => setField('servicesOther', v)} placeholder="What other services?" />
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">What's your ideal project size?</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">From</label>
              <SelectInput value={data.projectSizeFrom || ''} onChange={v => setField('projectSizeFrom', v)} options={sizes} />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">To</label>
              <SelectInput value={data.projectSizeTo || ''} onChange={v => setField('projectSizeTo', v)} options={sizes} />
            </div>
          </div>
        </div>

        <Remarks
          value={data.goalsRemarks || ''}
          onChange={v => setField('goalsRemarks', v)}
          label="Anything else about your business priorities?"
          placeholder="Optional — add any context that would help us understand your goals"
        />
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen9({ data, setField, onNext, onBack }) {
  const customerTypes = [
    'Homeowners planning renovations',
    'Recent home buyers (likely to renovate)',
    'Property investors / flippers',
    'Interior designers (for cabinet and countertop referrals)',
    'Other contractors (cabinet trade/wholesale)',
    'Property managers / commercial',
    "Not sure — recommend based on my goals",
  ]

  return (
    <div>
      <ProgressBar step={2} total={6} />
      <h1 className="text-xl font-bold mb-1">Your Ideal Customer</h1>
      <p className="text-xs text-slate-400 mb-6">The more specific you are, the better we can target. But "not sure" is perfectly fine — we'll help you figure it out.</p>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-white mb-2">What towns or zip codes do you want to target?</p>
          <textarea
            value={data.targetAreas || ''}
            onChange={e => setField('targetAreas', e.target.value)}
            placeholder="e.g., Newton, Lexington, Wellesley, Waltham, 02451, 02459..."
            rows={3}
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm resize-y"
          />
          <p className="text-xs text-slate-500 mt-1">List the areas where you want more business. Your current service area covers Greater Boston and MetroWest.</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">What type of customer are you looking for?</p>
          <CheckboxGroup options={customerTypes} values={data.customerTypes || []} onChange={v => setField('customerTypes', v)} />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Home value range you want to target?</p>
          <RadioGroup
            name="homeValue"
            value={data.homeValueRange || ''}
            onChange={v => setField('homeValueRange', v)}
            options={['Under $500K', '$500K - $1M', '$1M - $2M', '$2M+', 'No preference — send everything in my target areas']}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Preferred age of homes?</p>
          <RadioGroup
            name="homeAge"
            value={data.homeAge || ''}
            onChange={v => setField('homeAge', v)}
            options={['Built before 1970 (highest renovation demand)', 'Built 1970-2000', 'Any age', 'Not sure — recommend for me']}
          />
        </div>

        <Remarks value={data.customerRemarks || ''} onChange={v => setField('customerRemarks', v)} label="Any other details about your ideal customer?" />
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen10({ data, setField, onNext, onBack }) {
  const leadSources = [
    'Referrals / word of mouth', 'Google search (organic)', 'Google Ads (paid)',
    'Houzz', 'Angi / HomeAdvisor', 'Thumbtack', 'Social media (Facebook, Instagram)',
    'Showroom walk-ins', 'Builder / contractor referrals', 'Real estate agent referrals', 'Other'
  ]

  return (
    <div>
      <ProgressBar step={3} total={6} />
      <h1 className="text-xl font-bold mb-1">Your Current Situation</h1>
      <p className="text-xs text-slate-400 mb-6">This helps us understand where you're starting from and where the biggest opportunities are.</p>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-white mb-3">Where do your leads come from today?</p>
          <CheckboxGroup options={leadSources} values={data.leadSources || []} onChange={v => setField('leadSources', v)} />
          {(data.leadSources || []).includes('Other') && (
            <div className="mt-2">
              <TextInput value={data.leadSourcesOther || ''} onChange={v => setField('leadSourcesOther', v)} placeholder="What other sources?" />
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-2">Approximately how many leads do you get per month?</p>
          <SelectInput value={data.leadsPerMonth || ''} onChange={v => setField('leadsPerMonth', v)} options={['Less than 10', '10-25', '25-50', '50-100', '100+', 'Not sure']} />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-2">Out of every 10 leads, how many become paying jobs?</p>
          <SelectInput value={data.closeRate || ''} onChange={v => setField('closeRate', v)} options={['1 or fewer', '2-3', '4-5', '6 or more', 'Not sure']} />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">What are you currently spending on marketing per month?</p>
          <RadioGroup
            name="marketingSpend"
            value={data.marketingSpend || ''}
            onChange={v => setField('marketingSpend', v)}
            options={['Nothing / minimal', 'Under $500', '$500-$1,000', '$1,000-$2,500', '$2,500-$5,000', '$5,000+', 'Not sure']}
          />
        </div>

        <Remarks value={data.situationRemarks || ''} onChange={v => setField('situationRemarks', v)} label="Anything else about your current lead flow?" />
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen11({ data, setField, onNext, onBack }) {
  return (
    <div>
      <ProgressBar step={4} total={6} />
      <h1 className="text-xl font-bold mb-1">How You Want to Work</h1>
      <p className="text-xs text-slate-400 mb-6">There's no wrong answer here. Some clients want raw data, others want everything handled for them.</p>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-white mb-3">How would you prefer leads delivered?</p>
          <RadioGroup
            name="delivery"
            value={data.deliveryPref || ''}
            onChange={v => setField('deliveryPref', v)}
            options={[
              'Raw lead lists (spreadsheet/CSV) — my team handles outreach',
              'Leads pushed into a CRM system I can work from',
              'Full-service — scrape the leads, handle outreach, deliver warm responses to me',
              "Not sure yet — recommend based on my situation",
            ]}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">How often do you want new leads?</p>
          <RadioGroup
            name="frequency"
            value={data.leadFrequency || ''}
            onChange={v => setField('leadFrequency', v)}
            options={[
              'One-time batch to test the concept first',
              'Monthly delivery',
              'Bi-weekly delivery',
              'Weekly delivery',
              'Not sure — recommend for me',
            ]}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-2">What got you interested in lead scraping?</p>
          <textarea
            value={data.interest || ''}
            onChange={e => setField('interest', e.target.value)}
            placeholder="Videos you've watched, people you've talked to, things you've seen competitors doing..."
            rows={4}
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm resize-y"
          />
          <p className="text-xs text-slate-500 mt-1">This helps us understand your expectations so we can align our approach.</p>
        </div>

        <Remarks value={data.preferencesRemarks || ''} onChange={v => setField('preferencesRemarks', v)} label="Any other preferences on how you'd like to work together?" />
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen12({ data, setField, onNext, onBack }) {
  return (
    <div>
      <ProgressBar step={5} total={6} />
      <h1 className="text-xl font-bold mb-1">Your Operations</h1>

      <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4 mb-6 flex gap-3 items-start">
        <Zap size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-300 leading-relaxed">
          Contractors who respond to a lead within 5 minutes are 4x more likely to close the job. Speed-to-lead is the single biggest conversion factor — regardless of where the lead comes from.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-white mb-2">Do you use a CRM or lead tracking system?</p>
          <TextInput value={data.crm || ''} onChange={v => setField('crm', v)} placeholder="e.g., BuilderTrend, JobNimbus, HubSpot, spreadsheet, nothing yet..." />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Who handles new leads when they come in?</p>
          <RadioGroup
            name="leadHandler"
            value={data.leadHandler || ''}
            onChange={v => setField('leadHandler', v)}
            options={[
              'Me personally',
              'A dedicated salesperson or estimator',
              'Office / admin staff',
              'Whoever is available at the time',
              "Nobody specifically — they wait until I get to them",
            ]}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">How quickly do you typically respond to new inquiries?</p>
          <RadioGroup
            name="responseTime"
            value={data.responseTime || ''}
            onChange={v => setField('responseTime', v)}
            options={[
              'Within minutes',
              'Within an hour',
              'Same day',
              'Next business day',
              'It varies / inconsistent',
              'Honestly, this is an area that needs improvement',
            ]}
          />
        </div>

        <Remarks value={data.opsRemarks || ''} onChange={v => setField('opsRemarks', v)} label="Any other context about your team or sales process?" />
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}

function Screen13({ data, setField, onNext, onBack, onEdit, onSubmit, submitting }) {
  const [expanded, setExpanded] = useState({})
  const toggle = k => setExpanded(prev => ({ ...prev, [k]: !prev[k] }))

  const sections = [
    {
      key: 'goals', title: 'Business Goals', screen: 8,
      items: [
        { label: 'Primary Goal', value: data.primaryGoal + (data.primaryGoalOther ? ` — ${data.primaryGoalOther}` : '') },
        { label: 'Services', value: (data.services || []).join(', ') + (data.servicesOther ? ` (${data.servicesOther})` : '') },
        { label: 'Project Size', value: data.projectSizeFrom && data.projectSizeTo ? `${data.projectSizeFrom} to ${data.projectSizeTo}` : 'Not specified' },
        data.goalsRemarks && { label: 'Notes', value: data.goalsRemarks },
      ].filter(Boolean)
    },
    {
      key: 'customer', title: 'Ideal Customer', screen: 9,
      items: [
        { label: 'Target Areas', value: data.targetAreas || 'Not specified' },
        { label: 'Customer Types', value: (data.customerTypes || []).join(', ') || 'Not specified' },
        { label: 'Home Value Range', value: data.homeValueRange || 'Not specified' },
        { label: 'Home Age', value: data.homeAge || 'Not specified' },
        data.customerRemarks && { label: 'Notes', value: data.customerRemarks },
      ].filter(Boolean)
    },
    {
      key: 'situation', title: 'Current Situation', screen: 10,
      items: [
        { label: 'Lead Sources', value: (data.leadSources || []).join(', ') + (data.leadSourcesOther ? ` (${data.leadSourcesOther})` : '') || 'Not specified' },
        { label: 'Leads/Month', value: data.leadsPerMonth || 'Not specified' },
        { label: 'Close Rate', value: data.closeRate || 'Not specified' },
        { label: 'Marketing Spend', value: data.marketingSpend || 'Not specified' },
        data.situationRemarks && { label: 'Notes', value: data.situationRemarks },
      ].filter(Boolean)
    },
    {
      key: 'preferences', title: 'Preferences', screen: 11,
      items: [
        { label: 'Lead Delivery', value: data.deliveryPref || 'Not specified' },
        { label: 'Frequency', value: data.leadFrequency || 'Not specified' },
        { label: 'Interest', value: data.interest || 'Not specified' },
        data.preferencesRemarks && { label: 'Notes', value: data.preferencesRemarks },
      ].filter(Boolean)
    },
    {
      key: 'operations', title: 'Operations', screen: 12,
      items: [
        { label: 'CRM', value: data.crm || 'Not specified' },
        { label: 'Lead Handler', value: data.leadHandler || 'Not specified' },
        { label: 'Response Time', value: data.responseTime || 'Not specified' },
        data.opsRemarks && { label: 'Notes', value: data.opsRemarks },
      ].filter(Boolean)
    },
    {
      key: 'timeline', title: 'Timeline', screen: 13,
      items: [
        { label: 'Start Date', value: data.timeline || 'Not specified' },
        data.finalThoughts && { label: 'Additional Notes', value: data.finalThoughts },
      ].filter(Boolean)
    },
  ]

  return (
    <div>
      <ProgressBar step={6} total={6} />
      <h1 className="text-xl font-bold mb-6">Almost Done</h1>

      <div className="space-y-6 mb-6">
        <div>
          <p className="text-sm font-semibold text-white mb-3">When are you looking to get started?</p>
          <RadioGroup
            name="timeline"
            value={data.timeline || ''}
            onChange={v => setField('timeline', v)}
            options={[
              'As soon as possible — within 2 weeks',
              'Within the next 30 days',
              'Within 60 days',
              'No rush — planning ahead for next quarter',
            ]}
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-2">Is there anything else on your mind?</p>
          <textarea
            value={data.finalThoughts || ''}
            onChange={e => setField('finalThoughts', e.target.value)}
            placeholder="Questions, concerns, other goals, things we haven't covered — anything you'd like us to know..."
            rows={5}
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm resize-y"
          />
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-3">Review Your Answers</h2>

      <div className="space-y-2 mb-8">
        {sections.map(sec => (
          <div key={sec.key} className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(sec.key)}
              className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
            >
              <span className="text-sm font-semibold text-white">{sec.title}</span>
              <div className="flex items-center gap-2">
                <span
                  onClick={e => { e.stopPropagation(); onEdit(sec.screen) }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  Edit
                </span>
                {expanded[sec.key] ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </div>
            </button>
            {expanded[sec.key] && (
              <div className="px-4 pb-4 space-y-2 border-t border-slate-700/50 pt-3">
                {sec.items.map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-xs text-slate-300">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition min-h-[44px] disabled:opacity-50 cursor-pointer"
      >
        {submitting ? 'Submitting...' : 'Submit Assessment →'}
      </button>

      <button
        onClick={onBack}
        className="w-full mt-3 text-slate-400 text-sm hover:text-slate-200 transition cursor-pointer"
      >
        ← Go back
      </button>
    </div>
  )
}

function Screen14() {
  const steps = [
    'We analyze your responses against the market data we\'ve compiled for your service area',
    'We prepare a custom lead generation strategy tailored to your goals and budget',
    'We\'ll reach out within 48 hours to schedule a 30-minute strategy call to walk through our recommendation',
  ]

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-950/50 border border-emerald-700/30 flex items-center justify-center">
        <CheckCircle2 size={32} className="text-emerald-400" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Assessment Received</h1>
      <p className="text-slate-300 text-sm leading-relaxed mb-8">
        Thank you, Zion. We've received your assessment and will review it alongside our Greater Boston market research.
      </p>

      <div className="text-left space-y-4 mb-8">
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">What happens next</p>
        {steps.map((s, i) => (
          <div key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
            <p className="text-sm text-slate-300 pt-0.5">{s}</p>
          </div>
        ))}
      </div>

      <Card className="mb-8">
        <p className="text-sm text-slate-300">Questions in the meantime?</p>
        <a href="mailto:zev330@gmail.com" className="text-cyan-400 text-sm hover:text-cyan-300">zev330@gmail.com</a>
      </Card>

      <p className="text-xs text-slate-500">Zev Steinmetz | Technology Consulting</p>
    </div>
  )
}


// ─── Main App ───

function App() {
  const [screen, setScreen] = useState(1)
  const [fade, setFade] = useState(true)
  const [returnTo, setReturnTo] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const containerRef = useRef(null)

  const [data, setData] = useState({
    primaryGoal: '', primaryGoalOther: '', services: [], servicesOther: '',
    projectSizeFrom: '', projectSizeTo: '', goalsRemarks: '',
    targetAreas: '', customerTypes: [], homeValueRange: '', homeAge: '', customerRemarks: '',
    leadSources: [], leadSourcesOther: '', leadsPerMonth: '', closeRate: '', marketingSpend: '', situationRemarks: '',
    deliveryPref: '', leadFrequency: '', interest: '', preferencesRemarks: '',
    crm: '', leadHandler: '', responseTime: '', opsRemarks: '',
    timeline: '', finalThoughts: '',
  })

  const setField = (key, val) => setData(prev => ({ ...prev, [key]: val }))

  const go = (n) => {
    setFade(false)
    setTimeout(() => {
      setScreen(n)
      setFade(true)
      if (containerRef.current) containerRef.current.scrollTo(0, 0)
      window.scrollTo(0, 0)
    }, 150)
  }

  const next = () => {
    if (returnTo && screen < 13) {
      go(13)
      setReturnTo(null)
    } else {
      go(screen + 1)
    }
  }
  const back = () => go(screen - 1)

  const handleEdit = (targetScreen) => {
    setReturnTo(13)
    go(targetScreen)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Bay State Remodeling — Lead Generation Assessment',
          ...data,
          services: (data.services || []).join(', '),
          customerTypes: (data.customerTypes || []).join(', '),
          leadSources: (data.leadSources || []).join(', '),
        }),
      })
      if (res.ok) {
        go(14)
      } else {
        // Fallback: mailto
        openMailto()
      }
    } catch {
      openMailto()
    } finally {
      setSubmitting(false)
    }
  }

  const openMailto = () => {
    const lines = [
      '=== BAY STATE REMODELING — LEAD GENERATION ASSESSMENT ===\n',
      '--- Business Goals ---',
      `Primary Goal: ${data.primaryGoal}${data.primaryGoalOther ? ' — ' + data.primaryGoalOther : ''}`,
      `Services: ${(data.services || []).join(', ')}${data.servicesOther ? ' (' + data.servicesOther + ')' : ''}`,
      `Project Size: ${data.projectSizeFrom || 'N/A'} to ${data.projectSizeTo || 'N/A'}`,
      data.goalsRemarks ? `Notes: ${data.goalsRemarks}` : '',
      '\n--- Ideal Customer ---',
      `Target Areas: ${data.targetAreas || 'N/A'}`,
      `Customer Types: ${(data.customerTypes || []).join(', ') || 'N/A'}`,
      `Home Value Range: ${data.homeValueRange || 'N/A'}`,
      `Home Age: ${data.homeAge || 'N/A'}`,
      data.customerRemarks ? `Notes: ${data.customerRemarks}` : '',
      '\n--- Current Situation ---',
      `Lead Sources: ${(data.leadSources || []).join(', ') || 'N/A'}`,
      `Leads/Month: ${data.leadsPerMonth || 'N/A'}`,
      `Close Rate: ${data.closeRate || 'N/A'}`,
      `Marketing Spend: ${data.marketingSpend || 'N/A'}`,
      data.situationRemarks ? `Notes: ${data.situationRemarks}` : '',
      '\n--- Preferences ---',
      `Lead Delivery: ${data.deliveryPref || 'N/A'}`,
      `Frequency: ${data.leadFrequency || 'N/A'}`,
      `Interest: ${data.interest || 'N/A'}`,
      data.preferencesRemarks ? `Notes: ${data.preferencesRemarks}` : '',
      '\n--- Operations ---',
      `CRM: ${data.crm || 'N/A'}`,
      `Lead Handler: ${data.leadHandler || 'N/A'}`,
      `Response Time: ${data.responseTime || 'N/A'}`,
      data.opsRemarks ? `Notes: ${data.opsRemarks}` : '',
      '\n--- Timeline ---',
      `Start: ${data.timeline || 'N/A'}`,
      data.finalThoughts ? `Additional Notes: ${data.finalThoughts}` : '',
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:zev330@gmail.com?subject=${encodeURIComponent('Bay State Remodeling — Lead Generation Assessment')}&body=${encodeURIComponent(lines)}`
    go(14)
  }

  const screenProps = { data, setField, onNext: next, onBack: back }

  const renderScreen = () => {
    switch (screen) {
      case 1: return <Screen1 onNext={next} />
      case 2: return <Screen2 onNext={next} onBack={back} />
      case 3: return <Screen3 onNext={next} onBack={back} />
      case 4: return <Screen4 onNext={next} onBack={back} />
      case 5: return <Screen5 onNext={next} onBack={back} />
      case 6: return <Screen6 onNext={next} onBack={back} />
      case 7: return <Screen7 onNext={next} onBack={back} />
      case 8: return <Screen8 {...screenProps} />
      case 9: return <Screen9 {...screenProps} />
      case 10: return <Screen10 {...screenProps} />
      case 11: return <Screen11 {...screenProps} />
      case 12: return <Screen12 {...screenProps} />
      case 13: return <Screen13 {...screenProps} onEdit={handleEdit} onSubmit={handleSubmit} submitting={submitting} />
      case 14: return <Screen14 />
      default: return null
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-navy">
      <div className="max-w-lg mx-auto px-5 py-8">
        <div
          className={`transition-all duration-200 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}

export default App
