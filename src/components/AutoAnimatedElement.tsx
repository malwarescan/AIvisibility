"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AutoAnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scale' | 'parallax';
  intensity?: number;
  delay?: number;
  className?: string;
}

export function AutoAnimatedElement({
  children,
  animation = 'fadeIn',
  intensity = 1,
  delay = 0,
  className = ''
}: AutoAnimatedElementProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px" 
  });

  const variants = {
    fadeIn: {
      initial: { opacity: 0, y: 60 * intensity },
      animate: { opacity: 1, y: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 100 * intensity },
      animate: { opacity: 1, y: 0 }
    },
    slideLeft: {
      initial: { opacity: 0, x: 100 * intensity },
      animate: { opacity: 1, x: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    parallax: {
      initial: { y: 0 },
      animate: { y: 0 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants[animation]}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 