# IdentityGuard NG (ID Source)

Prototype fraud-investigation tool for law enforcement. It finds people who have registered SIMs or accounts under several identities (NINs) by cross-referencing the enrolment face.

All records, NINs, phone numbers and match scores are **fictional sample data**. Portraits are drawn SVG placeholders. The app is not connected to any real registry.

## Run

```sh
npm install
npm run dev
```

## Features

- **NIN / case lookup**: returns the subject's bio-data and registered portrait.
- **Photo search**: upload a suspect photo. Matching is simulated: a hash of the image picks a face template.
- **Dossier**: lists the linked identities with face-match scores and conflict notes, every phone line registered under each identity (carrier, line type, status), a risk score with its reason, a link map, and a print button.
- **Manual review list**: lookalikes below the 90% auto-link threshold, shown separately from confirmed links.
- Light theme (white and green) and dark theme. The choice is remembered.

Sample NINs: `10000000001` (4 linked identities), `10000000002` (clean), `10000000003` (2 linked). Sample case refs: `CASE-104`, `CASE-202`, `CASE-319`.

## Layout

- `src/data/mockRegistry.js`: sample registry (cases, face matches, phone lines, avatars)
- `src/lib/registry.js`: NIN, case and simulated photo lookup
- `src/components/`: `Dossier` (results), `LinkGraph` (link map)
- `src/index.css`: white-and-green design system with dark theme tokens
