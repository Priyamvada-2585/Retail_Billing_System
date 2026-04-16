import React, { useState } from 'react';
import { addProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', quantity: '', category: '' });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form).then(() => {
      setSuccess('✅ Product added successfully!');
      setTimeout(() => navigate('/products'), 1000);
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h4 className="mb-3">➕ Add Product</h4>

          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Product Name</label>
              <input className="form-control" name="name" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Category</label>
              <input className="form-control" name="category" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Price (₹)</label>
              <input className="form-control" type="number" name="price" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Stock Quantity</label>
              <input className="form-control" type="number" name="quantity" onChange={handleChange} required />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success w-100" type="submit">Save Product</button>
              <button className="btn btn-secondary w-100" type="button"
                onClick={() => navigate('/products')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;