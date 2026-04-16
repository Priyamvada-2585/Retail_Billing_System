import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../services/api';
import { useNavigate } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = () => {
    getCustomers().then(res => setCustomers(res.data));
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this customer?')) {
      deleteCustomer(id).then(fetchCustomers);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>👤 Customers</h3>
        <button className="btn btn-primary" onClick={() => navigate('/add-customer')}>
          + Add Customer
        </button>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/edit-customer/${c.id}`)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;