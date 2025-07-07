import { AppleSection } from './apple/AppleSection';
import { AppleHeading, AppleBody } from './apple/AppleTypography';
import { AppleCard } from './apple/AppleCard';

export function AuthoritySection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Marketing",
      company: "TechFlow Solutions",
      quote: "Neural Command transformed our AI search presence. We went from invisible to AI engines to being cited in 78% of relevant AI overviews within 3 months."
    },
    {
      name: "Marcus Rodriguez",
      role: "SEO Director",
      company: "E-commerce Giant",
      quote: "The AgentRank Simulator is revolutionary. We can now predict and optimize for AI search rankings before our competitors even know what to track."
    },
    {
      name: "Dr. Emily Watson",
      role: "Content Strategy Lead",
      company: "B2B SaaS Platform",
      quote: "Our citation frequency increased 3x after implementing Neural Command. The AI Search Analytics Dashboard shows us exactly what AI engines care about."
    }
  ];

  const results = [
    {
      company: "B2B SaaS Company",
      metric: "340% increase in AI search traffic",
      description: "Implemented full Neural Command suite and saw dramatic improvements in AI overview appearances and citation frequency.",
      timeframe: "3 months"
    },
    {
      company: "E-commerce Brand",
      metric: "5x higher conversion from AI traffic",
      description: "Optimized for conversational AI queries and saw significantly better conversion rates compared to traditional search traffic.",
      timeframe: "6 months"
    },
    {
      company: "Content Publisher",
      metric: "92% improvement in authority signals",
      description: "Used Authority Signal Monitor to optimize content for AI engines, resulting in more citations and better rankings.",
      timeframe: "4 months"
    }
  ];

  return (
    <AppleSection spacing="large" background="gray">
      <div className="text-center mb-16">
        <AppleHeading level={2} className="mb-6">
          Trusted by Industry Leaders
        </AppleHeading>
        <AppleBody size="large" className="max-w-3xl mx-auto">
          See how companies are dominating AI search with Neural Command&apos;s comprehensive optimization suite.
        </AppleBody>
      </div>

      <div className="mb-20">
        <h3 className="text-2xl font-apple font-bold text-center mb-12">
          What Our Customers Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AppleCard key={index} variant="glass" className="hover-lift">
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-apple-blue/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-apple-blue font-apple font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-apple font-semibold text-apple-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-apple-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-apple-blue">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-apple-gray-700 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            </AppleCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-apple font-bold text-center mb-12">
          Proven Results
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <AppleCard key={index} variant="default">
              <div className="text-center">
                <h4 className="font-apple font-semibold text-apple-gray-900 mb-2">
                  {result.company}
                </h4>
                <div className="text-3xl font-bold text-gradient mb-2">
                  {result.metric}
                </div>
                <p className="text-apple-gray-600 text-sm mb-4">
                  {result.description}
                </p>
                <div className="inline-block bg-apple-blue/10 text-apple-blue text-xs font-semibold px-3 py-1 rounded-full">
                  {result.timeframe}
                </div>
              </div>
            </AppleCard>
          ))}
        </div>
      </div>

      <div className="mt-20 bg-gradient-to-r from-apple-blue to-apple-green rounded-apple-card p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-apple-blue-100">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">4.9/5</div>
            <div className="text-apple-blue-100">User Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">85%</div>
            <div className="text-apple-blue-100">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-apple-blue-100">Support</div>
          </div>
        </div>
      </div>
    </AppleSection>
  );
} 