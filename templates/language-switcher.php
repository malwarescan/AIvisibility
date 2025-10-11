<?php
declare(strict_types=1);

// Language switcher component
$switcher = I18n::getLanguageSwitcher($_SERVER['REQUEST_URI']);
?>

<div class="language-switcher">
    <div class="relative inline-block text-left">
        <button type="button" class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 focus:outline-none" id="language-menu-button" aria-expanded="false" aria-haspopup="true">
            <span class="current-lang">
                <?php foreach ($switcher as $lang): ?>
                    <?php if ($lang['current']): ?>
                        <?= htmlspecialchars($lang['name']) ?>
                    <?php endif; ?>
                <?php endforeach; ?>
            </span>
            <svg class="ml-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>

        <div class="origin-top-right absolute right-0 mt-1 w-32 rounded shadow-lg bg-white border border-gray-200 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="language-menu-button" tabindex="-1" id="language-menu">
            <div class="py-1" role="none">
                <?php foreach ($switcher as $lang): ?>
                    <a href="<?= htmlspecialchars($lang['url']) ?>" 
                       class="<?= $lang['current'] ? 'bg-gray-100 text-gray-900' : 'text-gray-700' ?> block px-3 py-1 text-xs hover:bg-gray-100" 
                       role="menuitem" 
                       tabindex="-1">
                        <?= htmlspecialchars($lang['name']) ?>
                        <?php if ($lang['current']): ?>
                            <span class="sr-only">(현재 언어)</span>
                        <?php endif; ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('language-menu-button');
    const menu = document.getElementById('language-menu');
    
    if (button && menu) {
        button.addEventListener('click', function() {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!button.contains(event.target) && !menu.contains(event.target)) {
                button.setAttribute('aria-expanded', 'false');
                menu.classList.add('hidden');
            }
        });
    }
});
</script>
