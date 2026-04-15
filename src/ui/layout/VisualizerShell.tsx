import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { registry } from '../../core/registry/algorithmRegistry';
import { usePlaybackStore } from '../../core/store/playback.store';
import { AlgorithmRunner } from '../../core/engine/AlgorithmRunner';
import { KnowledgePanel } from '../panels/KnowledgePanel';
import { MetricsDashboard } from '../panels/MetricsDashboard';
import { PlaybackControls } from '../panels/PlaybackControls';
import { InputConfigurator } from '../panels/InputConfigurator';
import { AlgorithmSidebar } from './AlgorithmSidebar';

export const VisualizerShell: React.FC<{ domain: 'dsa' | 'os' }> = ({ domain }) => {
  const { algorithmId } = useParams();
  const { currentStep, setTotalSteps, reset } = usePlaybackStore();
  
  const [inputData, setInputData] = useState<any>(null);
  const [activeAlgorithmId, setActiveAlgorithmId] = useState<string | null>(null);
  
  // Instance runner specifically for this session
  const runner = useMemo(() => new AlgorithmRunner<any>(), []);

  // Safe plugin lookup that doesn't trigger early return
  const plugin = useMemo(() => {
    if (!algorithmId) return null;
    try {
      return registry.get(algorithmId);
    } catch {
      return null;
    }
  }, [algorithmId]);

  // Handle algorithm change: reset everything and clear stale input
  useEffect(() => {
    setInputData(null);
    setActiveAlgorithmId(null); // Block run effect
    reset();
    runner.reset();
    setTotalSteps(0);
    
    // Allow run effect after cleanup is recognized by React
    const timer = setTimeout(() => {
      setActiveAlgorithmId(algorithmId || null);
    }, 0);
    return () => clearTimeout(timer);
  }, [algorithmId, reset, runner, setTotalSteps]);

  // Handle run triggering when input changes
  useEffect(() => {
    if (inputData && plugin && algorithmId === activeAlgorithmId) {
      reset();
      const generator = plugin.generator(inputData);
      const hint = plugin.stepHint(inputData);
      runner.run(generator, hint);
      setTotalSteps(runner.totalSteps);
    }
  }, [inputData, plugin, runner, setTotalSteps, reset, algorithmId, activeAlgorithmId]);

  // Early returns ONLY after hooks are declared
  if (!algorithmId) {
    const firstAlgo = registry.getByDomain(domain)[0];
    if (firstAlgo) {
      return <Navigate to={`/${domain}/${firstAlgo.id}`} replace />;
    }
    return <div className="text-white p-8">No algorithms found for this domain.</div>;
  }

  if (!plugin) {
    return <Navigate to={`/${domain}`} replace />;
  }

  const snapshot = runner.totalSteps > 0 ? runner.getSnapshot(currentStep) : null;
  const Visualizer = plugin.visualizer;

  return (
    <div className="flex h-screen w-full bg-[#0a0f1c] overflow-hidden font-sans">
      <AlgorithmSidebar domain={domain} />

      <div className="flex-1 flex flex-col min-w-0" key={algorithmId}>
        {/* Top Bar */}
        <div className="h-16 border-b border-slate-800/60 bg-slate-900/50 flex items-center justify-between px-8 backdrop-blur-md z-10 w-full relative">
          <InputConfigurator config={plugin.inputConfig} onApply={setInputData} />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex relative w-full h-[calc(100vh-64px)]">
          {/* Visualizer Area */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden relative p-4">
            {snapshot ? (
              <React.Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                <div className="flex-1 flex items-center justify-center relative z-0">
                  <Visualizer snapshot={snapshot} />
                </div>
                
                {/* Overlay Controls & Metrics */}
                <div className="absolute top-4 inset-x-0 w-full flex justify-center pointer-events-none z-10">
                   <div className="pointer-events-auto">
                     <MetricsDashboard metrics={snapshot.metrics} />
                   </div>
                </div>

                <div className="absolute bottom-8 inset-x-0 w-full flex justify-center pointer-events-none z-10">
                  <div className="pointer-events-auto w-full px-8 flex justify-center">
                    <PlaybackControls />
                  </div>
                </div>
              </React.Suspense>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-inner border border-slate-700">
                     <span className="text-3xl">⚙️</span>
                  </div>
                  <h3 className="text-xl font-medium text-slate-400 font-mono tracking-tight">Awaiting Input</h3>
                  <p className="text-sm text-slate-500">Configure settings and click Generate to start.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="w-80 flex-shrink-0 bg-slate-900/40 relative z-20 hidden md:block">
             <KnowledgePanel meta={plugin.meta} />
          </div>
        </div>
      </div>
    </div>
  );
};
