# Hospital AI Coding Tool

A clean, clinical interface for medical coders and billing staff to review AI-generated diagnostic and procedure codes.

## Key Features

### 1. Patient Dashboard
- View all active patient cases
- Quick access to patient information and clinical notes
- Color-coded status indicators

### 2. Patient Intake
- Complete demographic information (name, DOB, MRN)
- Contact details (phone, email, address)
- Insurance provider and policy information
- Quick action navigation

### 3. Clinical Notes Viewer
- Full display of provider documentation
- Metadata (date, provider, specialty)
- Coding tips and considerations
- Preserved formatting for easy reading

### 4. AI Code Suggestions
- ICD-10 and CPT code recommendations
- Confidence scoring (High: 90%+, Moderate: 75-89%, Low: <75%)
- Evidence snippets from clinical documentation
- Guideline references for compliance
- Accept/Reject functionality

### 5. Code Editor
- Searchable ICD-10 and CPT databases
- Add codes manually
- Accept/Reject toggles
- Delete with confirmation
- Real-time status updates

### 6. Insurance Coverage Panel
- Service-by-service coverage status
- Cost estimates and copay information
- Prior authorization workflow
- Urgency levels (routine/urgent/emergent)
- Justification form

### 7. Audit Trail
- Complete timeline of all actions
- User attribution for each entry
- Timestamped records
- Explanations for transparency
- Export functionality (PDF/CSV)

## Accessibility (WCAG 2.1 AA Compliant)

- **High Contrast**: 4.5:1 minimum contrast ratio for all text
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Readers**: ARIA labels and semantic HTML structure
- **Skip Links**: Skip to main content for faster navigation
- **Tooltips**: Additional context on hover and focus

## Design System

### Colors
- **Primary Blue**: #2563EB (blue-600) - Actions and links
- **Success Green**: #16A34A (green-600) - Accepted codes
- **Warning Amber**: #D97706 (amber-600) - Low confidence
- **Error Red**: #DC2626 (red-600) - Rejected codes
- **Neutral Gray**: #F9FAFB (gray-50) - Backgrounds

### Typography
- System font stack (sans-serif)
- Base size: 16px (1rem)
- Heading weights: 500 (medium)
- Body weight: 400 (normal)

### Interactive States
- **Default**: Clean borders, clear typography
- **Hover**: Border highlight, subtle shadow
- **Focus**: 2px ring with offset for visibility
- **Disabled**: 50% opacity, no pointer events

## Technical Stack

- **React 18** with TypeScript
- **React Router 7** for navigation (Data mode)
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Mock Data** for demonstration purposes

## Workflow

1. **Select Patient** from Dashboard
2. **Review Demographics** on Patient Intake screen
3. **Read Clinical Notes** to understand the encounter
4. **Review AI Suggestions** with confidence scores
5. **Accept/Reject/Modify Codes** in the Code Editor
6. **Verify Insurance Coverage** for all services
7. **Submit Prior Auth** if required
8. **Review Audit Trail** for compliance

## Component Structure

```
/src/app/
  App.tsx                    - Main entry with RouterProvider
  routes.tsx                 - Route configuration
  components/
    Root.tsx                 - Layout with sidebar
    Dashboard.tsx            - Patient list
    PatientIntake.tsx        - Demographics screen
    NotesViewer.tsx          - Clinical documentation
    CodeSuggestions.tsx      - AI recommendations
    CodeEditor.tsx           - Manual code management
    InsurancePanel.tsx       - Coverage verification
    AuditTrail.tsx           - Activity timeline
  data/
    mockData.ts              - Mock data and interfaces
```

## Key Principles

1. **Explainability First**: Every code includes supporting evidence
2. **Clinical Accuracy**: Realistic medical terminology and codes
3. **Compliance Ready**: Complete audit trail for regulatory requirements
4. **User-Focused**: Clean, distraction-free interface
5. **Accessible**: WCAG AA compliant for all users
