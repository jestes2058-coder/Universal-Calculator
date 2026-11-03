/**
 * ============================================================================
 * CALCULATOR.NET REPLICA - MODALS & COMPLIANCE CONTROLLER
 * ============================================================================
 * Handles accessible pop-up modals for Privacy, Terms, Cookies, Refunds,
 * About, and Contact form with explicit consent and honeypot bot defense.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'rescalc_cookie_consent_v1';
  let lastFocusedElement = null;

  // --------------------------------------------------------------------------
  // MODAL MANAGEMENT (ALL-IN-ONE, NO PAGE JUMPS)
  // --------------------------------------------------------------------------
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      focusable[0].focus();
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function initModals() {
    // Triggers
    document.querySelectorAll('.legal-modal-trigger, .legal-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        if (modalId) openModal(modalId);
      });
    });

    // Close buttons
    document.querySelectorAll('.btn-close-modal, .btn-modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) closeModal(modal);
      });
    });

    // Backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(backdrop);
      });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openEl = document.querySelector('.modal-backdrop.is-open');
        if (openEl) closeModal(openEl);
      }
    });
  }

  // --------------------------------------------------------------------------
  // COOKIE CONSENT NOTICE TOAST
  // --------------------------------------------------------------------------
  function initCookieToast() {
    const toast = document.getElementById('cookieNoticeToast');
    const btn = document.getElementById('btnAcknowledgeCookie');
    if (!toast || !btn) return;

    const hasAcknowledged = localStorage.getItem(STORAGE_KEY);
    if (!hasAcknowledged) {
      toast.style.display = 'block';
    }

    btn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        essential: true,
        date: new Date().toISOString()
      }));
      toast.style.display = 'none';
    });
  }

  // --------------------------------------------------------------------------
  // CONTACT FORM VALIDATION WITH EXPLICIT CONSENT
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contactModalForm');
    if (!form) return;

    const alertBox = document.getElementById('contactFormAlert');
    const honeypot = document.getElementById('contactHoneypot');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Bot spam check
      if (honeypot && honeypot.value.trim() !== '') {
        return;
      }

      const name = document.getElementById('contactFullName');
      const email = document.getElementById('contactEmailAddr');
      const msg = document.getElementById('contactMsgBody');
      const consent = document.getElementById('contactConsentCheck');

      const errors = [];
      if (!name.value.trim()) errors.push('Name is required.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.push('Valid email address is required.');
      if (!msg.value.trim() || msg.value.trim().length < 5) errors.push('Message must be at least 5 characters.');
      if (!consent.checked) errors.push('You must check the explicit consent box to submit.');

      if (errors.length > 0) {
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.style.backgroundColor = '#f8d7da';
          alertBox.style.color = '#721c24';
          alertBox.style.border = '1px solid #f5c6cb';
          alertBox.textContent = '';
          const strong = document.createElement('strong');
          strong.textContent = 'Error: ';
          alertBox.appendChild(strong);
          alertBox.appendChild(document.createTextNode(errors.join(' ')));
        }
        return;
      }

      // Success
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.style.backgroundColor = '#d4edda';
        alertBox.style.color = '#155724';
        alertBox.style.border = '1px solid #c3e6cb';
        alertBox.textContent = '';
        const strong = document.createElement('strong');
        strong.textContent = 'Thank you! ';
        alertBox.appendChild(strong);
        alertBox.appendChild(document.createTextNode('Your message has been sent. We will reply within 1-2 business days under strict privacy safeguards.'));
      }

      form.reset();
    });
  }

  // --------------------------------------------------------------------------
  // SIDEBAR SEARCH SIMULATION
  // --------------------------------------------------------------------------
  function initSidebarSearch() {
    const btnSearch = document.getElementById('btnSidebarSearch');
    const searchInput = document.getElementById('sidebarSearchInput');

    if (!btnSearch || !searchInput) return;

    btnSearch.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      if (query.includes('parallel')) {
        document.getElementById('headingParallelCalc')?.scrollIntoView({ behavior: 'smooth' });
      } else if (query.includes('series')) {
        document.getElementById('headingSeriesCalc')?.scrollIntoView({ behavior: 'smooth' });
      } else if (query.includes('conductor')) {
        document.getElementById('headingConductorCalc')?.scrollIntoView({ behavior: 'smooth' });
      } else if (query.includes('color') || query.includes('band')) {
        document.getElementById('headingColorCalc')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert(`Calculators matching "${query}" are located on this page. Scroll down to review the tools.`);
      }
    });
  }

  // DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initModals();
    initCookieToast();
    initContactForm();
    initSidebarSearch();
  });
})();
