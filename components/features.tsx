"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, BellRing, Sparkles } from 'lucide-react';

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const features = document.querySelectorAll('.feature-card');
    features.forEach((feature) => {
      observer.observe(feature);
    });

    return () => {
      features.forEach((feature) => {
        observer.unobserve(feature);
      });
    };
  }, []);

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Contact Management",
      description: "Organize your relationships in one place with smart reminders for follow-ups."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Important Dates",
      description: "Never miss a birthday or anniversary with automatic reminders for special occasions."
    },
    {
      icon: <BellRing className="h-6 w-6" />,
      title: "Intelligent Reminders",
      description: "Get personalized suggestions on when to reach out based on your communication patterns."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Conversation Insights",
      description: "Helpful context and previous topics to make every conversation more meaningful."
    }
  ];

  return (
    <section ref={featuresRef} id="features" className="py-16 md:py-24 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How KeepTouch works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your relationships matter. KeepTouch helps you nurture them effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="feature-card opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100 bg-[#f9f6ee] border-none shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-white rounded-full inline-flex items-center justify-center shadow-sm">
                <div className="text-gray-500">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}