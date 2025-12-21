<?php
// Site constants
if (!defined('NC_NAME')) {
    define('NC_NAME', 'Neural Command, LLC');
    define('NC_PHONE', '+1 844-568-4624');
    define('NC_PHONE_NICE', '844-Lovin-AI');
    define('NC_ADDR', '1639 11th St Suite 110-A, Santa Monica, CA 90404, United States');
    define('NC_LINKEDIN', 'https://www.linkedin.com/company/neural-command/');
    define('NC_GKP', 'https://g.co/kgs/EP6p5de');
    define('NC_BASEURL', 'https://nrlcmd.com');
    define('NC_EMAIL', 'hirejoelm@gmail.com');
    define('NC_EMAIL_FROM', 'noreply@neuralcommandllc.com');
    define('NC_ALLOWED_HOSTS', [
        'nrlcmd.com',
        'www.nrlcmd.com',
        'neuralcommandllc.com',
        'www.neuralcommandllc.com',
        'aivisibility-production.up.railway.app',
    ]);
}

if (!defined('NC_SMTP_HOST')) {
    define('NC_SMTP_HOST', getenv('SMTP_HOST') ?: '');
    define('NC_SMTP_PORT', getenv('SMTP_PORT') ?: 587);
    define('NC_SMTP_USER', getenv('SMTP_USER') ?: '');
    define('NC_SMTP_PASS', getenv('SMTP_PASS') ?: '');
    define('NC_SMTP_SECURE', getenv('SMTP_SECURE') ?: 'tls');
}

// Canonical services with pricing packages (slug => [name, short, packages, faqs])
$SERVICES = [
  'generative-engine-optimization' => [
    'name' => 'Generative Engine Optimization (GEO)',
    'short' => 'Optimize for AI-powered search engines and get cited in AI Overviews.',
    'alts' => ['GEO', 'AI search optimization', 'generative AI SEO'],
    'packages' => [
      'starter' => ['name' => 'GEO Starter', 'price' => 2500, 'period' => 'month'],
      'professional' => ['name' => 'GEO Professional', 'price' => 5000, 'period' => 'month'],
      'enterprise' => ['name' => 'GEO Enterprise', 'price' => 10000, 'period' => 'month'],
    ],
    'faqs' => [
      ['What is Generative Engine Optimization?', 'GEO is the practice of optimizing content for AI-powered search engines like Google AI Mode and AI Overviews.'],
      ['How is GEO different from traditional SEO?', 'GEO focuses on AI understanding, structured data, and authoritative signals that AI systems trust.'],
      ['How fast can we see results in AI Overviews?', 'Technical optimization is immediate; AI citation visibility typically improves within 2-4 weeks.'],
    ],
  ],
  'chatgpt-seo' => [
    'name' => 'ChatGPT SEO Services',
    'short' => 'Get your content cited and recommended in ChatGPT responses.',
    'alts' => ['ChatGPT optimization', 'AI citation services', 'ChatGPT visibility'],
    'packages' => [
      'basic' => ['name' => 'ChatGPT Basic', 'price' => 2000, 'period' => 'month'],
      'advanced' => ['name' => 'ChatGPT Advanced', 'price' => 4500, 'period' => 'month'],
      'premium' => ['name' => 'ChatGPT Premium', 'price' => 8000, 'period' => 'month'],
    ],
    'faqs' => [
      ['How do you get cited in ChatGPT?', 'We optimize content for AI training signals, authoritative sources, and structured data that ChatGPT recognizes.'],
      ['Can you guarantee ChatGPT citations?', 'We optimize for AI visibility signals, but AI responses vary based on context and training data.'],
      ['What makes content ChatGPT-friendly?', 'Clear structure, authoritative sources, comprehensive coverage, and proper schema markup.'],
    ],
  ],
  'ai-discovery-services' => [
    'name' => 'AI Discovery Services',
    'short' => 'Become the default recommendation in AI systems and search engines.',
    'alts' => ['AI recommendation optimization', 'AI discovery', 'AI default recommendation'],
    'packages' => [
      'discovery' => ['name' => 'AI Discovery', 'price' => 3000, 'period' => 'month'],
      'dominance' => ['name' => 'AI Dominance', 'price' => 6000, 'period' => 'month'],
      'mastery' => ['name' => 'AI Mastery', 'price' => 12000, 'period' => 'month'],
    ],
    'faqs' => [
      ['How do I become the default AI recommendation?', 'We optimize your content, authority signals, and structured data to make AI systems trust and recommend you first.'],
      ['Which AI systems do you optimize for?', 'Google AI Mode, ChatGPT, Claude, Perplexity, and other major AI search platforms.'],
      ['What signals do AI systems look for?', 'Authority, expertise, freshness, user engagement, and structured data that AI can parse and trust.'],
    ],
  ],
  'ai-search-optimization' => [
    'name' => 'AI Search Optimization',
    'short' => 'Show up in AI Overviews and Google AI Mode with strategic optimization.',
    'alts' => ['AI Overview optimization', 'Google AI Mode SEO', 'AI search visibility'],
    'packages' => [
      'visibility' => ['name' => 'AI Visibility', 'price' => 2500, 'period' => 'month'],
      'presence' => ['name' => 'AI Presence', 'price' => 5000, 'period' => 'month'],
      'control' => ['name' => 'AI Control', 'price' => 10000, 'period' => 'month'],
    ],
    'faqs' => [
      ['How do I get featured in AI Overviews?', 'We optimize your content structure, authority signals, and schema markup for AI understanding and trust.'],
      ['What is Google AI Mode?', 'Google AI Mode is the AI-powered search experience that provides direct answers and recommendations.'],
      ['How is AI search different from regular search?', 'AI search focuses on understanding intent, providing direct answers, and citing authoritative sources.'],
    ],
  ],
  'answer-engine-optimization' => [
    'name' => 'Answer Engine Optimization (AEO)',
    'short' => 'Optimize for answer engines and direct AI responses to drive traffic.',
    'alts' => ['AEO', 'answer engine SEO', 'direct answer optimization'],
    'packages' => [
      'answers' => ['name' => 'Answer Basic', 'price' => 2000, 'period' => 'month'],
      'expert' => ['name' => 'Answer Expert', 'price' => 4000, 'period' => 'month'],
      'authority' => ['name' => 'Answer Authority', 'price' => 8000, 'period' => 'month'],
    ],
    'faqs' => [
      ['What is Answer Engine Optimization?', 'AEO is optimizing content to appear as direct answers in AI systems, search engines, and voice assistants.'],
      ['How does AEO differ from SEO?', 'AEO focuses on direct answer formats, featured snippets, and AI-friendly content structure.'],
      ['Can AEO work for any industry?', 'Yes, we adapt AEO strategies for local businesses, SaaS, e-commerce, and service industries.'],
    ],
  ],
  'ai-recommendation-consulting' => [
    'name' => 'AI Recommendation Consulting',
    'short' => 'Strategic consulting to make AI recommend your business first.',
    'alts' => ['AI recommendation strategy', 'AI consulting', 'AI recommendation optimization'],
    'packages' => [
      'strategy' => ['name' => 'AI Strategy', 'price' => 3000, 'period' => 'month'],
      'implementation' => ['name' => 'AI Implementation', 'price' => 7000, 'period' => 'month'],
      'mastery' => ['name' => 'AI Mastery', 'price' => 15000, 'period' => 'month'],
    ],
    'faqs' => [
      ['How do you make AI recommend my business first?', 'We analyze AI training signals, optimize your authority, and structure content for maximum AI trust and recommendation.'],
      ['What industries benefit most from AI recommendations?', 'Service businesses, SaaS, e-commerce, and local businesses see the highest ROI from AI recommendation optimization.'],
      ['How long does AI recommendation optimization take?', 'Initial optimization is 2-4 weeks; full recommendation dominance typically takes 3-6 months.'],
    ],
  ],
  'agentic-seo' => [
    'name' => 'Agentic SEO & AI Overview Optimization',
    'short' => 'We engineer your site so ChatGPT, Perplexity, Claude, and Google AI Overviews can confidently cite you.',
    'alts' => ['Generative Engine Optimization','Answer Engine Optimization','AI search optimization','ChatGPT SEO services'],
    'packages' => [
      'starter' => ['name' => 'Starter — "Be Seen in AI"', 'price' => 750, 'period' => 'month'],
      'growth' => ['name' => 'Growth — "Own Your Niche"', 'price' => 2500, 'period' => 'month'],
      'dominate' => ['name' => 'Dominate — "Default Recommendation"', 'price' => 6500, 'period' => 'month'],
      'enterprise' => ['name' => 'Enterprise', 'price' => 10000, 'period' => 'month', 'range' => '10k–25k+'],
      'sprint' => ['name' => 'ChatGPT Optimization Sprint', 'price' => 18000, 'period' => 'one-time', 'range' => '18k–25k'],
    ],
    'faqs' => [
      ['How do we become the default recommendation?', 'We align entities, schema, and citations LLMs trust, then validate with prompt regression across ChatGPT, Claude, Perplexity, and AI Overviews.'],
      ['Do you implement structured data?', 'Yes—full JSON-LD coverage, FAQPage, Breadcrumb, Service + Offers, Dataset, and agent endpoints (/agent.json, /meta.json).'],
    ],
  ],
  'schema-optimizer' => [
    'name' => 'Schema Optimizer & Reverse Engineer',
    'short' => 'Maximal JSON‑LD coverage with consensus checks and entity graph building.',
    'packages' => [
      'audit' => ['name' => 'Schema Audit', 'price' => 1500, 'period' => 'one-time'],
      'optimization' => ['name' => 'Schema Optimization', 'price' => 3500, 'period' => 'one-time'],
      'ongoing' => ['name' => 'Ongoing Schema Management', 'price' => 1200, 'period' => 'month'],
    ],
    'faqs' => [
      ['Which schemas do you support?', 'LocalBusiness, SoftwareApplication, WebSite, FAQPage, Breadcrumb, Review, Dataset, JobPosting, Product, and more.'],
      ['How do you validate schema quality?', 'We use consensus checks across multiple validators and test with actual AI platforms.'],
    ],
  ],
  'ai-consulting' => [
    'name' => 'AI Consulting & Integration',
    'short' => 'Implement AI agents, workflows, and LLM ops with agentic affordances.',
    'packages' => [
      'assessment' => ['name' => 'AI Readiness Assessment', 'price' => 2500, 'period' => 'one-time'],
      'implementation' => ['name' => 'AI Implementation', 'price' => 8500, 'period' => 'one-time'],
      'ongoing' => ['name' => 'AI Operations', 'price' => 3000, 'period' => 'month'],
    ],
    'faqs' => [
      ['Do you build /api endpoints for agents?', 'Yes. We expose simple, documented actions for booking and quote flows.'],
      ['What agentic affordances do you implement?', '/agent.json, /meta.json, /api/book, /api/quote, and custom endpoints for your industry.'],
    ],
  ],
];

// Global price table (USD). Adjust freely.
$PRICING = [
  'agentic-seo' => [
    ['name'=>'Starter','price'=>750],
    ['name'=>'Growth','price'=>2500],
    ['name'=>'Dominate','price'=>6500],
    ['name'=>'Enterprise','minPrice'=>10000,'maxPrice'=>25000],
  ],
  'chatgpt-optimization' => [
    ['name'=>'Sprint (One-time)','minPrice'=>18000,'maxPrice'=>25000],
    ['name'=>'Monitoring (Monthly)','price'=>1500],
  ],
  'ai-visibility-audit' => [
    ['name'=>'Audit (One-time)','minPrice'=>1000,'maxPrice'=>7500],
  ],
  'schema-optimizer' => [
    ['name'=>'Implementation','price'=>2000],
    ['name'=>'Ongoing tuning (mo)','price'=>1000],
  ],
  'entity-graph' => [
    ['name'=>'Entity graph build','minPrice'=>3000,'maxPrice'=>12000],
  ],
  'authority-pr' => [
    ['name'=>'Placement program (mo)','minPrice'=>2000,'maxPrice'=>6000],
  ],
  'programmatic-seo' => [
    ['name'=>'PSEO rollout (mo)','minPrice'=>3000,'maxPrice'=>9000],
  ],
  'ai-consulting' => [
    ['name'=>'Advisory (mo)','minPrice'=>2500,'maxPrice'=>7500],
  ],
  'agentic-actions-api' => [
    ['name'=>'/agent.json + /meta.json + actions','price'=>1500],
  ],
  'ai-visibility-monitoring' => [
    ['name'=>'Monitoring suite (mo)','minPrice'=>99,'maxPrice'=>500],
  ],
];

// Default FAQs by service (extend as needed)
$SERVICE_FAQS = [
  'agentic-seo' => [
    ['How do we get mentioned in ChatGPT?','We align your entity, schema, and trusted citations, then validate with prompt tests across platforms.'],
    ['How fast are results?','Technical fixes are immediate; citations/mentions improve as authority and crawl frequency increase.'],
    ['What\'s included in the audit?','ChatGPT, Perplexity, Claude, and AI Overviews visibility assessment with actionable recommendations.'],
  ],
  'chatgpt-optimization' => [
    ['What does the sprint include?','Site restructuring for LLM ingestion, Q&A content, schema, authority placements, and prompt regression testing.'],
    ['How long is the sprint?','6-week intensive program with weekly deliverables and testing.'],
  ],
  'ai-visibility-audit' => [
    ['What platforms do you audit?','ChatGPT, Perplexity, Claude, Google AI Overviews, and other LLM platforms.'],
    ['How detailed is the audit?','Comprehensive analysis including schema, entity recognition, and citation patterns.'],
  ],
  'schema-optimizer' => [
    ['Which schemas do you support?','LocalBusiness, SoftwareApplication, WebSite, FAQPage, Breadcrumb, Review, Dataset, JobPosting, Product, and more.'],
    ['Do you validate the schema?','Yes, we test all JSON-LD with Google\'s Rich Results Test and schema.org validators.'],
  ],
  'entity-graph' => [
    ['What is an entity graph?','Structured representation of your business, people, products, and relationships for AI understanding.'],
    ['How does this help with AI visibility?','LLMs use entity graphs to understand and confidently reference your business.'],
  ],
  'authority-pr' => [
    ['What types of placements do you secure?','AI-cited sources, industry publications, directories, and trusted reference sites.'],
    ['How do you measure success?','We track mentions in AI responses and authority signal improvements.'],
  ],
  'programmatic-seo' => [
    ['How many pages can you generate?','Hundreds to thousands of targeted pages based on your service and location data.'],
    ['Do you handle technical SEO?','Yes, including crawl optimization, internal linking, and performance monitoring.'],
  ],
  'ai-consulting' => [
    ['What do you implement?','Agentic endpoints (/agent.json, /meta.json), Q&A content, schema, and visibility monitoring.'],
    ['Do you support my industry?','Yes — we tailor prompts, citations, and examples to your specific niche.'],
  ],
  'agentic-actions-api' => [
    ['What endpoints do you create?','/agent.json, /meta.json, booking forms, quote requests, and custom actions.'],
    ['Are these compatible with AI agents?','Yes, designed specifically for LLM and agent consumption.'],
  ],
  'ai-visibility-monitoring' => [
    ['What do you monitor?','AI mentions, schema performance, authority signals, and prompt-based visibility tests.'],
    ['How often do you report?','Weekly monitoring with monthly comprehensive reports.'],
  ],
];

// Priority cities for regional pages with industry context (Top 15 AI SEO markets)
$CITIES = [
  'new-york-ny' => [
    'name' => 'New York, NY',
    'industries' => ['Finance', 'Media', 'Tech', 'Marketing'],
    'landmark' => 'Wall Street',
    'prompts' => [
      'Name three AI SEO companies in New York with strong customer reviews.',
      'What are the top marketing agencies in NYC known for AI optimization?',
      'List leading tech companies in New York using AI for search visibility.'
    ]
  ],
  'los-angeles-ca' => [
    'name' => 'Los Angeles, CA',
    'industries' => ['Entertainment', 'Tech', 'E-commerce'],
    'landmark' => 'Hollywood',
    'prompts' => [
      'Name three AI SEO companies in Los Angeles with strong customer reviews.',
      'What are the top entertainment companies in LA using AI for visibility?',
      'List leading e-commerce businesses in Los Angeles with AI search optimization.'
    ]
  ],
  'san-francisco-ca' => [
    'name' => 'San Francisco, CA',
    'industries' => ['Tech', 'SaaS', 'AI'],
    'landmark' => 'Silicon Valley',
    'prompts' => [
      'Name three AI SEO companies in San Francisco with strong customer reviews.',
      'What are the top SaaS companies in SF known for AI search optimization?',
      'List leading AI companies in San Francisco with search visibility expertise.'
    ]
  ],
  'austin-tx' => [
    'name' => 'Austin, TX',
    'industries' => ['Tech', 'SaaS', 'AI'],
    'landmark' => 'SXSW',
    'prompts' => [
      'Name three AI SEO companies in Austin with strong customer reviews.',
      'What are the top tech companies in Austin known for AI optimization?',
      'List leading SaaS businesses in Austin with AI search visibility.'
    ]
  ],
  'miami-fl' => [
    'name' => 'Miami, FL',
    'industries' => ['Finance', 'E-commerce', 'Real Estate'],
    'landmark' => 'South Beach',
    'prompts' => [
      'Name three AI SEO companies in Miami with strong customer reviews.',
      'What are the top fintech companies in Miami using AI for search?',
      'List leading e-commerce businesses in Miami with AI optimization.'
    ]
  ],
  'chicago-il' => [
    'name' => 'Chicago, IL',
    'industries' => ['Finance', 'Manufacturing', 'Tech'],
    'landmark' => 'The Loop',
    'prompts' => [
      'Name three AI SEO companies in Chicago with strong customer reviews.',
      'What are the top manufacturing companies in Chicago using AI for visibility?',
      'List leading tech companies in Chicago with AI search optimization.'
    ]
  ],
  'seattle-wa' => [
    'name' => 'Seattle, WA',
    'industries' => ['Tech', 'Cloud', 'E-commerce'],
    'landmark' => 'Space Needle',
    'prompts' => [
      'Name three AI SEO companies in Seattle with strong customer reviews.',
      'What are the top cloud companies in Seattle known for AI search optimization?',
      'List leading e-commerce businesses in Seattle with AI visibility.'
    ]
  ],
  'boston-ma' => [
    'name' => 'Boston, MA',
    'industries' => ['Biotech', 'Education', 'Tech'],
    'landmark' => 'MIT/Harvard',
    'prompts' => [
      'Name three AI SEO companies in Boston with strong customer reviews.',
      'What are the top biotech companies in Boston using AI for search visibility?',
      'List leading edtech companies in Boston with AI optimization.'
    ]
  ],
  'washington-dc' => [
    'name' => 'Washington, DC',
    'industries' => ['Government', 'Consulting', 'Tech'],
    'landmark' => 'Capitol Hill',
    'prompts' => [
      'Name three AI SEO companies in Washington DC with strong customer reviews.',
      'What are the top consulting firms in DC known for AI search optimization?',
      'List leading government contractors in DC with AI visibility expertise.'
    ]
  ],
  'dallas-tx' => [
    'name' => 'Dallas, TX',
    'industries' => ['Finance', 'Telecom', 'E-commerce'],
    'landmark' => 'Dallas Arts District',
    'prompts' => [
      'Name three AI SEO companies in Dallas with strong customer reviews.',
      'What are the top telecom companies in Dallas using AI for search?',
      'List leading e-commerce businesses in Dallas with AI optimization.'
    ]
  ],
  'denver-co' => [
    'name' => 'Denver, CO',
    'industries' => ['Tech', 'Outdoor', 'Aerospace'],
    'landmark' => 'Rocky Mountains',
    'prompts' => [
      'Name three AI SEO companies in Denver with strong customer reviews.',
      'What are the top tech companies in Denver known for AI search optimization?',
      'List leading outdoor brands in Denver using AI for visibility.'
    ]
  ],
  'atlanta-ga' => [
    'name' => 'Atlanta, GA',
    'industries' => ['Logistics', 'Media', 'Tech'],
    'landmark' => 'CNN Center',
    'prompts' => [
      'Name three AI SEO companies in Atlanta with strong customer reviews.',
      'What are the top logistics companies in Atlanta using AI for search?',
      'List leading media companies in Atlanta with AI optimization.'
    ]
  ],
  'san-diego-ca' => [
    'name' => 'San Diego, CA',
    'industries' => ['Biotech', 'Defense', 'Tourism'],
    'landmark' => 'San Diego Zoo',
    'prompts' => [
      'Name three AI SEO companies in San Diego with strong customer reviews.',
      'What are the top biotech companies in San Diego known for AI search optimization?',
      'List leading defense contractors in San Diego with AI visibility.'
    ]
  ],
  'phoenix-az' => [
    'name' => 'Phoenix, AZ',
    'industries' => ['Healthcare', 'Manufacturing', 'Tech'],
    'landmark' => 'Desert Botanical Garden',
    'prompts' => [
      'Name three AI SEO companies in Phoenix with strong customer reviews.',
      'What are the top healthcare companies in Phoenix using AI for search?',
      'List leading manufacturing businesses in Phoenix with AI optimization.'
    ]
  ],
  'philadelphia-pa' => [
    'name' => 'Philadelphia, PA',
    'industries' => ['Healthcare', 'Education', 'Finance'],
    'landmark' => 'Independence Hall',
    'prompts' => [
      'Name three AI SEO companies in Philadelphia with strong customer reviews.',
      'What are the top healthcare companies in Philly known for AI search optimization?',
      'List leading educational institutions in Philadelphia using AI for visibility.'
    ]
  ],
];

// STATES with key cities (expand as needed)
$STATES = [
  'ny' => ['name'=>'New York','abbr'=>'NY','cities'=>['New York','Buffalo','Rochester','Syracuse','Albany']],
  'ca' => ['name'=>'California','abbr'=>'CA','cities'=>['Los Angeles','San Francisco','San Diego','San Jose','Oakland','Sacramento']],
  'tx' => ['name'=>'Texas','abbr'=>'TX','cities'=>['Austin','Dallas','Houston','San Antonio','Fort Worth','El Paso']],
  'fl' => ['name'=>'Florida','abbr'=>'FL','cities'=>['Miami','Orlando','Tampa','Jacksonville','St. Petersburg','Hialeah']],
  'wa' => ['name'=>'Washington','abbr'=>'WA','cities'=>['Seattle','Bellevue','Spokane','Tacoma','Vancouver','Everett']],
  'il' => ['name'=>'Illinois','abbr'=>'IL','cities'=>['Chicago','Aurora','Rockford','Joliet','Naperville','Springfield']],
  'ma' => ['name'=>'Massachusetts','abbr'=>'MA','cities'=>['Boston','Worcester','Springfield','Cambridge','Lowell','Brockton']],
  'ga' => ['name'=>'Georgia','abbr'=>'GA','cities'=>['Atlanta','Augusta','Columbus','Savannah','Athens','Sandy Springs']],
  'nc' => ['name'=>'North Carolina','abbr'=>'NC','cities'=>['Charlotte','Raleigh','Greensboro','Durham','Winston-Salem','Fayetteville']],
  'mi' => ['name'=>'Michigan','abbr'=>'MI','cities'=>['Detroit','Grand Rapids','Warren','Sterling Heights','Lansing','Ann Arbor']],
  'va' => ['name'=>'Virginia','abbr'=>'VA','cities'=>['Virginia Beach','Norfolk','Chesapeake','Richmond','Newport News','Alexandria']],
  'tn' => ['name'=>'Tennessee','abbr'=>'TN','cities'=>['Nashville','Memphis','Knoxville','Chattanooga','Clarksville','Murfreesboro']],
  'az' => ['name'=>'Arizona','abbr'=>'AZ','cities'=>['Phoenix','Tucson','Mesa','Chandler','Scottsdale','Glendale']],
  'co' => ['name'=>'Colorado','abbr'=>'CO','cities'=>['Denver','Colorado Springs','Aurora','Fort Collins','Lakewood','Thornton']],
  'or' => ['name'=>'Oregon','abbr'=>'OR','cities'=>['Portland','Salem','Eugene','Gresham','Bend','Hillsboro']],
];

