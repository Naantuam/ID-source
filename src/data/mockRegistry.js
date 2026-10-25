// Fictional sample registry data for law enforcement biometric deduplication demonstration

export const SAMPLE_CASES = [
  {
    id: 'CASE-104',
    title: 'Multi-NIN SIM Syndicate (Flagged)',
    nin: '10000000001',
    description: 'Face biometric identified across 4 distinct NINs and 7 telecom SIM cards used in phishing operations.'
  },
  {
    id: 'CASE-202',
    title: 'Legitimate Citizen (Clean Profile)',
    nin: '10000000002',
    description: 'Clean single verified enrollment with consistent historical biometric audit.'
  },
  {
    id: 'CASE-319',
    title: 'Synthetic Banking Identity (Discrepancy)',
    nin: '10000000003',
    description: 'Conflicting dates of birth and altered name spellings matched to single facial template.'
  }
];

// SVG generator for reliable, clean portrait avatars without external network dependencies
export const createFaceAvatar = (variant = 'suspect1') => {
  if (variant === 'suspect1') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" fill="none">
      <rect width="200" height="240" fill="%23E2E8F0"/>
      <rect x="10" y="10" width="180" height="220" rx="8" fill="%23CBD5E1"/>
      <path d="M40 220 C40 170, 70 160, 100 160 C130 160, 160 170, 160 220 Z" fill="%231E293B"/>
      <circle cx="100" cy="100" r="46" fill="%238D5B4C"/>
      <path d="M60 90 C60 60, 140 60, 140 90 C130 50, 70 50, 60 90 Z" fill="%230F172A"/>
      <ellipse cx="85" cy="98" rx="6" ry="4" fill="%230F172A"/>
      <ellipse cx="115" cy="98" rx="6" ry="4" fill="%230F172A"/>
      <path d="M96 108 L100 118 L104 108" stroke="%235C3A30" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M88 128 C94 133, 106 133, 112 128" stroke="%234A2820" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="20" x2="40" y2="20" stroke="%23175c44" stroke-width="3"/>
      <line x1="20" y1="20" x2="20" y2="40" stroke="%23175c44" stroke-width="3"/>
      <line x1="180" y1="20" x2="160" y2="20" stroke="%23175c44" stroke-width="3"/>
      <line x1="180" y1="20" x2="180" y2="40" stroke="%23175c44" stroke-width="3"/>
      <line x1="20" y1="220" x2="40" y2="220" stroke="%23175c44" stroke-width="3"/>
      <line x1="20" y1="220" x2="20" y2="200" stroke="%23175c44" stroke-width="3"/>
      <line x1="180" y1="220" x2="160" y2="220" stroke="%23175c44" stroke-width="3"/>
      <line x1="180" y1="220" x2="180" y2="200" stroke="%23175c44" stroke-width="3"/>
      <text x="100" y="235" font-family="monospace" font-size="9" fill="%23475569" text-anchor="middle">BIOMETRIC TEMPLATE %23F-9021</text>
    </svg>`;
  } else if (variant === 'citizen1') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" fill="none">
      <rect width="200" height="240" fill="%23E2E8F0"/>
      <rect x="10" y="10" width="180" height="220" rx="8" fill="%23D1D5DB"/>
      <path d="M40 220 C40 170, 70 160, 100 160 C130 160, 160 170, 160 220 Z" fill="%232563EB"/>
      <circle cx="100" cy="100" r="46" fill="%23A16A56"/>
      <path d="M56 100 C55 60, 145 60, 144 100 C135 48, 65 48, 56 100 Z" fill="%23111827"/>
      <ellipse cx="85" cy="98" rx="5" ry="4" fill="%23111827"/>
      <ellipse cx="115" cy="98" rx="5" ry="4" fill="%23111827"/>
      <path d="M96 108 L100 116 L104 108" stroke="%236B4235" stroke-width="2" stroke-linecap="round"/>
      <path d="M88 126 C94 130, 106 130, 112 126" stroke="%236B4235" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="100" cy="20" r="4" fill="%2316A34A"/>
      <text x="100" y="235" font-family="monospace" font-size="9" fill="%23475569" text-anchor="middle">BIOMETRIC TEMPLATE %23F-4412</text>
    </svg>`;
  } else {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" fill="none">
      <rect width="200" height="240" fill="%23FEE2E2"/>
      <rect x="10" y="10" width="180" height="220" rx="8" fill="%23FECACA"/>
      <path d="M40 220 C40 170, 70 160, 100 160 C130 160, 160 170, 160 220 Z" fill="%237F1D1D"/>
      <circle cx="100" cy="100" r="46" fill="%23784A3B"/>
      <path d="M60 85 C60 55, 140 55, 140 85 C130 45, 70 45, 60 85 Z" fill="%230F172A"/>
      <ellipse cx="85" cy="98" rx="6" ry="4" fill="%230F172A"/>
      <ellipse cx="115" cy="98" rx="6" ry="4" fill="%230F172A"/>
      <path d="M96 108 L100 118 L104 108" stroke="%234A2E24" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M90 128 C96 132, 104 132, 110 128" stroke="%234A2E24" stroke-width="3" stroke-linecap="round"/>
      <text x="100" y="235" font-family="monospace" font-size="9" fill="%23991B1B" text-anchor="middle">BIOMETRIC TEMPLATE %23F-7731</text>
    </svg>`;
  }
};

export const MOCK_REGISTRY_DATABASE = {
  // Case 1: The Multi-Identity Fraud Syndicate
  '10000000001': {
    primaryRecord: {
      nin: '10000000001',
      fullName: 'EMMANUEL CHIDI OKONKWO',
      registeredAlias: 'Okonkwo, Emmanuel C.',
      dob: '14-AUG-1988',
      gender: 'Male',
      stateOfOrigin: 'Anambra State',
      lga: 'Onitsha North',
      enrolmentCenter: 'Enugu Central Nimc Enrolment Centre',
      enrolmentDate: '12-MAR-2021',
      faceId: 'F-9021',
      facePhoto: createFaceAvatar('suspect1'),
      primaryPhone: '+234 803 456 7890',
      carrier: 'MTN Nigeria',
      status: 'Active · Flagged for Audit',
      riskLevel: 'HIGH_RISK',
      riskScore: 94,
      riskReason: 'Biometric multi-enrollment duplicate: Same face detected across multiple active national identification numbers and multiple telecom SIM subscriptions.'
    },
    // The key value proposition requested by user:
    // Cross-referencing by the FACE biometrics to uncover all other NINs and phone numbers registered to this exact face!
    biometricMatches: [
      {
        nin: '10000000001',
        fullName: 'EMMANUEL CHIDI OKONKWO',
        dob: '14-AUG-1988',
        similarity: 100,
        enrolledDate: '12-MAR-2021',
        enrolmentCenter: 'Enugu Central NIMC',
        isCurrentQuery: true,
        phones: [
          { number: '+234 803 456 7890', carrier: 'MTN Nigeria', status: 'Active (SIM Swapped 2024)', lineType: 'Voice/Data' },
          { number: '+234 802 119 4433', carrier: 'Airtel Nigeria', status: 'Active', lineType: 'Voice' }
        ]
      },
      {
        nin: '20048192831',
        fullName: 'CHIDI TONY WILLIAMS',
        dob: '22-NOV-1991', // Conflicting DoB!
        similarity: 98.7,
        enrolledDate: '18-OCT-2022',
        enrolmentCenter: 'Ikeja Commercial Hub Enrolment Kiosk',
        isCurrentQuery: false,
        conflictNotes: 'Altered surname, shifted birth year by 3 years to pass KYC threshold.',
        phones: [
          { number: '+234 905 112 3344', carrier: 'Glo Mobile', status: 'Flagged for Fraudulent USSD Transfers', lineType: 'Mobile Money' },
          { number: '+234 708 901 2288', carrier: 'Airtel Nigeria', status: 'Active', lineType: 'Data SIM' }
        ]
      },
      {
        nin: '39182746102',
        fullName: 'ANTHONY EZEAGU',
        dob: '05-JAN-1987', // Another conflicting DoB!
        similarity: 97.4,
        enrolledDate: '04-FEB-2023',
        enrolmentCenter: 'Asaba Special Registration Point',
        isCurrentQuery: false,
        conflictNotes: 'Different state of origin declared (Delta State instead of Anambra).',
        phones: [
          { number: '+234 812 998 4433', carrier: 'Airtel Nigeria', status: 'Active (Used on Multiple IMEIs)', lineType: 'Voice/Data' },
          { number: '+234 809 334 1122', carrier: '9mobile', status: 'Dormant', lineType: 'Voice' }
        ]
      },
      {
        nin: '48291049281',
        fullName: 'KENNETH C. OKORO',
        dob: '14-AUG-1988',
        similarity: 96.2,
        enrolledDate: '15-JUL-2024',
        enrolmentCenter: 'Abuja Municipal Mobile Desk',
        isCurrentQuery: false,
        conflictNotes: 'Matched despite glasses in registration photo; facial landmarks match confidence >96%.',
        phones: [
          { number: '+234 803 777 9901', carrier: 'MTN Nigeria', status: 'Linked to Reported OTP Interception', lineType: 'Voice/Data' }
        ]
      }
    ],
    // Near-miss faces below the auto-link threshold: shown for examiner review only.
    reviewCandidates: [
      {
        nin: '61029384756',
        fullName: 'CHUKWUEMEKA OBI',
        dob: '02-FEB-1988',
        similarity: 84.6,
        enrolledDate: '21-JUL-2018',
        enrolmentCenter: 'Awka South NIMC'
      }
    ],
    telecomSummary: {
      totalSims: 7,
      uniqueCarriers: ['MTN Nigeria', 'Airtel Nigeria', 'Glo Mobile', '9mobile'],
      imeiClusters: 5,
      suspiciousTransferLogs: 14
    }
  },

  // Case 2: Clean citizen record
  '10000000002': {
    primaryRecord: {
      nin: '10000000002',
      fullName: 'DR. AISHA MOHAMMED BELLO',
      registeredAlias: 'Bello, Aisha M.',
      dob: '28-JUN-1982',
      gender: 'Female',
      stateOfOrigin: 'Kaduna State',
      lga: 'Zaria',
      enrolmentCenter: 'Kaduna State NIMC Headquarters',
      enrolmentDate: '19-SEP-2019',
      faceId: 'F-4412',
      facePhoto: createFaceAvatar('citizen1'),
      primaryPhone: '+234 802 334 5566',
      carrier: 'Airtel Nigeria',
      status: 'Clean · Verified Official Record',
      riskLevel: 'LOW_RISK',
      riskScore: 4,
      riskReason: 'Single biometric match. No duplicate NINs or suspicious SIM pooling detected in national cross-reference.'
    },
    biometricMatches: [
      {
        nin: '10000000002',
        fullName: 'DR. AISHA MOHAMMED BELLO',
        dob: '28-JUN-1982',
        similarity: 100,
        enrolledDate: '19-SEP-2019',
        enrolmentCenter: 'Kaduna State NIMC Headquarters',
        isCurrentQuery: true,
        phones: [
          { number: '+234 802 334 5566', carrier: 'Airtel Nigeria', status: 'Active (Verified KYC)', lineType: 'Voice/Data' }
        ]
      }
    ],
    telecomSummary: {
      totalSims: 1,
      uniqueCarriers: ['Airtel Nigeria'],
      imeiClusters: 1,
      suspiciousTransferLogs: 0
    }
  },

  // Case 3: Banking impersonator
  '10000000003': {
    primaryRecord: {
      nin: '10000000003',
      fullName: 'OLAWALE SAMUEL ADEYEMI',
      registeredAlias: 'Adeyemi, Samuel O.',
      dob: '10-MAY-1994',
      gender: 'Male',
      stateOfOrigin: 'Oyo State',
      lga: 'Ibadan North',
      enrolmentCenter: 'Ibadan Garki Enrolment Point',
      enrolmentDate: '09-JAN-2022',
      faceId: 'F-7731',
      facePhoto: createFaceAvatar('suspect3'),
      primaryPhone: '+234 813 445 6677',
      carrier: 'MTN Nigeria',
      status: 'Alert · Multiple KYC Attempts',
      riskLevel: 'MEDIUM_HIGH',
      riskScore: 78,
      riskReason: 'Biometric face matched against another active NIN with alternate surname and banking BVN linkage discrepancy.'
    },
    biometricMatches: [
      {
        nin: '10000000003',
        fullName: 'OLAWALE SAMUEL ADEYEMI',
        dob: '10-MAY-1994',
        similarity: 100,
        enrolledDate: '09-JAN-2022',
        enrolmentCenter: 'Ibadan Garki Enrolment Point',
        isCurrentQuery: true,
        phones: [
          { number: '+234 813 445 6677', carrier: 'MTN Nigeria', status: 'Active', lineType: 'Voice/Data' }
        ]
      },
      {
        nin: '59281726304',
        fullName: 'SAMSON O. BAKARE',
        dob: '10-MAY-1992',
        similarity: 97.9,
        enrolledDate: '30-AUG-2023',
        enrolmentCenter: 'Oshodi Local Government Desk',
        isCurrentQuery: false,
        conflictNotes: 'Same day/month of birth (10 May), altered surname and year.',
        phones: [
          { number: '+234 901 889 2200', carrier: 'Glo Mobile', status: 'Suspended by Bank Tier-3 Audit', lineType: 'Wallet SIM' },
          { number: '+234 701 445 9911', carrier: 'Airtel Nigeria', status: 'Active', lineType: 'Data SIM' }
        ]
      }
    ],
    telecomSummary: {
      totalSims: 3,
      uniqueCarriers: ['MTN Nigeria', 'Glo Mobile', 'Airtel Nigeria'],
      imeiClusters: 2,
      suspiciousTransferLogs: 4
    }
  }
};
