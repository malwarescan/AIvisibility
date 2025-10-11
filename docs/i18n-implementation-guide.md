# PHP i18n Implementation Guide for nrlcmd.com

## Overview

This guide outlines the multilingual optimization strategy implemented for nrlcmd.com using PHP-based internationalization (i18n).

## Architecture

### 1. Core Components

- **`lib/i18n.php`** - Main i18n class handling language detection, translation loading, and URL generation
- **`lang/`** directory - Translation files organized by language code
- **`templates/language-switcher.php`** - Language selection component
- **Updated templates** - Header, head, and page templates with i18n support

### 2. Language Detection Priority

1. **URL Path** - `/ko/page` or `/ko/page/`
2. **Cookie** - `lang` cookie (1 year expiration)
3. **Browser Headers** - `Accept-Language` header
4. **Default** - Falls back to English (`en`)

### 3. URL Structure

- **Default Language (English)**: `/page/` (no prefix)
- **Other Languages**: `/ko/page/` (language prefix)

## Implementation Steps

### Step 1: Initialize i18n System

```php
// In index.php
require_once __DIR__.'/lib/i18n.php';
I18n::init();
```

### Step 2: Handle Language Routing

```php
// Remove language prefix for internal routing
$currentLang = I18n::getCurrentLanguage();
if ($currentLang !== I18n::getSupportedLanguages()[0]) {
    $path = preg_replace('/^\/' . preg_quote($currentLang, '/') . '(\/|$)/', '/', $path);
    if ($path === '') $path = '/';
}
```

### Step 3: Use Translations in Templates

```php
// Instead of hardcoded text
<a href="/services/">Services</a>

// Use translation function
<a href="/services/"><?= I18n::t('nav.services') ?></a>
```

### Step 4: Auto-generate hreflang Tags

```php
// In templates/head.php
if (empty($ctx['hreflang'])) {
    $ctx['hreflang'] = I18n::getHreflangData($_SERVER['REQUEST_URI']);
}
```

## Translation File Structure

### English (`lang/en.php`)
```php
<?php
return [
    'nav.home' => 'Home',
    'nav.services' => 'Services',
    'home.hero.title' => 'AI Search Optimization & Agentic SEO',
    // ... more translations
];
```

### Korean (`lang/ko.php`)
```php
<?php
return [
    'nav.home' => '홈',
    'nav.services' => '서비스',
    'home.hero.title' => 'AI 검색 최적화 및 에이전틱 SEO',
    // ... more translations
];
```

## SEO Optimization Features

### 1. Automatic hreflang Generation
- Generates hreflang tags for all supported languages
- Includes `x-default` pointing to default language
- Uses canonical URLs for each language version

### 2. Language-Specific Meta Tags
```php
$ctx = [
    'title' => I18n::t('meta.home.title'),
    'desc' => I18n::t('meta.home.desc'),
    'lang' => I18n::getCurrentLanguage()
];
```

### 3. Structured Data Localization
- JSON-LD schemas include `inLanguage` property
- Content matches the displayed language
- Maintains SEO value across languages

## Language Switcher Component

### Features
- Dropdown interface with current language highlighted
- Accessible with ARIA attributes
- JavaScript-enhanced for better UX
- Cookie-based language persistence

### Usage
```php
<?php include __DIR__.'/language-switcher.php'; ?>
```

## Best Practices

### 1. Translation Keys
- Use descriptive, hierarchical keys: `section.subsection.key`
- Group related translations logically
- Use consistent naming conventions

### 2. Parameter Substitution
```php
// Translation with parameter
'footer.copyright' => '© {year} Neural Command, LLC. All rights reserved.',

// Usage
I18n::t('footer.copyright', ['year' => date('Y')])
```

### 3. Fallback Strategy
- Always provide English translations as fallback
- Use key as fallback if translation missing
- Log missing translations for debugging

### 4. Performance Considerations
- Load translations once per request
- Cache translation files if needed
- Minimize translation file size

## Adding New Languages

### 1. Create Translation File
```bash
# Create new language file
touch lang/es.php  # Spanish example
```

### 2. Add to Supported Languages
```php
// In lib/i18n.php
private static $supportedLanguages = ['en', 'ko', 'es'];
```

### 3. Update Language Names
```php
// In lib/i18n.php
private static function getLanguageName(string $code): string {
    $names = [
        'en' => 'English',
        'ko' => '한국어',
        'es' => 'Español'
    ];
    return $names[$code] ?? $code;
}
```

### 4. Test Implementation
- Verify URL routing works
- Check hreflang generation
- Test language switcher
- Validate structured data

## SEO Benefits

### 1. Improved International Visibility
- Target specific language markets
- Better local search rankings
- Enhanced user experience

### 2. Technical SEO Advantages
- Proper hreflang implementation
- Language-specific meta tags
- Localized structured data
- Clean URL structure

### 3. AI Search Optimization
- Language-specific content for AI engines
- Better citation likelihood in target languages
- Improved GEO-16 framework compliance

## Monitoring and Maintenance

### 1. Translation Quality
- Regular review of translated content
- Native speaker validation
- Cultural adaptation considerations

### 2. Technical Monitoring
- Check for missing translations
- Monitor hreflang implementation
- Validate structured data per language

### 3. Performance Tracking
- Monitor page load times per language
- Track conversion rates by language
- Analyze user engagement metrics

## Conclusion

This i18n implementation provides a robust foundation for multilingual SEO optimization while maintaining the site's technical performance and user experience. The system is designed to scale easily as new languages are added and provides comprehensive SEO benefits for international visibility.
