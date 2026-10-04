import React from 'react';
import { ArrowRight, Compass, Sparkles, Target, Layers, HelpCircle } from 'lucide-react';

interface IntroSectionProps {
  onStartSubtopic: (tab: 'parabola' | 'cubic' | 'hyperbola') => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStartSubtopic }) => {
  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 border border-indigo-800/60 rounded-3xl p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Mathematics Studio</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            How Curves Are Born: <br />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              From Points to Smooth Graphs
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            In mathematics, a curve does not appear by magic. Every curve is simply a{' '}
            <strong className="text-white">collection of coordinate points (x, y)</strong> that satisfy an equation.
            When you calculate points one by one and connect them, the shape emerges!
          </p>
        </div>
      </div>

      {/* The 3 Core Curves Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Three Main Curves You Will Explore</h2>
            <p className="text-xs text-slate-400">Click any curve to begin your interactive activity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Parabola */}
          <div
            onClick={() => onStartSubtopic('parabola')}
            className="group cursor-pointer bg-slate-900/90 border border-sky-900/60 hover:border-sky-500/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-sky-950/50 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-sm mb-4">
                ∪
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                1. Complete Parabola (Quadratic)
              </h3>
              <p className="text-xs font-mono text-sky-400 mt-1 mb-3">y = ax² + bx + c</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete quadratic containing quadratic term (ax²), linear term (bx), and constant term (c).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div>• <strong className="text-emerald-400">Roots:</strong> where it cuts the x-axis</div>
                <div>• <strong className="text-amber-400">Turning Point:</strong> minimum or maximum vertex</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-sky-400 group-hover:translate-x-1 transition-transform">
              <span>Start Parabola Activity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Cubic */}
          <div
            onClick={() => onStartSubtopic('cubic')}
            className="group cursor-pointer bg-slate-900/90 border border-purple-900/60 hover:border-purple-500/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-purple-950/50 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center font-bold text-sm mb-4">
                ∫
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                2. Cubic Curve
              </h3>
              <p className="text-xs font-mono text-purple-400 mt-1 mb-3">y = ax³ + c</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                An S-shaped continuous river that bends one way, crosses an inflection point, and bends the opposite way!
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div>• <strong className="text-purple-400">Inflection Point:</strong> at (0, c) where curvature changes</div>
                <div>• <strong className="text-emerald-400">Root:</strong> crossing point at y = 0</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Start Cubic Activity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Hyperbola */}
          <div
            onClick={() => onStartSubtopic('hyperbola')}
            className="group cursor-pointer bg-slate-900/90 border border-orange-900/60 hover:border-orange-500/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-orange-950/50 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-950 text-orange-400 border border-orange-800 flex items-center justify-center font-bold text-sm mb-4">
                )(
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                3. Hyperbola
              </h3>
              <p className="text-xs font-mono text-orange-400 mt-1 mb-3">y = a / x</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Two mirrored curve branches separated by coordinate axes. Division by zero is impossible!
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div>• <strong className="text-rose-400">Vertical Asymptote:</strong> x = 0 (undefined)</div>
                <div>• <strong className="text-rose-400">Horizontal Asymptote:</strong> y = 0</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
              <span>Start Hyperbola Activity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Glossary: The 4 Key Elements */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Visual Guide: The 4 Key Curve Landmarks</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Item 1 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-900/60 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 -ml-5"></span>
              <span>1. Roots (x-intercepts)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Points where the curve crosses the horizontal ground level <span className="font-mono text-cyan-300">(y = 0)</span>.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-900/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span>2. Turning Point (Vertex)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              The peak (Maximum) or valley bottom (Minimum) where the curve switches its up/down direction.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-900/60 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <span className="w-3 h-3 rotate-45 bg-purple-400"></span>
              <span>3. Inflection Point</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              The exact transition point where the curve changes how it bends (from concave down to concave up).
            </p>
          </div>

          {/* Item 4 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-900/60 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <span className="w-3 h-0.5 bg-rose-400"></span>
              <span>4. Asymptotes</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Invisible borderlines that the curve races towards forever but can never touch or cross.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
