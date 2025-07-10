import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { clsx } from 'clsx';
import { useLocalStorageState } from '../lib/useLocalStorageState';
import { useStepMachine } from '../lib/useStepMachine';
import { getPlan } from '../lib/api';
import Chip from './ui/Chip';
import PrimaryButton from './ui/PrimaryButton';
import { sendLead } from '../app/actions/sendLead';

// Define the types of steps in our widget
type WidgetStep = 'name' | 'blocker' | 'plan';

// Blockers for the user to choose from
const BLOCKERS = [
  'No time',
  'Too busy',
  'Not sure where to start',
  'Feeling overwhelmed',
  'Need motivation',
  'Family commitments',
  'Work pressure',
];

// Sample plan text to show before the real plan loads
const SAMPLE_PLAN = `Here's a personalized reconnection plan based on your situation:

1. Start with just 5 minutes daily of focused activity
2. Break down overwhelming tasks into smaller steps
3. Create a simple daily routine that includes small wins
4. Use accountability partners or groups to stay motivated
5. Track your progress and celebrate small achievements

This plan is designed to help you overcome your specific challenges and build momentum gradually.`;

// Export interface for the widget ref
export interface ReconnectWidgetRef {
  open: () => void;
  close: () => void;
}

/**
 * A slide-in widget that guides users through a reconnection process
 * Mobile: bottom sheet, Desktop: slide-in from right
 * Includes a tab that sticks out from the side of the screen
 */
