import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Activity, 
  ArrowRight, 
  Github, 
  BookOpen, 
  ShieldCheck, 
  Terminal,
  ChevronRight,
  Zap,
  Globe
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-[#f8fafc] selection:bg-blue-600/30 selection:text-white overflow-x-hidden font-sans">
      {/* Professional Navbar */}
      <nav className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-8 md:px-20 backdrop-blur-xl bg-[#050810]/80 border-b border-white/[0.03]">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-600/20 group-hover:rotate-6 transition-all duration-500">
             <Layers className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <span className="text-xl font-black tracking-tight uppercase tracking-[-0.03em] flex items-center gap-1.5">
             Concept <span className="text-blue-500">Visualiser</span>
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold tracking-wider text-slate-400/80 uppercase">
          <NavLink to="/dsa" className="hover:text-blue-400 transition-colors flex items-center gap-2">
             <Zap className="w-3.5 h-3.5" /> Algorithms
          </NavLink>
          <NavLink to="/os" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
             <Cpu className="w-3.5 h-3.5" /> Systems
          </NavLink>
          <a href="#features" className="hover:text-white transition-colors">Platform</a>
          <NavLink 
            to="/dsa" 
            className="bg-white text-black px-7 py-2.5 rounded-full font-black hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-2xl shadow-white/5 flex items-center gap-2 group"
          >
            Launch Engine
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-40 px-6 flex flex-col items-center">
        {/* Subtle Depth Layers */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/[0.07] rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute top-[10%] right-[-15%] w-[60%] h-[60%] bg-indigo-600/[0.07] rounded-full blur-[140px] pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto w-full flex flex-col items-center z-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-10 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-mono text-[10px] tracking-[0.2em] font-black uppercase shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Activity className="w-3 h-3" /> Visualizing Engine
          </div>
          
          <h1 className="text-7xl md:text-[115px] font-black text-center tracking-[-0.051em] mb-10 leading-[0.88] text-white">
            Visualize the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-800">Abstract.</span>
          </h1>
          
          <p className="text-xl text-slate-400/80 max-w-2xl text-center mb-16 leading-relaxed font-medium tracking-tight">
            An advanced architectural simulation engine designed to demonstrate the step-by-step logic behind high-performance computer science concepts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 relative">
             <NavLink 
               to="/dsa" 
               className="relative overflow-hidden group bg-blue-600 text-white px-12 py-5 rounded-[22px] font-black text-lg shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
             >
               <span className="relative z-10">Get Started Now</span>
               <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             </NavLink>
             <NavLink 
               to="/os" 
               className="bg-[#0f172a] border border-slate-800/60 text-slate-300 px-12 py-5 rounded-[22px] font-black text-lg hover:bg-slate-900 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg flex items-center justify-center gap-3"
             >
               Explore Modules
             </NavLink>
          </div>
        </motion.div>
      </section>

      {/* Modern Bento-style Features */}
      <section id="features" className="py-40 px-8 md:px-20 container mx-auto">
         <div className="flex flex-col items-center text-center mb-28">
            <h3 className="text-blue-500 font-black uppercase tracking-[0.25em] text-[10px] mb-6">Engine Capabilities</h3>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Sophisticated Tracking.</h2>
            <p className="text-slate-500 max-w-xl font-medium">Built for clarity, the visualiser decomposes complex algorithms into human-comprehensible visual states.</p>
         </div>

         <div className="grid md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Feature 1 */}
            <div className="md:col-span-8 p-12 rounded-[48px] bg-gradient-to-br from-slate-900/60 to-slate-900/20 border border-white/[0.03] flex flex-col justify-end group hover:bg-slate-900/60 transition-all relative overflow-hidden">
               <Layers className="absolute top-12 right-12 w-32 h-32 text-blue-500/5 group-hover:scale-125 transition-transform duration-700" />
               <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20">
                  <Terminal className="w-6 h-6" />
               </div>
               <h4 className="text-3xl font-black mb-4">Deterministic Execution</h4>
               <p className="text-slate-400 text-lg leading-relaxed max-w-md">Every algorithm is wrapped in a generator pattern, ensuring absolute state control. Rewind, pause, and inspect every memory change with 100% precision.</p>
            </div>

            {/* Feature 2 */}
            <div className="md:col-span-4 p-12 rounded-[48px] bg-slate-900/40 border border-white/[0.03] flex flex-col group hover:bg-slate-900 transition-all">
               <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <h4 className="text-3xl font-black mb-4">GPL Standard</h4>
               <p className="text-slate-400 leading-relaxed">Open source and free forever. Built with the community in mind, ensuring educational transparency for all computer science students.</p>
            </div>

            {/* Feature 3 */}
            <div className="md:col-span-4 p-10 rounded-[40px] bg-slate-900/40 border border-white/[0.03] flex items-center gap-6 group">
               <div className="w-12 h-12 flex-shrink-0 bg-emerald-600/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <Globe className="w-5 h-5" />
               </div>
               <div>
                  <h5 className="font-bold text-lg">Web Scale</h5>
                  <p className="text-xs text-slate-500 font-medium tracking-tight">Desktop first performance with full mobile responsiveness.</p>
               </div>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-8 p-10 rounded-[40px] bg-slate-900/40 border border-white/[0.03] flex items-center justify-between group px-12">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                     <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                     <h5 className="font-bold text-lg">Knowledge Layer</h5>
                     <p className="text-xs text-slate-500 font-medium tracking-tight">Context-aware metadata for every algorithm step.</p>
                  </div>
               </div>
               <NavLink to="/os" className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <ArrowRight className="w-5 h-5" />
               </NavLink>
            </div>
         </div>
      </section>

      {/* Modern Footer */}
      <footer className="py-32 border-t border-white/[0.03] px-8 md:px-20 bg-[#03060c]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                     <Layers className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-black tracking-tighter uppercase tracking-[-0.03em] flex items-center gap-1.5">
                    Concept <span className="text-blue-500">Visualiser</span>
                  </span>
               </div>
               <p className="text-slate-500 max-w-xs text-sm leading-relaxed font-medium">Master the architecture of logic. Open platform for computer science education.</p>
               <div className="flex gap-4">
                  <a href="#" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                     <Github className="w-5 h-5" />
                  </a>
               </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-32 uppercase text-xs font-black tracking-widest text-slate-500">
               <div className="flex flex-col gap-4 text-slate-400 underline underline-offset-8">
                  <h6 className="text-slate-600/80 no-underline mb-2">Modules</h6>
                  <NavLink to="/dsa" className="hover:text-blue-500 transition-colors">Algorithms</NavLink>
                  <NavLink to="/os" className="hover:text-blue-500 transition-colors">OS Internals</NavLink>
                  <NavLink to="/dsa/sorting" className="hover:text-blue-500 transition-colors">Sorting</NavLink>
               </div>
               <div className="flex flex-col gap-4 text-slate-400 underline underline-offset-8">
                  <h6 className="text-slate-600/80 no-underline mb-2">Platform</h6>
                  <a href="#" className="hover:text-blue-500 transition-colors">Technical Stack</a>
                  <a href="#" className="hover:text-blue-500 transition-colors">V-Engine</a>
                  <a href="#" className="hover:text-blue-500 transition-colors">Core API</a>
               </div>
            </div>
         </div>
         <div className="mt-28 flex justify-center text-[10px] font-black tracking-[0.3em] uppercase text-slate-700/60">
            © {new Date().getFullYear()} Concept Visualiser • High Fidelity Environment • GNU GPL v3.0
         </div>
      </footer>
    </div>
  );
};
