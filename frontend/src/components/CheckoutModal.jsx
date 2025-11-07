import React from 'react';

export default function CheckoutModal({ visible, receipt, onClose }) {
  if (!visible || !receipt) return null;
  return (
    <div className="modal">
      <h3>Receipt</h3>
      <p><strong>Id:</strong> {receipt.receiptId}</p>
      <p><strong>Name:</strong> {receipt.name}</p>
      <p><strong>Total:</strong> ₹{receipt.total}</p>
      <p><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
      <ul>
        {receipt.items.map(it => (
          <li key={it.id}>{it.name} × {it.qty} — ₹{it.price * it.qty}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
