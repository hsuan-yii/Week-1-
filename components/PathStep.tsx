
import React from 'react';
import { ActionStep, Mode } from '../types';

interface PathStepProps {
  step: ActionStep;
  index: number;
  mode: Mode;
}

const PathStep: React.FC<PathStepProps> = ({ step, index, mode }) => {
  const isSurvival = mode === 'survival';
  
  return (
    <div className={`relative flex items-start space-x-4 p-6 rounded-2xl transition-all duration-500 transform
      ${isSurvival 
        ? 'bg-red-900/20 border border-red-500/30 hover:border-red-400' 
        : 'bg-white shadow-sm border border-blue-100 hover:shadow-md'}
    `}>
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-2xl
        ${isSurvival ? 'bg-red-600/20 text-red-500' : 'bg-blue-100 text-blue-600'}
      `}>
        {step.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-bold tracking-wider uppercase ${isSurvival ? 'text-red-400' : 'text-blue-500'}`}>
            Step 0{index + 1}
          </span>
        </div>
        <h3 className={`text-lg font-bold mb-1 ${isSurvival ? 'text-red-100' : 'text-gray-900'}`}>
          {step.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isSurvival ? 'text-red-200/70' : 'text-gray-600'}`}>
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default PathStep;
