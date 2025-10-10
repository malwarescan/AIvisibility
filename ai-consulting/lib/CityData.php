<?php
// /ai-consulting/lib/CityData.php
declare(strict_types=1);

final class CityData {
  private string $csvPath;
  /** @var array<string,array> keyed by slug */
  private array $bySlug = [];

  public function __construct(string $csvPath) {
    $this->csvPath = $csvPath;
    $this->load();
  }

  private function load(): void {
    if (!file_exists($this->csvPath)) {
      throw new RuntimeException("cities.csv not found at {$this->csvPath}");
    }
    $fh = fopen($this->csvPath, 'r');
    if (!$fh) throw new RuntimeException("Cannot open cities.csv");

    $header = fgetcsv($fh, 0, ',', '"', '');
    if (!$header) throw new RuntimeException("cities.csv missing header");

    while (($row = fgetcsv($fh, 0, ',', '"', '')) !== false) {
      $rec = array_combine($header, $row);
      if (!$rec) continue;
      $slug = trim((string)($rec['slug'] ?? ''));
      if ($slug === '') continue;
      $rec['city']    = trim((string)($rec['city'] ?? ''));
      $rec['region']  = trim((string)($rec['region'] ?? ''));
      $rec['state_code'] = trim((string)($rec['state_code'] ?? ''));
      $rec['country'] = trim((string)($rec['country'] ?? ''));
      $rec['service'] = trim((string)($rec['service'] ?? 'AI Consulting'));
      $rec['alt_service'] = trim((string)($rec['alt_service'] ?? 'Agentic SEO'));
      $rec['pain_point'] = trim((string)($rec['pain_point'] ?? 'AI Overviews visibility'));
      $rec['tagline'] = trim((string)($rec['tagline'] ?? 'booked clients via AI search'));
      $rec['cta_phone'] = trim((string)($rec['cta_phone'] ?? '+1 844-568-4624'));
      $rec['cta_email'] = trim((string)($rec['cta_email'] ?? 'consult@nrlcmd.com'));
      $this->bySlug[$slug] = $rec;
    }
    fclose($fh);
  }

  public function getBySlug(string $slug): ?array {
    return $this->bySlug[$slug] ?? null;
  }

  /** @return array<int,array> */
  public function all(): array {
    return array_values($this->bySlug);
  }
}