const ReconnectWidget = forwardRef<ReconnectWidgetRef>((props, ref) => {
  // State for dialog visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // State for loading plan
  const [isLoading, setIsLoading] = useState(false);
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for tab animation
  const [isTabVisible, setIsTabVisible] = useState(false);
  
  // Email input ref
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  // LocalStorage state for widget
  const [widgetState, setWidgetState] = useLocalStorageState('kt_widget_state', {
    name: '',
    blocker: '',
    plan: '',
    completedSteps: [] as string[],
  });
  
  // Step machine to control the widget flow
  const stepMachine = useStepMachine<WidgetStep>(
    ['name', 'blocker', 'plan'],
    widgetState.completedSteps.includes('name') ? 
      widgetState.completedSteps.includes('blocker') ? 
        'plan' : 'blocker' : 'name'
  );

  // Generate or get plan
  const [plan, setPlan] = useState(widgetState.plan || SAMPLE_PLAN);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));
  
  // Show tab with animation after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTabVisible(true);
    }, 1500); // Wait 1.5 seconds before showing the tab
    
    return () => clearTimeout(timer);
  }, []);

  /**
   * Handle name submission
   */
  const handleNameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    
    if (!name || name.trim() === '') return;
    
    setWidgetState(prev => ({
      ...prev,
      name,
      completedSteps: [...prev.completedSteps.filter(s => s !== 'name'), 'name'],
    }));
    
    stepMachine.next('blocker', { name });
  };

  /**
   * Handle blocker selection
   */
  const handleBlockerSelect = async (blocker: string) => {
    setWidgetState(prev => ({
      ...prev,
      blocker,
      completedSteps: [...prev.completedSteps.filter(s => s !== 'blocker'), 'blocker'],
    }));
    
    // Start loading the plan
    setIsLoading(true);
    
    try {
      const planText = await getPlan(widgetState.name, blocker);
      setPlan(planText || SAMPLE_PLAN);
      setWidgetState(prev => ({
        ...prev,
        plan: planText || SAMPLE_PLAN,
      }));
    } catch (error) {
      console.error('Failed to get plan:', error);
      setPlan(SAMPLE_PLAN);
    } finally {
      setIsLoading(false);
    }
    
    stepMachine.next('plan', { blocker });
  };

  /**
   * Handle email submission
   */
  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    
    if (!email || email.trim() === '') return;
    
    setIsSubmitting(true);
    
    try {
      const result = await sendLead(
        email,
        widgetState.name || null,
        widgetState.blocker || null,
        plan || null
      );
      
      if (result.success) {
        // Clear storage and reset widget
        setWidgetState({
          name: '',
          blocker: '',
          plan: '',
          completedSteps: [],
        });
        
        // Close the widget after successful submission
        setTimeout(() => {
          setIsOpen(false);
          stepMachine.reset();
        }, 1500);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Failed to submit email:', error);
      alert('Sorry, we couldn\'t process your submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Render the current step based on the step machine state
   */
  const renderStep = () => {
    switch (stepMachine.currentStep) {
      case 'name':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">What's your name?</h2>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                defaultValue={widgetState.name}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <PrimaryButton type="submit" fullWidth>
                Next
              </PrimaryButton>
            </form>
          </div>
        );
        
      case 'blocker':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Hi {widgetState.name}, what's blocking you?</h2>
            <p className="text-gray-600">Select one that best describes your situation:</p>
            <div className="flex flex-wrap gap-2">
              {BLOCKERS.map(blocker => (
                <Chip
                  key={blocker}
                  label={blocker}
                  selected={widgetState.blocker === blocker}
                  onClick={() => handleBlockerSelect(blocker)}
                />
              ))}
            </div>
            
            {/* Back button */}
            <button
              onClick={stepMachine.back}
              className="text-gray-600 hover:text-gray-800 text-sm mt-4 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to previous step
            </button>
          </div>
        );
        
      case 'plan':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Your personalized plan</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Creating your personalized plan...</p>
              </div>
            ) : (
              <>
                <div className="relative">
                  {/* Blurred plan */}
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="whitespace-pre-line">{plan}</p>
                    </div>
                    
                    {/* Blur overlay */}
                    <div className="absolute inset-0 blur-overlay flex items-center justify-center">
                      <div className="text-center p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Enter your email to view your plan</h3>
                        <p className="text-sm text-gray-600 mb-4">We'll send you the full plan and helpful resources</p>
                        
                        <form onSubmit={handleEmailSubmit} className="space-y-3">
                          <input
                            ref={emailInputRef}
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <PrimaryButton
                            type="submit"
                            fullWidth
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Sending...' : 'Send me the plan'}
                          </PrimaryButton>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Back button */}
                <button
                  onClick={stepMachine.back}
                  className="text-gray-600 hover:text-gray-800 text-sm mt-4 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to previous step
                </button>
              </>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tab that sticks out from the side of the screen */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed right-0 top-1/2 transform -translate-y-1/2 z-40",
          "bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-l-lg shadow-lg",
          "writing-mode-vertical-rl rotate-180",
          "transition-all duration-500",
          "flex items-center justify-center",
          isTabVisible ? "translate-x-0" : "translate-x-full",
          "animate-wiggle"
        )}
        style={{ 
          writingMode: 'vertical-rl',
          transform: isTabVisible 
            ? 'translateY(-50%) rotate(180deg)' 
            : 'translateY(-50%) translateX(100%) rotate(180deg)'
        }}
      >
        <span className="font-medium">Need help?</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center lg:items-end lg:justify-end">
          <Dialog.Panel className={clsx(
            "flex flex-col bg-white rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none",
            "shadow-xl transform transition-all w-full lg:w-96 lg:h-full",
            "max-h-[80vh] lg:max-h-screen overflow-hidden"
          )}>
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <Dialog.Title className="text-lg font-semibold">
                Reconnect
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {renderStep()}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      
      {/* Add keyframes animation for wiggle effect */}
      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: translateY(-50%) rotate(180deg); }
          25% { transform: translateY(-50%) rotate(178deg); }
          75% { transform: translateY(-50%) rotate(182deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        
        /* Make blur effect less intense so text is slightly visible */
        .blur-overlay {
          backdrop-filter: blur(6px);
        }
      `}</style>
    </>
  );
});

ReconnectWidget.displayName = 'ReconnectWidget';

export default ReconnectWidget;
