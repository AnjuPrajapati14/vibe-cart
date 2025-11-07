import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import api from './api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartRefresh, setCartRefresh] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    api.getProducts().then(res => setProducts(res.data));
  }, []);

  const openCheckout = async (details) => {
    const resp = await api.checkout(details);
    if (resp.success) {
      setReceipt(resp.receipt);
      setShowCheckout(true);
      setCartRefresh(x => x + 1);
    } else {
      alert(resp.error || 'Checkout failed');
    }
  };

  return (
    <div className="container">
      <h1>Vibe Commerce</h1>
      <div className="layout">
        <ProductList products={products} refreshCart={() => setCartRefresh(x => x + 1)} />
        <Cart refreshKey={cartRefresh} onCheckout={openCheckout} />
      </div>

      <CheckoutModal
        visible={showCheckout}
        receipt={receipt}
        onClose={() => { setShowCheckout(false); setReceipt(null); }}
      />
    </div>
  );
}
