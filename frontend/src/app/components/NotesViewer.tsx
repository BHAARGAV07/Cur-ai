import { useParams, Link } from 'react-router';
import { mockPatients, mockNotes } from '../data/mockData';
import { ArrowLeft, Calendar, User as UserIcon, ChevronRight, FileText } from 'lucide-react';

export function NotesViewer() {
  const { patientId } = useParams();
  const patient = mockPatients.find((p) => p.id === patientId);
  const note = mockNotes.find((n) => n.patientId === patientId);

  if (!patient || !note) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Patient or notes not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/patient/${patient.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Patient
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Clinical Documentation</h2>
            <p className="text-gray-500 mt-1">
              {patient.firstName} {patient.lastName} • MRN: {patient.mrn}
            </p>
          </div>
          <Link
            to={`/codes/${patient.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Code Suggestions
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Note Metadata */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Date:</span>
            <span className="text-gray-900 font-medium">{note.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Provider:</span>
            <span className="text-gray-900 font-medium">{note.provider}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Specialty:</span>
            <span className="text-gray-900 font-medium">{note.specialty}</span>
          </div>
        </div>
      </div>

      {/* Note Content */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Provider Note</h3>
          <p className="text-sm text-gray-500 mt-1">
            Review the clinical documentation carefully for accurate code assignment
          </p>
        </div>
        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed">
              {note.content}
            </pre>
          </div>
        </div>
      </div>

      {/* Coding Tips */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Coding Considerations
        </h4>
        <ul className="space-y-2 text-sm text-amber-800">
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">•</span>
            <span>
              <strong>Primary Diagnosis:</strong> Look for the main condition being treated (appears to be pneumonia)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">•</span>
            <span>
              <strong>Secondary Diagnoses:</strong> Document chronic conditions that affect care (hypertension, diabetes)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">•</span>
            <span>
              <strong>Procedures:</strong> Note diagnostic tests performed (chest X-ray)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">•</span>
            <span>
              <strong>E/M Level:</strong> Assess complexity based on history, exam, and medical decision making
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
