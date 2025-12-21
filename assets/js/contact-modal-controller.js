/**
 * Global Contact Modal Controller
 * Auto-routes leads (SALES vs AUDIT), scores leads, extracts schema types, handles dead CTAs
 */

(function() {
  'use strict';

  // Extract JSON-LD schema types from page
  function safeParseJsonLd(raw) {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [];
    }
  }

  function extractTypesFromJsonLd(nodes) {
    const out = new Set();
    
    function walk(obj) {
      if (!obj || typeof obj !== 'object') return;
      const t = obj['@type'];
      if (typeof t === 'string') out.add(t);
      if (Array.isArray(t)) {
        t.forEach(function(x) {
          if (typeof x === 'string') out.add(x);
        });
      }
      Object.values(obj).forEach(walk);
    }
    
    nodes.forEach(walk);
    return Array.from(out);
  }

  // Infer intent from path
  function inferIntentFromPath(path) {
    // SALES-intent pages
    if (path.includes('/services/')) return 'sales';
    if (path.includes('/pricing')) return 'sales';
    if (path.includes('/contact')) return 'sales';

    // AUDIT-intent pages
    if (path.includes('/audit')) return 'audit';
    if (path.includes('/ai-visibility')) return 'audit';
    if (path.includes('/insights/')) return 'audit';
    if (path.includes('/case-studies')) return 'audit';
    if (path.includes('/resources/diagnostic')) return 'audit';

    // default
    return 'sales';
  }

  // Infer context label from path
  function inferContextLabel(path) {
    if (path.includes('/services/')) {
      const match = path.match(/\/services\/([^\/]+)/);
      if (match && match[1]) {
        const slug = match[1].replace(/-/g, ' ');
        return 'Service: ' + slug;
      }
      return 'Service Inquiry';
    }
    if (path.includes('/ai-visibility')) return 'AI Visibility';
    if (path.includes('/audit')) return 'Audit Request';
    if (path.includes('/resources/diagnostic')) return 'AI Visibility Diagnostic';
    if (path.includes('/insights/')) return 'Insights Inquiry';
    if (path.includes('/case-studies')) return 'Case Study Inquiry';
    return 'General Inquiry';
  }

  // Compute lead score (0-100)
  function computeLeadScore(args) {
    const pathDepth = args.pathDepth || 1;
    const intent = args.intent || 'sales';
    const schemaTypes = args.schemaTypes || [];
    const timeOnPageSec = args.timeOnPageSec || 0;

    let score = 0;

    // Depth (page depth = number of path segments)
    score += Math.min(40, pathDepth * 10);

    // Intent bias
    score += intent === 'sales' ? 15 : 25;

    // Schema signal
    const t = schemaTypes.map(function(x) { return x.toLowerCase(); });
    if (t.indexOf('service') !== -1) score += 20;
    if (t.indexOf('product') !== -1) score += 10;
    if (t.indexOf('organization') !== -1) score += 5;
    if (t.indexOf('localbusiness') !== -1) score += 10;
    if (t.indexOf('faqpage') !== -1) score += 5;
    if (t.indexOf('review') !== -1 || t.indexOf('aggregaterating') !== -1) score += 5;

    // Time on page (optional, lightweight)
    score += Math.min(20, Math.floor(timeOnPageSec / 15)); // +1 per 15s up to 20

    return Math.max(0, Math.min(100, score));
  }

  // Global state
  let modalOpen = false;
  let context = 'General Inquiry';
  let intent = 'sales';
  let schemaTypes = [];
  let pathDepth = 1;
  let leadScore = 0;
  const startTs = Date.now();

  // Initialize modal controller
  function initContactModal() {
    const path = window.location.pathname || '/';
    const depth = path.split('/').filter(function(x) { return x; }).length || 1;

    const inferredIntent = inferIntentFromPath(path);
    const inferredContext = inferContextLabel(path);

    intent = inferredIntent;
    context = inferredContext;
    pathDepth = depth;

    // Extract schema types from JSON-LD on page
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const nodes = scripts.reduce(function(acc, script) {
      const parsed = safeParseJsonLd(script.textContent || '');
      return acc.concat(parsed);
    }, []);
    const types = extractTypesFromJsonLd(nodes);
    schemaTypes = types;

    // Update score
    const timeOnPageSec = Math.floor((Date.now() - startTs) / 1000);
    leadScore = computeLeadScore({
      pathDepth: depth,
      intent: inferredIntent,
      schemaTypes: types,
      timeOnPageSec: timeOnPageSec
    });

    // Update mailto link
    updateMailtoLink();

    // Dead CTA capture: anything with data-contact-trigger opens modal
    document.addEventListener('click', function(e) {
      const el = e.target;
      if (!el) return;
      
      const trigger = el.closest('[data-contact-trigger]');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        openModal();
      }
    });

    // Update mailto link
    updateMailtoLink();
    
    // Update score and mailto link periodically (in case user stays on page)
    setInterval(function() {
      const timeOnPageSec = Math.floor((Date.now() - startTs) / 1000);
      leadScore = computeLeadScore({
        pathDepth: pathDepth,
        intent: intent,
        schemaTypes: schemaTypes,
        timeOnPageSec: timeOnPageSec
      });
      updateMailtoLink();
    }, 5000); // Update every 5 seconds
  }

  // Update mailto: link with context
  function updateMailtoLink() {
    const emailLink = document.getElementById('contact-email-link');
    if (!emailLink) return;

    const schemaTagString = schemaTypes.slice(0, 20).join(', ');
    
    // Build email subject with context
    let subject = 'Contact Request';
    if (intent) subject = '[' + intent.toUpperCase() + '] ' + subject;
    if (context) subject += ' - ' + context;
    if (leadScore > 0) subject += ' (Score: ' + leadScore + ')';
    
    // Build email body with all context
    let body = 'Hello,\n\n';
    body += 'I\'m interested in learning more about your services.\n\n';
    body += '---\n';
    body += 'Context: ' + (context || 'General Inquiry') + '\n';
    body += 'Intent: ' + intent + '\n';
    if (leadScore > 0) body += 'Lead Score: ' + leadScore + '\n';
    if (pathDepth > 0) body += 'Path Depth: ' + pathDepth + '\n';
    if (schemaTypes.length > 0) body += 'Schema Types: ' + schemaTagString + '\n';
    body += 'Page: ' + (window.location.href || window.location.pathname) + '\n';
    if (document.referrer) body += 'Referrer: ' + document.referrer + '\n';
    
    // Get email from the link's current href (set by PHP)
    const currentHref = emailLink.href;
    const emailMatch = currentHref.match(/^mailto:([^?]+)/);
    const email = emailMatch ? emailMatch[1] : 'contact@neuralcommandllc.com';
    
    // Encode for mailto: URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    emailLink.href = 'mailto:' + email + '?subject=' + encodedSubject + '&body=' + encodedBody;
  }

  // Open modal
  function openModal() {
    modalOpen = true;
    const modal = document.getElementById('contact-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Update score when opening (user might have been on page a while)
      const timeOnPageSec = Math.floor((Date.now() - startTs) / 1000);
      leadScore = computeLeadScore({
        pathDepth: pathDepth,
        intent: intent,
        schemaTypes: schemaTypes,
        timeOnPageSec: timeOnPageSec
      });
      updateMailtoLink();
    }
  }

  // Close modal
  function closeModal() {
    modalOpen = false;
    const modal = document.getElementById('contact-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOpen) {
      closeModal();
    }
  });

  // Close on background/overlay click
  document.addEventListener('click', function(e) {
    const modal = document.getElementById('contact-modal');
    if (modal && modalOpen) {
      const overlay = modal.querySelector('.contact-modal-overlay');
      const content = modal.querySelector('.contact-modal-content');
      // Close if clicking overlay or modal background (but not content)
      if (e.target === overlay || (e.target === modal && !content.contains(e.target))) {
        closeModal();
      }
    }
  });

  // Expose openModal globally for programmatic access
  window.openContactModal = openModal;
  window.closeContactModal = closeModal;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactModal);
  } else {
    initContactModal();
  }

})();

