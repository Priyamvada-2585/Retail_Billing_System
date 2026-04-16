import React, { useEffect, useState } from 'react';
import { getProducts, updateProduct } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', price: '', quantity: '', category: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(res => {
      const product = res.data.find(p => p.id === parseInt(id));
      if (product) setForm(product);
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, form).then(() => navigate('/'));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h4 className="mb-3">✏️ Edit Product</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Product Name</label>
              <input className="form-control" name="name"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Category</label>
              <input className="form-control" name="category"
                value={form.category} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Price (₹)</label>
              <input className="form-control" type="number" name="price"
                value={form.price} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Stock Quantity</label>
              <input className="form-control" type="number" name="quantity"
                value={form.quantity} onChange={handleChange} required />
            </div>
            <button className="btn btn-warning w-100" type="submit">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;