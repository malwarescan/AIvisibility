<?php
declare(strict_types=1);
require_once __DIR__.'/../bootstrap/canonical.php';

function link_service_city(string $service, string $city): string {
  $p='/services/'.Canonical::kebab($service).'/'.Canonical::kebab(str_replace('_','-',$city)).'/';
  return Canonical::absolute($p);
}
function link_service_hub(string $service): string {
  return Canonical::absolute('/services/'.Canonical::kebab($service).'/');
}
function link_state_hub(string $state2): string {
  return Canonical::absolute('/services/state/'.Canonical::kebab($state2).'/');
}
