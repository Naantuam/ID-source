import { MOCK_REGISTRY_DATABASE, SAMPLE_CASES } from '../data/mockRegistry.js'

export const MATCH_THRESHOLD = 90

const cases = Object.values(MOCK_REGISTRY_DATABASE)

export const registryStats = {
  records: cases.reduce((n, c) => n + c.biometricMatches.length + (c.reviewCandidates?.length ?? 0), 0),
  caseLinks: cases.reduce((n, c) => n + c.biometricMatches.length - 1, 0),
}

export function lookupNin(nin) {
  return MOCK_REGISTRY_DATABASE[nin] ?? null
}

export function lookupCase(ref) {
  const found = SAMPLE_CASES.find((c) => c.id === ref.trim().toUpperCase())
  return found ? lookupNin(found.nin) : null
}

// Simulated face search: a stable hash of the image bytes picks one face template.
export async function lookupPhoto(file) {
  const bytes = new Uint8Array(await file.arrayBuffer())
  let h = 0
  for (let i = 0; i < bytes.length; i += 97) h = (h * 31 + bytes[i]) >>> 0
  return { record: cases[h % cases.length], probeScore: Math.min(88 + (h % 110) / 10, 99.6) }
}
