import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-8 md:px-16 backdrop-blur-md bg-[#070b14]/60 border-b border-white/5">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <span className="font-black text-xl">A</span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Anti<span className="text-blue-500">Gravity</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400 capitalize">
          <NavLink to="/dsa" className="hover:text-blue-400 transition-colors">Algorithms</NavLink>
          <NavLink to="/os" className="hover:text-indigo-400 transition-colors">Operating Systems</NavLink>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 flex flex-col items-center">
        {/* Ambient Lights */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto w-full flex flex-col items-center z-10"
        >
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs tracking-widest font-black uppercase">
            Visualizing Logic • 2.0 Engine
          </div>
          
          <h1 className="text-6xl md:text-[100px] font-black text-center tracking-tighter mb-8 leading-[0.9] text-white">
            Architecture of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700">Intelligence.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl text-center mb-16 leading-relaxed font-medium">
            A deterministic visual execution enviornment for exploring high-performance computer science concepts through interactive simulation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-32">
             <NavLink 
               to="/dsa" 
               className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/40 hover:bg-blue-500 transition-all transform hover:-translate-y-1 active:scale-95"
             >
               Explore Algorithms
             </NavLink>
             <NavLink 
               to="/os" 
               className="bg-slate-900 border border-slate-700 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl"
             >
               Operating Systems
             </NavLink>
          </div>
        </motion.div>

        {/* Mockup Preview Backdrop */}
        <div className="relative w-full max-w-6xl mx-auto px-4 z-10">
           <div className="aspect-video w-full rounded-[40px] bg-slate-900/50 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm group flex items-center justify-center p-1">
              <div className="w-full h-full rounded-[36px] bg-[#0a0f1c] border border-white/5 flex flex-col items-center justify-center space-y-4">
                 <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-3xl">🏗️</span>
                 </div>
                 <div className="text-center">
                    <p className="text-blue-400 font-mono text-sm uppercase tracking-tighter font-bold">V-Engine Dashboard Preview</p>
                    <p className="text-slate-500 text-xs">Run step-by-step simulations with real-time state tracking</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-8 md:px-16 container mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-lg">
               <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">The Platform</h3>
               <h2 className="text-5xl font-black tracking-tighter">Everything to <span className="text-slate-400">master</span> CS fundamentals.</h2>
            </div>
            <p className="text-slate-400 max-w-sm">From simple sorting to complex deadlock avoidance, visualize the invisible mechanics of software.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {[
               { title: 'Deterministic', desc: 'Every step is computed and tracked. Record, rewind, and replay with pixel precision.', icon: '⏱️' },
               { title: 'Plugin-Driven', desc: 'Easily extend the visualizer with new algorithm plugins and custom visual components.', icon: '🔌' },
               { title: 'Premium UI', desc: 'Industrial-grade visual design focused on clarity, state awareness, and user focus.', icon: '💎' }
            ].map((f, i) => (
               <div key={i} className="p-10 rounded-[40px] bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-colors group">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h4 className="text-2xl font-bold mb-4">{f.title}</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">{f.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 px-8 md:px-16">
         <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <span className="font-black text-sm">A</span>
               </div>
               <span className="font-black tracking-tighter uppercase text-lg">AntiGravity</span>
            </div>
            <div className="flex gap-8 text-slate-500 font-medium text-sm">
               <a href="#" className="hover:text-white transition-colors">Documentation</a>
               <a href="#" className="hover:text-white transition-colors">GitHub</a>
               <a href="#" className="hover:text-white transition-colors">University Plan</a>
            </div>
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} DeepMind Engine Studio. High fidelity logic.</p>
         </div>
      </footer>
    </div>
  );
};
