import React, { useState, useEffect } from 'react';
import { HeaderNavbar, ActiveTab, ThemeColor } from './components/HeaderNavbar';
import { IntroSection } from './components/IntroSection';
import { ParabolaSection } from './components/ParabolaSection';
import { CubicSection } from './components/CubicSection';
import { HyperbolaSection } from './components/HyperbolaSection';
import { StudentDefinitionsSection } from './components/StudentDefinitionsSection';
import { ExportSummarySection } from './components/ExportSummarySection';
import { StudentProgress } from './types';
import { ChevronLeft, ChevronRight, Award, Sparkles, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'curve_graph_student_progress_v2';

const initialProgress: StudentProgress = {
  name: '',
  studentClass: '10-A',
  school: 'Semesta School',
  date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  parabolaTable: {},
  cubicTable: {},
  hyperbolaTable: {},
  parabolaPointsConnected: false,
  cubicPointsConnected: false,
  hyperbolaPointsConnected: false,
  quizAnswers: {},
  definitions: {
    roots: '',
    turningPoint: '',
    inflectionPoint: '',
    asymptote: '',
  },
  analysis: {
    parabolaDirection: '',
    hyperbolaPosition: '',
    curveFromPointsInsight: '',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('intro');
  const [theme, setTheme] = useState<ThemeColor>('cosmic');

  // Load saved progress or default
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialProgress, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load saved progress:', e);
    }
    return initialProgress;
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to persist progress:', e);
    }
  }, [progress]);

  // Update handlers
  const handleUpdateTable = (
    subtopic: 'parabolaTable' | 'cubicTable' | 'hyperbolaTable',
    x: number,
    value: string
  ) => {
    setProgress((prev) => ({
      ...prev,
      [subtopic]: {
        ...prev[subtopic],
        [x]: value,
      },
    }));
  };

  const handleConnectPoints = (subtopic: 'parabolaPointsConnected' | 'cubicPointsConnected' | 'hyperbolaPointsConnected') => {
    setProgress((prev) => ({
      ...prev,
      [subtopic]: !prev[subtopic],
    }));
  };

  const handleSelectQuizAnswer = (qId: string, optIdx: number) => {
    setProgress((prev) => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [qId]: optIdx,
      },
    }));
  };

  const handleUpdateDefinition = (field: keyof StudentProgress['definitions'], value: string) => {
    setProgress((prev) => ({
      ...prev,
      definitions: {
        ...prev.definitions,
        [field]: value,
      },
    }));
  };

  const handleUpdateAnalysis = (field: keyof StudentProgress['analysis'], value: string) => {
    setProgress((prev) => ({
      ...prev,
      analysis: {
        ...prev.analysis,
        [field]: value,
      },
    }));
  };

  const handleUpdateStudentInfo = (field: 'name' | 'studentClass' | 'school', value: string) => {
    setProgress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Tab ordering for bottom navigation
  const tabsList: ActiveTab[] = ['intro', 'parabola', 'cubic', 'hyperbola', 'definitions', 'results'];
  const currentTabIdx = tabsList.indexOf(activeTab);

  const goToNextTab = () => {
    if (currentTabIdx < tabsList.length - 1) {
      setActiveTab(tabsList[currentTabIdx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevTab = () => {
    if (currentTabIdx > 0) {
      setActiveTab(tabsList[currentTabIdx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Background Theme Styles
  const getThemeBackgroundClass = () => {
    switch (theme) {
      case 'cosmic':
        // Deep Indigo with subtle radiant purple & cyan glows
        return 'bg-[#060814] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]';
      case 'blueprint':
        // Engineering Ocean Blueprint
        return 'bg-[#031525] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.22),rgba(255,255,255,0))]';
      case 'sunset':
        // Warm Sunset Amber & Rose
        return 'bg-[#180a14] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(244,63,94,0.2),rgba(245,158,11,0.1))]';
      case 'cyber':
        // Emerald Cyber Matrix
        return 'bg-[#03110d] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.2),rgba(255,255,255,0))]';
      default:
        return 'bg-slate-950';
    }
  };

  return (
    <div className={`min-h-screen text-slate-100 ${getThemeBackgroundClass()} flex flex-col font-sans selection:bg-sky-500 selection:text-white`}>
      {/* Top sticky Navbar */}
      <HeaderNavbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        progress={progress}
        currentTheme={theme}
        onSelectTheme={setTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'intro' && <IntroSection onStartSubtopic={(tab) => setActiveTab(tab)} />}

        {activeTab === 'parabola' && (
          <ParabolaSection
            tableAnswers={progress.parabolaTable}
            onUpdateTableAnswer={(x, val) => handleUpdateTable('parabolaTable', x, val)}
            isConnected={progress.parabolaPointsConnected}
            onConnectPoints={() => handleConnectPoints('parabolaPointsConnected')}
            quizAnswers={progress.quizAnswers}
            onSelectQuizAnswer={handleSelectQuizAnswer}
          />
        )}

        {activeTab === 'cubic' && (
          <CubicSection
            tableAnswers={progress.cubicTable}
            onUpdateTableAnswer={(x, val) => handleUpdateTable('cubicTable', x, val)}
            isConnected={progress.cubicPointsConnected}
            onConnectPoints={() => handleConnectPoints('cubicPointsConnected')}
            quizAnswers={progress.quizAnswers}
            onSelectQuizAnswer={handleSelectQuizAnswer}
          />
        )}

        {activeTab === 'hyperbola' && (
          <HyperbolaSection
            tableAnswers={progress.hyperbolaTable}
            onUpdateTableAnswer={(x, val) => handleUpdateTable('hyperbolaTable', x, val)}
            isConnected={progress.hyperbolaPointsConnected}
            onConnectPoints={() => handleConnectPoints('hyperbolaPointsConnected')}
            quizAnswers={progress.quizAnswers}
            onSelectQuizAnswer={handleSelectQuizAnswer}
          />
        )}

        {activeTab === 'definitions' && (
          <StudentDefinitionsSection
            definitions={progress.definitions}
            analysis={progress.analysis}
            onUpdateDefinition={handleUpdateDefinition}
            onUpdateAnalysis={handleUpdateAnalysis}
          />
        )}

        {activeTab === 'results' && (
          <ExportSummarySection
            progress={progress}
            onUpdateInfo={handleUpdateStudentInfo}
          />
        )}

        {/* Global Bottom Pagination Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={goToPrevTab}
            disabled={currentTabIdx === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/80 border border-slate-700 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Step {currentTabIdx + 1} of {tabsList.length}
          </div>

          <button
            onClick={goToNextTab}
            disabled={currentTabIdx === tabsList.length - 1}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-950 disabled:opacity-30 disabled:pointer-events-none transition"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>Digital Learning Interactive Activity · Curve Graphs</span>
          <span>
            Teacher Contact:{' '}
            <a href="mailto:fitriar@semesta.sch.id" className="text-sky-400 hover:underline">
              fitriar@semesta.sch.id
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
