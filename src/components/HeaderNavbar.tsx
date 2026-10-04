import React from 'react';
import { Award, Compass, Sparkles, BookOpen, PenTool, Send, Palette } from 'lucide-react';
import { StudentProgress } from '../types';
import { ALL_QUESTIONS } from '../data/questions';

export type ActiveTab = 'intro' | 'parabola' | 'cubic' | 'hyperbola' | 'definitions' | 'results';
export type ThemeColor = 'cosmic' | 'blueprint' | 'sunset' | 'cyber';

interface HeaderNavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  progress: StudentProgress;
  currentTheme: ThemeColor;
  onSelectTheme: (theme: ThemeColor) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeTab,
  onSelectTab,
  progress,
  currentTheme,
  onSelectTheme,
}) => {
  // Calculate total score
  const totalScore = ALL_QUESTIONS.reduce((acc, q) => {
    const sel = progress.quizAnswers[q.id];
    if (sel !== undefined && q.options[sel]?.isCorrect) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'intro', label: '1. Overview', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'parabola', label: '2. Parabola', icon: <span className="font-mono text-xs">∪</span> },
    { id: 'cubic', label: '3. Cubic', icon: <span className="font-mono text-xs">∫</span> },
    { id: 'hyperbola', label: '4. Hyperbola', icon: <span className="font-mono text-xs">)(</span> },
    { id: 'definitions', label: '5. My Definitions', icon: <PenTool className="w-3.5 h-3.5" /> },
    {
      id: 'results',
      label: '6. Report & Submit',
      icon: <Send className="w-3.5 h-3.5" />,
      badge: `${totalScore}/15`,
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Student Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-sky-400 text-base">
                ƒ(x)
              </div>
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Curve Graph Explorer</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 hidden sm:inline-block">
                  Semesta School
                </span>
              </h1>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>Student: <strong className="text-slate-200">{progress.name || 'Student'}</strong></span>
                <span>·</span>
                <span>Class: <strong className="text-slate-200">{progress.studentClass || '10'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Theme Selector & Overall Score */}
          <div className="flex items-center gap-3">
            {/* Theme Picker */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-[11px]">
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-1 mr-0.5" />
              <button
                onClick={() => onSelectTheme('cosmic')}
                title="Cosmic Indigo Theme"
                className={`w-4 h-4 rounded-full bg-indigo-600 transition ${
                  currentTheme === 'cosmic' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
              <button
                onClick={() => onSelectTheme('blueprint')}
                title="Ocean Blueprint Theme"
                className={`w-4 h-4 rounded-full bg-cyan-600 transition ${
                  currentTheme === 'blueprint' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
              <button
                onClick={() => onSelectTheme('sunset')}
                title="Warm Sunset Theme"
                className={`w-4 h-4 rounded-full bg-amber-600 transition ${
                  currentTheme === 'sunset' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
              <button
                onClick={() => onSelectTheme('cyber')}
                title="Cyber Slate Theme"
                className={`w-4 h-4 rounded-full bg-emerald-600 transition ${
                  currentTheme === 'cyber' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
            </div>

            {/* Score Capsule */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-3 py-1.5 rounded-xl font-mono text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400 hidden sm:inline">Score:</span>
              <span className="font-bold text-emerald-400 text-sm">{totalScore}</span>
              <span className="text-slate-500">/ 15</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-1 mt-2.5 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-amber-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
