"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { saveFeedback } from '@/lib/supabase';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) return;
    
    setIsSubmitting(true);
    
    try {
      // Use the saveFeedback function from Supabase client
      const result = await saveFeedback(feedback, email || undefined);
      
      if (result.success) {
        setFeedback('');
        setEmail('');
        toast({
          title: "Feedback received!",
          description: "Thank you for sharing your thoughts with us.",
        });
      } else {
        throw new Error('Failed to save feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
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
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#f0ece0] rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            We'd love to hear from you
          </h2>
          <p className="text-gray-600">
            What's the hardest part about staying in touch with people?
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts..."
            className="w-full min-h-32 bg-white border-gray-300 rounded-xl resize-none"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Your email (optional)"
            className="bg-white border-gray-300 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button 
            type="submit" 
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-xl transition-transform duration-200 hover:scale-[1.02]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </div>
    </section>
  );
}