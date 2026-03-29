import { useParams, Link } from 'react-router';
import { mockPatients, mockAuditEntries } from '../data/mockData';
import { ArrowLeft, Clock, User, FileText, CheckCircle, XCircle, Edit } from 'lucide-react';

export function AuditTrail() {
  const { patientId } = useParams();
  const patient = mockPatients.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Patient not found</p>
        </div>
      </div>
    );
  }

  const getActionIcon = (action: string) => {
    if (action.includes('Accepted')) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (action.includes('Rejected')) return <XCircle className="w-5 h-5 text-red-600" />;
    if (action.includes('Modified') || action.includes('Edited')) return <Edit className="w-5 h-5 text-blue-600" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/insurance/${patient.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insurance
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Audit Trail</h2>
          <p className="text-gray-500 mt-1">
            {patient.firstName} {patient.lastName} • MRN: {patient.mrn}
          </p>
        </div>
      </div>

      {/* Audit Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">About the Audit Trail</h3>
            <p className="text-sm text-blue-800">
              This timeline shows all actions taken on this case, including AI suggestions, user modifications, 
              and status changes. All entries are timestamped and attributed to maintain compliance and transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Activity Timeline</h3>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />

          {/* Entries */}
          <div className="space-y-8">
            {mockAuditEntries.map((entry, index) => {
              const { date, time } = formatTimestamp(entry.timestamp);
              
              return (
                <div key={entry.id} className="relative pl-14">
                  {/* Icon */}
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    {getActionIcon(entry.action)}
                  </div>

                  {/* Content */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{entry.action}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {entry.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {date} at {time}
                          </span>
                        </div>
                      </div>
                      {entry.codeAffected && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-900">
                          {entry.codeAffected}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{entry.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Export Audit Trail</h4>
        <p className="text-sm text-gray-600 mb-4">
          Download a complete record of all actions for compliance and record-keeping purposes.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Export as PDF
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Export as CSV
          </button>
        </div>
      </div>
    </div>
  );
}
