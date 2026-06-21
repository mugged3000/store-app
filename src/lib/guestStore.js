// src/lib/guestStore.js
// Runs CLIENT-SIDE only. Generates a guest ID on first visit,
// stores it + cart/favs in browser cookies. Nothing saved to DB.

// ── Cookie helpers ────────────────────────────────────────────
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find(r => r.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function setCookie(name, value, days = 30) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

// ── Guest ID ──────────────────────────────────────────────────
function generateGuestId() {
  const rand = () => Math.random().toString(36).substring(2, 9);
  return `guest_${rand()}${rand()}_${Date.now().toString(36)}`;
}

export function getOrCreateGuestId() {
  let id = getCookie('store_guest_id');
  if (!id) {
    id = generateGuestId();
    setCookie('store_guest_id', id, 30);
  }
  return id;
}

// ── Cart & Favs data ─────────────────────────────────────────
export function readCookie(key) {
  const raw = getCookie(`store_${key}`);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function writeCookie(key, data) {
  setCookie(`store_${key}`, JSON.stringify(data), 30);
}
