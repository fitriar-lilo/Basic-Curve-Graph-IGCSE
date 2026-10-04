import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { Point, StudentAnswersTable } from '../types';

interface TableRowData {
  x: number;
  expectedY: number;
  hintStep: string;
}

interface TableOfPointsProps {
  formulaLabel: string;
  rows: TableRowData[];
  studentAnswers: StudentAnswersTable;
  onUpdateAnswer: (x: number, value: string) => void;
  onPlotPoints: (points: Point[]) => void;
  onConnectPoints: () => void;
  isConnected: boolean;
  accentColor?: string;
}

export const TableOfPoints: React.FC<TableOfPointsProps> = ({
  formulaLabel,
  rows,
  studentAnswers,
  onUpdateAnswer,
  onPlotPoints,
  onConnectPoints,
  isConnected,
  accentColor = 'sky',
}) => {
  const [showHints, setShowHints] = useState(false);

  // Check how many are answered correctly
  const evaluatedRows = rows.map((r) => {
    const rawVal = studentAnswers[r.x]?.trim() ?? '';
    const numVal = parseInt(rawVal, 10);
    const hasAnswered = rawVal !== '' && !isNaN(numVal);
    const isCorrect = hasAnswered && numVal === r.expectedY;
    return {
      ...r,
      rawVal,
      numVal,
      hasAnswered,
      isCorrect,
    };
  });

  const correctCount = evaluatedRows.filter((r) => r.isCorrect).length;
  const isComplete = correctCount === rows.length;

  // Whenever answers change, update plotted points
  const handleInputChange = (x: number, val: string) => {
    onUpdateAnswer(x, val);
    const num = parseInt(val.trim(), 10);
    // Find all currently valid points
    const newPoints: Point[] = [];
    rows.forEach((r) => {
      const v = r.x === x ? num : parseInt((studentAnswers[r.x] || '').trim(), 10);
      if (!isNaN(v) && v === r.expectedY) {
        newPoints.push({ x: r.x, y: v });
      }
    });
    onPlotPoints(newPoints);

    if (newPoints.length === rows.length) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleFillAll = () => {
    rows.forEach((r) => {
      onUpdateAnswer(r.x, r.expectedY.toString());
    });
    onPlotPoints(rows.map((r) => ({ x: r.x, y: r.expectedY })));
    confetti({ particleCount: 60, spread: 70 });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>📊 Step 1: Collection of Points Table</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Calculate <span className="font-mono text-amber-300 font-semibold">{formulaLabel}</span> for each integer{' '}
              <span className="font-mono text-cyan-300">x</span>.
            </p>
          </div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/60 border border-indigo-800/80 px-2.5 py-1.5 rounded-lg transition"
            title="Toggle calculation steps"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHints ? 'Hide Hints' : 'Show Calculation Steps'}</span>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-emerald-500 h-2 transition-all duration-300"
            style={{ width: `${(correctCount / rows.length) * 100}%` }}
          ></div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 w-16 text-center">x-value</th>
                {showHints && <th className="py-2.5 px-3">Working Step</th>}
                <th className="py-2.5 px-3 w-28 text-center">Student y-value</th>
                <th className="py-2.5 px-3 text-center w-24">Coordinate (x, y)</th>
                <th className="py-2.5 px-3 text-center w-16">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {evaluatedRows.map((row) => (
                <tr
                  key={`tbl-row-${row.x}`}
                  className={`transition-colors ${
                    row.isCorrect
                      ? 'bg-emerald-950/20'
                      : row.hasAnswered
                      ? 'bg-rose-950/20'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-2 px-3 text-center font-bold text-cyan-300 text-sm">{row.x}</td>
                  {showHints && (
                    <td className="py-2 px-3 text-slate-400 font-sans text-xs">
                      <span className="bg-slate-800/80 px-2 py-0.5 rounded text-amber-200">{row.hintStep}</span>
                    </td>
                  )}
                  <td className="py-2 px-3 text-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={row.rawVal}
                      onChange={(e) => handleInputChange(row.x, e.target.value)}
                      placeholder="?"
                      className={`w-20 text-center py-1 px-2 rounded-lg text-sm font-bold transition focus:outline-none focus:ring-2 ${
                        row.isCorrect
                          ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500 focus:ring-emerald-400'
                          : row.hasAnswered
                          ? 'bg-rose-900/60 text-rose-200 border border-rose-500 focus:ring-rose-400'
                          : 'bg-slate-800 text-slate-100 border border-slate-600 focus:ring-sky-400'
                      }`}
                    />
                  </td>
                  <td className="py-2 px-3 text-center text-xs">
                    {row.isCorrect ? (
                      <span className="text-emerald-300 font-bold bg-emerald-950/70 border border-emerald-700/60 px-2 py-0.5 rounded">
                        ({row.x}, {row.expectedY})
                      </span>
                    ) : (
                      <span className="text-slate-500">({row.x}, ?)</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {row.isCorrect ? (
                      <span className="inline-flex items-center text-emerald-400" title="Correct!">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : row.hasAnswered ? (
                      <span className="inline-flex items-center text-rose-400" title="Check your math">
                        <AlertCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-emerald-400">{correctCount}</span> of{' '}
          <span className="font-semibold text-slate-200">{rows.length}</span> points completed correctly.
        </div>

        <div className="flex items-center gap-2">
          {!isComplete && (
            <button
              onClick={handleFillAll}
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 transition"
            >
              Fill Correct Values
            </button>
          )}

          <button
            onClick={onConnectPoints}
            disabled={!isComplete}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all ${
              isComplete
                ? isConnected
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110 animate-bounce'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {isConnected
                ? 'Points Connected! (Toggle Curve)'
                : isComplete
                ? '✨ Connect All Points Now!'
                : 'Complete Table to Connect'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
