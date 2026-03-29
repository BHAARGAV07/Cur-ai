import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { mockPatients, mockInsuranceServices, PriorAuth } from '../data/mockData';
import { ArrowLeft, ChevronRight, CheckCircle, XCircle, AlertTriangle, Clock, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function InsurancePanel() {
  const { patientId } = useParams();
  const patient = mockPatients.find((p) => p.id === patientId);
  const [services, setServices] = useState(mockInsuranceServices);
  const [priorAuthOpen, setPriorAuthOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [priorAuthForm, setPriorAuthForm] = useState<PriorAuth>({
    serviceCode: '',
    diagnosis: [],
    justification: '',
    clinicalNotes: '',
    urgency: 'routine',
  });

  if (!patient) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Patient not found</p>
        </div>
      </div>
    );
  }

  const handlePriorAuthClick = (serviceCode: string) => {
    setSelectedService(serviceCode);
    setPriorAuthForm({
      serviceCode,
      diagnosis: ['J18.1'],
      justification: '',
      clinicalNotes: '',
      urgency: 'routine',
    });
    setPriorAuthOpen(true);
  };

  const handleSubmitPriorAuth = () => {
    // Mock submission
    setPriorAuthOpen(false);
    // Update service status to pending
    setServices(services.map(s => 
      s.code === selectedService 
        ? { ...s, coverageStatus: 'pending' as const }
        : s
    ));
  };

  const getCoverageIcon = (status: string) => {
    switch (status) {
      case 'covered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'not-covered':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'requires-auth':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getCoverageColor = (status: string) => {
    switch (status) {
      case 'covered':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'not-covered':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'requires-auth':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'pending':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getCoverageLabel = (status: string) => {
    switch (status) {
      case 'covered':
        return 'Covered';
      case 'not-covered':
        return 'Not Covered';
      case 'requires-auth':
        return 'Prior Auth Required';
      case 'pending':
        return 'Authorization Pending';
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/edit/${patient.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Code Editor
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Insurance Coverage</h2>
            <p className="text-gray-500 mt-1">
              {patient.firstName} {patient.lastName} • {patient.insuranceProvider}
            </p>
          </div>
          <Link
            to={`/audit/${patient.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Audit Trail
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Insurance Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Policy Information</h3>
        <div className="grid grid-cols-3 gap-6 text-sm">
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
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active & Verified
            </span>
          </div>
        </div>
      </div>

      {/* Coverage Status */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Service Coverage Status</h3>
          <p className="text-sm text-gray-500 mt-1">Review coverage for all assigned codes and services</p>
        </div>

        <div className="divide-y divide-gray-200">
          {services.map((service) => (
            <div key={service.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900 text-lg">{service.code}</span>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getCoverageColor(service.coverageStatus)}`}>
                      {getCoverageIcon(service.coverageStatus)}
                      <span className="text-sm font-medium">{getCoverageLabel(service.coverageStatus)}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{service.description}</p>

                  <div className="flex items-center gap-6 text-sm">
                    {service.estimatedCost !== undefined && (
                      <div>
                        <span className="text-gray-500">Estimated Cost: </span>
                        <span className="text-gray-900 font-medium">${service.estimatedCost.toFixed(2)}</span>
                      </div>
                    )}
                    {service.copay !== undefined && (
                      <div>
                        <span className="text-gray-500">Patient Copay: </span>
                        <span className="text-gray-900 font-medium">${service.copay.toFixed(2)}</span>
                      </div>
                    )}
                    {service.priorAuthRequired && (
                      <div className="flex items-center gap-1 text-amber-700">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Prior Authorization Required</span>
                      </div>
                    )}
                  </div>
                </div>

                {service.coverageStatus === 'requires-auth' && (
                  <button
                    onClick={() => handlePriorAuthClick(service.code)}
                    className="ml-4 flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    Submit Prior Auth
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prior Authorization Modal */}
      <Dialog open={priorAuthOpen} onOpenChange={setPriorAuthOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prior Authorization Request</DialogTitle>
            <DialogDescription>
              Complete the form below to submit a prior authorization request for service {selectedService}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="service-code">Service Code</Label>
              <Input
                id="service-code"
                value={priorAuthForm.serviceCode}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="diagnosis">Primary Diagnosis Code(s)</Label>
              <Input
                id="diagnosis"
                value={priorAuthForm.diagnosis.join(', ')}
                onChange={(e) => setPriorAuthForm({
                  ...priorAuthForm,
                  diagnosis: e.target.value.split(',').map(d => d.trim()).filter(Boolean)
                })}
                placeholder="Enter ICD-10 codes separated by commas"
              />
            </div>

            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <select
                id="urgency"
                value={priorAuthForm.urgency}
                onChange={(e) => setPriorAuthForm({
                  ...priorAuthForm,
                  urgency: e.target.value as 'routine' | 'urgent' | 'emergent'
                })}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="routine">Routine (10-14 days)</option>
                <option value="urgent">Urgent (3-5 days)</option>
                <option value="emergent">Emergent (24 hours)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="justification">Medical Justification</Label>
              <Textarea
                id="justification"
                value={priorAuthForm.justification}
                onChange={(e) => setPriorAuthForm({
                  ...priorAuthForm,
                  justification: e.target.value
                })}
                placeholder="Explain the medical necessity for this service..."
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                Include relevant clinical information supporting the need for this service
              </p>
            </div>

            <div>
              <Label htmlFor="clinical-notes">Supporting Clinical Notes</Label>
              <Textarea
                id="clinical-notes"
                value={priorAuthForm.clinicalNotes}
                onChange={(e) => setPriorAuthForm({
                  ...priorAuthForm,
                  clinicalNotes: e.target.value
                })}
                placeholder="Additional clinical documentation..."
                rows={4}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Prior authorization requests are typically processed within the timeframe 
                indicated by the urgency level. You will be notified once a determination has been made.
              </p>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setPriorAuthOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPriorAuth}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!priorAuthForm.justification.trim()}
            >
              Submit Request
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
