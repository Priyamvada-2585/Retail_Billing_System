import React, { useEffect, useState } from 'react';
import { getCustomers, updateCustomer } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function EditCustomer() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers().then(res => {
      const customer = res.data.find(c => c.id === parseInt(id));
      if (customer) setForm(customer);
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomer(id, form).then(() => navigate('/customers'));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h4 className="mb-3">✏️ Edit Customer</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Customer Name</label>
              <input className="form-control" name="name"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input className="form-control" name="phone"
                value={form.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input className="form-control" type="email" name="email"
                value={form.email} onChange={handleChange} />
            </div>
            <button className="btn btn-warning w-100" type="submit">
              Update Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;