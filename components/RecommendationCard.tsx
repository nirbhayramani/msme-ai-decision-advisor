
import React, { useMemo } from 'react';
import { CheckCircleIcon, AlertTriangleIcon, ZapIcon } from './Icons';

interface RecommendationCardProps {
  recommendation: string;
}

interface ParsedRecommendation {
  decision: string;
  reasons: string[];
  risks: string;
  alternative: string;
}

const parseRecommendation = (text: string): ParsedRecommendation => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  const result: ParsedRecommendation = {
    decision: '',
    reasons: [],
    risks: '',
    alternative: ''
  };

  let currentSection: keyof ParsedRecommendation | null = null;

  for (const line of lines) {
    if (line.startsWith('Recommended Decision:')) {
      currentSection = 'decision';
      result.decision = line.replace('Recommended Decision:', '').trim();
    } else if (line.startsWith('Why This Is Recommended:')) {
      currentSection = 'reasons';
    } else if (line.startsWith('Risks & Trade-offs:')) {
      currentSection = 'risks';
      result.risks = line.replace('Risks & Trade-offs:', '').trim();
    } else if (line.startsWith('Alternative Option:')) {
      currentSection = 'alternative';
      result.alternative = line.replace('Alternative Option:', '').trim();
    } else {
      if (currentSection === 'reasons' && line.trim().startsWith('-')) {
        result.reasons.push(line.trim().substring(1).trim());
      } else if (currentSection === 'risks' && !result.risks) {
         result.risks = line.trim().substring(1).trim();
      }
    }
  }

  return result;
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const parsed = useMemo(() => parseRecommendation(recommendation), [recommendation]);
  
  if (!parsed.decision) {
      return (
          <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Your Recommendation</h2>
              <p className="text-slate-600 whitespace-pre-wrap">{recommendation}</p>
          </div>
      );
  }

  return (
    <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 animate-fade-in">
      <div className="mb-6 pb-6 border-b border-slate-200">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">Recommended Decision</h2>
        <p className="text-xl md:text-2xl font-bold text-slate-900">{parsed.decision}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            Why This Is Recommended
          </h3>
          <ul className="space-y-2 pl-1">
            {parsed.reasons.map((reason, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">&#10003;</span>
                <span className="text-slate-600">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
              <AlertTriangleIcon className="w-6 h-6 text-amber-500" />
              Risks & Trade-offs
            </h3>
            <div className="flex items-start">
              <span className="text-amber-500 mr-2 mt-1">&#9656;</span>
              <p className="text-slate-600">{parsed.risks}</p>
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
              <ZapIcon className="w-6 h-6 text-purple-500" />
              Alternative Option
            </h3>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2 mt-1">&#9656;</span>
              <p className="text-slate-600">{parsed.alternative}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
