'use client';
// src/context/StoreContext.jsx
// Wrap your layout with <StoreProvider>. Any component can then
// call useStore() to get cart / favourites state and actions.

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getOrCreateGuestId, readCookie, writeCookie } from '@/lib/guestStore';

const StoreCtx = createContext(null);

export function StoreProvider({ children }) {
  const [guestId] = useState(() => {
    if (typeof window !== 'undefined') return getOrCreateGuestId();
    return null;
  });

  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [toast, setToast] = useState(null); // { msg, type: 'cart'|'fav' }

  // Load from cookies on mount (client only)
  useEffect(() => {
    setCart(readCookie('cart'));
    setFavs(readCookie('favs'));
  }, []);

  // Persist to cookies whenever state changes
  useEffect(() => { writeCookie('cart', cart); }, [cart]);
  useEffect(() => { writeCookie('favs', favs); }, [favs]);

  // ── Toast ──────────────────────────────────────────────────
  const showToast = useCallback((msg, type = 'cart') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  // ── Cart actions ───────────────────────────────────────────
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        showToast('Quantity updated', 'cart');
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      showToast(`${product.name} added to cart`, 'cart');
      return [...prev, { ...product, qty: 1 }];
    });
  }, [showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // ── Favourites actions ─────────────────────────────────────
  const toggleFav = useCallback((product) => {
    setFavs(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        showToast('Removed from favourites', 'fav');
        return prev.filter(i => i.id !== product.id);
      }
      showToast(`${product.name} saved to favourites`, 'fav');
      return [...prev, product];
    });
  }, [showToast]);

  // ── Derived values ─────────────────────────────────────────
  const isFav  = useCallback((id) => favs.some(i => i.id === id),  [favs]);
  const inCart = useCallback((id) => cart.some(i => i.id === id),  [cart]);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const favCount  = favs.length;

  return (
    <StoreCtx.Provider value={{
      guestId,
      cart, addToCart, removeFromCart, updateQty, clearCart, inCart,
      cartTotal, cartCount,
      favs, toggleFav, isFav, favCount,
      toast,
    }}>
      {children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
