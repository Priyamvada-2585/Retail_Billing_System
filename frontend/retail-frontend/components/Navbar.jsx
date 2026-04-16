import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div style={styles.navbar}>
      <h3 style={{ margin: 0 }}>🧾 Billing System</h3>

      <div style={styles.links}>
        {/* Dashboard */}
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>

        {/* Products */}
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/add-product" style={styles.link}>Add Product</Link>

        {/* Customers */}
        <Link to="/customers" style={styles.link}>Customers</Link>
        <Link to="/add-customer" style={styles.link}>Add Customer</Link>

        {/* Billing */}
        <Link to="/billing" style={styles.link}>Create Bill</Link>

        {/* Bills */}
        <Link to="/bills" style={styles.link}>All Bills</Link>
      </div>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#1f4d68',
    padding: '15px 20px',
    color: 'white'
  },
  links: {
    display: 'flex',
    gap: '45px',
    flexWrap: 'wrap'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '22px'
  },
  logout: {
    background: '#e94a45c8',
    border: 'black',
    color: 'white',
    padding: '8px 12px',
    cursor: 'pointer'
  }
};

export default Navbar;