/* ============================================
   CLEAN STAFF — CORE APP
   Store | Auth | Utils | Notifications
   ============================================ */

// ── STORE (localStorage persistence) ──────────────────────────────────────
const STORE = {
  _get(key) {
    try { return JSON.parse(localStorage.getItem('cs_' + key)) || null; } 
    catch { return null; }
  },
  _set(key, val) {
    try { localStorage.setItem('cs_' + key, JSON.stringify(val)); } catch {}
  },

  // Commandes
  getOrders()     { return this._get('orders')  || DEMO_ORDERS; },
  saveOrders(arr) { this._set('orders', arr); },
  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);
    return order;
  },
  updateOrder(id, patch) {
    const orders = this.getOrders().map(o => o.id === id ? { ...o, ...patch } : o);
    this.saveOrders(orders);
    return orders.find(o => o.id === id);
  },
  getOrder(id)    { return this.getOrders().find(o => o.id === id); },

  // Hôtels
  getHotels()      { return this._get('hotels') || DEMO_HOTELS; },
  saveHotels(arr)  { this._set('hotels', arr); },
  addHotel(hotel)  {
    const hotels = this.getHotels();
    hotels.push(hotel);
    this.saveHotels(hotels);
    return hotel;
  },
  getHotel(email)  { return this.getHotels().find(h => h.email === email); },
  updateHotel(id, patch) {
    const hotels = this.getHotels().map(h => h.id === id ? { ...h, ...patch } : h);
    this.saveHotels(hotels);
  },

  // Session
  getSession()   { return this._get('session'); },
  setSession(s)  { this._set('session', s); },
  clearSession() { localStorage.removeItem('cs_session'); },
  isLoggedIn()   { return !!this.getSession(); },
  isAdmin()      { const s = this.getSession(); return s?.role === 'admin'; },
  isHotel()      { const s = this.getSession(); return s?.role === 'hotel'; },
};

// ── DONNÉES DÉMO ──────────────────────────────────────────────────────────
const DEMO_HOTELS = [
  {
    id: 'h1',
    nom: 'Le Meurice',
    etoiles: 5,
    adresse: '228 Rue de Rivoli, 75001 Paris',
    contact: 'Guillaume Dubois',
    poste: 'Directeur des opérations',
    telephone: '+33 1 44 58 10 10',
    email: 'gdubois@lemeurice.com',
    password: 'hotel123',
    createdAt: '2024-01-15',
    totalOrders: 12,
    status: 'active'
  },
  {
    id: 'h2',
    nom: 'Grand Palais Hôtel',
    etoiles: 4,
    adresse: '12 Avenue Winston Churchill, 75008 Paris',
    contact: 'Laura Martin',
    poste: 'Responsable hébergement',
    telephone: '+33 1 56 52 00 00',
    email: 'lmartin@grandpalais.fr',
    password: 'hotel123',
    createdAt: '2024-02-08',
    totalOrders: 7,
    status: 'active'
  },
  {
    id: 'h3',
    nom: 'Hôtel Costes',
    etoiles: 5,
    adresse: '239 Rue Saint-Honoré, 75001 Paris',
    contact: 'Marc Fontaine',
    poste: 'Chef de réception',
    telephone: '+33 1 42 44 50 00',
    email: 'mfontaine@costes.com',
    password: 'hotel123',
    createdAt: '2024-03-22',
    totalOrders: 4,
    status: 'active'
  }
];

