import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, HelpCircle, ChevronRight, Award, RotateCcw } from 'lucide-react';
import { ExerciseQuestion } from '../types';

interface SubtopicExercisesProps {
  title: string;
  questions: ExerciseQuestion[];
  quizAnswers: { [questionId: string]: number };
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
  accentBadgeColor?: string;
}

export const SubtopicExercises: React.FC<SubtopicExercisesProps> = ({
  title,
  questions,
  quizAnswers,
  onSelectAnswer,
  accentBadgeColor = 'emerald',
}) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [showHint, setShowHint] = useState<{ [qId: string]: boolean }>({});

  const currentQ = questions[activeQuestionIdx];
  const selectedOptionIdx = quizAnswers[currentQ.id];

  // Count correct answers for this set
  let subtopicScore = 0;
  questions.forEach((q) => {
    const sel = quizAnswers[q.id];
    if (sel !== undefined && q.options[sel]?.isCorrect) {
      subtopicScore += 1;
    }
  });

  const handleSelect = (idx: number) => {
    onSelectAnswer(currentQ.id, idx);
    if (currentQ.options[idx].isCorrect) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
    }
  };

  const isCurrentAnswered = selectedOptionIdx !== undefined;
  const isCurrentCorrect = isCurrentAnswered && currentQ.options[selectedOptionIdx].isCorrect;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl text-slate-100">
      {/* Exercise Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <h3 className="text-base font-bold text-slate-100">{title} Practice Exercises</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">5 Questions · 1 Point each · Integers only</p>
        </div>

        {/* Score badge */}
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Score:</span>
          <span className="text-sm font-bold text-emerald-400">{subtopicScore}</span>
          <span className="text-slate-500">/ {questions.length}</span>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center gap-2 my-4 overflow-x-auto pb-1">
        {questions.map((q, idx) => {
          const ans = quizAnswers[q.id];
          const isAns = ans !== undefined;
          const isCorr = isAns && q.options[ans].isCorrect;
          const isCurrent = idx === activeQuestionIdx;

          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIdx(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isCurrent
                  ? 'border-sky-500 bg-sky-950/80 text-sky-200 ring-2 ring-sky-500/30'
                  : isAns
                  ? isCorr
                    ? 'border-emerald-600 bg-emerald-950/50 text-emerald-300'
                    : 'border-rose-700 bg-rose-950/50 text-rose-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span>Q{idx + 1}</span>
              {isAns &&
                (isCorr ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />)}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 mb-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-xs font-mono font-semibold uppercase text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
            Question {activeQuestionIdx + 1} of {questions.length}
          </span>
          <button
            onClick={() =>
              setShowHint((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))
            }
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint[currentQ.id] ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>
        </div>

        {/* Hint Box */}
        {showHint[currentQ.id] && (
          <div className="mb-3 p-3 bg-amber-950/40 border border-amber-800/80 rounded-lg text-xs text-amber-200 flex items-start gap-2">
            <span className="font-bold text-amber-400">💡 Hint:</span>
            <span>{currentQ.hint}</span>
          </div>
        )}

        {/* Prompt */}
        <h4 className="text-sm md:text-base font-semibold text-slate-100 leading-snug mb-4">
          {currentQ.prompt}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = selectedOptionIdx === oIdx;
            let btnClass = 'border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800/80';

            if (isCurrentAnswered) {
              if (opt.isCorrect) {
                btnClass = 'border-emerald-500 bg-emerald-950/70 text-emerald-100 ring-1 ring-emerald-500/50';
              } else if (isSelected && !opt.isCorrect) {
                btnClass = 'border-rose-600 bg-rose-950/70 text-rose-200 ring-1 ring-rose-500/50';
              } else {
                btnClass = 'border-slate-800/50 bg-slate-950 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={oIdx}
                onClick={() => handleSelect(oIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-medium transition-all flex items-start gap-3 ${btnClass}`}
              >
                <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className="flex-1">{opt.label}</span>
                {isCurrentAnswered && opt.isCorrect && (
                  <span className="text-emerald-400 font-bold shrink-0 text-xs flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Correct (+1)
                  </span>
                )}
                {isCurrentAnswered && isSelected && !opt.isCorrect && (
                  <span className="text-rose-400 font-bold shrink-0 text-xs flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Try again
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isCurrentAnswered && (
          <div
            className={`mt-4 p-3.5 rounded-xl border text-xs ${
              isCurrentCorrect
                ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                : 'bg-rose-950/30 border-rose-800/80 text-rose-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {isCurrentCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Great job! Correct explanation:</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Explanation & How to solve:</span>
                </>
              )}
            </div>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Stepper Footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveQuestionIdx(Math.max(0, activeQuestionIdx - 1))}
          disabled={activeQuestionIdx === 0}
          className="text-xs text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:hover:text-slate-400 px-3 py-1.5 rounded-lg border border-slate-800 transition"
        >
          Previous Question
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Question {activeQuestionIdx + 1} of {questions.length}
        </span>

        <button
          onClick={() => setActiveQuestionIdx(Math.min(questions.length - 1, activeQuestionIdx + 1))}
          disabled={activeQuestionIdx === questions.length - 1}
          className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 disabled:opacity-40 disabled:hover:text-sky-400 px-3 py-1.5 rounded-lg border border-sky-800/60 bg-sky-950/50 transition font-bold"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
