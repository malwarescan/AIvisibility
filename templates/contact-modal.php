<!-- Global Contact Modal -->
<div id="contact-modal" class="contact-modal hidden">
  <div class="contact-modal-overlay"></div>
  <div class="contact-modal-content">
    <div class="contact-modal-header">
      <h2 class="contact-modal-title">Contact Us</h2>
      <button type="button" class="contact-modal-close" aria-label="Close" onclick="window.closeContactModal && window.closeContactModal()">×</button>
    </div>

    <div class="contact-modal-body">
      <p class="contact-modal-intro">Choose how you'd like to reach us:</p>
      
      <div class="contact-options">
        <a id="contact-email-link" href="mailto:<?= esc(NC_CONTACT_EMAIL) ?>" class="contact-option contact-option-email">
          <div class="contact-option-content">
            <strong>Email Us</strong>
            <span class="contact-option-desc"><?= esc(NC_CONTACT_EMAIL) ?></span>
          </div>
        </a>
        
        <a href="tel:<?= esc(NC_PHONE) ?>" class="contact-option contact-option-phone">
          <div class="contact-option-content">
            <strong>Call Us</strong>
            <span class="contact-option-desc"><?= esc(NC_PHONE) ?> (<?= esc(NC_PHONE_NICE) ?>)</span>
          </div>
        </a>
        
        <a href="sms:+12135628438?body=<?= rawurlencode('hi i am contacting you from nrlcmd.com - interested in your services') ?>" class="contact-option contact-option-sms">
          <div class="contact-option-content">
            <strong>Text Us</strong>
            <span class="contact-option-desc">+1 (213) 562-8438</span>
          </div>
        </a>
        
        <?php if (!empty(NC_LINKEDIN)): ?>
        <a href="<?= esc(NC_LINKEDIN) ?>" target="_blank" rel="noopener" class="contact-option contact-option-linkedin">
          <div class="contact-option-content">
            <strong>LinkedIn</strong>
            <span class="contact-option-desc">Connect on LinkedIn</span>
          </div>
        </a>
        <?php endif; ?>
      </div>
    </div>

    <div class="contact-modal-footer">
      <button type="button" class="button button-secondary" onclick="if(window.closeContactModal) window.closeContactModal(); return false;">Close</button>
    </div>
  </div>
</div>

