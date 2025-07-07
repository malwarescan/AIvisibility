"use client";

import { motion } from 'framer-motion';

export function TestAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-8 bg-blue-500 text-white rounded-lg text-center"
    >
      Test Animation - If you see this animate, Framer Motion is working!
    </motion.div>
  );
} 