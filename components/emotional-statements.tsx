"use client";

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const emotionalStatements = [
  {
    text: "There's someone you haven't talked to in months who thinks about you often.",
    emoji: "💭",
    color: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100"
  },
  {
    text: "You don't need more friends. Just better memory.",
    emoji: "🧠",
    color: "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100"
  },
  {
    text: "This is for the ones you meant to stay close to.",
    emoji: "💫",
    color: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100"
  },
  {
    text: "You don't need a CRM for sales. You need one for your soul.",
    emoji: "✨",
    color: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"
  }
];

export default function EmotionalStatements() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5ed] to-white opacity-70 -z-10"></div>
      <div className="absolute -right-32 top-20 w-64 h-64 rounded-full bg-amber-100 opacity-20 blur-3xl -z-10"></div>
      <div className="absolute -left-32 bottom-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Hard Truths, Gentle Reminders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What's easily forgotten is often what matters most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {emotionalStatements.map((statement, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div 
                className={`${statement.color} rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-center group hover:-translate-y-1 border`}
              >
                <div className="absolute -top-4 -left-2 text-4xl opacity-90 group-hover:scale-110 transition-transform">
                  {statement.emoji}
                </div>
                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                  {statement.text}
                </p>
                <div className="w-16 h-1 bg-gray-200 mt-4 group-hover:w-24 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
