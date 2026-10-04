import React, { useState } from 'react';
import { CoordinatePlane } from './CoordinatePlane';
import { TableOfPoints } from './TableOfPoints';
import { SubtopicExercises } from './SubtopicExercises';
import { CUBIC_QUESTIONS } from '../data/questions';
import { Point, StudentAnswersTable } from '../types';
import { Sparkles, Sliders, TrendingUp, Compass } from 'lucide-react';

interface CubicSectionProps {
  tableAnswers: StudentAnswersTable;
  onUpdateTableAnswer: (x: number, val: string) => void;
  isConnected: boolean;
  onConnectPoints: () => void;
  quizAnswers: { [qId: string]: number };
  onSelectQuizAnswer: (qId: string, optIdx: number) => void;
}

export const CubicSection: React.FC<CubicSectionProps> = ({
  tableAnswers,
  onUpdateTableAnswer,
  isConnected,
  onConnectPoints,
  quizAnswers,
  onSelectQuizAnswer,
}) => {
  // Playground parameters
  const [a, setA] = useState(1);
  const [c, setC] = useState(-1);

  // Student plotted points
  const [studentPoints, setStudentPoints] = useState<Point[]>([]);

  // Table rows for y = x³ - 1 (integers only!)
  const tableRows = [
    { x: -2, expectedY: -9, hintStep: '(-2)³ - 1 = -8 - 1 = -9' },
    { x: -1, expectedY: -2, hintStep: '(-1)³ - 1 = -1 - 1 = -2' },
    { x: 0, expectedY: -1, hintStep: '(0)³ - 1 = -1 (INFLECTION POINT!)' },
    { x: 1, expectedY: 0, hintStep: '(1)³ - 1 = 1 - 1 = 0 (ROOT!)' },
    { x: 2, expectedY: 7, hintStep: '(2)³ - 1 = 8 - 1 = 7' },
  ];

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-800/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-900/80 text-purple-300 border border-purple-700">
                Subtopic 2
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Cubic Curve: <span className="font-mono text-purple-300">y = ax³ + c</span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              A cubic curve has a distinctive "S-shape" or snake-like curve. Notice how it bends in one direction, passes
              through an <span className="text-purple-300 font-semibold">Inflection Point</span>, and curves the opposite
              way!
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Key Features</span>
            <span className="text-sm font-semibold text-purple-400">Inflection Point & Roots</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Table & Live Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Step 1 Points Table */}
        <TableOfPoints
          formulaLabel="y = x³ - 1"
          rows={tableRows}
          studentAnswers={tableAnswers}
          onUpdateAnswer={onUpdateTableAnswer}
          onPlotPoints={setStudentPoints}
          onConnectPoints={onConnectPoints}
          isConnected={isConnected}
          accentColor="purple"
        />

        {/* Right: Live SVG Graph */}
        <div className="space-y-4">
          <CoordinatePlane
            type="cubic"
            a={a}
            c={c}
            studentPoints={studentPoints}
            showCurve={isConnected}
            showRoots={true}
            showInflectionPoint={true}
            xRange={[-3, 3]}
            yRange={[-10, 10]}
            title={`Cubic Graph: y = ${a === 1 ? '' : a === -1 ? '-' : a}x³ ${
              c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`
            }`}
          />

          {/* Playground Sliders */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>Playground: Modify "a" and "c" to see the effect</span>
              </span>
              <button
                onClick={() => {
                  setA(1);
                  setC(-1);
                }}
                className="text-[11px] text-purple-400 hover:underline"
              >
                Reset to y = x³ - 1
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between font-mono text-slate-300 mb-1">
                  <span>Coefficient "a":</span>
                  <span className={`font-bold ${a > 0 ? 'text-purple-400' : 'text-rose-400'}`}>{a}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="1"
                  value={a}
                  onChange={(e) => setA(parseInt(e.target.value, 10) || 1)}
                  className="w-full accent-purple-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-2 (Falls)</span>
                  <span>0</span>
                  <span>+2 (Rises)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-slate-300 mb-1">
                  <span>Constant "c" (Shift):</span>
                  <span className="font-bold text-amber-400">{c}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={c}
                  onChange={(e) => setC(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-4</span>
                  <span>0</span>
                  <span>+4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE CONCEPT EXPLANATION: What is an Inflection Point? */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inflection Point explanation */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white">What is an Inflection Point?</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            An <strong className="text-purple-300">Inflection Point</strong> is the exact point on a curve where the
            curvature changes direction!
          </p>

          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-purple-300 font-semibold">
              <Compass className="w-4 h-4" />
              <span>Change of Curvature:</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              To the left of the inflection point, the curve is bending downwards (concave down). Immediately after passing
              the inflection point, it changes to bending upwards (concave up)!
            </p>
            <div className="text-[11px] font-mono text-purple-200 bg-purple-950/80 p-2 rounded border border-purple-800">
              For y = ax³ + c, the inflection point is always located at coordinate{' '}
              <strong className="text-amber-300">(0, c)</strong>.
            </div>
          </div>
        </div>

        {/* Effect of a and c */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white">How "a" and "c" Shape the Cubic Curve</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-sky-400 block mb-1">When "a" is Positive (a &gt; 0):</span>
              <p className="text-slate-300 text-[11px]">
                The graph starts deep in the bottom-left (Quadrant III), passes through the inflection point, and climbs up
                high into the top-right (Quadrant I).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-rose-400 block mb-1">When "a" is Negative (a &lt; 0):</span>
              <p className="text-slate-300 text-[11px]">
                The graph flips! It starts high in the top-left (Quadrant II) and drops down deep into the bottom-right
                (Quadrant IV).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">Constant "c" shifts the curve vertically:</span>
              <p className="text-slate-300 text-[11px]">
                Increasing c moves the inflection point <span className="font-mono text-amber-300">(0, c)</span> upwards;
                decreasing c moves it downwards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Section */}
      <SubtopicExercises
        title="Cubic"
        questions={CUBIC_QUESTIONS}
        quizAnswers={quizAnswers}
        onSelectAnswer={onSelectQuizAnswer}
        accentBadgeColor="purple"
      />
    </div>
  );
};
