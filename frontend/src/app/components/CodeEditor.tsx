import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { mockPatients, mockCodeSuggestions, icd10Database, cptDatabase } from '../data/mockData';
import { ArrowLeft, Search, Plus, Trash2, ChevronRight, Check, X } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface CodeItem {
  id: string;
  code: string;
  type: 'ICD-10' | 'CPT';
  description: string;
  status: 'accepted' | 'pending';
}

export function CodeEditor() {
  const { patientId } = useParams();
  const patient = mockPatients.find((p) => p.id === patientId);
  
  const [codes, setCodes] = useState<CodeItem[]>(
    mockCodeSuggestions
      .filter(c => c.status !== 'rejected')
      .map(c => ({
        id: c.id,
        code: c.code,
        type: c.type,
        description: c.description,
        status: c.status,
      }))
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'ICD-10' | 'CPT'>('ICD-10');
  const [showSearch, setShowSearch] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [codeToDelete, setCodeToDelete] = useState<string | null>(null);

  if (!patient) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Patient not found</p>
        </div>
      </div>
    );
  }

  const searchDatabase = searchType === 'ICD-10' ? icd10Database : cptDatabase;
  const searchResults = searchQuery.length >= 2
    ? searchDatabase.filter(
        item =>
          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleAddCode = (code: string, description: string) => {
    const newCode: CodeItem = {
      id: `new-${Date.now()}`,
      code,
      type: searchType,
      description,
      status: 'pending',
    };
    setCodes([...codes, newCode]);
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleDeleteClick = (codeId: string) => {
    setCodeToDelete(codeId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (codeToDelete) {
      setCodes(codes.filter(c => c.id !== codeToDelete));
    }
    setDeleteDialogOpen(false);
    setCodeToDelete(null);
  };

  const toggleStatus = (codeId: string) => {
    setCodes(codes.map(c => 
      c.id === codeId 
        ? { ...c, status: c.status === 'accepted' ? 'pending' : 'accepted' as const }
        : c
    ));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/codes/${patient.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Suggestions
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Code Editor</h2>
            <p className="text-gray-500 mt-1">
              {patient.firstName} {patient.lastName} • MRN: {patient.mrn}
            </p>
          </div>
          <Link
            to={`/insurance/${patient.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Coverage
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Add Code Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Code
        </button>
      </div>

      {/* Code Search Panel */}
      {showSearch && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Search Codes</h3>
          
          {/* Type Selector */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSearchType('ICD-10')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                searchType === 'ICD-10'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ICD-10 Diagnosis
            </button>
            <button
              onClick={() => setSearchType('CPT')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                searchType === 'CPT'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              CPT Procedure
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search ${searchType} codes...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-64 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.code}
                  onClick={() => handleAddCode(result.code, result.description)}
                  className="w-full text-left p-3 hover:bg-gray-50 transition-colors"
                  disabled={codes.some(c => c.code === result.code)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900">{result.code}</span>
                      <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                    </div>
                    {codes.some(c => c.code === result.code) && (
                      <span className="text-sm text-gray-500">Already added</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {searchQuery.length >= 2 && searchResults.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No codes found matching your search</p>
          )}
        </div>
      )}

      {/* Code List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Assigned Codes</h3>
          <p className="text-sm text-gray-500 mt-1">
            {codes.length} codes • {codes.filter(c => c.status === 'accepted').length} accepted
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {codes.map((code) => (
            <div
              key={code.id}
              className={`p-6 ${
                code.status === 'accepted' ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-900">
                      {code.type}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">{code.code}</span>
                    {code.status === 'accepted' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Accepted
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900">{code.description}</p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleStatus(code.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      code.status === 'accepted'
                        ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {code.status === 'accepted' ? (
                      <>
                        <X className="w-4 h-4" />
                        Unaccept
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Accept
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteClick(code.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete code"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {codes.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No codes assigned yet. Click "Add Code" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Code</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this code? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
