import { BrowserRouter as Router, Route, Routes } from 'react-router';
import AppLayout from './AppLayout';

import { ProtectedRoute, PublicRoute } from './components/auth/route';

import WelcomePage from './pages/public/WelcomePage';

import DashboardPage from './pages/private/DashboardPage';
import DocumentsPage from './pages/private/DocumentsPage';
import DocumentTabsPage from '@/pages/private/DoumentTabsPage';
import DocumentPreviewPage from './pages/private/DocumentPreviewPage';
import ChatPage from './pages/private/ChatPage';
import QuizzesPage from './pages/private/QuizzesPage';
import ErrorPage from './pages/error/ErrorPage';
import NotFoundPage from './pages/error/NotFoundPage';

import { queryClient } from './lib/react-query';
import { logError } from './lib/utils';

import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from './context/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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

                    <Route path="/documents/" element={<DocumentsPage />}>
                      <Route path=":id" element={<DocumentTabsPage />}>
                        <Route
                          path="preview"
                          element={<DocumentPreviewPage />}
                        />

                        <Route path="chat" element={<ChatPage />} />
                        <Route path="quizzes" element={<QuizzesPage />} />
                      </Route>
                    </Route>
                  </Route>

                  {/* Others */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
            </AppLayout>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
