import { useParams, Link } from 'react-router';
import { mockPatients } from '../data/mockData';
import { User, Calendar, Phone, Mail, MapPin, CreditCard, FileText, ChevronRight, ArrowLeft } from 'lucide-react';

export function PatientIntake() {
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

  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Patient Demographics</h2>
            <p className="text-gray-500 mt-1">MRN: {patient.mrn}</p>
          </div>
          <Link
            to={`/notes/${patient.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Notes
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Patient Information Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-8 h-8 text-blue-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                DOB: {patient.dateOfBirth}
              </span>
              <span>Age: {age} years</span>
              <span>Gender: {patient.gender}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              Contact Information
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="text-gray-900 font-medium">{patient.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{patient.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Address</p>
                <p className="text-gray-900 font-medium">{patient.address}</p>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              Insurance Information
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Provider</p>
                <p className="text-gray-900 font-medium">{patient.insuranceProvider}</p>
              </div>
              <div>
                <p className="text-gray-500">Policy Number</p>
                <p className="text-gray-900 font-medium">{patient.policyNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                  <span className="text-gray-600">Verified 2026-03-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-4 gap-4">
          <Link
            to={`/notes/${patient.id}`}
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
          >
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">View Notes</span>
          </Link>
          <Link
            to={`/codes/${patient.id}`}
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
          >
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Code Suggestions</span>
          </Link>
          <Link
            to={`/edit/${patient.id}`}
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
          >
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Edit Codes</span>
          </Link>
          <Link
            to={`/insurance/${patient.id}`}
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
          >
            <CreditCard className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Insurance</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
