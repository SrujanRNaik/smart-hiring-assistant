import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import ApplyPage from './pages/ApplyPage';
const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      {/* Protected routes — must be logged in */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      {/* Protected — only candidates can apply */}
      <Route path="/apply/:id" element={
        <ProtectedRoute allowedRole="candidate">
          <ApplyPage />
        </ProtectedRoute>
      } />
      {/* Default redirect */}
      <Route path="/" element={
        user ? <Navigate to="/dashboard" /> : <Navigate to="/jobs" />
      } />
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default App;