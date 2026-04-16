import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import Billing from './components/Billing';
import BillList from './components/BillList';
import BillDetail from './components/BillDetail';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogin = () => {
  localStorage.setItem('isLoggedIn', 'true');
  setIsLoggedIn(true);

  navigate('/dashboard'); 
};

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      
      {isLoggedIn && location.pathname !== '/login' && (
        <Navbar onLogout={handleLogout} />
      )}

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/products" element={
          <ProtectedRoute><ProductList /></ProtectedRoute>
        } />

        <Route path="/add-product" element={
          <ProtectedRoute><AddProduct /></ProtectedRoute>
        } />

        <Route path="/edit-product/:id" element={
          <ProtectedRoute><EditProduct /></ProtectedRoute>
        } />

        <Route path="/customers" element={
          <ProtectedRoute><CustomerList /></ProtectedRoute>
        } />

        <Route path="/add-customer" element={
          <ProtectedRoute><AddCustomer /></ProtectedRoute>
        } />

        <Route path="/edit-customer/:id" element={
          <ProtectedRoute><EditCustomer /></ProtectedRoute>
        } />

        <Route path="/billing" element={
          <ProtectedRoute><Billing /></ProtectedRoute>
        } />

        <Route path="/bills" element={
          <ProtectedRoute><BillList /></ProtectedRoute>
        } />

        <Route path="/bills/:id" element={
          <ProtectedRoute><BillDetail /></ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}


function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;