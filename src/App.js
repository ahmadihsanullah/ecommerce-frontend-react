import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import ProtectedRoute from './components/ProtectedRoute';
import KategoriAdmin from './pages/admin/KategoriAdmin';
import ProdukAdminCreate from './pages/admin/ProdukAdminCreate';
import ProdukAdminDetail from './pages/admin/ProdukAdminDetail';
import ProdukAdminList from './pages/admin/ProdukAdminList';
import ProdukAdminEdit from './pages/admin/ProdukAdminEdit';

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
        <Route path="/admin/produk" element={
          <ProtectedRoute>
            <ProdukAdminList />
          </ProtectedRoute>
        } />
         <Route path="/admin/produk/create" element={
          <ProtectedRoute>
            <ProdukAdminCreate />
          </ProtectedRoute>
        } />
        <Route path="/admin/produk/detail/:id" element={
          <ProtectedRoute>
            <ProdukAdminDetail />
          </ProtectedRoute>
        } />
         <Route path="/admin/produk/edit/:id" element={
          <ProtectedRoute>
            <ProdukAdminEdit />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
