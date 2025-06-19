import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import DashboardAdmin from './pages/admin/DashboardAdmin';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
