import { useMemo, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpen, Check, ChevronDown,
  CircleHelp, Code2, Compass, ExternalLink, GraduationCap, Laptop, Menu,
  Network, Search, ShieldCheck, Terminal, X, Zap, Server, LockKeyhole,
  Database, Wrench, Target, Github, Linkedin, Mail, Sparkles
} from 'lucide-react'

const certifications = [
  {
    id: 'a-plus',
    name: 'CompTIA A+',
    issuer: 'CompTIA',
    level: 'Entry level',
    category: 'Core IT',
    color: 'blue',
    summary: 'A starting point for building practical IT support and troubleshooting skills across devices, operating systems, and networks.',
    skills: ['Hardware and mobile devices', 'Operating systems', 'Troubleshooting', 'Security fundamentals'],
    bestFor: 'Beginners who want a broad foundation in IT support before moving into system administration.',
    url: 'https://www.comptia.org/certifications/a',
    icon: Laptop,
    mark: 'A+',
  },
  {
    id: 'network-plus',
    name: 'CompTIA Network+',
    issuer: 'CompTIA',
    level: 'Early career',
    category: 'Networking',
    color: 'cyan',
    summary: 'Builds knowledge of network connectivity, implementation, operations, security, and troubleshooting.',
    skills: ['Network concepts', 'Infrastructure and operations', 'Network troubleshooting', 'Network security'],
    bestFor: 'Learners who want to understand how systems communicate and how to diagnose connectivity issues.',
    url: 'https://www.comptia.org/certifications/network',
    icon: Network,
    mark: 'N+',
  },
  {
    id: 'security-plus',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    level: 'Early career',
    category: 'Security',
    color: 'violet',
    summary: 'Covers baseline cybersecurity concepts that help administrators protect systems, data, and networks.',
    skills: ['Threats and vulnerabilities', 'Secure architecture', 'Identity and access', 'Risk management'],
    bestFor: 'Aspiring administrators who want security to be part of their everyday system management practice.',
    url: 'https://www.comptia.org/certifications/security',
    icon: ShieldCheck,
    mark: 'S+',
  },
  {
    id: 'rhcsa',
    name: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    level: 'Hands-on',
    category: 'Linux',
    color: 'red',
    summary: 'Validates core skills for administering Red Hat Enterprise Linux, including command-line work and system services.',
    skills: ['Linux command line', 'Users and permissions', 'Storage and file systems', 'Services and security'],
    bestFor: 'Learners interested in Linux servers and practical, performance-based administration tasks.',
    url: 'https://www.redhat.com/en/services/certification/rhcsa',
    icon: Terminal,
    mark: 'RH',
  },
]

const skills = [
  { icon: Laptop, title: 'Operating system administration', tag: 'Windows & Linux', text: 'Install, configure, update, and maintain operating systems. Administrators need to keep systems stable and make sure users can work reliably.' },
  { icon: Network, title: 'Networking fundamentals', tag: 'TCP/IP · DNS · DHCP', text: 'Understand IP addressing, routing, DNS, DHCP, and connectivity. These skills help identify why a device or service cannot communicate.' },
  { icon: Wrench, title: 'Troubleshooting', tag: 'Analyze · Resolve', text: 'Gather evidence, isolate the cause, test solutions, and document the outcome instead of guessing. This reduces downtime and repeat incidents.' },
  { icon: ShieldCheck, title: 'Security fundamentals', tag: 'Least privilege · Patching', text: 'Use strong access controls, timely updates, secure configurations, backups, and monitoring to reduce risks to systems and data.' },
  { icon: Code2, title: 'Scripting & automation', tag: 'PowerShell · Bash', text: 'Automate repetitive tasks, standardize configuration, and reduce manual errors with scripts and clear documentation.' },
  { icon: Database, title: 'Backup & recovery', tag: 'Resilience · Recovery', text: 'Plan backups, understand recovery objectives, and test restoration so important information and services can be recovered after an incident.' },
]

const resources = [
  { icon: BookOpen, type: 'Official documentation', title: 'Ubuntu Server Documentation', text: 'Learn server basics, networking, security, storage, and practical configuration tasks from the Ubuntu documentation.', url: 'https://ubuntu.com/server/docs/', label: 'Explore documentation', accent: 'blue' },
  { icon: GraduationCap, type: 'Certification training', title: 'Red Hat Training & Certification', text: 'Explore Linux administration training paths and the skills covered by Red Hat certification programs.', url: 'https://www.redhat.com/en/services/training-and-certification', label: 'Explore training', accent: 'red' },
  { icon: Compass, type: 'Guided learning', title: 'Microsoft Learn', text: 'Use structured learning paths and technical modules for Windows, Azure, networking, and IT administration topics.', url: 'https://learn.microsoft.com/training/', label: 'Start learning', accent: 'cyan' },
  { icon: Network, type: 'Networking practice', title: 'Cisco Skills for All', text: 'Build networking and cybersecurity foundations through online courses designed for learners at different levels.', url: 'https://skillsforall.com/', label: 'View courses', accent: 'violet' },
]

