// Radial map: face in the centre, NINs around it, phone numbers around each NIN.
export default function LinkGraph({ identities, subjectNin }) {
  const W = 640
  const H = 540
  const cx = W / 2
  const cy = H / 2
  const r1 = identities.length > 1 ? 150 : 0
  const r2 = 95

  const nodes = identities.map((rec, i) => {
    const a = (i / identities.length) * Math.PI * 2 - Math.PI / 2
    const x = cx + Math.cos(a) * r1
    const y = cy + Math.sin(a) * r1
    const spread = Math.min(1.1, 0.45 * rec.phones.length)
    const phones = rec.phones.map((p, j) => {
      const t = rec.phones.length === 1 ? 0 : j / (rec.phones.length - 1) - 0.5
      const pa = (r1 ? a : Math.PI / 2) + t * spread
      return { ...p, x: x + Math.cos(pa) * r2, y: y + Math.sin(pa) * r2 }
    })
    return { rec, x, y, phones }
  })

  return (
    <svg className="graph" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Identity link map">
      {nodes.map((n) => (
        <g key={n.rec.nin}>
          <line x1={cx} y1={cy} x2={n.x} y2={n.y} className="edge edge-face" />
          {n.phones.map((p) => (
            <line key={p.number} x1={n.x} y1={n.y} x2={p.x} y2={p.y} className="edge" />
          ))}
        </g>
      ))}
      {nodes.map((n) =>
        n.phones.map((p) => (
          <g key={p.number}>
            <circle cx={p.x} cy={p.y} r="5" className="node-phone" />
            <text x={p.x} y={p.y < n.y ? p.y - 9 : p.y + 16} textAnchor="middle" className="label-sm">
              {p.number.slice(-4)} · {p.carrier.split(" ")[0]}
            </text>
          </g>
        )),
      )}
      {nodes.map((n) => (
        <g key={n.rec.nin}>
          <circle
            cx={n.x}
            cy={n.y}
            r="11"
            className={n.rec.nin === subjectNin ? 'node-nin node-subject' : 'node-nin'}
          />
          <text x={n.x} y={n.y - 17} textAnchor="middle" className="label">
            {n.rec.fullName}
          </text>
          <text x={n.x} y={n.y + 26} textAnchor="middle" className="label-sm mono">
            {n.rec.nin}
          </text>
        </g>
      ))}
      {r1 > 0 && (
        <g>
          <rect x={cx - 26} y={cy - 13} width="52" height="26" rx="13" className="node-face" />
          <text x={cx} y={cy + 4} textAnchor="middle" className="label-face">FACE</text>
        </g>
      )}
    </svg>
  )
}
