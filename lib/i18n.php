<?php
declare(strict_types=1);

class I18n {
    private static $supportedLanguages = ['en', 'ko'];
    private static $defaultLanguage = 'en';
    private static $currentLanguage = 'en';
    private static $translations = [];
    
    /**
     * Initialize i18n system
     */
    public static function init(): void {
        self::detectLanguage();
        self::loadTranslations();
    }
    
    /**
     * Detect current language from URL, cookie, or browser
     */
    private static function detectLanguage(): void {
        // Check URL path first (e.g., /ko/page)
        $path = $_SERVER['REQUEST_URI'] ?? '';
        foreach (self::$supportedLanguages as $lang) {
            if ($lang === self::$defaultLanguage) continue;
            if (strpos($path, "/$lang/") === 0 || strpos($path, "/$lang") === 0) {
                self::$currentLanguage = $lang;
                return;
            }
        }
        
        // Check cookie
        if (isset($_COOKIE['lang']) && in_array($_COOKIE['lang'], self::$supportedLanguages)) {
            self::$currentLanguage = $_COOKIE['lang'];
            return;
        }
        
        // Check browser Accept-Language header
        if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
            $browserLangs = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
            foreach ($browserLangs as $browserLang) {
                $lang = substr(trim($browserLang), 0, 2);
                if (in_array($lang, self::$supportedLanguages)) {
                    self::$currentLanguage = $lang;
                    return;
                }
            }
        }
        
        self::$currentLanguage = self::$defaultLanguage;
    }
    
    /**
     * Load translations for current language
     */
    private static function loadTranslations(): void {
        $langFile = __DIR__ . "/../lang/" . self::$currentLanguage . ".php";
        if (file_exists($langFile)) {
            self::$translations = include $langFile;
        }
    }
    
    /**
     * Get current language code
     */
    public static function getCurrentLanguage(): string {
        return self::$currentLanguage;
    }
    
    /**
     * Get supported languages
     */
    public static function getSupportedLanguages(): array {
        return self::$supportedLanguages;
    }
    
    /**
     * Translate a key
     */
    public static function t(string $key, array $params = []): string {
        $translation = self::$translations[$key] ?? $key;
        
        // Replace parameters
        foreach ($params as $param => $value) {
            $translation = str_replace("{{$param}}", $value, $translation);
        }
        
        return $translation;
    }
    
    /**
     * Get language-specific URL
     */
    public static function getUrl(string $path, ?string $lang = null): string {
        $lang = $lang ?? self::$currentLanguage;
        
        if ($lang === self::$defaultLanguage) {
            return $path;
        }
        
        // Remove leading slash and add language prefix
        $path = ltrim($path, '/');
        return "/$lang/$path";
    }
    
    /**
     * Get hreflang data for all languages
     */
    public static function getHreflangData(string $path): array {
        $hreflang = [];
        
        foreach (self::$supportedLanguages as $lang) {
            $hreflang[] = [
                'hreflang' => $lang,
                'href' => self::getUrl($path, $lang)
            ];
        }
        
        // Add x-default
        $hreflang[] = [
            'hreflang' => 'x-default',
            'href' => self::getUrl($path, self::$defaultLanguage)
        ];
        
        return $hreflang;
    }
    
    /**
     * Get language switcher data
     */
    public static function getLanguageSwitcher(string $currentPath): array {
        $switcher = [];
        
        foreach (self::$supportedLanguages as $lang) {
            $switcher[] = [
                'code' => $lang,
                'name' => self::getLanguageName($lang),
                'url' => self::getUrl($currentPath, $lang),
                'current' => $lang === self::$currentLanguage
            ];
        }
        
        return $switcher;
    }
    
    /**
     * Get language name
     */
    private static function getLanguageName(string $code): string {
        $names = [
            'en' => 'English',
            'ko' => '한국어'
        ];
        
        return $names[$code] ?? $code;
    }
    
    /**
     * Set language cookie
     */
    public static function setLanguageCookie(string $lang): void {
        if (in_array($lang, self::$supportedLanguages)) {
            setcookie('lang', $lang, time() + (365 * 24 * 60 * 60), '/'); // 1 year
        }
    }
}
