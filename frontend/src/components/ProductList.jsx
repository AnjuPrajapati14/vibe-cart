import React from 'react';
import api from '../api';

export default function ProductList({ products = [], refreshCart }) {
  const add = async (id) => {
    await api.addToCart(id, 1);
    refreshCart();
  };

  return (
    <div className="products">
      {products.map(p => (
        <div key={p.id} className="product">
          <h3>{p.name}</h3>
          <p style={{fontSize: 14, color: '#555'}}>{p.description}</p>
          <strong>₹{p.price}</strong>
          <div>
            <button onClick={() => add(p.id)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
