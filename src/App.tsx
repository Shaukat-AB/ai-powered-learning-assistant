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
import { isLoggedin } from './temp-constants';

function App() {
  return (
    <Router>
      <AppLayout>
        <ErrorBoundary FallbackComponent={ErrorPage} onError={logError}>
          <Routes>
            {/* Public Routes*/}
            <Route element={<PublicRoute isLoggedin={isLoggedin} />}>
              <Route path="/" element={<WelcomePage />} />
            </Route>

            {/* Protected Routes*/}
            <Route element={<ProtectedRoute isLoggedin={isLoggedin} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
            </Route>

            {/* Others */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </AppLayout>
    </Router>
  );
}

export default App;
