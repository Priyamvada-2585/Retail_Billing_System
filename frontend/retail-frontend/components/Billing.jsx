import React, { useEffect, useState } from 'react';
import { getProducts, getCustomers, createBill } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Billing() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState([{ productId: '', quantity: 1 }]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
    getCustomers().then(res => setCustomers(res.data));
  }, []);

  const addItem = () => setItems([...items, { productId: '', quantity: 1 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => {
      const product = products.find(p => p.id === parseInt(item.productId));
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getFinalAmount = () => {
    const total = getTotal();
    const afterDiscount = total - parseFloat(discount || 0);
    const gst = afterDiscount * 0.18;
    return (afterDiscount + gst).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const billData = {
      customerId: parseInt(customerId),
      discount: parseFloat(discount),
      items: items.map(i => ({
        productId: parseInt(i.productId),
        quantity: parseInt(i.quantity)
      }))
    };
    createBill(billData).then(res => {
      alert('Bill created successfully!');
      navigate(`/bills/${res.data.id}`);
    });
  };

  return (
    <div>
      <h3 className="mb-3" style={{ textAlign: 'center'}}>🧾 Create New Bill</h3>
      <form onSubmit={handleSubmit}>
        <div className="card p-4 shadow mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Select Customer</label>
              <select className="form-control" value={customerId}
                onChange={e => setCustomerId(e.target.value)} required>
                <option value="">-- Select Customer --</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Discount (₹)</label>
              <input className="form-control" type="number" value={discount}
                onChange={e => setDiscount(e.target.value)} min="0" />
            </div>
          </div>
        </div>

        <div className="card p-4 shadow mb-3">
          <h5>🛒 Products</h5>
          {items.map((item, index) => (
            <div className="row mb-2 align-items-center" key={index}>
              <div className="col-md-6">
                <select className="form-control" value={item.productId}
                  onChange={e => handleItemChange(index, 'productId', e.target.value)} required>
                  <option value="">-- Select Product --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ₹{p.price} (Stock: {p.quantity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <input className="form-control" type="number" min="1"
                  value={item.quantity}
                  onChange={e => handleItemChange(index, 'quantity', e.target.value)} />
              </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-danger btn-sm"
                  onClick={() => removeItem(index)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary mt-2" onClick={addItem}>
            + Add Item
          </button>
        </div>

        <div className="card p-4 shadow mb-3">
          <h5>💰 Summary</h5>
          <p>Subtotal: ₹{getTotal().toFixed(2)}</p>
          <p>Discount: ₹{discount || 0}</p>
          <p>GST (18%): ₹{((getTotal() - discount) * 0.18).toFixed(2)}</p>
          <h5>Final Amount: ₹{getFinalAmount()}</h5>
        </div>

        <button className="btn btn-success w-100" type="submit">✅ Generate Bill</button>
      </form>
    </div>
  );
}

export default Billing;