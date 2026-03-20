import { BrowserRouter as Router, Route, Routes } from 'react-router';
import AppLayout from './AppLayout';

import { ProtectedRoute, PublicRoute } from './components/auth/route';

import WelcomePage from './pages/public/WelcomePage';

import DashboardPage from './pages/private/DashboardPage';
import DocumentsPage from './pages/private/DocumentsPage';

function App() {
  const isLoggedin = false;
  return (
    <Router>
      <AppLayout>
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
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
