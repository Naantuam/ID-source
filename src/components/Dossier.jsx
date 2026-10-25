import { Phone, Printer, ShieldCheck, TriangleAlert } from 'lucide-react'
import LinkGraph from './LinkGraph.jsx'
import { MATCH_THRESHOLD } from '../lib/registry.js'

const RISK = {
  HIGH_RISK: { cls: 'high', label: 'High risk' },
  MEDIUM_HIGH: { cls: 'medium', label: 'Medium-high risk' },
  LOW_RISK: { cls: 'low', label: 'Low risk' },
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

function Item({ label, value, mono }) {
  return (
    <div className="dossier-item">
      <span className="dossier-item-label">{label}</span>
      <span className={mono ? 'dossier-item-value mono' : 'dossier-item-value'}>{value}</span>
    </div>
  )
}

export default function Dossier({ record, caseRef, probeUrl, probeScore }) {
  const p = record.primaryRecord
  const matches = record.biometricMatches
  const flagged = matches.length > 1
  const review = record.reviewCandidates ?? []
  const risk = RISK[p.riskLevel]
  const t = record.telecomSummary

  return (
    <>
      <div className="suspect-dossier-card">
        <div className="portrait-column">
          {probeUrl && (
            <>
              <div className="face-portrait-frame">
                <img src={probeUrl} alt="Uploaded suspect" className="face-portrait-img" />
              </div>
              <span className="face-id-tag">Uploaded · {probeScore.toFixed(1)}% match</span>
            </>
          )}
          <div className="face-portrait-frame">
            <img src={p.facePhoto} alt={`Registered portrait of ${p.fullName}`} className="face-portrait-img" />
          </div>
          <span className="face-id-tag">{p.faceId}</span>
        </div>

        <div className="dossier-details">
          <div className="dossier-header-top">
            <h3 className="suspect-name">{p.fullName}</h3>
            <span className={`risk-pill ${risk.cls}`}>{risk.label} · {p.riskScore}</span>
          </div>
          <div className="dossier-grid">
            <Item label="NIN" value={p.nin} mono />
            <Item label="Date of birth" value={p.dob} />
            <Item label="Gender" value={p.gender} />
            <Item label="State / LGA" value={`${p.stateOfOrigin}, ${p.lga}`} />
            <Item label="Enrolled" value={p.enrolmentDate} />
            <Item label="Enrolment centre" value={p.enrolmentCenter} />
            <Item label="Primary phone" value={`${p.primaryPhone} (${p.carrier})`} mono />
            <Item label="Status" value={p.status} />
            {caseRef && <Item label="Case" value={caseRef} mono />}
          </div>
        </div>
      </div>

      <div className={flagged ? 'biometric-alert-card high-alert' : 'biometric-alert-card'}>
        <div className={flagged ? 'biometric-alert-title danger' : 'biometric-alert-title safe'}>
          {flagged ? <TriangleAlert size={16} /> : <ShieldCheck size={16} />}
          {flagged ? `Same face found on ${matches.length} NINs` : 'No duplicate enrolments found'}
        </div>
        <p className="biometric-alert-desc">{p.riskReason}</p>
        <p className="biometric-alert-desc telecom-line">
          {plural(t.totalSims, 'SIM')} · {plural(t.uniqueCarriers.length, 'carrier')} ·{' '}
          {plural(t.imeiClusters, 'IMEI cluster')} · {plural(t.suspiciousTransferLogs, 'suspicious transfer log')}
        </p>
      </div>

      <div className="matches-section-title">
        <span>Identities registered with this face</span>
        <span className="match-count-badge">{matches.length}</span>
      </div>
      <div className="matches-cards-stack">
        {matches.map((m) => (
          <div key={m.nin} className={m.isCurrentQuery ? 'match-card primary-query' : 'match-card'}>
            <div className="match-card-top">
              <div className="match-name-nin">
                <span className="match-name">{m.fullName}</span>
                <span className="match-nin">NIN {m.nin}</span>
              </div>
              <span className="match-score-pill">
                {m.isCurrentQuery ? 'Searched record' : `${m.similarity}% face match`}
              </span>
            </div>
            {m.conflictNotes && (
              <div className="match-conflict-banner">
                <TriangleAlert size={14} /> {m.conflictNotes}
              </div>
            )}
            <div className="match-details-row">
              <span>DOB {m.dob}</span>
              <span>Enrolled {m.enrolledDate}</span>
              <span>{m.enrolmentCenter}</span>
            </div>
            <div className="phone-lines-header"><Phone size={13} /> Registered lines</div>
            <div className="phone-chips-list">
              {m.phones.map((ph) => (
                <div key={ph.number} className="phone-chip">
                  <span className="phone-num">{ph.number}</span>
                  <span className="phone-carrier-badge">{ph.carrier}</span>
                  <span className="phone-status-tag">{ph.lineType} · {ph.status}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {flagged && (
        <div className="network-graph-card">
          <div className="network-graph-title">Link map</div>
          <p className="network-graph-subtitle">Face → NINs → registered phone lines</p>
          <div className="network-svg-container">
            <LinkGraph identities={matches} subjectNin={p.nin} />
          </div>
        </div>
      )}

      {review.length > 0 && (
        <>
          <div className="matches-section-title">
            <span>Possible matches — needs manual review</span>
            <span className="match-count-badge">{review.length}</span>
          </div>
          <p className="panel-desc">
            Below the {MATCH_THRESHOLD}% auto-link threshold. Do not treat as the same person
            without examiner review.
          </p>
          <div className="matches-cards-stack">
            {review.map((r) => (
              <div key={r.nin} className="match-card">
                <div className="match-card-top">
                  <div className="match-name-nin">
                    <span className="match-name">{r.fullName}</span>
                    <span className="match-nin">NIN {r.nin}</span>
                  </div>
                  <span className="match-score-pill review">{r.similarity}% face match</span>
                </div>
                <div className="match-details-row">
                  <span>DOB {r.dob}</span>
                  <span>Enrolled {r.enrolledDate}</span>
                  <span>{r.enrolmentCenter}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="actions-row">
        <button type="button" className="btn-dossier" onClick={() => window.print()}>
          <Printer size={16} /> Print dossier
        </button>
      </div>
    </>
  )
}
