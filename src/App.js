import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import ProtectedRoute from './components/ProtectedRoute';
import KategoriAdmin from './pages/admin/KategoriAdmin';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute >
            <DashboardAdmin />
          </ProtectedRoute >
        } />
        <Route path="/admin/kategori" element={
          <ProtectedRoute>
            <KategoriAdmin />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
