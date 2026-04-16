import React, { useState } from 'react';
import { addCustomer } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(form).then(() => navigate('/customers'));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h4 className="mb-3">➕ Add Customer</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Customer Name</label>
              <input className="form-control" name="name" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input className="form-control" name="phone" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input className="form-control" type="email" name="email" onChange={handleChange} />
            </div>
            <button className="btn btn-success w-100" type="submit">Save Customer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;