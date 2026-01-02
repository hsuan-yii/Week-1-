
import React, { useState, useEffect, useCallback } from 'react';
import { Mode, SCENARIOS, MindsetResponse } from './types';
import { generateMindsetAnalysis } from './services/geminiService';
import PathStep from './components/PathStep';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('creative');
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [analysis, setAnalysis] = useState<MindsetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customScenario, setCustomScenario] = useState('');

  const handleAnalysis = useCallback(async (scenarioText: string) => {
    setIsLoading(true);
    try {
      const result = await generateMindsetAnalysis(scenarioText);
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to fetch mindset analysis", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleAnalysis(selectedScenario.prompt);
  }, [selectedScenario, handleAnalysis]);

  const toggleMode = () => {
    setActiveMode(prev => prev === 'survival' ? 'creative' : 'survival');
  };

  const isSurvival = activeMode === 'survival';

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isSurvival ? 'bg-[#0f0a0a] text-red-50' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Header Section */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 glass flex justify-between items-center border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full ${isSurvival ? 'bg-red-600' : 'bg-blue-600'} flex items-center justify-center text-white font-bold`}>
            M
          </div>
          <h1 className={`font-display text-xl ${isSurvival ? 'text-red-500' : 'text-blue-900'}`}>Mindset Shift</h1>
        </div>
        
        <button 
          onClick={toggleMode}
          className={`relative w-48 h-12 rounded-full p-1 flex items-center transition-all duration-500
            ${isSurvival ? 'bg-red-900/50' : 'bg-blue-100'} border ${isSurvival ? 'border-red-500/50' : 'border-blue-200'}
          `}
        >
          <div className={`absolute top-1 left-1 bottom-1 w-[48%] rounded-full shadow-lg transition-all duration-500 flex items-center justify-center text-xs font-bold
            ${isSurvival ? 'translate-x-full bg-red-600 text-white' : 'bg-blue-600 text-white'}
          `}>
            {isSurvival ? 'SURVIVAL MODE' : 'CREATIVE MODE'}
          </div>
          <div className="flex-1 text-center text-[10px] font-bold opacity-50 px-2 select-none">
            {isSurvival ? 'CREATIVE' : ''}
          </div>
          <div className="flex-1 text-center text-[10px] font-bold opacity-50 px-2 select-none">
            {isSurvival ? '' : 'SURVIVAL'}
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Input & Context */}
          <div className="space-y-8">
            <section>
              <h2 className="text-sm font-bold tracking-widest uppercase opacity-60 mb-2">The Challenge</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {SCENARIOS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedScenario(s);
                      setCustomScenario('');
                    }}
                    className={`px-4 py-2 rounded-lg text-sm transition-all
                      ${selectedScenario.id === s.id && !customScenario
                        ? (isSurvival ? 'bg-red-600 text-white' : 'bg-blue-600 text-white')
                        : (isSurvival ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'bg-white text-slate-600 border border-slate-200')}
                    `}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <textarea
                  value={customScenario || selectedScenario.prompt}
                  onChange={(e) => setCustomScenario(e.target.value)}
                  placeholder="Enter your own scenario..."
                  className={`w-full h-32 p-4 rounded-xl text-lg resize-none focus:ring-2 transition-all outline-none
                    ${isSurvival 
                      ? 'bg-red-900/10 border-red-500/30 text-red-100 focus:ring-red-500' 
                      : 'bg-white border-blue-200 text-slate-800 shadow-sm focus:ring-blue-500'}
                  `}
                />
                <button
                  onClick={() => handleAnalysis(customScenario || selectedScenario.prompt)}
                  disabled={isLoading}
                  className={`absolute bottom-4 right-4 px-6 py-2 rounded-lg font-bold transition-all
                    ${isSurvival ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-700'} text-white
                    disabled:opacity-50
                  `}
                >
                  {isLoading ? 'Analyzing...' : 'Re-Analyze'}
                </button>
              </div>
            </section>

            <section className={`p-8 rounded-3xl transition-all border
              ${isSurvival ? 'bg-red-950/30 border-red-800/50' : 'bg-blue-50 border-blue-100'}
            `}>
              <div className="mb-4">
                <span className={`text-xs font-bold tracking-widest uppercase ${isSurvival ? 'text-red-400' : 'text-blue-500'}`}>
                  Internal Dialogue
                </span>
                <h3 className={`text-3xl font-display mt-2 mb-4 leading-tight`}>
                  {analysis ? (isSurvival ? analysis.survivalMotto : analysis.creativeMotto) : 'Loading insights...'}
                </h3>
                <div className={`flex items-center space-x-3 p-4 rounded-xl ${isSurvival ? 'bg-red-900/40' : 'bg-white shadow-sm'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
                    ${isSurvival ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}
                  `}>
                    {isSurvival ? '⚠️' : '👁️'}
                  </div>
                  <div>
                    <p className={`text-xs opacity-60 uppercase font-bold`}>{isSurvival ? 'The Root Fear' : 'The Manifest Vision'}</p>
                    <p className="font-medium">{analysis ? (isSurvival ? analysis.survivalFear : analysis.creativeVision) : '...'}</p>
                  </div>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isSurvival ? 'text-red-200/60' : 'text-slate-500 italic'}`}>
                {isSurvival 
                  ? "Survival mode is reactive. It focuses on avoiding loss, protecting assets, and reacting to perceived threats. It feels heavy, urgent, and limited."
                  : "Creative mode is generative. It focuses on long-term growth, possibilities, and alignment with values. It feels expansive, curious, and sustainable."}
              </p>
            </section>
          </div>

          {/* Right Column: Action Path Visualizer */}
          <div className="space-y-6 relative">
            <h2 className={`text-sm font-bold tracking-widest uppercase opacity-60 flex items-center`}>
              The Path Forward 
              {isSurvival && <span className="ml-2 px-2 py-0.5 bg-red-600 text-white text-[10px] rounded-full animate-pulse-red">Reaction</span>}
              {!isSurvival && <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] rounded-full">Intention</span>}
            </h2>
            
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`h-32 rounded-2xl animate-pulse ${isSurvival ? 'bg-red-900/10' : 'bg-slate-200'}`} />
                ))
              ) : (
                analysis && (isSurvival ? analysis.survivalPath : analysis.creativePath).map((step, idx) => (
                  <PathStep key={idx} step={step} index={idx} mode={activeMode} />
                ))
              )}
            </div>

            <div className={`p-6 text-center border-t border-dashed mt-8
              ${isSurvival ? 'border-red-900 text-red-400' : 'border-blue-200 text-blue-500'}
            `}>
              <p className="text-sm">
                Week 1 Experimentation — Observe how your internal narrative shifts your external world.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Background Decor */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 -z-10
        ${isSurvival ? 'opacity-20' : 'opacity-10'}
      `}>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] 
          ${isSurvival ? 'bg-red-900' : 'bg-blue-300'}
        `} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] 
          ${isSurvival ? 'bg-orange-900' : 'bg-purple-200'}
        `} />
      </div>
      
      {/* Sticky Call to Action */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={toggleMode}
          className={`px-8 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95
            ${isSurvival 
              ? 'bg-red-600 hover:bg-red-500 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}
          `}
        >
          Switch to {isSurvival ? 'Creative' : 'Survival'} Mindset
        </button>
      </div>
    </div>
  );
};

export default App;
