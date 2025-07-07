"use client";

import { motion } from 'framer-motion';
import { AppleHeading, AppleBody } from './apple/AppleTypography';
import { AppleAnimatedSection } from './apple/AppleAnimatedSection';
import { AppleAnimatedElement } from './apple/AppleAnimatedElement';

const features = [
  {
    title: "AgentRank Simulator",
    description: "Real-time AI agent simulation across 20+ platforms. See exactly how ChatGPT, Claude, and Perplexity will interpret your content.",
    metric: "94% prediction accuracy",
    metricColor: "text-apple-green"
  },
  {
    title: "Neural Command Center",
    description: "Centralized dashboard for monitoring AI search performance across all major platforms with real-time alerts and optimization suggestions.",
    metric: "3x faster optimization",
    metricColor: "text-apple-blue"
  },
  {
    title: "Agentic SEO Intelligence",
    description: "Advanced analytics that reveal how AI agents discover, process, and rank your content in the new search landscape.",
    metric: "85% better AI visibility",
    metricColor: "text-apple-green"
  }
];

export function FeatureShowcase() {
  return (
    <AppleAnimatedSection className="py-32 bg-white" staggerChildren={0.2}>
      <div className="max-w-6xl mx-auto px-8">
        <AppleAnimatedElement delay={0}>
          <div className="text-center mb-20">
            <AppleHeading level={2} className="mb-6">
              Built for the Agentic Era
            </AppleHeading>
            <AppleBody size="large" className="max-w-3xl mx-auto">
              Master the new search landscape where AI agents, not algorithms, determine your visibility.
            </AppleBody>
          </div>
        </AppleAnimatedElement>

        <div className="grid lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <AppleAnimatedElement key={index} delay={index * 0.2}>
              <motion.div
                className="bg-white rounded-apple-card p-8 shadow-apple border border-apple-gray-200"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-apple-blue rounded-apple-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  
                  <div>
                    <AppleHeading level={3} className="mb-4">
                      {feature.title}
                    </AppleHeading>
                    <AppleBody className="text-apple-gray-800 mb-6">
                      {feature.description}
                    </AppleBody>
                  </div>
                  
                  <div className={`${feature.metricColor} font-apple font-semibold text-lg`}>
                    {feature.metric}
                  </div>
                </div>
              </motion.div>
            </AppleAnimatedElement>
          ))}
        </div>

        <AppleAnimatedElement delay={0.8}>
          <div className="mt-20 text-center">
            <motion.div
              className="inline-block bg-gradient-to-r from-apple-blue to-apple-green rounded-apple-lg p-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-white rounded-apple-lg px-8 py-4">
                <AppleBody size="large" className="font-semibold text-apple-gray-800">
                  Ready to dominate AI search?
                </AppleBody>
              </div>
            </motion.div>
          </div>
        </AppleAnimatedElement>
      </div>
    </AppleAnimatedSection>
  );
} 