import { CinematicLayout } from '@/components/CinematicLayout';
import { AutoAnimatedElement } from '@/components/AutoAnimatedElement';
import { AppleAgenticDashboard } from '@/components/AppleAgenticDashboard';
import Link from 'next/link';

export default function HomePage() {
  return (
    <CinematicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
        {/* Apple-style content overlay */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
          <AutoAnimatedElement animation="slideUp" intensity={1.8} delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-thin tracking-tight text-gray-900 mb-8">
              Neural Command
            </h1>
          </AutoAnimatedElement>
          
          <AutoAnimatedElement animation="fadeIn" delay={0.6} intensity={1.4}>
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 font-light leading-relaxed max-w-4xl mx-auto">
              The search intelligence platform that thinks ahead
            </p>
          </AutoAnimatedElement>
          
          <AutoAnimatedElement animation="scale" delay={1.0} intensity={1.5}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/tools">
                <button className="bg-blue-500 text-white px-10 py-4 rounded-xl font-medium text-lg hover:bg-blue-600 transition-all duration-200 shadow-lg transform hover:scale-105">
                  Launch Platform
                </button>
              </Link>
              <button className="bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 px-10 py-4 rounded-xl font-medium text-lg hover:bg-white transition-all duration-200">
                Learn More
              </button>
            </div>
          </AutoAnimatedElement>
          
          <AutoAnimatedElement animation="fadeIn" delay={1.4} intensity={1.0}>
            <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>AI Search Intelligence</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Predictive Insights</span>
              </div>
            </div>
          </AutoAnimatedElement>
        </div>
      </section>

      {/* Apple Agentic Dashboard */}
      <AppleAgenticDashboard />

      {/* Problem Statement */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <AutoAnimatedElement animation="slideUp" intensity={1.2}>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              While Others Optimize for Google
            </h2>
          </AutoAnimatedElement>
          
          <AutoAnimatedElement animation="slideUp" intensity={1.0} delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-light text-blue-400 mb-8">
              Leaders Optimize for AI
            </h2>
          </AutoAnimatedElement>
          
          <AutoAnimatedElement animation="fadeIn" delay={0.4}>
            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
              AI Overviews appear in 13.14% of searches and growing 72% monthly. 
              The future of search is happening now.
            </p>
          </AutoAnimatedElement>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <AutoAnimatedElement animation="slideUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seven Neural Tools for AI Dominance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each tool solves a critical gap in traditional SEO, built specifically for agentic search.
            </p>
          </AutoAnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AgentRank Simulator", metric: "94% prediction accuracy" },
              { title: "CitationFlow Optimizer", metric: "300% citation increase" },
              { title: "AI Search Analytics", metric: "Real-time tracking" },
              { title: "Authority Signal Monitor", metric: "20+ AI platforms" },
              { title: "AI-Readiness Auditor", metric: "Technical optimization" },
              { title: "QueryMind Prediction", metric: "6-month forecasting" },
              { title: "AgentConnect Hub", metric: "API integrations" }
            ].map((feature, index) => (
              <AutoAnimatedElement
                key={feature.title}
                animation="slideUp"
                intensity={0.8}
                delay={index * 0.1}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <div className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full inline-block text-sm">
                    {feature.metric}
                  </div>
                </div>
              </AutoAnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <AutoAnimatedElement animation="slideLeft" intensity={1.5}>
                <h2 className="text-4xl font-light mb-6">
                  Real-Time AI Search Intelligence
                </h2>
              </AutoAnimatedElement>
              
              <AutoAnimatedElement animation="fadeIn" delay={0.3}>
                <p className="text-lg opacity-80 mb-6">
                  Monitor your content performance across ChatGPT, Claude, Perplexity, 
                  and Google AI Overviews in real-time.
                </p>
              </AutoAnimatedElement>
              
              <AutoAnimatedElement animation="scale" delay={0.5}>
                <div className="space-y-3">
                  {['Citation Tracking', 'Performance Analytics', 'Trend Forecasting'].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </AutoAnimatedElement>
            </div>

            <AutoAnimatedElement 
              animation="slideLeft" 
              intensity={1.2}
              delay={0.4}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl">
                {/* Dashboard mockup */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-blue-500 rounded-full w-1/3"></div>
                    <div className="h-3 bg-green-500 rounded-full w-1/4"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {Array.from({length: 6}).map((_, i) => (
                      <div key={i} className="h-12 bg-gray-700 rounded-lg"></div>
                    ))}
                  </div>
                  <div className="h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
                </div>
              </div>
              
              {/* Floating data points */}
              <AutoAnimatedElement 
                animation="scale"
                intensity={0.3}
                className="absolute -top-4 -right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                +127% Citations
              </AutoAnimatedElement>
            </AutoAnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-purple-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-8">
          <AutoAnimatedElement animation="scale" intensity={1.3}>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Ready to Dominate AI Search?
            </h2>
          </AutoAnimatedElement>
          
          <AutoAnimatedElement animation="fadeIn" delay={0.3}>
            <p className="text-lg opacity-90 mb-8">
              Join the leaders who are already optimizing for the future of search.
            </p>
          </AutoAnimatedElement>
          
          <AutoAnimatedElement animation="scale" delay={0.6}>
            <Link href="/tools">
              <button className="bg-white text-blue-900 px-12 py-4 rounded-xl font-medium text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg transform hover:scale-105">
                Get Started Now
              </button>
            </Link>
          </AutoAnimatedElement>
        </div>
      </section>
    </CinematicLayout>
  );
} 