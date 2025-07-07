"use client";

import { motion } from 'framer-motion';
import { useAppleScrollTrigger } from '../../hooks/useAppleScrollTrigger';

interface AppleAnimatedSectionProps {
  children: React.ReactNode;
  staggerChildren?: number;
  className?: string;
  threshold?: number;
  delay?: number;
}

export function AppleAnimatedSection({ 
  children, 
  staggerChildren = 0.1,
  className = '',
  threshold = 0.3,
  delay = 0
}: AppleAnimatedSectionProps) {
  const { ref, controls } = useAppleScrollTrigger(threshold, delay);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      className={className}
    >
      <motion.div
        variants={{
          animate: {
            transition: {
              staggerChildren,
              delayChildren: 0.2
            }
          }
        }}
        initial="initial"
        animate={controls}
      >
        {children}
      </motion.div>
    </motion.section>
  );
} 