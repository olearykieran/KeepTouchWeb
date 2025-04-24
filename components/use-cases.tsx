"use client";

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock, Users2, Cake, BriefcaseBusiness } from 'lucide-react';

export default function UseCases() {
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

    const cards = document.querySelectorAll('.use-case-card');
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  const useCases = [
    {
      icon: <Cake className="h-6 w-6" />,
      title: "Never miss important dates",
      description: "KeepTouch automatically reminds you of birthdays, anniversaries, and other important milestones."
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Reconnect with old friends",
      description: "Get gentle nudges to reach out to friends you haven't spoken with in a while."
    },
    {
      icon: <BriefcaseBusiness className="h-6 w-6" />,
      title: "Strengthen professional relationships",
      description: "Maintain your network with timely follow-ups after meetings or conferences."
    },
    {
      icon: <CalendarClock className="h-6 w-6" />,
      title: "Schedule quality time",
      description: "Plan regular check-ins with your closest connections to nurture those relationships."
    }
  ];

  return (
    <section id="use-cases" className="py-16 md:py-24 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How people use KeepTouch
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real solutions for your relationship management challenges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCases.map((useCase, index) => (
          <Card 
            key={index} 
            className="use-case-card opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-gray-100 shadow-sm hover:shadow-md"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="p-3 bg-[#f9f6ee] rounded-full inline-flex items-center justify-center shadow-sm flex-shrink-0">
                <div className="text-gray-500">{useCase.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}