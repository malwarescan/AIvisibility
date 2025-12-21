<?php
function esc($s){return htmlspecialchars($s, ENT_QUOTES,'UTF-8');}
function canonical($path = '/') {
    require_once __DIR__.'/../bootstrap/canonical.php';
    return Canonical::absoluteCanonical($path);
}
function nowISO(){return gmdate('c');}

