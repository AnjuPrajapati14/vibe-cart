import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Cart({ refreshKey, onCheckout }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function load() {
    const r = await api.getCart();
    setCart(r.data || []);
    setTotal(r.total || 0);
  }

  useEffect(() => { load(); }, [refreshKey]);

  const remove = async (id) => {
    await api.removeCartItem(id);
    load();
  };

  const updateQty = async (id, qty) => {
    await api.updateCartItem(id, qty);
    load();
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const resp = await api.checkout({ name, email });
    if (resp.success) {
      onCheckout({ name, email });
      setName(''); setEmail('');
      load();
    } else {
      alert(resp.error || 'Checkout failed');
    }
  };

  return (
    <div className="cart">
      <h3>Cart</h3>
      {cart.length === 0 ? <p>Cart is empty</p> : cart.map(item => (
        <div key={item.id} className="cart-item">
          <div>
            <strong>{item.name}</strong><br />
            <small>₹{item.price} ×</small>
            <input style={{width:40}} value={item.qty} onChange={e => updateQty(item.id, Number(e.target.value) || 1)} />
          </div>
          <div>
            <div>₹{item.price * item.qty}</div>
            <button onClick={() => remove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <hr />
      <div><strong>Total: ₹{total}</strong></div>

      <form className="checkout-form" onSubmit={handleCheckout}>
        <h4>Checkout</h4>
        <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Place order (mock)</button>
      </form>
    </div>
  );
}
