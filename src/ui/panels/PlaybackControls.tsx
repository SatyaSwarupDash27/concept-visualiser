import React from 'react';
import { usePlaybackStore } from '../../core/store/playback.store';

export const PlaybackControls: React.FC = () => {
  const { 
    currentStep, totalSteps, isPlaying, speed, 
    togglePlay, stepForward, stepBack, scrubTo, setSpeed 
  } = usePlaybackStore();

  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="flex flex-col gap-4 bg-slate-900/80 border border-slate-700/50 p-4 rounded-3xl shadow-2xl backdrop-blur-md w-full max-w-3xl mx-auto">
      {/* Scrubber */}
      <div className="flex items-center gap-4 px-2">
        <span className="text-xs font-mono font-bold text-slate-500 w-10 text-right">{currentStep}</span>
        <input 
          type="range" 
          min={0} 
          max={Math.max(0, totalSteps - 1)} 
          value={currentStep}
          onChange={(e) => scrubTo(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${progress}%, #1e293b ${progress}%)`
          }}
        />
        <span className="text-xs font-mono font-bold text-slate-500 w-10">{totalSteps > 0 ? totalSteps - 1 : 0}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {[0.25, 0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`w-10 h-8 rounded-lg text-xs font-bold transition-all ${
                speed === s 
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={stepBack} 
            disabled={currentStep === 0}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
          </button>
          
          <button 
            onClick={togglePlay}
            disabled={totalSteps === 0 || currentStep >= totalSteps - 1}
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>

          <button 
            onClick={stepForward} 
            disabled={totalSteps === 0 || currentStep >= totalSteps - 1}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </button>
        </div>

        <div className="w-[200px]"></div> {/* Spacer for center alignment */}
      </div>
    </div>
  );
};
