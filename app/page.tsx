import Hero from '@/components/hero';
import Features from '@/components/features';
import FeedbackForm from '@/components/feedback-form';
import UseCases from '@/components/use-cases';
import Footer from '@/components/footer';
import EmotionalStatements from '@/components/emotional-statements';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f5ed]">
      <Hero />
      <Features />
      <EmotionalStatements />
      <FeedbackForm />
      <UseCases />
      <Footer />
    </div>
  );
}