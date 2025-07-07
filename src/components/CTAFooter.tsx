import { AppleSection } from './apple/AppleSection';
import { AppleHeading, AppleBody } from './apple/AppleTypography';
import { AppleCard } from './apple/AppleCard';

export function CTAFooter() {
  return (
    <AppleSection spacing="large" background="dark">
      <div className="max-w-4xl mx-auto text-center">
        <AppleHeading level={2} className="mb-6">
          Ready to Dominate AI Search?
        </AppleHeading>
        <AppleBody size="large" className="mb-8 text-apple-blue-100">
          Join the AI-first revolution. Start optimizing for the future of search today.
        </AppleBody>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <AppleCard variant="glass" className="text-center">
            <h3 className="text-xl font-apple font-bold mb-4">Starter</h3>
            <div className="text-3xl font-bold mb-2">
              $99<span className="text-lg">/month</span>
            </div>
            <ul className="text-sm text-apple-blue-100 space-y-2 mb-6">
              <li>AgentRank Simulator</li>
              <li>Basic AI Analytics</li>
              <li>5 AI Audits/month</li>
              <li>Email Support</li>
            </ul>
            <button className="w-full py-3 bg-white text-apple-blue font-semibold rounded-apple-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
          </AppleCard>

          <AppleCard variant="glass" className="text-center relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-apple-green text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-apple font-bold mb-4">Professional</h3>
            <div className="text-3xl font-bold mb-2">
              $299<span className="text-lg">/month</span>
            </div>
            <ul className="text-sm text-apple-blue-100 space-y-2 mb-6">
              <li>All Starter Features</li>
              <li>CitationFlow Optimizer</li>
              <li>Authority Signal Monitor</li>
              <li>Unlimited AI Audits</li>
              <li>Priority Support</li>
            </ul>
            <button className="w-full py-3 bg-white text-apple-blue font-semibold rounded-apple-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
          </AppleCard>

          <AppleCard variant="glass" className="text-center">
            <h3 className="text-xl font-apple font-bold mb-4">Enterprise</h3>
            <div className="text-3xl font-bold mb-2">
              $999<span className="text-lg">/month</span>
            </div>
            <ul className="text-sm text-apple-blue-100 space-y-2 mb-6">
              <li>All Professional Features</li>
              <li>QueryMind Prediction Engine</li>
              <li>AgentConnect Integration Hub</li>
              <li>Custom AI Models</li>
              <li>Dedicated Success Manager</li>
            </ul>
            <button className="w-full py-3 bg-white text-apple-blue font-semibold rounded-apple-lg hover:bg-gray-100 transition-colors">
              Contact Sales
            </button>
          </AppleCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-apple-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-apple-blue font-apple font-bold text-2xl">14</span>
            </div>
            <h3 className="text-xl font-apple font-bold mb-2">14-Day Free Trial</h3>
            <p className="text-apple-blue-100">No credit card required. Start optimizing for AI search immediately.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-apple-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-apple-green font-apple font-bold text-2xl">AI</span>
            </div>
            <h3 className="text-xl font-apple font-bold mb-2">AI Search Strategy Session</h3>
            <p className="text-apple-blue-100">Get a personalized AI search optimization strategy with our experts.</p>
          </div>
        </div>

        <AppleCard variant="glass" className="p-8">
          <h3 className="text-2xl font-apple font-bold mb-4">Don&apos;t Get Left Behind</h3>
          <p className="text-apple-blue-100 mb-6">
            The AI search revolution is happening now. Companies that optimize for AI search today will dominate their markets tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-apple-blue font-semibold rounded-apple-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-apple-lg hover:-translate-y-1">
              Start Your Free Trial
            </button>
            <button className="px-8 py-4 border border-white text-white font-semibold rounded-apple-lg hover:bg-white/10 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </AppleCard>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-apple-blue-100 text-sm">
            Trusted by 500+ companies worldwide • 99.9% uptime • SOC 2 compliant • GDPR ready
          </p>
        </div>
      </div>
    </AppleSection>
  );
} 