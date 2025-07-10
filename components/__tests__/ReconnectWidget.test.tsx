import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReconnectWidget, { ReconnectWidgetRef } from '../ReconnectWidget';

// Mock the API module
vi.mock('../../lib/api', () => ({
  getPlan: vi.fn().mockResolvedValue('This is a mocked personalized plan for the user.'),
  sendLead: vi.fn().mockResolvedValue(true),
}));

// Mock the server action
vi.mock('../../app/actions/sendLead', () => ({
  sendLead: vi.fn().mockResolvedValue({
    success: true,
    message: 'Lead submitted successfully!'
  }),
}));

describe('ReconnectWidget', () => {
  let widgetRef: React.RefObject<ReconnectWidgetRef>;
  
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    
    // Create a new ref for each test
    widgetRef = React.createRef<ReconnectWidgetRef>();
  });
  
  it('should render and open when triggered by ref', async () => {
    // Render the component with the ref
    render(<ReconnectWidget ref={widgetRef} />);
    
    // Initially, widget should not be visible
    expect(screen.queryByText('Reconnect')).not.toBeInTheDocument();
    
    // Open the widget using the ref
    widgetRef.current?.open();
    
    // Now the widget should be visible
    await waitFor(() => {
      expect(screen.getByText('Reconnect')).toBeInTheDocument();
    });
  });
  
  it('should navigate through steps properly', async () => {
    const user = userEvent.setup();
    
    // Render and open the widget
    render(<ReconnectWidget ref={widgetRef} />);
    widgetRef.current?.open();
    
    // First step: Enter name
    await waitFor(() => {
      expect(screen.getByText('What\'s your name?')).toBeInTheDocument();
    });
    
    const nameInput = screen.getByPlaceholderText('Enter your name');
    await user.type(nameInput, 'John Doe');
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);
    
    // Second step: Select a blocker
    await waitFor(() => {
      expect(screen.getByText('Hi John Doe, what\'s blocking you?')).toBeInTheDocument();
    });
    
    const blocker = screen.getByText('No time');
    await user.click(blocker);
    
    // Third step: Plan with email gate
    await waitFor(() => {
      expect(screen.getByText('Your personalized plan')).toBeInTheDocument();
      expect(screen.getByText('Enter your email to view your plan')).toBeInTheDocument();
    });
    
    // Verify the plan is blurred/hidden behind the email gate
    const blurOverlay = document.querySelector('.blur-overlay');
    expect(blurOverlay).toBeInTheDocument();
  });
  
  it('should submit email and reveal plan', async () => {
    const user = userEvent.setup();
    
    // Render and setup widget to be at the email form step
    render(<ReconnectWidget ref={widgetRef} />);
    
    // Set localStorage to simulate having gone through the previous steps
    window.localStorage.setItem('kt_widget_state', JSON.stringify({
      name: 'John Doe',
      blocker: 'No time',
      plan: 'This is a mocked personalized plan for the user.',
      completedSteps: ['name', 'blocker'],
    }));
    
    widgetRef.current?.open();
    
    // We should be at the plan step with email gate
    await waitFor(() => {
      expect(screen.getByText('Your personalized plan')).toBeInTheDocument();
      expect(screen.getByText('Enter your email to view your plan')).toBeInTheDocument();
    });
    
    // Enter email and submit
    const emailInput = screen.getByPlaceholderText('Your email address');
    await user.type(emailInput, 'john@example.com');
    
    const submitButton = screen.getByRole('button', { name: 'Send me the plan' });
    await user.click(submitButton);
    
    // Check that the sendLead function was called correctly
    const { sendLead } = await import('../../app/actions/sendLead');
    await waitFor(() => {
      expect(sendLead).toHaveBeenCalledWith(
        'john@example.com',
        'John Doe',
        'No time',
        'This is a mocked personalized plan for the user.'
      );
    });
    
    // Button should show submitting state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });
  });
});