const DEMO_ORDERS = [
  {
    id: 'CS-2024-001',
    hotelId: 'h1',
    hotelName: 'Le Meurice',
    contact: 'Guillaume Dubois',
    telephone: '+33 1 44 58 10 10',
    email: 'gdubois@lemeurice.com',
    date: '2024-12-20',
    heure: '07:00',
    duree: 8,
    services: [
      { poste: 'femme-chambre', nombre: 4, specialite: 'Suite présidentielle — 4 suites' },
      { poste: 'gouvernante', nombre: 1, specialite: 'Supervision complète étage 5' }
    ],
    urgence: false,
    ferie: false,
    notes: 'Arrivées VIP prévues. Discrétion absolue requise. Accès service uniquement.',
    status: 'terminee',
    statusHistory: [
      { status: 'attente', date: '2024-12-18 09:15', note: 'Demande soumise' },
      { status: 'acceptee', date: '2024-12-18 11:30', note: 'Confirmée par Clean Staff' },
      { status: 'en-cours', date: '2024-12-20 07:05', note: 'Personnel en poste' },
      { status: 'terminee', date: '2024-12-20 15:30', note: 'Mission accomplie' }
    ],
    montantEstime: 1144,
    createdAt: '2024-12-18T09:15:00'
  },
  {
    id: 'CS-2024-002',
    hotelId: 'h2',
    hotelName: 'Grand Palais Hôtel',
    contact: 'Laura Martin',
    telephone: '+33 1 56 52 00 00',
    email: 'lmartin@grandpalais.fr',
    date: '2024-12-22',
    heure: '06:00',
    duree: 10,
    services: [
      { poste: 'femme-chambre', nombre: 6, specialite: 'Nettoyage chambres standard et deluxe' },
      { poste: 'receptionniste-jour', nombre: 1, specialite: 'Renfort accueil journée' }
    ],
    urgence: true,
    ferie: false,
    notes: 'Événement groupe 80 personnes. Besoin impératif. Personnel bilingue si possible.',
    status: 'en-cours',
    statusHistory: [
      { status: 'attente', date: '2024-12-20 14:00', note: 'Demande soumise' },
      { status: 'acceptee', date: '2024-12-20 16:45', note: 'Confirmée — équipe constituée' },
      { status: 'en-cours', date: '2024-12-22 06:10', note: 'Personnel en poste' }
    ],
    montantEstime: 1932,
    createdAt: '2024-12-20T14:00:00'
  },
  {
    id: 'CS-2024-003',
    hotelId: 'h1',
    hotelName: 'Le Meurice',
    contact: 'Guillaume Dubois',
    telephone: '+33 1 44 58 10 10',
    email: 'gdubois@lemeurice.com',
    date: '2025-01-01',
    heure: '08:00',
    duree: 12,
    services: [
      { poste: 'valet', nombre: 3, specialite: 'Service petit-déjeuner Nouvel An' },
      { poste: 'receptionniste-nuit', nombre: 2, specialite: 'Nuit du réveillon 31/01' }
    ],
    urgence: false,
    ferie: true,
    notes: 'Nuit du Nouvel An — prestation haute qualité exigée.',
    status: 'acceptee',
    statusHistory: [
      { status: 'attente', date: '2024-12-26 10:00', note: 'Demande soumise' },
      { status: 'acceptee', date: '2024-12-26 14:20', note: 'Confirmée — supplément férié appliqué' }
    ],
    montantEstime: 1827,
    createdAt: '2024-12-26T10:00:00'
  },
  {
    id: 'CS-2024-004',
    hotelId: 'h3',
    hotelName: 'Hôtel Costes',
    contact: 'Marc Fontaine',
    telephone: '+33 1 42 44 50 00',
    email: 'mfontaine@costes.com',
    date: '2025-01-05',
    heure: '09:00',
    duree: 6,
    services: [
      { poste: 'equipier', nombre: 2, specialite: 'Remise en état après événement privé' }
    ],
    urgence: false,
    ferie: false,
    notes: 'Suite après réception privée. Accès parking P2.',
    status: 'attente',
    statusHistory: [
      { status: 'attente', date: '2025-01-03 16:30', note: 'Demande soumise' }
    ],
    montantEstime: 312,
    createdAt: '2025-01-03T16:30:00'
  },
  {
    id: 'CS-2024-005',
    hotelId: 'h2',
    hotelName: 'Grand Palais Hôtel',
    contact: 'Laura Martin',
    telephone: '+33 1 56 52 00 00',
    email: 'lmartin@grandpalais.fr',
    date: '2025-01-08',
    heure: '07:30',
    duree: 8,
    services: [
      { poste: 'gouvernante', nombre: 1, specialite: 'Supervision bloc ouest' },
      { poste: 'femme-chambre', nombre: 3, specialite: 'Chambres bloc ouest — 24 chambres' }
    ],
    urgence: false,
    ferie: false,
    notes: 'Inspection qualité prévue cet après-midi.',
    status: 'refusee',
    statusHistory: [
      { status: 'attente', date: '2025-01-06 09:00', note: 'Demande soumise' },
      { status: 'refusee', date: '2025-01-06 11:15', note: 'Équipe indisponible sur ce créneau — veuillez recontacter' }
    ],
    montantEstime: 880,
    createdAt: '2025-01-06T09:00:00'
  }
];

// ── AUTH ──────────────────────────────────────────────────────────────────
const AUTH = {
  ADMIN_EMAIL: 'admin@cleanstaff.fr',
  ADMIN_PWD:   'CleanStaff2024!',

  loginAdmin(email, password) {
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PWD) {
      STORE.setSession({ role: 'admin', email, name: 'Administrateur', loginAt: Date.now() });
      return { ok: true };
    }
    return { ok: false, error: 'Identifiants incorrects.' };
  },

  loginHotel(email, password) {
    const hotel = STORE.getHotels().find(h => h.email === email && h.password === password);
    if (hotel) {
      STORE.setSession({ role: 'hotel', email, name: hotel.nom, hotelId: hotel.id, loginAt: Date.now() });
      return { ok: true, success: true, hotel };
    }
    return { ok: false, success: false, error: 'Email ou mot de passe incorrect.' };
  },

  getHotelSession() {
    const s = STORE.getSession();
    if (!s || s.role !== 'hotel') return null;
    const hotel = STORE.getHotels().find(h => h.id === s.hotelId);
    return hotel || null;
  },

  logoutHotel() {
    STORE.clearSession();
  },

  register(data) {
    const hotels = STORE.getHotels();
    if (hotels.find(h => h.email === data.email)) {
      return { ok: false, error: 'Cet email est déjà utilisé.' };
    }
    const hotel = {
      id: 'h' + Date.now(),
      ...data,
      createdAt: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      status: 'active'
    };
    STORE.addHotel(hotel);
    STORE.setSession({ role: 'hotel', email: hotel.email, name: hotel.nom, hotelId: hotel.id, loginAt: Date.now() });
    return { ok: true, hotel };
  },

  logout() {
    STORE.clearSession();
    window.location.href = '/index.html';
  },

  requireAdmin()  { if (!STORE.isAdmin())  window.location.href = '/admin-login.html'; },
  requireHotel()  { if (!STORE.isHotel())  window.location.href = '/hotel-login.html'; },
  requireAuth()   { if (!STORE.isLoggedIn()) window.location.href = '/hotel-login.html'; },
};

