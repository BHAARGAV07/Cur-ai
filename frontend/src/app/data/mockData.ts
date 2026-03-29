// Mock data for the medical coding application
//
// ACCESSIBILITY FEATURES:
// - All interactive elements are keyboard navigable
// - WCAG 2.1 AA compliant color contrast ratios (4.5:1 for normal text, 3:1 for large text)
// - Proper ARIA labels and roles for screen readers
// - Focus indicators on all interactive elements
// - Semantic HTML structure for better navigation
//
// APPLICATION STRUCTURE:
// - Dashboard: Overview of active patient cases
// - Patient Intake: Demographics and insurance information
// - Notes Viewer: Display of provider's clinical documentation
// - Code Suggestions: AI-generated ICD/CPT codes with confidence scores and evidence
// - Code Editor: Searchable code database with accept/reject functionality
// - Insurance Panel: Coverage status and prior authorization workflow
// - Audit Trail: Complete timeline of all actions for compliance
//
// DESIGN PRINCIPLES:
// - Clean, clinical interface with minimal distractions
// - High contrast (dark text on light backgrounds)
// - Blue primary color for actions (#2563EB / blue-600)
// - Explainability: every code shows supporting evidence and guidelines
// - Confirmation dialogs for destructive actions
// - Tooltips for additional context

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  mrn: string; // Medical Record Number
  insuranceProvider: string;
  policyNumber: string;
  address: string;
  phone: string;
  email: string;
}

export interface DoctorNote {
  id: string;
  patientId: string;
  date: string;
  provider: string;
  specialty: string;
  content: string;
}

export interface CodeSuggestion {
  id: string;
  code: string;
  type: 'ICD-10' | 'CPT';
  description: string;
  confidence: number; // 0-100
  evidence: string; // Snippet from notes
  guideline?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface InsuranceService {
  id: string;
  code: string;
  description: string;
  coverageStatus: 'covered' | 'not-covered' | 'requires-auth' | 'pending';
  priorAuthRequired: boolean;
  estimatedCost?: number;
  copay?: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  codeAffected?: string;
}

export interface PriorAuth {
  serviceCode: string;
  diagnosis: string[];
  justification: string;
  clinicalNotes: string;
  urgency: 'routine' | 'urgent' | 'emergent';
}

// Mock patients
export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Margaret',
    lastName: 'Thompson',
    dateOfBirth: '1958-03-15',
    gender: 'Female',
    mrn: 'MRN-847291',
    insuranceProvider: 'BlueCross BlueShield',
    policyNumber: 'BC-392847562',
    address: '4821 Oak Avenue, Springfield, IL 62701',
    phone: '(217) 555-0142',
    email: 'mthompson@email.com',
  },
  {
    id: '2',
    firstName: 'Robert',
    lastName: 'Chen',
    dateOfBirth: '1972-08-22',
    gender: 'Male',
    mrn: 'MRN-923847',
    insuranceProvider: 'Aetna',
    policyNumber: 'AET-847562938',
    address: '1523 Maple Street, Chicago, IL 60614',
    phone: '(312) 555-0198',
    email: 'rchen@email.com',
  },
];

// Mock doctor notes
export const mockNotes: DoctorNote[] = [
  {
    id: '1',
    patientId: '1',
    date: '2026-03-28',
    provider: 'Dr. Sarah Mitchell, MD',
    specialty: 'Internal Medicine',
    content: `CHIEF COMPLAINT: Patient presents with persistent cough and shortness of breath for 2 weeks.

HISTORY OF PRESENT ILLNESS: 68-year-old female with history of hypertension and type 2 diabetes mellitus presents with productive cough with yellow-green sputum, progressive dyspnea on exertion, and subjective fever. Patient denies chest pain, hemoptysis, or weight loss. Symptoms began approximately 14 days ago and have progressively worsened despite over-the-counter cough suppressants.

PAST MEDICAL HISTORY:
- Hypertension, controlled on Lisinopril 10mg daily
- Type 2 Diabetes Mellitus, managed with Metformin 1000mg BID
- Hyperlipidemia, on Atorvastatin 20mg daily

PHYSICAL EXAMINATION:
- Vital Signs: BP 142/88, HR 92, RR 22, Temp 101.2°F, O2 Sat 93% on room air
- General: Alert, oriented, appears mildly dyspneic
- Lungs: Decreased breath sounds right lower lobe, crackles present, dullness to percussion
- Heart: Regular rate and rhythm, no murmurs
- Extremities: No cyanosis or edema

ASSESSMENT AND PLAN:
Clinical findings consistent with community-acquired pneumonia, right lower lobe. Chest X-ray ordered showing consolidation in right lower lobe, confirming diagnosis. Will start empiric antibiotic therapy with Azithromycin 500mg x5 days. Patient instructed to follow up in 48-72 hours or sooner if symptoms worsen. Encouraged adequate hydration and rest.

DIAGNOSES:
1. Community-acquired pneumonia, right lower lobe
2. Hypertension, controlled
3. Type 2 Diabetes Mellitus, stable`,
  },
];