const navItems = [
  ['Home', '#home'],
  ['Certifications', '#certifications'],
  ['Skills', '#skills'],
  ['Learning resources', '#resources'],
  ['About', '#about'],
]

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3" aria-label="SysAdmin Path home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/25">
        <Terminal size={21} strokeWidth={2.5} />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-extrabold tracking-tight text-slate-900">SysAdmin<span className="text-blue-600">Path</span></span>
        <span className="block pt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Career portfolio</span>
      </span>
    </a>
  )
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  )
}

function CertificationCard({ cert, onDetails }) {
  const Icon = cert.icon
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className={`cert-icon cert-${cert.color}`}><Icon size={23} /></span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{cert.level}</span>
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.13em] text-blue-600">{cert.issuer}</p>
      <h3 className="mt-2 text-xl font-bold leading-snug text-slate-950">{cert.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{cert.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {cert.skills.slice(0, 2).map((skill) => <span key={skill} className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">{skill}</span>)}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <button onClick={() => onDetails(cert)} className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 transition hover:text-blue-600">
          View details <ArrowRight size={16} />
        </button>
        <a href={cert.url} target="_blank" rel="noreferrer" aria-label={`Official ${cert.name} website`} className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600">
          <ExternalLink size={17} />
        </a>
      </div>
    </article>
  )
}

function CertificationModal({ cert, onClose }) {
  if (!cert) return null
  const Icon = cert.icon
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="bg-navy-950 p-6 text-white sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Icon size={25} /></span>
            <button onClick={onClose} aria-label="Close details" className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white"><X size={20} /></button>
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">{cert.issuer} · {cert.category}</p>
          <h3 id="modal-title" className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">{cert.name}</h3>
          <p className="mt-3 leading-7 text-slate-300">{cert.summary}</p>
        </div>
        <div className="p-6 sm:p-8">
          <h4 className="font-bold text-slate-950">Skills and knowledge covered</h4>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {cert.skills.map((skill) => <li key={skill} className="flex items-start gap-2 text-sm text-slate-600"><Check size={17} className="mt-0.5 shrink-0 text-emerald-600" />{skill}</li>)}
          </ul>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Who might consider it?</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{cert.bestFor}</p>
          </div>
          <a href={cert.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700">
            Visit official certification page <ArrowUpRight size={17} />
          </a>
          <p className="mt-3 text-center text-xs leading-5 text-slate-500">Requirements, exam details, and fees can change. Confirm current information with the issuing organization.</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedCert, setSelectedCert] = useState(null)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const categories = ['All', ...new Set(certifications.map((cert) => cert.category))]
  const filteredCertifications = useMemo(() => certifications.filter((cert) => {
    const matchesCategory = category === 'All' || cert.category === category
    const query = search.toLowerCase().trim()
    const matchesSearch = !query || `${cert.name} ${cert.issuer} ${cert.summary} ${cert.skills.join(' ')}`.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  }), [search, category])

  const goTo = () => setMenuOpen(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
          </nav>
          <a href="#certifications" className="hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 sm:inline-flex">
            Explore pathways <ArrowRight size={16} />
          </a>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={goTo} className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700">{label}</a>)}</nav>}
      </header>

      <main>
        <section id="home" className="hero-bg relative scroll-mt-24 overflow-hidden">
          <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="absolute -right-24 top-8 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-28">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> YOUR GUIDE TO SYSTEM ADMINISTRATION
              </div>
              <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[62px]">
                Build the skills to <span className="hero-gradient">keep systems</span> running.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Explore certifications, practical skills, and trusted learning resources for your journey toward a career in System Administration.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#certifications" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400">
                  Explore certifications <ArrowRight size={17} />
                </a>
                <a href="#skills" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                  Discover key skills <ArrowDown size={17} />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Beginner-friendly guide</span>
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Official learning links</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[490px]">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-[#0d2542]/90 p-5 shadow-2xl backdrop-blur sm:p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-rose-400" /><i className="h-2.5 w-2.5 rounded-full bg-amber-300" /><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
                    <span className="text-xs font-semibold text-slate-300">sysadmin-lab / overview</span>
                  </div>
                  <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-300">SYSTEM ONLINE</span>
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-[#07192e] p-4 font-mono text-xs leading-7 sm:text-sm">
                  <p className="text-slate-500"># a day in system administration</p>
                  <p><span className="text-emerald-300">admin@server</span><span className="text-white">:~$ </span><span className="text-blue-300">systemctl status services</span></p>
                  <p className="text-emerald-300">● services.service - Core services</p>
                  <p className="pl-4 text-slate-300">Loaded: loaded and enabled</p>
                  <p className="pl-4 text-slate-300">Active: <span className="text-emerald-300">active (running)</span></p>
                  <p className="mt-2"><span className="text-emerald-300">admin@server</span><span className="text-white">:~$ </span><span className="cursor-blink text-blue-300">_</span></p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between"><Server size={18} className="text-blue-300" /><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Infrastructure</span></div>
                    <p className="mt-3 text-lg font-bold text-white">Reliable</p>
                    <p className="mt-1 text-xs text-slate-400">Systems & services</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between"><LockKeyhole size={18} className="text-emerald-300" /><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security</span></div>
                    <p className="mt-3 text-lg font-bold text-white">Protected</p>
                    <p className="mt-1 text-xs text-slate-400">Access & updates</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-300/15 bg-blue-400/10 p-3.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-400/15 text-blue-200"><Sparkles size={18} /></span>
                  <div><p className="text-sm font-bold text-white">Your learning path starts here</p><p className="mt-0.5 text-xs text-slate-300">Learn · Practice · Certify · Grow</p></div>
                </div>
              </div>
              <div className="absolute -left-7 top-20 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><ShieldCheck size={20} /></span>
                <span><span className="block text-xs font-bold text-slate-900">Security first</span><span className="block text-[11px] text-slate-500">Protect every layer</span></span>
              </div>
              <div className="absolute -right-4 bottom-20 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600"><Zap size={20} /></span>
                <span><span className="block text-xs font-bold text-slate-900">Automate tasks</span><span className="block text-[11px] text-slate-500">Work smarter</span></span>
              </div>
            </div>
          </div>
          <div className="relative border-t border-white/10 bg-white/[0.03]">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-6 sm:px-8 md:grid-cols-4 lg:px-10">
              {[['04','Certification profiles'],['06','Core skills'],['04','Learning resources'],['01','Career roadmap']].map(([number,label]) => <div key={label} className="flex items-center gap-3"><span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{number}</span><span className="max-w-24 text-xs leading-5 text-slate-400 sm:text-sm">{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="certifications" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <SectionHeading eyebrow="01 / CERTIFICATION PATHWAYS" title="Credentials that build confidence." description="Certifications can help structure your learning and demonstrate knowledge. Explore options by focus area and check each issuing organization's official page for current exam details." />
              <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label htmlFor="cert-search" className="sr-only">Search certifications</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5">
                  <Search size={18} className="shrink-0 text-slate-400" />
                  <input id="cert-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search certifications or skills..." className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
                  {search && <button onClick={() => setSearch('')} className="rounded-md p-1 text-slate-400 hover:text-slate-800" aria-label="Clear search"><X size={16} /></button>}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${category === item ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}>{item}</button>)}
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {filteredCertifications.map((cert) => <CertificationCard key={cert.id} cert={cert} onDetails={setSelectedCert} />)}
            </div>
            {filteredCertifications.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center"><CircleHelp className="mx-auto text-slate-400" size={28} /><h3 className="mt-3 font-bold text-slate-900">No matching certifications</h3><p className="mt-1 text-sm text-slate-500">Try another search term or choose a different category.</p><button onClick={() => {setSearch('');setCategory('All')}} className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-800">Clear filters</button></div>}
            <div className="mt-7 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-slate-600">
              <CircleHelp size={19} className="mt-0.5 shrink-0 text-blue-600" />
              <p><strong className="text-slate-800">A helpful reminder:</strong> a certification is one part of career development. Hands-on labs, documentation, projects, and troubleshooting practice are also important. Certification costs and eligibility can vary by program and region.</p>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow="02 / SKILLS & QUALIFICATIONS" title="The foundations behind dependable systems." description="System Administrators combine technical knowledge with careful problem-solving. These six skill areas provide a practical foundation to develop over time." />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(showAllSkills ? skills : skills.slice(0, 6)).map((skill, index) => {
                const Icon = skill.icon
                return <article key={skill.title} className="rounded-2xl border border-slate-200/80 bg-white p-6 transition hover:border-blue-200 hover:shadow-soft">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={23} /></span>
                    <span className="font-mono text-xs font-bold text-slate-300">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{skill.title}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-600">{skill.tag}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{skill.text}</p>
                </article>
              })}
            </div>
            <div className="mt-7 rounded-2xl bg-navy-950 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-300"><Target size={24} /></span>
                <div><h3 className="font-bold">Practice turns knowledge into skill.</h3><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">Set up a safe virtual lab, document each task, and practice recovering from mistakes. Always use systems you own or have permission to administer.</p></div>
              </div>
              <a href="#resources" className="mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-300 transition hover:text-white sm:mt-0">Find learning resources <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="resources" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow="03 / LEARNING RESOURCES" title="Learn from trusted sources." description="Use official documentation and structured learning platforms to build your knowledge. Start with fundamentals, then practice each topic in a lab." />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return <article key={resource.title} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-soft sm:flex-row sm:gap-5 sm:p-7">
                  <span className={`resource-icon resource-${resource.accent}`}><Icon size={24} /></span>
                  <div className="mt-4 flex flex-1 flex-col sm:mt-0">
                    <p className="text-xs font-bold uppercase tracking-[0.13em] text-blue-600">{resource.type}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950">{resource.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{resource.text}</p>
                    <a href={resource.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-800 transition group-hover:text-blue-600">
                      {resource.label} <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              })}
            </div>
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex sm:items-center sm:gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700"><BookOpen size={20} /></span>
              <p className="mt-3 text-sm leading-6 text-amber-950 sm:mt-0"><strong>Suggested learning sequence:</strong> computer and OS basics → networking → Linux or Windows administration → security fundamentals → scripting and automation. Adjust the sequence to your interests and experience.</p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">YOUR NEXT STEP</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Build. Break. Troubleshoot. Learn.</h2>
              <p className="mt-4 leading-7 text-blue-100">Choose one skill, create a small practice project, and keep a record of what you learned. Progress comes from consistent hands-on practice.</p>
            </div>
            <a href="#resources" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:bg-blue-50">Start learning <ArrowRight size={17} /></a>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-10">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/70 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-8 text-white">
                <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/15 bg-white/10 text-3xl font-extrabold tracking-tight">KT</div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">About the developer</p>
                <h3 className="mt-2 text-2xl font-extrabold">Karla Mariz Teraña</h3>
                <p className="mt-2 text-sm text-slate-300">Bachelor of Science in Information Technology (BSIT)</p>
                <div className="mt-7 h-px bg-white/10" />
                <div className="mt-5 flex items-center gap-3 text-sm text-slate-300"><GraduationCap size={18} className="text-blue-300" /> IT student & aspiring developer</div>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-300"><Code2 size={18} className="text-blue-300" /> Web development & systems</div>
              </div>
            </div>
            <div className="max-w-2xl">
              <SectionHeading eyebrow="04 / THE PERSON BEHIND THE PROJECT" title="Curious about technology. Focused on growth." description="I am an Information Technology student who is building practical skills in programming, web development, and system design. This portfolio is part of my learning journey to understand the certifications, technical foundations, and resources that can support a career in System Administration." />
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-600"><Target size={20} /></span>
                  <h3 className="mt-4 font-bold text-slate-900">Learning goals</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Improve coding and troubleshooting, build useful web systems, and gain practical experience through projects and continuous learning.</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><Award size={20} /></span>
                  <h3 className="mt-4 font-bold text-slate-900">Career direction</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Work toward becoming a skilled IT professional, graduate with a strong foundation, and prepare for a stable career in technology.</p>
                </div>
              </div>
              <p className="mt-5 text-xs leading-5 text-slate-500">Personal profile text can be edited in <code className="rounded bg-slate-100 px-1.5 py-0.5">src/App.jsx</code> to match your own preferred introduction and career plans.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#06162a] text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-9 md:grid-cols-[1.2fr_.8fr] md:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500 text-white"><Terminal size={21} /></span>
                <span><span className="block font-extrabold text-white">SysAdmin<span className="text-blue-400">Path</span></span><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Career portfolio</span></span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">A student-focused guide to System Administrator certifications, technical skills, and trusted learning resources.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div><h3 className="text-sm font-bold text-white">Explore</h3><div className="mt-4 space-y-3">{navItems.slice(1).map(([label,href]) => <a key={href} href={href} className="block text-sm text-slate-400 transition hover:text-white">{label}</a>)}</div></div>
              <div><h3 className="text-sm font-bold text-white">Official links</h3><div className="mt-4 space-y-3"><a href="https://www.comptia.org/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">CompTIA <ArrowUpRight size={13}/></a><a href="https://www.redhat.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">Red Hat <ArrowUpRight size={13}/></a><a href="https://learn.microsoft.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">Microsoft Learn <ArrowUpRight size={13}/></a></div></div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SysAdminPath · Educational career portfolio</p>
            <p>Certification names belong to their respective organizations. This site is an independent student project.</p>
          </div>
        </div>
      </footer>

      <CertificationModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  )
}

export default App
