import { useState, useCallback } from 'react';

export type StepState<T extends string> = {
  currentStep: T;
  history: T[];
  data: Record<string, any>;
};

/**
 * A simple state machine hook for managing multi-step flows
 * @param steps Array of possible steps
 * @param initialStep The starting step
 * @returns State and methods to control the step machine
 */
export function useStepMachine<T extends string>(
  steps: T[],
  initialStep: T
) {
  const [state, setState] = useState<StepState<T>>({
    currentStep: initialStep,
    history: [initialStep],
    data: {},
  });

  /**
   * Move to the next step in the flow
   * @param nextStep The step to move to (must be in the steps array)
   * @param data Optional data to store with this step
   */
  const next = useCallback((nextStep: T, data: Record<string, any> = {}) => {
    if (!steps.includes(nextStep)) {
      console.error(`Step "${nextStep}" is not defined in the steps array`);
      return;
    }

    setState((prev) => ({
      currentStep: nextStep,
      history: [...prev.history, nextStep],
      data: { ...prev.data, ...data },
    }));
  }, [steps]);

  /**
   * Go back to the previous step
   */
  const back = useCallback(() => {
    setState((prev) => {
      // If there's no history or we're at the first step, do nothing
      if (prev.history.length <= 1) {
        return prev;
      }

      const newHistory = [...prev.history];
      newHistory.pop(); // Remove current step
      const previousStep = newHistory[newHistory.length - 1];

      return {
        currentStep: previousStep,
        history: newHistory,
        data: prev.data,
      };
    });
  }, []);

  /**
   * Reset the step machine to the initial state
   */
  const reset = useCallback(() => {
    setState({
      currentStep: initialStep,
      history: [initialStep],
      data: {},
    });
  }, [initialStep]);

  /**
   * Set data in the state without changing steps
   * @param data Data to merge with existing state data
   */
  const setData = useCallback((data: Record<string, any>) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, ...data },
    }));
  }, []);

  return {
    currentStep: state.currentStep,
    data: state.data,
    history: state.history,
    next,
    back,
    reset,
    setData,
  };
}
