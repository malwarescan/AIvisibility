<?php
declare(strict_types=1);

/**
 * Deterministic RNG helpers using PHP 8.2+ Random API
 * Same seed = same output every time
 */

function seeded_rng(string $seedKey): \Random\Engine\Mt19937 {
  // PHP 8.2: use MT with a 32-bit seed derived from CRC32 of seedKey
  $seed = crc32($seedKey) & 0x7fffffff;
  return new \Random\Engine\Mt19937($seed);
}

function seeded_pick(array $arr, \Random\Engine\Mt19937 $rng): mixed {
  if (!$arr) return null;
  $r = new \Random\Randomizer($rng);
  return $arr[$r->pickArrayKeys($arr, 1)[0]];
}

function seeded_shuffle(array $arr, \Random\Engine\Mt19937 $rng): array {
  $r = new \Random\Randomizer($rng);
  return $r->shuffleArray($arr);
}

function seeded_int(int $min, int $max, \Random\Engine\Mt19937 $rng): int {
  $r = new \Random\Randomizer($rng);
  return $r->getInt($min, $max);
}

