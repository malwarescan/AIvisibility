<?php
// API Configuration
// Pull the OpenAI API key from environment variables
define('OPENAI_API_KEY', getenv('OPENAI_API_KEY') ?: '');

// API Settings
define('OPENAI_MODEL', 'gpt-4');
define('OPENAI_MAX_TOKENS', 500);
define('OPENAI_TEMPERATURE', 0.7);
define('OPENAI_TIMEOUT', 30);
?>
