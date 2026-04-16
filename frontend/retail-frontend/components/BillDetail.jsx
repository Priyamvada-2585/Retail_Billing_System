import React, { useEffect, useState } from 'react';
import { getBillById } from '../services/api';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function BillDetail() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    getBillById(id).then(res => setBill(res.data));
  }, [id]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Retail Billing System', 105, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Invoice #${bill.id}`, 105, 23, { align: 'center' });
    doc.text(`Date: ${new Date(bill.billDate).toLocaleString()}`, 14, 35);
    doc.text(`Customer: ${bill.customer?.name}`, 14, 43);
    doc.text(`Phone: ${bill.customer?.phone}`, 14, 51);

    autoTable(doc, {
      startY: 60,
      head: [['Product', 'Qty', 'Price (₹)', 'Subtotal (₹)']],
      body: bill.items?.map(item => [
        item.product?.name,
        item.quantity,
        `₹${item.priceAtBilling}`,
        `₹${item.subtotal?.toFixed(2)}`
      ]),
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ₹${bill.totalAmount?.toFixed(2)}`, 14, finalY);
    doc.text(`Discount: -₹${bill.discount?.toFixed(2)}`, 14, finalY + 8);
    doc.text(`GST (18%): +₹${bill.gst?.toFixed(2)}`, 14, finalY + 16);
    doc.setFontSize(14);
    doc.text(`Final Amount: ₹${bill.finalAmount?.toFixed(2)}`, 14, finalY + 26);

    doc.save(`Invoice_${bill.id}.pdf`);
  };

  if (!bill) return <p>Loading...</p>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-1">🛒 Retail Billing System</h3>
          <p className="text-center text-muted">Invoice #{bill.id}</p>
          <hr />
          <p><strong>Customer:</strong> {bill.customer?.name}</p>
          <p><strong>Phone:</strong> {bill.customer?.phone}</p>
          <p><strong>Date:</strong> {new Date(bill.billDate).toLocaleString()}</p>
          <hr />
          <table className="table table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {bill.items?.map(item => (
                <tr key={item.id}>
                  <td>{item.product?.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.priceAtBilling}</td>
                  <td>₹{item.subtotal?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div className="text-end">
            <p>Subtotal: ₹{bill.totalAmount?.toFixed(2)}</p>
            <p>Discount: -₹{bill.discount?.toFixed(2)}</p>
            <p>GST (18%): +₹{bill.gst?.toFixed(2)}</p>
            <h5><strong>Final Amount: ₹{bill.finalAmount?.toFixed(2)}</strong></h5>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-secondary w-50" onClick={() => window.print()}>
              🖨️ Print Invoice
            </button>
            <button className="btn btn-danger w-50" onClick={downloadPDF}>
              📄 Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillDetail;