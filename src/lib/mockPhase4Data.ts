// QueryMind Prediction Data
export const mockPredictionMetrics = [
  {
    title: 'Forecast Accuracy',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'positive' as const,
    description: '6-month prediction reliability',
  },
  {
    title: 'Trend Opportunities',
    value: '47',
    change: '+12',
    changeType: 'positive' as const,
    description: 'Identified growth areas',
  },
  {
    title: 'Market Confidence',
    value: '8.9/10',
    change: '+0.4',
    changeType: 'positive' as const,
    description: 'AI trend confidence score',
  },
  {
    title: 'Query Volume Growth',
    value: '+156%',
    change: '+23%',
    changeType: 'positive' as const,
    description: 'Predicted 6-month increase',
  },
];

export const mockForecastData = [
  { name: 'Jan 2025', chatgpt: 85, claude: 78, perplexity: 65, gemini: 72, confidence: 94 },
  { name: 'Feb 2025', chatgpt: 89, claude: 82, perplexity: 70, gemini: 76, confidence: 92 },
  { name: 'Mar 2025', chatgpt: 93, claude: 87, perplexity: 75, gemini: 81, confidence: 90 },
  { name: 'Apr 2025', chatgpt: 96, claude: 91, perplexity: 82, gemini: 86, confidence: 88 },
  { name: 'May 2025', chatgpt: 98, claude: 94, perplexity: 87, gemini: 90, confidence: 86 },
  { name: 'Jun 2025', chatgpt: 99, claude: 96, perplexity: 91, gemini: 93, confidence: 85 },
];

export const mockTrendOpportunities = [
  {
    trend: 'AI-Powered Content Creation',
    growth: '+340%',
    timeframe: '6 months',
    difficulty: 'medium' as const,
    impact: 'high' as const,
    confidence: 92,
    description: 'Rising demand for AI-generated content optimization',
  },
  {
    trend: 'Voice Search Integration',
    growth: '+180%',
    timeframe: '4 months',
    difficulty: 'hard' as const,
    impact: 'high' as const,
    confidence: 87,
    description: 'Voice-activated AI search becoming mainstream',
  },
  {
    trend: 'Real-time AI Responses',
    growth: '+225%',
    timeframe: '3 months',
    difficulty: 'easy' as const,
    impact: 'medium' as const,
    confidence: 89,
    description: 'Instant AI response optimization opportunities',
  },
  {
    trend: 'Multimodal Search',
    growth: '+290%',
    timeframe: '5 months',
    difficulty: 'hard' as const,
    impact: 'high' as const,
    confidence: 84,
    description: 'Image, video, and text combined search queries',
  },
];

// AgentConnect Hub Data
export const mockConnectMetrics = [
  {
    title: 'Active Integrations',
    value: '12/15',
    change: '+3',
    changeType: 'positive' as const,
    description: 'Connected AI platforms',
  },
  {
    title: 'Automation Rules',
    value: '47',
    change: '+8',
    changeType: 'positive' as const,
    description: 'Active workflow rules',
  },
  {
    title: 'API Calls/Day',
    value: '2,847',
    change: '+21%',
    changeType: 'positive' as const,
    description: 'Daily API interactions',
  },
  {
    title: 'Success Rate',
    value: '99.2%',
    change: '+0.3%',
    changeType: 'positive' as const,
    description: 'Integration reliability',
  },
];

export const mockIntegrations = [
  {
    name: 'ChatGPT API',
    status: 'connected' as const,
    type: 'AI Platform',
    usage: 'High',
    lastSync: '2 min ago',
    features: ['Real-time monitoring', 'Auto-optimization', 'Performance tracking'],
    health: 99,
  },
  {
    name: 'Claude API',
    status: 'connected' as const,
    type: 'AI Platform',
    usage: 'High',
    lastSync: '5 min ago',
    features: ['Content analysis', 'Citation tracking', 'Authority monitoring'],
    health: 97,
  },
  {
    name: 'Perplexity API',
    status: 'connected' as const,
    type: 'AI Platform',
    usage: 'Medium',
    lastSync: '8 min ago',
    features: ['Search optimization', 'Query tracking'],
    health: 94,
  },
  {
    name: 'Google Analytics',
    status: 'connected' as const,
    type: 'Analytics',
    usage: 'High',
    lastSync: '1 min ago',
    features: ['Traffic correlation', 'Conversion tracking'],
    health: 100,
  },
  {
    name: 'Slack',
    status: 'connected' as const,
    type: 'Communication',
    usage: 'Medium',
    lastSync: '15 min ago',
    features: ['Alert notifications', 'Team updates'],
    health: 96,
  },
  {
    name: 'Zapier',
    status: 'available' as const,
    type: 'Automation',
    usage: 'Not Connected',
    lastSync: 'Never',
    features: ['Workflow automation', 'Third-party connections'],
    health: 0,
  },
];

export const mockWorkflows = [
  {
    name: 'Citation Alert System',
    description: 'Automatically notify team when citation rate drops below threshold',
    trigger: 'Citation rate < 15%',
    actions: ['Send Slack notification', 'Generate optimization report', 'Schedule review meeting'],
    status: 'active' as const,
    executions: 23,
    lastRun: '2 hours ago',
  },
  {
    name: 'Authority Score Monitoring',
    description: 'Track domain authority changes and competitor movements',
    trigger: 'Authority score change > 5 points',
    actions: ['Update dashboard', 'Email stakeholders', 'Log change history'],
    status: 'active' as const,
    executions: 156,
    lastRun: '1 day ago',
  },
  {
    name: 'Performance Optimization',
    description: 'Auto-implement technical SEO fixes when issues are detected',
    trigger: 'Technical score < 80%',
    actions: ['Run diagnostic scan', 'Apply standard fixes', 'Generate improvement report'],
    status: 'paused' as const,
    executions: 8,
    lastRun: '1 week ago',
  },
  {
    name: 'Competitive Intelligence',
    description: 'Monitor competitor AI search performance and alert on significant changes',
    trigger: 'Competitor score increase > 10%',
    actions: ['Analyze competitor changes', 'Generate strategy recommendations', 'Schedule strategy call'],
    status: 'active' as const,
    executions: 34,
    lastRun: '6 hours ago',
  },
];

export const mockAPIUsage = [
  { name: 'Week 1', calls: 15420, success: 99.1, errors: 138 },
  { name: 'Week 2', calls: 18340, success: 99.3, errors: 128 },
  { name: 'Week 3', calls: 21280, success: 99.0, errors: 213 },
  { name: 'Week 4', calls: 19930, success: 99.2, errors: 159 },
]; 