// ── UTILS ─────────────────────────────────────────────────────────────────
const UTILS = {
  generateId() {
    const year = new Date().getFullYear();
    const num  = String(Math.floor(Math.random() * 9000) + 1000);
    return `CS-${year}-${num}`;
  },

  formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return dateStr; }
  },

  formatDateTime(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) +
             ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch { return dateStr; }
  },

  formatCurrency(n) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n);
  },

  calcMontant(services, duree, urgence, ferie, jours = 1) {
    const tarifs = {
      'femme-chambre': 13.5, 'valet': 13.5, 'equipier': 28,
      'gouvernante': 33,
      'receptionniste-jour': 29, 'receptionniste-nuit': 30,
    };
    let base = 0;
    for (const s of services) {
      const isParChambre = ['femme-chambre', 'valet'].includes(s.poste);
      if (isParChambre) {
        const chambres = Math.max(s.nombre, 18);
        base += (tarifs[s.poste] || 13.5) * chambres * jours;
      } else {
        base += (tarifs[s.poste] || 28) * s.nombre * duree * jours;
      }
    }
    if (urgence) base *= 1.15;
    if (ferie)   base *= 1.25;
    return Math.round(base);
  },

  STATUS_CONFIG: {
    'attente':   { label: 'En attente',   color: 'pending',  icon: '⏳' },
    'acceptee':  { label: 'Acceptée',     color: 'accepted', icon: '✓'  },
    'refusee':   { label: 'Refusée',      color: 'refused',  icon: '✕'  },
    'en-cours':  { label: 'En cours',     color: 'ongoing',  icon: '⟳'  },
    'terminee':  { label: 'Terminée',     color: 'done',     icon: '★'  },
  },

  statusBadge(status) {
    const cfg = this.STATUS_CONFIG[status] || { label: status, color: 'pending', icon: '' };
    return `<span class="badge badge-dot badge-${cfg.color}">${cfg.icon} ${cfg.label}</span>`;
  },

  posteLabel(code) {
    const labels = {
      'femme-chambre': 'Femme de chambre', 'valet': 'Valet',
      'equipier': 'Équipier', 'gouvernante': 'Gouvernante',
      'receptionniste-jour': 'Réceptionniste (jour)',
      'receptionniste-nuit': 'Réceptionniste (nuit)',
    };
    return labels[code] || code;
  },

  etoiles(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); },

  debounce(fn, delay) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  },

  truncate(str, max = 80) {
    return str?.length > max ? str.slice(0, max) + '…' : str;
  }
};

// ── UI HELPERS ────────────────────────────────────────────────────────────
const UI = {
  // Toast notifications
  toast(message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span style="font-size:1.1rem">${icon}</span><span>${message}</span>`;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(100%)'; el.style.transition = '0.3s'; setTimeout(() => el.remove(), 300); }, duration);
  },

  // Modal
  openModal(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.add('open'); document.body.classList.add('no-scroll'); }
  },
  closeModal(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('open'); document.body.classList.remove('no-scroll'); }
  },

  // Loading button state
  setLoading(btn, loading) {
    if (loading) {
      btn._origText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Chargement…';
      btn.disabled = true;
    } else {
      btn.innerHTML = btn._origText || btn.innerHTML;
      btn.disabled = false;
    }
  },
};

// ── NAVIGATION ────────────────────────────────────────────────────────────
function initNav() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  const menu = document.querySelector('.mobile-menu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.classList.toggle('active', open);
      document.body.classList.toggle('no-scroll', open);
    });
  }

  // Active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop() || '';
    if (href === current) link.classList.add('active');
  });

  // Session UI
  const session = STORE.getSession();
  const navActions = document.querySelector('.nav-actions');
  if (navActions && session) {
    const loginBtn = navActions.querySelector('[data-role="login"]');
    if (loginBtn) {
      const dest = session.role === 'admin' ? '/admin.html' : '/hotel-dashboard.html';
      loginBtn.textContent = session.name;
      loginBtn.href = dest;
    }
  }
}

// ── SCROLL REVEALS ────────────────────────────────────────────────────────
function initReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ── COUNTER ANIMATION ─────────────────────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 2000) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => observer.observe(el));
}

// ── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveals();
  initCounters();

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  });
});
