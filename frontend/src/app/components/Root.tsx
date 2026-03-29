import { Outlet, Link, useLocation } from 'react-router';
import { FileText, ClipboardList, Shield, History, Home } from 'lucide-react';

export function Root() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col" role="navigation" aria-label="Main navigation">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-semibold text-xl text-gray-900">Medical Coding AI</h1>
          <p className="text-sm text-gray-500 mt-1">Billing & Documentation</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isHome
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <p>Logged in as:</p>
            <p className="font-medium text-gray-900">Sarah Johnson, CPC</p>
            <p className="text-gray-400">Certified Professional Coder</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 overflow-auto" role="main">
        <Outlet />
      </main>
    </div>
  );
}