import React, { useEffect, useState } from 'react';
import { getProducts, getCustomers, getBills } from '../services/api';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
    getCustomers().then(res => setCustomers(res.data));
    getBills().then(res => setBills(res.data));
  }, []);

  const totalRevenue = bills.reduce((sum, b) => sum + (b.finalAmount || 0), 0);
  const lowStockProducts = products.filter(p => p.quantity < 10);

  return (
    <div>
      <h3 className="mb-4" style={{ color: '#2e4c6a',textAlign: 'center' }}><i> DASHBOARD </i></h3>

      {/* Summary Cards */}
<div className="row mb-4">
  <div className="col-md-3 mb-3">
    <div className="card p-3 shadow" style={{ background: 'rgba(53, 62, 117, 0.46)', backdropFilter: 'blur(3px)', border: '1px solid rgba(255, 255, 255, 0.72)', borderRadius: '12px' }}>
      <h6 style={{ color: 'rgb(255, 255, 255)', fontSize: '22px',textAlign: 'center' }}><u>Total Products</u></h6>
      <h2 style={{ color: '#fff', fontWeight: '700' , textAlign: 'center' }}>{products.length}</h2>
    </div>
  </div>
  <div className="col-md-3 mb-3">
    <div className="card p-3 shadow" style={{ background: 'rgba(53, 62, 117, 0.46)', backdropFilter: 'blur(3px)', border: '1px solid rgba(255, 255, 255, 0.72)', borderRadius: '12px' }}>
      <h6 style={{ color: 'rgb(255,255,255)', fontSize: '22px',textAlign: 'center' }}><u>Total Customers</u></h6>
      <h2 style={{ color: '#fff', fontWeight: '700' , textAlign: 'center' }}>{customers.length}</h2>
    </div>
  </div>
  <div className="col-md-3 mb-3">
    <div className="card p-3 shadow" style={{ background: 'rgba(53, 62, 117, 0.46)', backdropFilter: 'blur(3px)', border: '1px solid rgba(255, 255, 255, 0.72)', borderRadius: '12px' }}>
      <h6 style={{ color: 'rgb(255,255,255)', fontSize: '22px',textAlign: 'center' }}><u>Total Bills</u></h6>
      <h2 style={{ color: '#fff', fontWeight: '700' , textAlign: 'center' }}>{bills.length}</h2>
    </div>
  </div>
  <div className="col-md-3 mb-3">
    <div className="card p-3 shadow" style={{ background: 'rgba(53, 62, 117, 0.46)', backdropFilter: 'blur(3px)', border: '1px solid rgba(255, 255, 255, 0.72)', borderRadius: '12px' }}>
      <h6 style={{ color: 'rgb(255,255,255)', fontSize: '22px',textAlign: 'center' }}><u>Total Revenue</u></h6>
      <h2 style={{ color: '#fff', fontWeight: '700' , textAlign: 'center' }}>₹{totalRevenue.toFixed(2)}</h2>
    </div>
  </div>
</div>

      {/* Low Stock Alert */}
      <div className="card p-4 shadow mb-4">
        <h5 style = {{textAlign: 'center', fontSize: '25px',}}> <b>⚠️ Low  Stock  Alert ⚠️ </b> </h5>
        {lowStockProducts.length === 0 ? (
          <p className="text-success mt-2">✅ All products have sufficient stock!</p>
        ) : (
          <table className="table table-bordered table-hover mt-2">
            <thead className="table-danger">
              <tr>
                <th style={{ textAlign: 'center' }}>Product Name</th>
                <th style={{ textAlign: 'center' }}>Category</th>
                <th style={{ textAlign: 'center' }}>Remaining Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    <span className="badge bg-danger">{p.quantity} left</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Recent Bills */}
      <div className="card p-4 shadow">
        <h5 style={{ textAlign: 'center', fontSize: '26px' }}>🧾 Recent Bills</h5>
        <table className="table table-bordered table-hover mt-2">
          <thead className="table-dark">
            <tr>
              <th style={{ textAlign: 'center' }}>Bill ID</th>
              <th style={{ textAlign: 'center' }}>Customer</th>
              <th style={{ textAlign: 'center' }}>Date</th>
              <th style={{ textAlign: 'center' }}>Final Amount</th>
            </tr>
          </thead>
          <tbody>
            {bills.slice(-5).reverse().map(b => (
              <tr key={b.id}>
                <td>#{b.id}</td>
                <td>{b.customer?.name}</td>
                <td>{new Date(b.billDate).toLocaleString()}</td>
                <td><strong>₹{b.finalAmount?.toFixed(2)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;