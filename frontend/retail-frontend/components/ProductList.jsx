import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    getProducts().then(res => setProducts(res.data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      deleteProduct(id).then(fetchProducts);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 >📦 Products</h3>
        <button className="btn btn-primary" onClick={() => navigate('/add-product')}>
          + Add Product
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No products found. Click + Add Product to add one!
              </td>
            </tr>
          ) : (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>
                  <span className={`badge ${p.quantity < 10 ? 'bg-danger' : p.quantity < 20 ? 'bg-warning' : 'bg-success'}`}>
                    {p.quantity}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/edit-product/${p.id}`)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;