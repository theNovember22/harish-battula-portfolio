import React from 'react';
import { motion } from 'framer-motion';
import { AT_A_GLANCE_METRICS } from '../data/profile';

export const ResearchAtAGlance: React.FC = () => {
  return (
    <section
      aria-label="Research at a glance"
      className="border-y border-[#E3E0D6] bg-white/85"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
            Research at a Glance
          </span>
          <span className="font-mono-tech text-[11px] text-[#6B7280]">
            Verified Evidence • Resume &amp; Accepted Proceedings
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {AT_A_GLANCE_METRICS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="flex flex-col justify-between rounded-lg border border-[#EAE7DF] bg-[#FAF9F6] p-3.5 transition-colors hover:border-[#0F766E]/50"
            >
              <div>
                <div className="font-mono-tech text-xl font-semibold tracking-tight text-[#111318] sm:text-2xl">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-[#0F766E]">
                  {item.label}
                </div>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-[#6B7280]">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
