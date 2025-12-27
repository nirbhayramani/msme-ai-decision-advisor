
import React, { useRef, useEffect } from 'react';
import { ArrowRightIcon } from './Icons';

interface InputFormProps {
  businessType: string;
  setBusinessType: (value: string) => void;
  situation: string;
  setSituation: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  businessType,
  setBusinessType,
  situation,
  setSituation,
  goal,
  setGoal,
  onSubmit,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate on each change
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to content height
    }
  }, [situation]); // Rerun this effect whenever the situation text changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-slate-700 mb-1">
          Business Type
        </label>
        <input
          id="businessType"
          type="text"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="e.g., Salon, Kirana Store, Restaurant"
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-shadow text-slate-900 placeholder:text-slate-500"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="situation" className="block text-sm font-medium text-slate-700 mb-1">
          Business Situation or Problem
        </label>
        <textarea
          id="situation"
          ref={textareaRef}
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder="e.g., Fewer customers on weekdays, Low profit margin"
          rows={3}
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-150 ease-in-out text-slate-900 placeholder:text-slate-500 resize-none overflow-hidden"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-slate-700 mb-1">
          Primary Business Goal
        </label>
        <input
          id="goal"
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., Increase bookings, Improve profitability"
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-shadow text-slate-900 placeholder:text-slate-500"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Thinking...' : 'Get Advice'}
        {!isLoading && <ArrowRightIcon className="w-5 h-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />}
      </button>
    </form>
  );
};
