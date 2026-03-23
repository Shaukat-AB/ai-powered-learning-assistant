import { BrowserRouter as Router, Route, Routes } from 'react-router';
import AppLayout from './AppLayout';

import { ProtectedRoute, PublicRoute } from './components/auth/route';

import WelcomePage from './pages/public/WelcomePage';

import DashboardPage from './pages/private/DashboardPage';
import DocumentsPage from './pages/private/DocumentsPage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/error/ErrorPage';
import NotFoundPage from './pages/error/NotFoundPage';

import { logError } from './lib/utils';
import { queryClient } from './lib/react-query';

import { AuthProvider } from './context/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppLayout>
              <ErrorBoundary FallbackComponent={ErrorPage} onError={logError}>
                <Routes>
                  {/* Public Routes*/}
                  <Route element={<PublicRoute />}>
                    <Route path="/" element={<WelcomePage />} />
                  </Route>

                  {/* Protected Routes*/}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/documents" element={<DocumentsPage />} />
                  </Route>

                  {/* Others */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
            </AppLayout>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
