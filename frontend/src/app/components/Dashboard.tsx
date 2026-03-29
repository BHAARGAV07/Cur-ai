import { Link } from 'react-router';
import { mockPatients } from '../data/mockData';
import { User, Calendar, FileText, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function Dashboard() {
  const recentPatients = mockPatients;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-gray-900">Active Cases</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-600" aria-label="Help information">
                  <Info className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-xs">
                  Select a patient to begin the medical coding workflow. Each case includes clinical notes,
                  AI-generated code suggestions, and insurance verification.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-500 mt-1">Select a patient to begin coding</p>
      </div>

      <div className="grid gap-4">
        {recentPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">MRN: {patient.mrn}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="text-gray-900 font-medium">{patient.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Insurance</p>
                    <p className="text-gray-900 font-medium">{patient.insuranceProvider}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Policy #</p>
                    <p className="text-gray-900 font-medium">{patient.policyNumber}</p>
                  </div>
                </div>
              </div>

              <div className="ml-6 flex flex-col gap-2">
                <Link
                  to={`/patient/${patient.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View Patient
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to={`/notes/${patient.id}`}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  View Notes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Quick Start Guide</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">1.</span>
            <span>Select a patient case to review demographics and insurance information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">2.</span>
            <span>Review the provider's clinical notes for coding details</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">3.</span>
            <span>View AI-generated code suggestions with evidence and confidence scores</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">4.</span>
            <span>Accept, reject, or modify codes using the searchable code editor</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[20px]">5.</span>
            <span>Check insurance coverage and submit prior authorization if needed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}