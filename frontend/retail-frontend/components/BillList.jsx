import React, { useEffect, useState } from 'react';
import { getBills } from '../services/api';
import { useNavigate } from 'react-router-dom';

function BillList() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBills().then(res => setBills(res.data));
  }, []);

  return (
    <div>
      <h3 className="mb-3" style={{ textAlign: 'center' }}>📋 All Bills</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Bill ID</th><th>Customer</th><th>Date</th>
            <th>Total (₹)</th><th>Final (₹)</th><th>View</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id}>
              <td>#{b.id}</td>
              <td>{b.customer?.name}</td>
              <td>{new Date(b.billDate).toLocaleString()}</td>
              <td>₹{b.totalAmount?.toFixed(2)}</td>
              <td><strong>₹{b.finalAmount?.toFixed(2)}</strong></td>
              <td>
                <button className="btn btn-sm btn-info"
                  onClick={() => navigate(`/bills/${b.id}`)}>
                  View Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillList;