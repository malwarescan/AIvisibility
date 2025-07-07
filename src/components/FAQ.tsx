import { AppleSection } from './apple/AppleSection';
import { AppleHeading, AppleBody } from './apple/AppleTypography';
import { AppleCard } from './apple/AppleCard';

export function FAQ() {
  const faqs = [
    {
      question: "What is AI search optimization and why is it different from traditional SEO?",
      answer: "AI search optimization focuses on how AI engines like ChatGPT, Claude, and Gemini discover, process, and rank content. Unlike traditional SEO that optimizes for Google's algorithm, AI search optimization targets conversational queries, citation authority, and knowledge graph connections that AI engines prioritize."
    },
    {
      question: "How does Neural Command help me dominate AI overviews?",
      answer: "Neural Command's AgentRank Simulator and CitationFlow Optimizer specifically target the factors that determine whether your content appears in AI overviews. We optimize for citation authority, source credibility, and content depth that AI engines use to select overview sources."
    },
    {
      question: "What makes your AI search analytics different from traditional SEO tools?",
      answer: "Our AI Search Analytics Dashboard tracks 15+ AI-specific metrics including citation frequency, AI click-through rates, authority signal strength, and conversational query performance. Traditional tools only track Google metrics that don't matter to AI engines."
    },
    {
      question: "How quickly can I see results with Neural Command?",
      answer: "85% of users see improved AI search rankings within 30 days. Our tools provide immediate insights into AI search performance and actionable recommendations for optimization."
    },
    {
      question: "Do I need to abandon my current SEO strategy?",
      answer: "No. Neural Command complements your existing SEO strategy by adding AI search optimization. While traditional SEO targets Google, our tools ensure you're also optimized for the growing AI search ecosystem."
    },
    {
      question: "What is the AgentRank algorithm and how does it work?",
      answer: "AgentRank is our proprietary algorithm that simulates how AI search engines evaluate and rank content. It analyzes citation patterns, authority signals, content depth, and conversational relevance to predict AI search rankings."
    },
    {
      question: "How does the CitationFlow Optimizer improve my AI search visibility?",
      answer: "The CitationFlow Optimizer ensures your content is structured and optimized for AI citation. It improves your authority signals, source credibility markers, and knowledge graph connections that AI engines use when selecting sources."
    },
    {
      question: "What technical requirements do AI engines have that traditional SEO misses?",
      answer: "AI engines prioritize structured data, semantic markup, content depth, and knowledge graph connections. Our Technical AI-Readiness Auditor identifies 40% more technical issues than traditional audits by focusing on AI-specific requirements."
    },
    {
      question: "How does QueryMind predict AI search queries?",
      answer: "QueryMind uses machine learning to analyze conversational patterns and predict how users will phrase questions to AI engines. It helps you optimize for the natural language queries that AI search engines process."
    },
    {
      question: "What authority signals do AI engines look for?",
      answer: "AI engines prioritize expertise indicators, source credibility, citation frequency, content depth, and knowledge graph authority. Our Authority Signal Monitor tracks and optimizes these specific signals that traditional SEO tools ignore."
    },
    {
      question: "How does AgentConnect create better content connections?",
      answer: "AgentConnect builds intelligent knowledge graphs that help AI engines understand the relationships between your content pieces. It creates 5x more content connections than competitors by optimizing for AI knowledge graph requirements."
    },
    {
      question: "Is Neural Command suitable for all industries?",
      answer: "Yes. While some industries may see faster results, our tools are designed for any business that wants to be found in AI search. We have specialized optimizations for B2B, e-commerce, SaaS, and content publishers."
    },
    {
      question: "How do you measure AI search success?",
      answer: "We track AI-specific metrics including citation frequency in AI responses, AI overview appearances, conversational query rankings, and authority signal strength. These metrics are fundamentally different from traditional SEO KPIs."
    },
    {
      question: "What's the difference between AI search and traditional search optimization?",
      answer: "Traditional search optimizes for keyword rankings and click-through rates. AI search optimization focuses on citation authority, content depth, knowledge graph connections, and conversational relevance that AI engines prioritize."
    },
    {
      question: "How do I get started with Neural Command?",
      answer: "Start with our free trial to run an AI readiness audit and see your current AI search performance. Our onboarding process includes AI search strategy consultation and tool-specific training to maximize your results."
    }
  ];

  return (
    <AppleSection spacing="large" background="gray">
      <div className="text-center mb-16">
        <AppleHeading level={2} className="mb-6">
          Frequently Asked Questions About AI Search Optimization
        </AppleHeading>
        <AppleBody size="large" className="max-w-3xl mx-auto">
          Everything you need to know about dominating AI search and optimizing for the agentic era.
        </AppleBody>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <AppleCard key={index} variant="default">
              <div className="space-y-4">
                <h3 className="font-apple font-semibold text-lg text-apple-gray-900">
                  {faq.question}
                </h3>
                <p className="text-apple-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </AppleCard>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <AppleBody size="large" className="mb-6">
          Still have questions about AI search optimization?
        </AppleBody>
        <button className="
          px-8 py-4 bg-apple-blue text-white font-semibold 
          rounded-apple-lg transition-all duration-300 
          hover:shadow-apple-lg hover:-translate-y-1
        ">
          Contact Our AI Search Experts
        </button>
      </div>
    </AppleSection>
  );
} 