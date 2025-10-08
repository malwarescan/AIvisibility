<?php global $SERVICES, $CITIES; ?>
<footer class="container mx-auto px-4 py-12 border-t mt-16 text-sm">

  <div class="grid md:grid-cols-3 gap-4">

    <!-- Column 1: Core -->
    <nav aria-label="Core">
      <h3 class="font-mono font-semibold mb-2">Core</h3>
      <div class="scrollbox">
        <ul class="space-y-1">
          <li><a href="<?= Canonical::absolute('/') ?>" class="underline">Home</a></li>
          <li><a href="<?= Canonical::absolute('/about/') ?>" class="underline">About</a></li>
          <li><a href="<?= Canonical::absolute('/services/') ?>" class="underline">Services</a></li>
          <li><a href="<?= Canonical::absolute('/contact/') ?>" class="underline">Contact</a></li>
          <li><a href="<?= Canonical::absolute('/sitemap.xml') ?>" class="underline">Sitemap</a></li>
          <li><a href="<?= Canonical::absolute('/agent.json') ?>" class="underline">Agent JSON</a></li>
          <li><a href="<?= Canonical::absolute('/meta.json') ?>" class="underline">Meta JSON</a></li>
        </ul>
      </div>
    </nav>

    <!-- Column 2: Services -->
    <nav aria-label="Services">
      <h3 class="font-mono font-semibold mb-2">Services</h3>
      <div class="scrollbox">
        <ul class="space-y-1">
          <?php foreach($SERVICES as $slug=>$svc): ?>
            <li>
              <a href="<?= Canonical::absolute('/services/'.$slug.'/') ?>" class="underline">
                <?= esc($svc['name']) ?>
              </a>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </nav>

    <!-- Column 3: All Service × City links (scrollable, crawlable) -->
    <nav aria-label="Service by City">
      <h3 class="font-mono font-semibold mb-2">By City</h3>
      <div class="scrollbox">
        <ul class="space-y-1">
          <?php foreach($CITIES as $cityKey=>$cityData): ?>
            <?php foreach($SERVICES as $slug=>$svc): ?>
              <li>
                <a href="<?= link_service_city($slug, $cityKey) ?>" class="underline">
                  <?= esc($svc['name']) ?> — <?= esc($cityData['name']) ?>
                </a>
              </li>
            <?php endforeach; ?>
          <?php endforeach; ?>
        </ul>
      </div>
    </nav>

  </div>

  <div class="mt-12 text-gray-500">
    <p><?= esc(NC_NAME) ?> — <?= esc(NC_PHONE) ?> (<?= esc(NC_PHONE_NICE) ?>)</p>
    <p><?= esc(NC_ADDR) ?></p>
  </div>
</footer>
</body>
</html>

