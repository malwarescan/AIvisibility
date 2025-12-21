<?php
// Simple healthcheck endpoint - no dependencies
header('Content-Type: text/plain');
echo 'OK';
http_response_code(200);

