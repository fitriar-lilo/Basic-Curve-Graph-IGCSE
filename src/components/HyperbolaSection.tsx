import React, { useState } from 'react';
import { CoordinatePlane } from './CoordinatePlane';
import { TableOfPoints } from './TableOfPoints';
import { SubtopicExercises } from './SubtopicExercises';
import { HYPERBOLA_QUESTIONS } from '../data/questions';
import { Point, StudentAnswersTable } from '../types';
import { Sparkles, Sliders, AlertTriangle, HelpCircle } from 'lucide-react';

interface HyperbolaSectionProps {
  tableAnswers: StudentAnswersTable;
  onUpdateTableAnswer: (x: number, val: string) => void;
  isConnected: boolean;
  onConnectPoints: () => void;
  quizAnswers: { [qId: string]: number };
  onSelectQuizAnswer: (qId: string, optIdx: number) => void;
}

export const HyperbolaSection: React.FC<HyperbolaSectionProps> = ({
  tableAnswers,
  onUpdateTableAnswer,
  isConnected,
  onConnectPoints,
  quizAnswers,
  onSelectQuizAnswer,
}) => {
  // Coefficient for hyperbola y = a / x
  const [a, setA] = useState(6);

  // Student plotted points
  const [studentPoints, setStudentPoints] = useState<Point[]>([]);

  // Table rows for y = 6 / x (all integer factors!)
  const tableRows = [
    { x: -6, expectedY: -1, hintStep: '6 ÷ (-6) = -1' },
    { x: -3, expectedY: -2, hintStep: '6 ÷ (-3) = -2' },
    { x: -2, expectedY: -3, hintStep: '6 ÷ (-2) = -3' },
    { x: -1, expectedY: -6, hintStep: '6 ÷ (-1) = -6' },
    { x: 1, expectedY: 6, hintStep: '6 ÷ 1 = 6' },
    { x: 2, expectedY: 3, hintStep: '6 ÷ 2 = 3' },
    { x: 3, expectedY: 2, hintStep: '6 ÷ 3 = 2' },
    { x: 6, expectedY: 1, hintStep: '6 ÷ 6 = 1' },
  ];

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-orange-950/80 via-slate-900 to-rose-950/80 border border-orange-800/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-orange-900/80 text-orange-300 border border-orange-700">
                Subtopic 3
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Hyperbola: <span className="font-mono text-orange-300">y = a / x</span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              A hyperbola consists of two mirrored separate curves (called branches or wings). Because dividing by zero is
              impossible, the curve never crosses the coordinate axes!
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Key Features</span>
            <span className="text-sm font-semibold text-rose-400">Vertical & Horizontal Asymptotes</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Table & Live Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Step 1 Points Table */}
        <TableOfPoints
          formulaLabel="y = 6 / x"
          rows={tableRows}
          studentAnswers={tableAnswers}
          onUpdateAnswer={onUpdateTableAnswer}
          onPlotPoints={setStudentPoints}
          onConnectPoints={onConnectPoints}
          isConnected={isConnected}
          accentColor="orange"
        />

        {/* Right: Live Graph with Asymptotes */}
        <div className="space-y-4">
          <CoordinatePlane
            type="hyperbola"
            a={a}
            studentPoints={studentPoints}
            showCurve={isConnected}
            showAsymptotes={true}
            xRange={[-7, 7]}
            yRange={[-7, 7]}
            title={`Hyperbola Graph: y = ${a} / x`}
          />

          {/* Playground Sliders for a */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                <span>Playground: Toggle "a" positive (+6) or negative (-6)</span>
              </span>
              <button onClick={() => setA(6)} className="text-[11px] text-orange-400 hover:underline">
                Reset to y = 6 / x
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-slate-300">
                <span>Coefficient "a":</span>
                <span className={`font-bold ${a > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  a = {a} ({a > 0 ? 'Quadrants I & III' : 'Quadrants II & IV'})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[6, 4, -4, -6].map((val) => (
                  <button
                    key={val}
                    onClick={() => setA(val)}
                    className={`py-1.5 rounded-lg font-mono text-xs font-bold transition border ${
                      a === val
                        ? 'bg-orange-600 text-white border-orange-400 ring-2 ring-orange-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    y = {val}/x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE CONCEPT EXPLANATION: Asymptotes & Curve Positions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Concept 1: Position of the Curve */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-950 text-orange-400 border border-orange-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white">Which Part Gives Effect to the Position of the Curve?</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The sign of <strong className="text-amber-300 font-mono">"a"</strong> dictates which quadrants the two
            branches live in:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-1.5">
              <div className="text-emerald-400 font-bold text-xs">When a &gt; 0 (Positive):</div>
              <p className="text-[11px] text-slate-300">
                Located in <strong className="text-emerald-300">Quadrant I</strong> (top-right, where x&gt;0, y&gt;0) and{' '}
                <strong className="text-emerald-300">Quadrant III</strong> (bottom-left, where x&lt;0, y&lt;0).
              </p>
              <div className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded">
                Example: y = 6 / x
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-1.5">
              <div className="text-rose-400 font-bold text-xs">When a &lt; 0 (Negative):</div>
              <p className="text-[11px] text-slate-300">
                Located in <strong className="text-rose-300">Quadrant II</strong> (top-left, where x&lt;0, y&gt;0) and{' '}
                <strong className="text-rose-300">Quadrant IV</strong> (bottom-right, where x&gt;0, y&lt;0).
              </p>
              <div className="text-[10px] font-mono text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded">
                Example: y = -6 / x
              </div>
            </div>
          </div>
        </div>

        {/* Concept 2: What is an Asymptote? */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-800">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white">What is an Asymptote?</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            An <strong className="text-rose-400">Asymptote</strong> is a boundary line that a curve gets closer and closer
            to, but never touches or crosses!
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-rose-300 block mb-1">Vertical Asymptote (x = 0):</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                You <strong className="text-rose-400">cannot divide by 0</strong>! When x = 0, y = a/0 is mathematically
                undefined. So the curve shoots up or down forever alongside the vertical line x = 0 without ever touching
                it.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Horizontal Asymptote (y = 0):</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                As x becomes immensely large (like 1,000, 10,000), a/x gets extremely close to 0, but is never exactly 0.
                So the curve flattens along the horizontal line y = 0.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Section */}
      <SubtopicExercises
        title="Hyperbola"
        questions={HYPERBOLA_QUESTIONS}
        quizAnswers={quizAnswers}
        onSelectAnswer={onSelectQuizAnswer}
        accentBadgeColor="orange"
      />
    </div>
  );
};
