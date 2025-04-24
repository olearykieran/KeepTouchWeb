"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

// Define the headline data with title and subtitle pairs
const headlines = [
  {
    title: "People drift. You don't have to.",
    subtitle:
      "The AI that keeps your relationships close — even when life pulls you away.",
  },
  {
    title: "Grandma won't be around forever.",
    subtitle: "Neither will that investor, that friend, that crush. Stay connected.",
  },
  {
    title: "That deal WILL walk if you ghost again.",
    subtitle: "Let AI remember who matters — and when to reach out.",
  },
  {
    title: "You remember everyone's birthday. Except the ones that matter most.",
    subtitle: "Not anymore.",
  },
  {
    title: "You have 942 followers and forgot to text your dad back.",
    subtitle: "This fixes that.",
  },
];

export default function RotatingHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to cycle to the next headline with smoother animation
  const nextHeadline = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    setDirection("up");
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % headlines.length);
      setIsAnimating(false);
    }, 800); // Slower animation duration for smoother transition
  };

  // Function to cycle to the previous headline with smoother animation
  const prevHeadline = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    setDirection("down");
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + headlines.length) % headlines.length);
      setIsAnimating(false);
    }, 800); // Slower animation duration for smoother transition
  };

  // Auto-rotate headlines every 6 seconds (balanced rotation speed)
  useEffect(() => {
    const interval = setInterval(() => {
      nextHeadline();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative h-48 md:h-56 flex items-center justify-center overflow-hidden px-4 text-center">
        {/* Navigation arrows - positioned farther apart and styled better */}
        <button
          onClick={prevHeadline}
          className="absolute left-0 md:-left-12 top-1/3 z-10 hover:scale-110 transition-transform rounded-full bg-gray-100 bg-opacity-80 p-2 shadow-sm"
          aria-label="Previous headline"
          disabled={isAnimating}
        >
          <ChevronUp className="h-6 w-6 text-gray-700" />
        </button>

        {/* Headline container */}
        <div ref={containerRef} className="relative w-full">
          <div
            className={`transition-all duration-800 ease-in-out ${
              isAnimating
                ? direction === "up"
                  ? "transform -translate-y-16 opacity-0"
                  : "transform translate-y-16 opacity-0"
                : "transform translate-y-0 opacity-100"
            }`}
            style={{ transitionDuration: "800ms" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {headlines[activeIndex].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              {headlines[activeIndex].subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={nextHeadline}
          className="absolute right-0 md:-right-12 bottom-1/3 z-10 hover:scale-110 transition-transform rounded-full bg-gray-100 bg-opacity-80 p-2 shadow-sm"
          aria-label="Next headline"
          disabled={isAnimating}
        >
          <ChevronDown className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Dot navigation - slightly larger with more spacing */}
      <div className="flex justify-center space-x-3 mt-4">
        {headlines.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setDirection(index > activeIndex ? "up" : "down");
              setIsAnimating(true);
              setTimeout(() => {
                setActiveIndex(index);
                setIsAnimating(false);
              }, 800);
            }}
            className={`h-3 w-3 rounded-full transition-all hover:scale-125 ${
              index === activeIndex ? "bg-gray-800 scale-110" : "bg-gray-300"
            }`}
            aria-label={`Go to headline ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}
