import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { mockPatients, mockCodeSuggestions, CodeSuggestion } from '../data/mockData';
import { ArrowLeft, ChevronRight, Info, Check, X, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function CodeSuggestions() {
  const { patientId } = useParams();
  const patient = mockPatients.find((p) => p.id === patientId);
  const [codes, setCodes] = useState(mockCodeSuggestions);

  if (!patient) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Patient not found</p>
        </div>
      </div>
    );
  }

  const handleAccept = (codeId: string) => {
    setCodes(codes.map(c => c.id === codeId ? { ...c, status: 'accepted' as const } : c));
  };

  const handleReject = (codeId: string) => {
    setCodes(codes.map(c => c.id === codeId ? { ...c, status: 'rejected' as const } : c));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-700 bg-green-100';
    if (confidence >= 75) return 'text-blue-700 bg-blue-100';
    return 'text-amber-700 bg-amber-100';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 90) return 'High Confidence';
    if (confidence >= 75) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/notes/${patient.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">AI Code Suggestions</h2>
            <p className="text-gray-500 mt-1">
              {patient.firstName} {patient.lastName} • MRN: {patient.mrn}
            </p>
          </div>
          <Link
            to={`/edit/${patient.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Codes
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Codes</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{codes.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-2xl font-semibold text-green-700 mt-1">
            {codes.filter(c => c.status === 'accepted').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Pending Review</p>
          <p className="text-2xl font-semibold text-amber-700 mt-1">
            {codes.filter(c => c.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Code List */}
      <div className="space-y-4">
        {codes.map((code) => (
          <div
            key={code.id}
            className={`bg-white border rounded-lg transition-all ${
              code.status === 'accepted'
                ? 'border-green-300 bg-green-50'
                : code.status === 'rejected'
                ? 'border-red-300 bg-red-50 opacity-60'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="p-6">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-900">
                      {code.type}
                    </span>
                    <span className="text-xl font-semibold text-gray-900">{code.code}</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(
                        code.confidence
                      )}`}
                      role="status"
                      aria-label={`Confidence score: ${code.confidence} percent, ${getConfidenceLabel(code.confidence)}`}
                    >
                      {code.confidence}% • {getConfidenceLabel(code.confidence)}
                    </span>
                    {code.status === 'accepted' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Accepted
                      </span>
                    )}
                    {code.status === 'rejected' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <X className="w-3 h-3 mr-1" />
                        Rejected
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900 font-medium">{code.description}</p>
                </div>

                {code.status === 'pending' && (
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleAccept(code.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      aria-label={`Accept code ${code.code}`}
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(code.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      aria-label={`Reject code ${code.code}`}
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>

              {/* Evidence Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3" role="region" aria-label="Supporting evidence">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900 mb-1">Supporting Evidence</p>
                    <p className="text-sm text-blue-800 italic">"{code.evidence}"</p>
                  </div>
                </div>
              </div>

              {/* Guideline Reference */}
              {code.guideline && (
                <div className="flex items-start gap-2 text-sm">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-500 cursor-help mt-0.5" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm">
                        <p className="text-xs">
                          This code suggestion is based on current ICD-10-CM and CPT coding guidelines
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-gray-600">
                    <span className="font-medium">Guideline:</span> {code.guideline}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Next Steps</h4>
        <div className="flex items-center gap-4">
          <Link
            to={`/edit/${patient.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Review & Edit Codes
          </Link>
          <Link
            to={`/insurance/${patient.id}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Check Insurance Coverage
          </Link>
          <Link
            to={`/audit/${patient.id}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            View Audit Trail
          </Link>
        </div>
      </div>
    </div>
  );
}