// Mock code suggestions
export const mockCodeSuggestions: CodeSuggestion[] = [
  {
    id: '1',
    code: 'J18.1',
    type: 'ICD-10',
    description: 'Lobar pneumonia, unspecified organism',
    confidence: 95,
    evidence: 'Clinical findings consistent with community-acquired pneumonia, right lower lobe. Chest X-ray ordered showing consolidation in right lower lobe',
    guideline: 'ICD-10-CM Official Guidelines for Coding and Reporting: Code confirmed by radiographic evidence',
    status: 'pending',
  },
  {
    id: '2',
    code: 'I10',
    type: 'ICD-10',
    description: 'Essential (primary) hypertension',
    confidence: 98,
    evidence: 'PAST MEDICAL HISTORY: Hypertension, controlled on Lisinopril 10mg daily. Vital Signs: BP 142/88',
    guideline: 'Report controlled hypertension when documented as such',
    status: 'pending',
  },
  {
    id: '3',
    code: 'E11.9',
    type: 'ICD-10',
    description: 'Type 2 diabetes mellitus without complications',
    confidence: 97,
    evidence: 'Type 2 Diabetes Mellitus, managed with Metformin 1000mg BID',
    guideline: 'Use additional code to identify control status if documented',
    status: 'pending',
  },
  {
    id: '4',
    code: 'E78.5',
    type: 'ICD-10',
    description: 'Hyperlipidemia, unspecified',
    confidence: 92,
    evidence: 'Hyperlipidemia, on Atorvastatin 20mg daily',
    guideline: 'Code based on physician documentation',
    status: 'pending',
  },
  {
    id: '5',
    code: '99214',
    type: 'CPT',
    description: 'Office/outpatient visit, established patient, moderate complexity',
    confidence: 89,
    evidence: 'Established patient visit with detailed history, examination, and moderate medical decision making',
    guideline: 'E/M code based on medical decision making or time',
    status: 'pending',
  },
  {
    id: '6',
    code: '71046',
    type: 'CPT',
    description: 'Radiologic examination, chest; 2 views',
    confidence: 94,
    evidence: 'Chest X-ray ordered showing consolidation in right lower lobe',
    guideline: 'Code for diagnostic imaging performed',
    status: 'pending',
  },
];

// Mock insurance services
export const mockInsuranceServices: InsuranceService[] = [
  {
    id: '1',
    code: '99214',
    description: 'Office/outpatient visit, established patient',
    coverageStatus: 'covered',
    priorAuthRequired: false,
    estimatedCost: 185.00,
    copay: 30.00,
  },
  {
    id: '2',
    code: '71046',
    description: 'Chest X-ray, 2 views',
    coverageStatus: 'covered',
    priorAuthRequired: false,
    estimatedCost: 125.00,
    copay: 0,
  },
  {
    id: '3',
    code: 'J18.1',
    description: 'Lobar pneumonia (Primary diagnosis)',
    coverageStatus: 'covered',
    priorAuthRequired: false,
  },
  {
    id: '4',
    code: 'I10',
    description: 'Essential hypertension',
    coverageStatus: 'covered',
    priorAuthRequired: false,
  },
  {
    id: '5',
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus',
    coverageStatus: 'covered',
    priorAuthRequired: false,
  },
];

// Mock audit trail
export const mockAuditEntries: AuditEntry[] = [
  {
    id: '1',
    timestamp: '2026-03-28T14:23:15Z',
    user: 'Sarah Johnson, CPC',
    action: 'Code Accepted',
    details: 'Accepted ICD-10 code J18.1 with 95% confidence. Evidence confirmed by chest X-ray findings.',
    codeAffected: 'J18.1',
  },
  {
    id: '2',
    timestamp: '2026-03-28T14:22:48Z',
    user: 'Sarah Johnson, CPC',
    action: 'Code Modified',
    details: 'Changed CPT code from 99213 to 99214 based on documented medical decision making complexity.',
    codeAffected: '99214',
  },
  {
    id: '3',
    timestamp: '2026-03-28T14:21:33Z',
    user: 'AI Coding Assistant',
    action: 'Codes Suggested',
    details: 'Generated 6 code suggestions based on clinical documentation. Primary diagnosis: J18.1 (95% confidence).',
  },
  {
    id: '4',
    timestamp: '2026-03-28T14:20:12Z',
    user: 'Dr. Sarah Mitchell, MD',
    action: 'Note Completed',
    details: 'Clinical documentation completed and signed for patient visit.',
  },
  {
    id: '5',
    timestamp: '2026-03-28T14:05:47Z',
    user: 'Sarah Johnson, CPC',
    action: 'Case Opened',
    details: 'Opened coding case for patient MRN-847291. Encounter date: 2026-03-28.',
  },
];

// ICD-10 codes database (simplified for search)
export const icd10Database = [
  { code: 'J18.1', description: 'Lobar pneumonia, unspecified organism' },
  { code: 'J18.9', description: 'Pneumonia, unspecified organism' },
  { code: 'I10', description: 'Essential (primary) hypertension' },
  { code: 'I11.9', description: 'Hypertensive heart disease without heart failure' },
  { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
  { code: 'E11.65', description: 'Type 2 diabetes mellitus with hyperglycemia' },
  { code: 'E78.5', description: 'Hyperlipidemia, unspecified' },
  { code: 'E78.0', description: 'Pure hypercholesterolemia' },
  { code: 'R05.9', description: 'Cough, unspecified' },
  { code: 'R06.02', description: 'Shortness of breath' },
];

// CPT codes database (simplified for search)
export const cptDatabase = [
  { code: '99213', description: 'Office/outpatient visit, est patient, low complexity' },
  { code: '99214', description: 'Office/outpatient visit, est patient, moderate complexity' },
  { code: '99215', description: 'Office/outpatient visit, est patient, high complexity' },
  { code: '71046', description: 'Radiologic examination, chest; 2 views' },
  { code: '71047', description: 'Radiologic examination, chest; 3 views' },
  { code: '71048', description: 'Radiologic examination, chest; 4 or more views' },
  { code: '80053', description: 'Comprehensive metabolic panel' },
  { code: '85025', description: 'Complete blood count (CBC) with differential' },
];