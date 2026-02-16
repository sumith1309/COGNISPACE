'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeadlineProps {
  text: string;
  highlightWords?: string[]; // Words to apply gradient effect
}

export function AnimatedHeadline({ text, highlightWords = [] }: AnimatedHeadlineProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-7xl dark:text-white"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        const isHighlight = highlightWords.includes(word.replace(/[,.]/, ''));
        return (
          <motion.span
            key={`${word}-${index}`}
            variants={child}
            className={isHighlight ? 'gradient-text inline-block' : 'inline-block'}
          >
            {word}
            {index < words.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
