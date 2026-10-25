import { useEffect, useState } from 'react'
import { ImageUp, Lock, Moon, ScanFace, Search, Sun } from 'lucide-react'
import Dossier from './components/Dossier.jsx'
import { lookupCase, lookupNin, lookupPhoto, registryStats } from './lib/registry.js'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') ?? 'light'
    } catch {
      return 'light'
    }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch { /* storage unavailable */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))]
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [mode, setMode] = useState('nin')
  const [nin, setNin] = useState('')
  const [caseRef, setCaseRef] = useState('')
  const [probeUrl, setProbeUrl] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => () => probeUrl && URL.revokeObjectURL(probeUrl), [probeUrl])

  function switchMode(next) {
    setMode(next)
    setResult(null)
    setError('')
  }

  async function search(e) {
    e.preventDefault()
    setResult(null)
    setError('')
    if (mode === 'photo') {
      if (!photo) return setError('Choose a photo to search.')
    } else {
      if (!nin && !caseRef) return setError('Enter a sample NIN or a case reference.')
      if (nin && !/^\d{11}$/.test(nin)) return setError('A NIN is 11 digits.')
    }
    setBusy(true)
    // Short pause so the scan state is visible; the lookup itself is local.
    await new Promise((r) => setTimeout(r, 600))
    try {
      if (mode === 'photo') {
        const { record, probeScore } = await lookupPhoto(photo)
        setResult({ record, probeScore })
      } else {
        const record = nin ? lookupNin(nin) : lookupCase(caseRef)
        if (!record) return setError('No record found in the sample registry.')
        setResult({ record })
      }
    } finally {
      setBusy(false)
    }
  }

  function loadExample() {
    setMode('nin')
    setNin('10000000001')
    setCaseRef('CASE-104')
    setError('')
    setResult({ record: lookupNin('10000000001') })
  }

  function pickPhoto(file) {
    setResult(null)
    setError('')
    setPhoto(file)
    setProbeUrl(file ? URL.createObjectURL(file) : null)
  }

  return (
    <div className="app-container">
      <div className="top-status-bar">
        <div className="top-status-left">
          <Lock size={14} /> Restricted · Law enforcement only
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>

      <header className="hero-header">
        <div className="app-logo-badge">IG</div>
        <div className="hero-titles">
          <h1>IdentityGuard NG</h1>
          <p>Identity deduplication &amp; fraud investigation · Prototype</p>
        </div>
      </header>

      <main className="main-content">
        <div className="demo-disclaimer-box">
          <strong>DEMO ONLY:</strong>
          This prototype uses fictional sample records and illustrative match scores. It is not
          connected to NIMC, NIN, WhatsApp, banks, or any live biometric database. Similarity is
          not proof of identity or wrongdoing.
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{registryStats.records}</span>
            <span className="stat-label">Sample identity records</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{registryStats.caseLinks}</span>
            <span className="stat-label">Illustrative case links</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">Demo</span>
            <span className="stat-label">Data environment</span>
          </div>
        </div>

        <form className="panel-card" onSubmit={search}>
          <h2 className="panel-title">Identity lookup</h2>
          <p className="panel-desc">
            Search the fictional demo registry by sample NIN, case reference or suspect photo.
          </p>

          <div className="mode-toggle" role="tablist">
            <button type="button" role="tab" aria-selected={mode === 'nin'}
              className={mode === 'nin' ? 'active' : ''} onClick={() => switchMode('nin')}>
              <Search size={14} /> NIN / Case
            </button>
            <button type="button" role="tab" aria-selected={mode === 'photo'}
              className={mode === 'photo' ? 'active' : ''} onClick={() => switchMode('photo')}>
              <ScanFace size={14} /> Photo
            </button>
          </div>

          {mode === 'nin' ? (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="nin">Sample NIN (11 digits)</label>
                <input
                  id="nin"
                  className="form-input"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="e.g. 10000000001"
                  value={nin}
                  onChange={(e) => setNin(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="case">Optional case reference</label>
                <input
                  id="case"
                  className="form-input"
                  placeholder="e.g. CASE-104"
                  value={caseRef}
                  onChange={(e) => setCaseRef(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="form-group">
              <span className="form-label">Suspect photo</span>
              <label className="photo-drop">
                <input type="file" accept="image/*" onChange={(e) => pickPhoto(e.target.files[0] ?? null)} />
                {probeUrl ? (
                  <img src={probeUrl} alt="Selected suspect" />
                ) : (
                  <span><ImageUp size={22} /> Choose a photo</span>
                )}
              </label>
            </div>
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Scanning registry…' : mode === 'photo' ? 'Run face search' : 'Search sample records'}
          </button>
          <button type="button" className="btn-secondary" onClick={loadExample}>
            Load example search
          </button>
          <p className="helper-text">
            Use the example button to see how a review result is presented. Sample NINs:
            10000000001, 10000000002, 10000000003.
          </p>
        </form>

        <section className="panel-card">
          <h2 className="panel-title">Investigation results</h2>
          <p className="panel-desc">
            {result ? 'Face cross-reference against the sample registry.' : 'Enter a sample NIN to begin.'}
          </p>
          <div className="results-header-row">
            <span className="badge-sample">SAMPLE DATA</span>
          </div>
          {result ? (
            <Dossier
              record={result.record}
              caseRef={mode === 'nin' ? caseRef.trim().toUpperCase() : ''}
              probeUrl={mode === 'photo' ? probeUrl : null}
              probeScore={result.probeScore}
            />
          ) : (
            <div className="empty-state-box">
              <span className="empty-state-sub">
                {busy ? 'Comparing face template against the registry…' : 'No search performed yet.'}
              </span>
            </div>
          )}
        </section>

        <p className="security-footer-note">
          Security design note: a production deployment should use authorised data sources, strong
          authentication, role-based access, encryption, audit logs, retention limits, human review,
          and a documented process for correcting false matches.
        </p>
      </main>
    </div>
  )
}
