"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { MessageSquareText } from "lucide-react";
import LogoImage from "../assets/images/icon.png";
import { saveEmail } from "@/lib/supabase";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const result = await saveEmail(email);

      if (result.success) {
        setEmail("");
        toast({
          title: "Thanks for joining!",
          description: "We'll be in touch about the beta soon.",
        });
      } else {
        throw new Error("Failed to save email");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 md:py-28 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 p-3 bg-[#f9f6ee] rounded-full inline-flex items-center justify-center shadow-sm">
          {/* Replace message icon with logo */}
          <Image
            src={LogoImage}
            alt="KeepTouch Logo"
            width={100}
            height={100}
            className="h-40 w-40"
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800 mb-4 max-w-4xl">
          Never lose touch with the people who matter
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          KeepTouch is your AI relationship assistant that helps you nurture your personal
          and professional connections.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white border-gray-300 h-12 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="h-12 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining..." : "Join the Beta"}
          </Button>
        </form>
      </div>

      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 md:h-96 bg-gradient-to-b from-[#f8f5ed] via-[#f0ece0] to-[#f8f5ed] rounded-full blur-3xl opacity-70"></div>
    </section>
  );
}
