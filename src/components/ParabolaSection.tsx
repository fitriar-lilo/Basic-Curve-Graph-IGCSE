import React, { useState } from 'react';
import { CoordinatePlane } from './CoordinatePlane';
import { TableOfPoints } from './TableOfPoints';
import { SubtopicExercises } from './SubtopicExercises';
import { PARABOLA_QUESTIONS } from '../data/questions';
import { Point, StudentAnswersTable } from '../types';
import { Smile, Frown, Sparkles, Sliders, ArrowUp, ArrowDown } from 'lucide-react';

interface ParabolaSectionProps {
  tableAnswers: StudentAnswersTable;
  onUpdateTableAnswer: (x: number, val: string) => void;
  isConnected: boolean;
  onConnectPoints: () => void;
  quizAnswers: { [qId: string]: number };
  onSelectQuizAnswer: (qId: string, optIdx: number) => void;
}

export const ParabolaSection: React.FC<ParabolaSectionProps> = ({
  tableAnswers,
  onUpdateTableAnswer,
  isConnected,
  onConnectPoints,
  quizAnswers,
  onSelectQuizAnswer,
}) => {
  // Coefficients for the complete quadratic y = ax² + bx + c
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);

  // Student plotted points for complete quadratic y = x² - 2x - 3
  const [studentPoints, setStudentPoints] = useState<Point[]>([]);

  // Rows for student table (y = x² - 2x - 3) - complete quadratic with all 3 terms!
  const tableRows = [
    { x: -2, expectedY: 5, hintStep: '(-2)² - 2(-2) - 3 = 4 + 4 - 3 = 5' },
    { x: -1, expectedY: 0, hintStep: '(-1)² - 2(-1) - 3 = 1 + 2 - 3 = 0 (ROOT!)' },
    { x: 0, expectedY: -3, hintStep: '(0)² - 2(0) - 3 = 0 - 0 - 3 = -3 (y-intercept at c)' },
    { x: 1, expectedY: -4, hintStep: '(1)² - 2(1) - 3 = 1 - 2 - 3 = -4 (TURNING POINT / VERTEX!)' },
    { x: 2, expectedY: -3, hintStep: '(2)² - 2(2) - 3 = 4 - 4 - 3 = -3' },
    { x: 3, expectedY: 0, hintStep: '(3)² - 2(3) - 3 = 9 - 6 - 3 = 0 (ROOT!)' },
    { x: 4, expectedY: 5, hintStep: '(4)² - 2(4) - 3 = 16 - 8 - 3 = 5' },
  ];

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border border-sky-800/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-900/80 text-sky-300 border border-sky-700">
                Subtopic 1
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Complete Quadratic Parabola: <span className="font-mono text-amber-300">y = ax² + bx + c</span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              A parabola is a smooth symmetrical curve containing all three terms:{' '}
              <strong className="text-sky-300 font-mono">ax²</strong> (quadratic term),{' '}
              <strong className="text-teal-300 font-mono">bx</strong> (linear term), and{' '}
              <strong className="text-amber-300 font-mono">c</strong> (constant term).
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Complete Form</span>
            <span className="text-sm font-semibold text-sky-400">y = ax² + bx + c</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Table Activity & Live Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Step 1 Points Table */}
        <TableOfPoints
          formulaLabel="y = x² - 2x - 3"
          rows={tableRows}
          studentAnswers={tableAnswers}
          onUpdateAnswer={onUpdateTableAnswer}
          onPlotPoints={setStudentPoints}
          onConnectPoints={onConnectPoints}
          isConnected={isConnected}
        />

        {/* Right: Interactive Coordinate Plane */}
        <div className="space-y-4">
          <CoordinatePlane
            type="parabola"
            a={a}
            b={b}
            c={c}
            studentPoints={studentPoints}
            showCurve={isConnected}
            showRoots={true}
            showTurningPoint={true}
            xRange={[-4, 6]}
            yRange={[-6, 8]}
            title={`Parabola: y = ${a === 1 ? '' : a === -1 ? '-' : `${a}`}x² ${
              b > 0 ? `+ ${b}x` : b < 0 ? `- ${Math.abs(b)}x` : ''
            } ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}`}
          />

          {/* Interactive Playground Sliders to change a, b, and c */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Playground: Adjust all three terms (a, b, c)</span>
              </span>
              <button
                onClick={() => {
                  setA(1);
                  setB(-2);
                  setC(-3);
                }}
                className="text-[11px] text-sky-400 hover:underline"
              >
                Reset to y = x² - 2x - 3
              </button>
            </div>

            {/* Quick complete quadratic presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 pb-1">
              <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
              <button
                onClick={() => {
                  setA(1);
                  setB(-2);
                  setC(-3);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-[11px] border border-slate-700"
              >
                y = x² - 2x - 3 (∪ Smile)
              </button>
              <button
                onClick={() => {
                  setA(-1);
                  setB(2);
                  setC(3);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 font-mono text-[11px] border border-slate-700"
              >
                y = -x² + 2x + 3 (∩ Frown)
              </button>
              <button
                onClick={() => {
                  setA(1);
                  setB(-4);
                  setC(3);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-[11px] border border-slate-700"
              >
                y = x² - 4x + 3
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Slider a */}
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="flex justify-between font-mono text-slate-300 mb-1">
                  <span>Term "a" (x²):</span>
                  <span className={`font-bold ${a > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {a} ({a > 0 ? '∪ Up' : '∩ Down'})
                  </span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="1"
                  value={a}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setA(val === 0 ? 1 : val);
                  }}
                  className="w-full accent-sky-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-2 (Frown)</span>
                  <span>+2 (Smile)</span>
                </div>
              </div>

              {/* Slider b */}
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="flex justify-between font-mono text-slate-300 mb-1">
                  <span>Term "b" (x):</span>
                  <span className="font-bold text-teal-300">{b}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={b}
                  onChange={(e) => setB(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-4 (Shifts right)</span>
                  <span>+4 (Shifts left)</span>
                </div>
              </div>

              {/* Slider c */}
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="flex justify-between font-mono text-slate-300 mb-1">
                  <span>Term "c" (Constant):</span>
                  <span className="font-bold text-amber-400">{c}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={c}
                  onChange={(e) => setC(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-5 (Down)</span>
                  <span>+5 (Up)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE CONCEPT EXPLANATION: Upward vs Downward & What Each Part Does */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Concept 1: What Each Part of y = ax^2 + bx + c Does */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-950 text-sky-400 border border-sky-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white">Role of Each Term in y = ax² + bx + c</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-sky-400">1. Term "a" (in front of x²):</span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Controls upward or downward orientation. If <strong className="text-emerald-400">a &gt; 0</strong> (positive),
                it opens <strong className="text-emerald-300">UPWARD ∪</strong> (Happy Smile, minimum vertex). If{' '}
                <strong className="text-rose-400">a &lt; 0</strong> (negative), it opens{' '}
                <strong className="text-rose-300">DOWNWARD ∩</strong> (Sad Frown, maximum vertex).
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-teal-400">2. Term "b" (in front of x):</span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Combined with "a", it shifts the axis of symmetry and the turning point horizontally to{' '}
                <span className="font-mono text-teal-300 font-bold">x = -b / (2a)</span>. For y = x² - 2x - 3, x = -(-2)/(2×1) = 1!
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-amber-400">3. Term "c" (constant term):</span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Shifts the graph vertically and is the <strong className="text-amber-300">y-intercept</strong>. When x = 0, y = c,
                so the parabola always crosses the vertical axis at <span className="font-mono text-amber-300">(0, c)</span>!
              </p>
            </div>
          </div>
        </div>

        {/* Concept 2: Roots and Turning Point */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white">Roots and Turning Point for Complete Quadratic</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Roots (x-intercepts where y = 0):</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                For our complete quadratic <span className="font-mono text-amber-300">y = x² - 2x - 3</span>, setting y = 0 gives:
                <br />
                <span className="font-mono text-emerald-300 font-bold">(x - 3)(x + 1) = 0</span>.
                <br />
                The roots are at <strong className="text-emerald-300 font-mono">x = -1</strong> and{' '}
                <strong className="text-emerald-300 font-mono">x = 3</strong>!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Turning Point (Vertex):</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                The turning point occurs on the axis of symmetry <span className="font-mono text-teal-300">x = -b / (2a) = 1</span>.
                Plugging in x = 1 gives y = (1)² - 2(1) - 3 = <span className="font-mono text-amber-300 font-bold">-4</span>.
                <br />
                So the turning point is at <strong className="text-amber-300 font-mono">(1, -4)</strong> (Minimum point).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Section */}
      <SubtopicExercises
        title="Complete Quadratic Parabola"
        questions={PARABOLA_QUESTIONS}
        quizAnswers={quizAnswers}
        onSelectAnswer={onSelectQuizAnswer}
      />
    </div>
  );
};
