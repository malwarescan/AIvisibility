"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AppleSection } from './apple/AppleSection';
import { AppleHeading, AppleBody } from './apple/AppleTypography';
import { AppleAnimatedElement } from './apple/AppleAnimatedElement';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Apple-style parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
    >
      <AppleSection spacing="xl" background="gray">
        <div className="text-center space-y-8">
          <AppleAnimatedElement delay={0.2}>
            <AppleHeading level={1} className="max-w-4xl mx-auto">
              The First AI Search Intelligence Platform Built for the{" "}
              <span className="text-apple-blue">
                Agentic Era
              </span>
            </AppleHeading>
          </AppleAnimatedElement>

          <AppleAnimatedElement delay={0.4}>
            <AppleBody size="large" className="max-w-2xl mx-auto mb-12">
              Dominate AI Search Before Your Competitors Know It Exists. 
              Master ChatGPT, Perplexity, and Google AI Overviews with neural intelligence.
            </AppleBody>
          </AppleAnimatedElement>

          <AppleAnimatedElement delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="
                  bg-blue-500 text-white px-8 py-4 rounded-apple-lg
                  font-apple font-medium text-lg
                  hover:bg-blue-600 transition-all duration-200
                  shadow-apple hover:shadow-apple-lg
                  transform hover:-translate-y-0.5
                "
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Trial
              </motion.button>
              
              <motion.button 
                className="
                  bg-white text-apple-blue border border-apple-blue
                  px-8 py-4 rounded-apple-lg
                  font-apple font-medium text-lg
                  hover:bg-apple-blue hover:text-white transition-all duration-200
                  shadow-apple hover:shadow-apple-lg
                "
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                Watch Demo
              </motion.button>
            </div>
          </AppleAnimatedElement>

          <AppleAnimatedElement delay={0.8}>
            <div className="pt-16 space-y-6">
              <p className="text-apple-gray-500 font-apple text-sm tracking-wide uppercase">
                Trusted by Forward-Thinking SEO Teams
              </p>
              <div className="flex justify-center items-center space-x-12 opacity-60">
                <div className="text-apple-gray-400 font-apple text-sm">TechFlow Solutions</div>
                <div className="text-apple-gray-400 font-apple text-sm">E-commerce Giant</div>
                <div className="text-apple-gray-400 font-apple text-sm">B2B SaaS Platform</div>
              </div>
            </div>
          </AppleAnimatedElement>
        </div>
      </AppleSection>
    </motion.div>
  );
} 