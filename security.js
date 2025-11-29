/**
 * security.js
 * General client-side hardening helpers for static sites.
 *
 * IMPORTANT:
 * - This is defense-in-depth for client side only.
 * - Must be paired with server-side headers (CSP, HSTS, X-Frame-Options).
 *
 * Usage:
 * <script src="/security.js"></script>
 * Then optionally call initSecurity({...}) or let it auto-init with defaults.
 */

(function(window, document){
  'use strict';

  const DEFAULTS = {
    allowedHosts: [location.hostname], // allowed script origins (hostnames)
    allowCDN: ['cdnjs.cloudflare.com'], // trusted cdn hosts (substrings)
    disableRightClick: true,
    disablePrintScreen: true,
    disableDevtoolsHotkeys: true,
    sanitizeInputs: true,
    autoSanitizeForms: true,
    removeInlineHandlers: true,
    safeFetchDefaults: {
      allowedOrigins: [location.origin], // allowed fetch destinations
      addHeaders: { 'X-Requested-With': 'XMLHttpRequest' }
    },
    verbose: false
  };

  // internal state
  let config = Object.assign({}, DEFAULTS);

  function log(...args) {
    if (config.verbose) console.warn('[security.js]', ...args);
  }

  /* -------------------------
     Sanitization utilities
     ------------------------- */
  function sanitizeString(value) {
    if (typeof value !== 'string') return value;
    // Remove script-injection chars and suspicious patterns
    // keep it conservative: digits, letters, common punctuation
    return value
      .replace(/<\s*script.*?>.*?<\s*\/\s*script\s*>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/[<>{}]/g, '')
      .replace(/["'`;]/g, '')
      .trim();
  }

  function sanitizeInputElement(el) {
    try {
      if (!el || !('value' in el)) return;
      el.value = sanitizeString(el.value);
    } catch (e) {
      log('sanitizeInputElement error', e);
    }
  }

  function attachFormSanitizers() {
    if (!config.autoSanitizeForms) return;
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      // sanitize on submit
      form.addEventListener('submit', function(ev){
        try {
          const inputs = form.querySelectorAll('input[type="text"], input[type="search"], textarea, input[type="email"], input[type="tel"], input:not([type])');
          inputs.forEach(i => sanitizeInputElement(i));
          // also sanitize data-* attributes used in input values
        } catch (e) {
          log('form sanitize failed', e);
        }
      }, {passive: true});

      // sanitize on input (live)
      if (config.sanitizeInputs) {
        form.addEventListener('input', function(ev){
          const t = ev.target;
          if (!t) return;
          if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') {
            sanitizeInputElement(t);
          }
        }, true);
      }
    });
  }

  /* -------------------------
     Disable dangerous APIs
     ------------------------- */
  function disableEvalAndFunction() {
    try {
      // override eval and Function
      window.eval = function() {
        log('Blocked eval() call');
        return null;
      };
      window.Function = function() {
        log('Blocked Function() constructor');
        return function(){};
      };
    } catch (e) { log('disableEval error', e); }
  }

  /* -------------------------
     Block external scripts at runtime
     ------------------------- */
  function isTrustedScriptSrc(src) {
    if (!src) return false;
    try {
      const url = new URL(src, location.href);
      const hostname = url.hostname;
      if (config.allowedHosts.includes(hostname)) return true;
      for (let cdn of config.allowCDN) {
        if (hostname.includes(cdn)) return true;
      }
      return false;
    } catch (e) {
      // not a valid URL, treat as untrusted
      return false;
    }
  }

  function removeUntrustedScripts() {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(s => {
      try {
        if (s.src) {
          if (!isTrustedScriptSrc(s.src)) {
            log('Removing untrusted script', s.src);
            s.remove();
          }
        } else {
          // inline script – check for suspicious content
          const txt = (s.textContent || '').toLowerCase();
          if (txt.includes('document.cookie') || txt.includes('eval(') || txt.includes('fetch(') && !txt.includes('your-allowed-marker')) {
            log('Removing suspicious inline script');
            s.remove();
          }
        }
      } catch (e) {
        log('removeUntrustedScripts err', e);
      }
    });
  }

  function observeAndBlockScripts() {
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (!m.addedNodes) continue;
        m.addedNodes.forEach(node => {
          if (node.tagName && node.tagName.toLowerCase() === 'script') {
            try {
              const src = node.src || '';
              if (!isTrustedScriptSrc(src)) {
                log('MutationObserver removing script', src);
                node.remove();
              }
            } catch (e) { log('observer script remove err', e); }
          }
          // remove inline event handlers
          if (config.removeInlineHandlers && node.attributes) {
            Array.from(node.attributes).forEach(attr => {
              if (/^on/i.test(attr.name)) {
                node.removeAttribute(attr.name);
                log('Removed inline handler', attr.name);
              }
            });
          }
        });
      }
    });
    observer.observe(document.documentElement || document.body, {childList: true, subtree: true});
  }

  /* -------------------------
     Remove inline event handlers from existing elements
     ------------------------- */
  function stripInlineHandlersFromDOM() {
    if (!config.removeInlineHandlers) return;
    try {
      const all = document.getElementsByTagName('*');
      for (let i = 0; i < all.length; i++) {
        const node = all[i];
        const attrs = node.attributes;
        if (!attrs) continue;
        // clone list because we'll mutate
        const toRemove = [];
        for (let j = 0; j < attrs.length; j++) {
          if (/^on/i.test(attrs[j].name)) toRemove.push(attrs[j].name);
        }
        toRemove.forEach(name => {
          try { node.removeAttribute(name); } catch(e){}
        });
      }
    } catch (e) { log('stripInlineHandlersFromDOM err', e); }
  }

  /* -------------------------
     Anti-inspect & anti-right-click
     ------------------------- */
  function blockRightClickAndDevtools() {
    if (config.disableRightClick) {
      document.addEventListener('contextmenu', ev => ev.preventDefault());
    }
    if (config.disableDevtoolsHotkeys) {
      document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }, true);
    }
    if (config.disablePrintScreen) {
      document.addEventListener('keyup', function(e){
        if (e.key === 'PrintScreen') {
          try { navigator.clipboard.writeText(''); } catch(err){}
          alert('Screenshot dinonaktifkan demi keamanan.');
        }
      });
    }
  }

  /* -------------------------
     Safe fetch wrapper
     ------------------------- */
  async function safeFetch(input, init){
    try {
      let url = typeof input === 'string' ? input : (input && input.url);
      if (!url) throw new Error('safeFetch: invalid url');

      // check allowed origins
      const allowed = config.safeFetchDefaults.allowedOrigins;
      let ok = false;
      for (let a of allowed) {
        if (url.startsWith(a)) { ok = true; break; }
      }
      if (!ok) {
        // also allow same-origin
        if (url.startsWith(location.origin)) ok = true;
      }
      if (!ok) throw new Error('safeFetch: destination not allowed: ' + url);

      // merge headers
      init = init || {};
      init.headers = init.headers || {};
      Object.assign(init.headers, config.safeFetchDefaults.addHeaders);

      return await fetch(url, init);
    } catch (err) {
      log('safeFetch blocked or failed', err);
      throw err;
    }
  }

  /* -------------------------
     Public init function
     ------------------------- */
  function initSecurity(userOptions){
    try {
      config = Object.assign({}, config, userOptions || {});
      log('initSecurity', config);

      // disable dangerous functions asap
      disableEvalAndFunction();

      // remove immediate untrusted scripts (if any)
      removeUntrustedScripts();

      // observe future script injections
      observeAndBlockScripts();

      // strip inline handlers existing in DOM
      stripInlineHandlersFromDOM();

      // attach form sanitizers
      attachFormSanitizers();

      // block right click & dev tools keys
      blockRightClickAndDevtools();

      // attach a small health-check in console to warn devs if console open
      setTimeout(() => {
        try {
          const start = Date.now();
          debugger; // if devtools open this may pause
          const delay = Date.now() - start;
          if (delay > 100) log("Devtools might be open (detected delay).");
        } catch(e){}
      }, 2000);

    } catch (e) {
      console.error('security.js init failed', e);
    }
  }

  // auto-init with defaults but allow override
  window.security = {
    init: initSecurity,
    sanitizeString: sanitizeString,
    sanitizeInputElement: sanitizeInputElement,
    safeFetch: safeFetch,
    config: () => config
  };

  // auto-run with defaults on DOMContentLoaded (so it executes early)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initSecurity());
  } else {
    initSecurity();
  }

})(window, document);