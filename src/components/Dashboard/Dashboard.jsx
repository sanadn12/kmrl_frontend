import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ documents }) => {
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter documents based on search input and active filter
  const filteredDocs = documents
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) ||
                           doc.type.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      return a.title.localeCompare(b.title);
    });

  // Badge color based on type
  const getBadgeColor = (type) => {
    switch(type) {
      case "HR": return "bg-green-100 text-green-800 border border-green-200";
      case "Engineering": return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Safety": return "bg-red-100 text-red-800 border border-red-200";
      case "Financial": return "bg-purple-100 text-purple-800 border border-purple-200";
      case "Operations": return "bg-amber-100 text-amber-800 border border-amber-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Stats
  const docCountByType = documents.reduce((acc, doc) => {
    acc[doc.type] = (acc[doc.type] || 0) + 1;
    return acc;
  }, {});

  const totalDocs = documents.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Document Dashboard</h1>
          <p className="text-gray-600">Manage and access all KMRL documents in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-3 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Documents</p>
                <p className="text-2xl font-bold text-gray-800">{totalDocs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-3 mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">HR Documents</p>
                <p className="text-2xl font-bold text-gray-800">{docCountByType.HR || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-3 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engineering Docs</p>
                <p className="text-2xl font-bold text-gray-800">{docCountByType.Engineering || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-100 p-3 mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Other Documents</p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalDocs - (docCountByType.HR || 0) - (docCountByType.Engineering || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text"
                  placeholder="Search documents by title or type..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select 
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Safety">Safety</option>
                <option value="Financial">Financial</option>
                <option value="Operations">Operations</option>
              </select>

              <select 
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>

              <Link 
                to="/upload" 
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Upload Document
              </Link>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800">Recent Documents</h2>
              <p className="text-sm text-gray-600">{filteredDocs.length} documents found</p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredDocs.length > 0 ? (
              filteredDocs.map(doc => (
                <div 
                  key={doc.id} 
                  className="px-6 py-4 transition-colors duration-200 hover:bg-blue-50 cursor-pointer"
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-lg mb-1">{doc.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(doc.type)}`}>
                          {doc.type}
                        </span>
                        <span className="text-sm text-gray-500">{doc.date}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">Size: {doc.size || '2.4MB'}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-500 rounded-lg hover:bg-green-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-700">No documents found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{selectedDoc.title}</h2>
              <button 
                onClick={() => setSelectedDoc(null)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-4 overflow-y-auto flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(selectedDoc.type)}`}>
                  {selectedDoc.type}
                </span>
                <span className="text-sm text-gray-500">{selectedDoc.date}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Size: {selectedDoc.size || '2.4MB'}</span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  This is a detailed preview of the document content. In a real application, this would display
                  the actual content extracted from the document with proper formatting.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Document Summary</h4>
                  <p className="text-sm text-gray-600">
                    This document contains important information regarding {selectedDoc.type.toLowerCase()} procedures
                    and policies. All relevant personnel should review this document carefully.
                  </p>
                </div>
                
                <h4 className="font-medium text-gray-800 mb-2">Key Points</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Updated safety protocols effective immediately</li>
                  <li>New reporting structure for incident documentation</li>
                  <li>Revised compliance requirements per latest regulations</li>
                  <li>Action items for department heads</li>
                </ul>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                Download
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;