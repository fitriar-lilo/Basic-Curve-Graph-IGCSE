import React from 'react';
import { PenTool, Lightbulb, CheckCircle2, BookOpen } from 'lucide-react';
import { StudentProgress } from '../types';

interface StudentDefinitionsSectionProps {
  definitions: StudentProgress['definitions'];
  analysis: StudentProgress['analysis'];
  onUpdateDefinition: (field: keyof StudentProgress['definitions'], value: string) => void;
  onUpdateAnalysis: (field: keyof StudentProgress['analysis'], value: string) => void;
}

export const StudentDefinitionsSection: React.FC<StudentDefinitionsSectionProps> = ({
  definitions,
  analysis,
  onUpdateDefinition,
  onUpdateAnalysis,
}) => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-800/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-900/80 text-emerald-300 border border-emerald-700">
                <PenTool className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Student Self-Reflection & Definitions</h2>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Express your understanding in your own words! There is no single rigid wording—write how you would explain
              these math terms to a friend or classmate.
            </p>
          </div>
        </div>
      </div>

      {/* Part 1: Definitions in Your Own Words */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Part 1: Definitions in Your Own Words</h3>
          </div>
          <span className="text-xs text-slate-400">Included in final report for teacher review</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Definition: Roots */}
          <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>1. What is a "Root" (x-intercept)?</span>
              </label>
              {definitions.roots.trim().length > 10 && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Answered
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              <span className="text-amber-400">Helper:</span> Where does the curve meet the horizontal x-axis? What is y?
            </p>
            <textarea
              rows={3}
              value={definitions.roots}
              onChange={(e) => onUpdateDefinition('roots', e.target.value)}
              placeholder="In my own words, a root is the point where the curve crosses the horizontal x-axis and y is equal to 0..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Definition: Turning Point */}
          <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>2. What is a "Turning Point" (Vertex)?</span>
              </label>
              {definitions.turningPoint.trim().length > 10 && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Answered
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              <span className="text-amber-400">Helper:</span> What happens to the direction of the curve at this point?
            </p>
            <textarea
              rows={3}
              value={definitions.turningPoint}
              onChange={(e) => onUpdateDefinition('turningPoint', e.target.value)}
              placeholder="A turning point is the peak or lowest valley where the curve changes direction from going down to going up (or up to down)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            />
          </div>

          {/* Definition: Inflection Point */}
          <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>3. What is an "Inflection Point"?</span>
              </label>
              {definitions.inflectionPoint.trim().length > 10 && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Answered
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              <span className="text-amber-400">Helper:</span> How does the bending or curvature change across this point?
            </p>
            <textarea
              rows={3}
              value={definitions.inflectionPoint}
              onChange={(e) => onUpdateDefinition('inflectionPoint', e.target.value)}
              placeholder="An inflection point is the special spot on a curve where it changes its bend, switching between concave down and concave up..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Definition: Asymptote */}
          <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span>4. What is an "Asymptote"?</span>
              </label>
              {definitions.asymptote.trim().length > 10 && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Answered
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              <span className="text-amber-400">Helper:</span> Does the curve ever touch this line? Why?
            </p>
            <textarea
              rows={3}
              value={definitions.asymptote}
              onChange={(e) => onUpdateDefinition('asymptote', e.target.value)}
              placeholder="An asymptote is an invisible boundary line that the curve gets closer and closer to forever, but can never touch or cross..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Part 2: Student Analysis Results */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">Part 2: Student Analysis Results</h3>
          </div>
          <span className="text-xs text-slate-400">Demonstrate your discovery from the interactive experiments</span>
        </div>

        <div className="space-y-5">
          {/* Analysis 1: Parabola Upward vs Downward */}
          <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <label className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
              <span>Analysis A: Which part of the parabola determines whether it opens upward or downward?</span>
            </label>
            <p className="text-[11px] text-slate-400">
              Explain how changing the sign (+ or -) of "a" affects the parabola shape. Give a simple example.
            </p>
            <textarea
              rows={3}
              value={analysis.parabolaDirection}
              onChange={(e) => onUpdateAnalysis('parabolaDirection', e.target.value)}
              placeholder="In the complete quadratic y = ax² + bx + c, the coefficient 'a' determines whether it opens upward or downward. If 'a' is positive like in y = x² - 2x - 3, the parabola opens upward (∪). If 'a' is negative like in y = -x² + 2x + 3, it opens downward (∩)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          {/* Analysis 2: Hyperbola Position */}
          <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <label className="text-xs font-bold text-orange-300 flex items-center gap-1.5">
              <span>Analysis B: Which part of the hyperbola determines the position of the curve?</span>
            </label>
            <p className="text-[11px] text-slate-400">
              Explain how "a" in y = a/x controls the quadrants, and why the curve cannot touch the coordinate axes.
            </p>
            <textarea
              rows={3}
              value={analysis.hyperbolaPosition}
              onChange={(e) => onUpdateAnalysis('hyperbolaPosition', e.target.value)}
              placeholder="The sign of 'a' controls the position. When 'a' is positive, the branches are in Quadrant 1 and 3. When 'a' is negative, they are in Quadrant 2 and 4. It can never touch the y-axis because division by zero (x=0) is impossible..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          {/* Analysis 3: How Curves are Made from Points */}
          <div className="space-y-2 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <label className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <span>Analysis C: What did you discover about how a curve is formed from a collection of points?</span>
            </label>
            <p className="text-[11px] text-slate-400">
              Reflect on the table activity: how does calculating (x, y) coordinates help you draw and understand any curve?
            </p>
            <textarea
              rows={3}
              value={analysis.curveFromPointsInsight}
              onChange={(e) => onUpdateAnalysis('curveFromPointsInsight', e.target.value)}
              placeholder="I learned that a smooth curve is not drawn by guess—it is an infinite collection of coordinates (x, y). By finding integer points in the table, plotting them on the plane, and connecting them smoothly, the full shape of the curve appears clearly..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
