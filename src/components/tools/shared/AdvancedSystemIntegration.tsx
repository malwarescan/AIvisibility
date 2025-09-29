'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface PlatformWeight {
  platform: string;
  baseWeight: number;
  currentWeight: number;
  driftFactor: number;
  lastUpdated: string;
  confidence: number;
}

interface BehaviorLog {
  id: string;
  timestamp: string;
  platform: string;
  url: string;
  query: string;
  response: string;
  reasoning: string;
  confidence: number;
  citationCount: number;
  answerInclusion: boolean;
  metadata: {
    responseTime: number;
    tokenCount: number;
    modelVersion: string;
    temperature: number;
    maxTokens: number;
  };
}

interface PagePerformance {
  id: string;
  url: string;
  title: string;
  agentScores: Array<{
    agentId: string;
    agentName: string;
    platform: string;
    citationCount: number;
    answerInclusion: boolean;
    confidence: number;
    responseTime: number;
    score: number;
    weight: number;
    lastSeen: string;
  }>;
  totalScore: number;
  rank: number;
  lastUpdated: string;
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
}

interface LeaderboardEntry {
  rank: number;
  pagePerformance: PagePerformance;
  highlights: {
    topAgent: string;
    bestPlatform: string;
    citationLeader: boolean;
    answerInclusionLeader: boolean;
  };
}

interface PerformanceMetrics {
  totalPages: number;
  averageScore: number;
  topPerformer: string;
  mostImproved: string;
  platformBreakdown: Record<string, number>;
  agentBreakdown: Record<string, number>;
}

export default function AdvancedSystemIntegration() {
  const [activeTab, setActiveTab] = useState('weights');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Weight normalization state
  const [globalWeights, setGlobalWeights] = useState<PlatformWeight[]>([]);
  const [toolConfigs, setToolConfigs] = useState<any[]>([]);
  const [consistency, setConsistency] = useState<any>(null);
  const [selectedTool, setSelectedTool] = useState<string>('');
  
  // Behavior replay state
  const [behaviorLogs, setBehaviorLogs] = useState<BehaviorLog[]>([]);
  const [replaySessions, setReplaySessions] = useState<any[]>([]);
  const [logForm, setLogForm] = useState({
    platform: '',
    url: '',
    query: '',
    response: '',
    metadata: {
      responseTime: 2000,
      tokenCount: 0,
      modelVersion: 'latest',
      temperature: 0.7,
      maxTokens: 2000
    }
  });
  
  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string>('');

  // Load initial data
  useEffect(() => {
    loadWeightData();
    loadBehaviorData();
    loadLeaderboardData();
  }, []);

  const loadWeightData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/platform-weights/normalize');
      const data = await response.json();
      
      if (data.success) {
        setGlobalWeights(data.result.globalWeights);
        setToolConfigs(data.result.toolConfigs);
        setConsistency(data.result.consistency);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to load weight data');
    } finally {
      setLoading(false);
    }
  };

  const loadBehaviorData = async () => {
    try {
      const response = await fetch('/api/behavior-replay/log');
      const data = await response.json();
      
      if (data.success) {
        setBehaviorLogs(data.result.logs || []);
      }
    } catch (error) {
      console.error('Failed to load behavior data:', error);
    }
  };

  const loadLeaderboardData = async () => {
    try {
      const response = await fetch('/api/leaderboard/update');
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.result.leaderboard || []);
        setMetrics(data.result.metrics);
      }
    } catch (error) {
      console.error('Failed to load leaderboard data:', error);
    }
  };

  const normalizeWeights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/platform-weights/normalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: selectedTool || undefined
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGlobalWeights(data.result.globalWeights);
        setToolConfigs(data.result.toolConfigs);
        setConsistency(data.result.consistency);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Weight normalization failed');
    } finally {
      setLoading(false);
    }
  };

  const logBehavior = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/behavior-replay/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logForm)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLogForm({
          platform: '',
          url: '',
          query: '',
          response: '',
          metadata: {
            responseTime: 2000,
            tokenCount: 0,
            modelVersion: 'latest',
            temperature: 0.7,
            maxTokens: 2000
          }
        });
        loadBehaviorData();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Behavior logging failed');
    } finally {
      setLoading(false);
    }
  };

  const replayBehavior = async (url: string, platform: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/behavior-replay/replay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          platform,
          config: {
            maxLogs: 10,
            timeWindow: 30,
            minConfidence: 0.6,
            patternThreshold: 0.5,
            includeMetadata: true
          }
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        loadBehaviorData();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Behavior replay failed');
    } finally {
      setLoading(false);
    }
  };

  const updateLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/leaderboard/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.result.leaderboard || []);
        setMetrics(data.result.metrics);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Leaderboard update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Advanced System Integration</h2>
        <Badge variant="outline">Beta</Badge>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weights">Weight Normalization</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Replay</TabsTrigger>
          <TabsTrigger value="leaderboard">Performance Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="weights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Weight Normalization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Select Tool (Optional)</Label>
                  <Select value={selectedTool} onValueChange={setSelectedTool}>
                    <SelectTrigger>
                      <SelectValue placeholder="All tools" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All tools</SelectItem>
                      {toolConfigs.map(config => (
                        <SelectItem key={config.toolId} value={config.toolId}>
                          {config.toolName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={normalizeWeights} disabled={loading}>
                  {loading ? 'Normalizing...' : 'Normalize Weights'}
                </Button>
              </div>

              {consistency && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={consistency.isConsistent ? 'default' : 'destructive'}>
                      {consistency.isConsistent ? 'Consistent' : 'Inconsistent'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {consistency.inconsistencies.length} inconsistencies found
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {globalWeights.map(weight => (
                  <Card key={weight.platform}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{weight.platform}</span>
                        <Badge variant="outline">{weight.confidence.toFixed(2)}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Base Weight:</span>
                          <span>{weight.baseWeight.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Current Weight:</span>
                          <span>{weight.currentWeight.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Drift Factor:</span>
                          <span className={weight.driftFactor > 0.1 ? 'text-red-500' : 'text-green-500'}>
                            {weight.driftFactor.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Logging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Platform</Label>
                  <Select value={logForm.platform} onValueChange={(value) => setLogForm({...logForm, platform: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chatgpt">ChatGPT</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="perplexity">Perplexity</SelectItem>
                      <SelectItem value="googleAI">Google AI</SelectItem>
                      <SelectItem value="bing">Bing</SelectItem>
                      <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    value={logForm.url}
                    onChange={(e) => setLogForm({...logForm, url: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              
              <div>
                <Label>Query</Label>
                <Input
                  value={logForm.query}
                  onChange={(e) => setLogForm({...logForm, query: e.target.value})}
                  placeholder="What is the main topic of this page?"
                />
              </div>
              
              <div>
                <Label>Response</Label>
                <textarea
                  value={logForm.response}
                  onChange={(e) => setLogForm({...logForm, response: e.target.value})}
                  placeholder="AI response content..."
                  className="w-full min-h-[100px] p-3 border rounded-md"
                />
              </div>
              
              <Button onClick={logBehavior} disabled={loading}>
                {loading ? 'Logging...' : 'Log Behavior'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavior Logs ({behaviorLogs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {behaviorLogs.slice(0, 10).map(log => (
                  <div key={log.id} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{log.platform}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><strong>URL:</strong> {log.url}</div>
                      <div><strong>Query:</strong> {log.query.substring(0, 50)}...</div>
                      <div><strong>Citations:</strong> {log.citationCount}</div>
                      <div><strong>Confidence:</strong> {(log.confidence * 100).toFixed(1)}%</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => replayBehavior(log.url, log.platform)}
                      className="mt-2"
                    >
                      Replay
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Button onClick={updateLeaderboard} disabled={loading}>
                  {loading ? 'Updating...' : 'Update Leaderboard'}
                </Button>
                {metrics && (
                  <div className="flex gap-4 text-sm">
                    <span>Total Pages: {metrics.totalPages}</span>
                    <span>Avg Score: {metrics.averageScore}</span>
                  </div>
                )}
              </div>

              {leaderboard.length > 0 ? (
                <div className="space-y-2">
                  {leaderboard.slice(0, 10).map(entry => (
                    <div key={entry.pagePerformance.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{entry.rank}</Badge>
                          <span className="font-medium">{entry.pagePerformance.title}</span>
                        </div>
                        <div className="flex gap-2">
                          {entry.highlights.citationLeader && (
                            <Badge variant="secondary">Citation Leader</Badge>
                          )}
                          {entry.highlights.answerInclusionLeader && (
                            <Badge variant="secondary">Answer Leader</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {entry.pagePerformance.url}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span>Score: {entry.pagePerformance.totalScore}</span>
                        <span>Top Agent: {entry.highlights.topAgent}</span>
                        <span>Best Platform: {entry.highlights.bestPlatform}</span>
                        <span className={entry.pagePerformance.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {entry.pagePerformance.dailyChange >= 0 ? '+' : ''}{entry.pagePerformance.dailyChange}
                        </span>
                      </div>
                      
                      <div className="mt-2">
                        <Progress value={entry.pagePerformance.totalScore} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No leaderboard data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 