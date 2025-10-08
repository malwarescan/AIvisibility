<?php
declare(strict_types=1);
require_once __DIR__.'/../bootstrap/canonical.php';

function link_to_service_city(string $service, string $citySlug): string {
    $path = '/services/'.Canonical::kebab($service).'/'.Canonical::kebab(str_replace('_','-',$citySlug)).'/';
    return Canonical::absoluteCanonical($path);
}
