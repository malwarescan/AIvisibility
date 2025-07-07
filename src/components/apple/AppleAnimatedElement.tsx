"use client";

import { motion, Variants } from 'framer-motion';

const appleVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] // Apple's signature easing
    }
  }
};

interface AppleAnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
}

export function AppleAnimatedElement({ 
  children, 
  delay = 0,
  className = '',
  variants = appleVariants
}: AppleAnimatedElementProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 