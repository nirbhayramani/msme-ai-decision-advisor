
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { RecommendationCard } from './components/RecommendationCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getBusinessAdvice } from './services/geminiService';
import { InfoIcon, LightbulbIcon } from './components/Icons';

const App: React.FC = () => {
  const [businessType, setBusinessType] = useState('');
  const [situation, setSituation] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!businessType || !situation || !goal) {
      setError('Please fill out all fields to get advice.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setRecommendation(null);

    try {
      const advice = await getBusinessAdvice(businessType, situation, goal);
      setRecommendation(advice);
    } catch (e) {
      setError('Sorry, something went wrong. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExample = () => {
    setBusinessType('Cafe');
    setSituation('Weekdays mein café almost khaali rehta hai. Weekend pe rush hota hai. Discount dena chahiye ya kuch aur try karna chahiye?');
    setGoal('Increase weekday footfall');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-600 mb-6 text-center">
            Describe your business challenge. Our AI advisor will give you a clear recommendation to help you decide your next step.
          </p>
          <InputForm
            businessType={businessType}
            setBusinessType={setBusinessType}
            situation={situation}
            setSituation={setSituation}
            goal={goal}
            setGoal={setGoal}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
           <div className="text-center mt-4">
              <button
                onClick={handleExample}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center justify-center gap-1 mx-auto"
              >
                <LightbulbIcon className="w-4 h-4" />
                <span>Use an example</span>
              </button>
            </div>
        </div>

        {error && (
          <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex flex-col items-center justify-center text-slate-600">
            <LoadingSpinner />
            <p className="mt-4 text-lg">Analyzing your situation...</p>
            <p className="text-sm text-slate-500">This may take a moment.</p>
          </div>
        )}
        
        {recommendation && !isLoading && (
            <RecommendationCard recommendation={recommendation} />
        )}
        
        {!recommendation && !isLoading && !error && (
            <div className="mt-8 text-center bg-blue-50 border-2 border-dashed border-blue-200 p-8 rounded-2xl">
                <InfoIcon className="w-12 h-12 mx-auto text-blue-400" />
                <h2 className="mt-4 text-xl font-semibold text-slate-700">Your Recommendation Will Appear Here</h2>
                <p className="mt-2 text-slate-500 max-w-md mx-auto">Fill in the details above and click "Get Advice" to receive your personalized business strategy.</p>
            </div>
        )}
      </main>
      <footer className="text-center p-4 text-xs text-slate-400">
        <p>This is an AI-powered tool. Information provided is for guidance only and not professional financial or legal advice.</p>
      </footer>
    </div>
  );
};

export default App;
