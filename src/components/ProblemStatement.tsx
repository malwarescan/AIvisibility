import { AppleSection } from './apple/AppleSection';
import { AppleHeading, AppleBody } from './apple/AppleTypography';
import { AppleCard } from './apple/AppleCard';

export function ProblemStatement() {
  return (
    <AppleSection spacing="large" background="gray">
      <div className="text-center mb-16">
        <AppleHeading level={2} className="mb-6">
          The AI Search Revolution is Here
        </AppleHeading>
        <AppleBody size="large" className="max-w-3xl mx-auto">
          Traditional SEO is becoming obsolete. AI search engines like ChatGPT, Perplexity, and Google AI Overviews 
          use completely different ranking factors than traditional search.
        </AppleBody>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <AppleCard variant="elevated">
          <div className="space-y-6">
            <h3 className="font-apple font-semibold text-2xl text-apple-gray-900 mb-4">
              The Old Way: Traditional SEO
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Optimize for keyword rankings and click-through rates</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Focus on Google algorithm updates</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Track traditional metrics like Domain Authority</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Build backlinks for search engines</p>
              </div>
            </div>
          </div>
        </AppleCard>

        <AppleCard variant="elevated">
          <div className="space-y-6">
            <h3 className="font-apple font-semibold text-2xl text-apple-gray-900 mb-4">
              The New Way: AI Search Optimization
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-apple-green rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Optimize for citation authority and conversational queries</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-apple-green rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Focus on AI engine decision-making patterns</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-apple-green rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Track AI-specific metrics like citation frequency</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-apple-green rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-apple-gray-600">Build knowledge graphs for AI understanding</p>
              </div>
            </div>
          </div>
        </AppleCard>
      </div>

      <div className="text-center">
        <AppleBody size="large" className="mb-6">
          The companies that adapt to AI search first will dominate their markets. 
          The rest will become invisible to AI engines.
        </AppleBody>
        <button className="
          px-8 py-4 bg-apple-blue text-white font-semibold 
          rounded-apple-lg transition-all duration-300 
          hover:shadow-apple-lg hover:-translate-y-1
        ">
          See How Neural Command Adapts
        </button>
      </div>
    </AppleSection>
  );
} 