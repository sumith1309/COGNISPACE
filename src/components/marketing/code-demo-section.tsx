'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTypewriter } from '@/hooks/use-typewriter';

type CodeLanguage = 'Python' | 'JavaScript' | 'cURL';

const codeExamples: Record<CodeLanguage, string> = {
  Python: `import cognispace

client = cognispace.Client(api_key="cog_live_...")

response = client.inference.create(
    model="cogni-4-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing simply."}
    ],
    stream=True
)

for chunk in response:
    print(chunk.content, end="")`,
  JavaScript: `import Cognispace from '@cognispace/sdk';

const client = new Cognispace({ apiKey: 'cog_live_...' });

const stream = await client.inference.create({
  model: 'cogni-4-turbo',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain quantum computing simply.' }
  ],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}`,
  cURL: `curl https://api.cognispace.com/v1/inference \\
  -H "Authorization: Bearer cog_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "cogni-4-turbo",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain quantum computing simply."}
    ],
    "stream": true
  }'`,
};

const responseText = `Quantum computing uses quantum bits (qubits) instead of classical bits. While a classical bit is either 0 or 1, a qubit can be both simultaneously — a property called superposition. This allows quantum computers to process vast amounts of possibilities at once, making them incredibly powerful for specific types of problems like cryptography, drug discovery, and optimization...`;

export function CodeDemoSection() {
  const [activeTab, setActiveTab] = useState<CodeLanguage>('Python');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  const { displayedText, start } = useTypewriter({
    text: responseText,
    speed: 20,
    startOnMount: false,
  });

  useEffect(() => {
    if (isInView) {
      // Start typewriter when section comes into view
      const timeout = setTimeout(() => start(), 800);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isInView, start]);

  const features = [
    'Type-safe SDKs for Python, JavaScript, and Go',
    'Streaming responses with Server-Sent Events',
    'Built-in retry logic and error handling',
  ];

  return (
    <section className="bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col justify-center"
          >
            <span className="text-brand-500 inline-block w-fit rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
              Developer Experience
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl dark:text-white">
              Ship your first AI feature in under 5 minutes
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Our SDKs are designed with developer experience in mind. Get started instantly with
              minimal configuration, type-safe APIs, and comprehensive error handling.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Check className="text-brand-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href={'/docs' as '/'}
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 mt-8 inline-flex w-fit items-center text-sm font-medium transition-colors"
            >
              Read the docs →
            </Link>
          </motion.div>

          {/* Right: Code Editor Mockup */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Code Window */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
              {/* Window Header */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>
                <div className="ml-2 flex gap-2">
                  {(['Python', 'JavaScript', 'cURL'] as CodeLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang)}
                      className={cn(
                        'rounded px-3 py-1 text-xs font-medium transition-colors',
                        activeTab === lang
                          ? 'bg-white text-slate-900 dark:bg-slate-950 dark:text-white'
                          : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4">
                <pre className="overflow-x-auto text-sm">
                  <code className="text-slate-800 dark:text-slate-200">
                    {codeExamples[activeTab]}
                  </code>
                </pre>
              </div>
            </div>

            {/* Response Panel */}
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Response
                </span>
              </div>
              <p className="font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {displayedText}
                {displayedText && displayedText.length < responseText.length && (
                  <span className="bg-brand-500 inline-block h-4 w-1.5 animate-pulse" />
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
