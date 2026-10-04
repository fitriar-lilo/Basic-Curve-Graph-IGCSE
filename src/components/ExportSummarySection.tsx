import React, { useState } from 'react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import {
  Download,
  Mail,
  Award,
  CheckCircle,
  Copy,
  Printer,
  Sparkles,
  ExternalLink,
  User,
  GraduationCap,
} from 'lucide-react';
import { StudentProgress } from '../types';
import { PARABOLA_QUESTIONS, CUBIC_QUESTIONS, HYPERBOLA_QUESTIONS } from '../data/questions';

interface ExportSummarySectionProps {
  progress: StudentProgress;
  onUpdateInfo: (field: 'name' | 'studentClass' | 'school', value: string) => void;
}

export const ExportSummarySection: React.FC<ExportSummarySectionProps> = ({ progress, onUpdateInfo }) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const teacherEmail = 'fitriar@semesta.sch.id';

  // Calculate scores
  const getSubtopicScore = (questions: typeof PARABOLA_QUESTIONS) => {
    return questions.reduce((acc, q) => {
      const selected = progress.quizAnswers[q.id];
      if (selected !== undefined && q.options[selected]?.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const parabolaScore = getSubtopicScore(PARABOLA_QUESTIONS);
  const cubicScore = getSubtopicScore(CUBIC_QUESTIONS);
  const hyperbolaScore = getSubtopicScore(HYPERBOLA_QUESTIONS);
  const totalScore = parabolaScore + cubicScore + hyperbolaScore;
  const maxScore = 15;

  const percentage = Math.round((totalScore / maxScore) * 100);

  // Generate Email Content
  const generateEmailBody = () => {
    return `DIGITAL LEARNING ACTIVITY REPORT: CURVE GRAPHS
Topic: Sketching Parabolas, Cubics, and Hyperbolas from Collections of Points

--------------------------------------------------
STUDENT INFORMATION:
• Student Name: ${progress.name || 'Anonymous Student'}
• Class / Grade: ${progress.studentClass || 'Not Specified'}
• School: ${progress.school || 'Semesta School'}
• Date Completed: ${progress.date}

--------------------------------------------------
EXERCISE SCORES:
• Parabola (y = ax² + bx + c): ${parabolaScore} / 5
• Cubic (y = ax³ + c): ${cubicScore} / 5
• Hyperbola (y = a/x): ${hyperbolaScore} / 5
• TOTAL SCORE: ${totalScore} / ${maxScore} (${percentage}%)

--------------------------------------------------
STUDENT DEFINITIONS (In their own words):

1. Roots (x-intercepts):
${progress.definitions.roots || '(Not answered yet)'}

2. Turning Point (Vertex):
${progress.definitions.turningPoint || '(Not answered yet)'}

3. Inflection Point:
${progress.definitions.inflectionPoint || '(Not answered yet)'}

4. Asymptote:
${progress.definitions.asymptote || '(Not answered yet)'}

--------------------------------------------------
STUDENT ANALYSIS RESULTS:

A. Parabola (Upward vs Downward):
${progress.analysis.parabolaDirection || '(Not answered yet)'}

B. Hyperbola (Position & Axes):
${progress.analysis.hyperbolaPosition || '(Not answered yet)'}

C. Discovery on Curves from Collection of Points:
${progress.analysis.curveFromPointsInsight || '(Not answered yet)'}

--------------------------------------------------
Submitted via Curve Graph Explorer Studio
`;
  };

  const emailSubject = encodeURIComponent(
    `[Math Activity] Curve Graph Report - ${progress.name || 'Student'} (${progress.studentClass || 'Class'})`
  );
  const emailMailto = `mailto:${teacherEmail}?subject=${emailSubject}&body=${encodeURIComponent(generateEmailBody())}`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateEmailBody());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Generate and Download PDF using jsPDF
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const primaryColor: [number, number, number] = [15, 23, 42]; // Slate 900
      const accentColor: [number, number, number] = [14, 165, 233]; // Sky 500

      // Header Banner
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 32, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('CURVE GRAPH LEARNING REPORT', 14, 14);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(186, 230, 253);
      doc.text('Parabola, Cubic, and Hyperbola Interactive Studio', 14, 22);
      doc.text(`Submitted to: ${teacherEmail}`, 14, 27);

      // Student Info Card
      doc.setDrawColor(203, 213, 225);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 38, 182, 28, 3, 3, 'FD');

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Student Name: ${progress.name || 'Student'}`, 18, 46);
      doc.text(`Class / Grade: ${progress.studentClass || 'Not Specified'}`, 18, 54);
      doc.text(`School: ${progress.school || 'Semesta School'}`, 110, 46);
      doc.text(`Date: ${progress.date}`, 110, 54);

      // Score Summary Box
      doc.setFillColor(...accentColor);
      doc.roundedRect(14, 70, 182, 22, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`TOTAL SCORE: ${totalScore} / ${maxScore} (${percentage}%)`, 20, 84);

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Parabola: ${parabolaScore}/5   |   Cubic: ${cubicScore}/5   |   Hyperbola: ${hyperbolaScore}/5`, 95, 84);

      let currentY = 102;

      // Section 1: Definitions in Own Words
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('1. Student Definitions (In Their Own Words):', 14, currentY);
      currentY += 6;

      const printQandA = (title: string, content: string) => {
        if (currentY > 260) {
          doc.addPage();
          currentY = 20;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text(title, 14, currentY);
        currentY += 4;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        const splitText = doc.splitTextToSize(content || '(No response provided)', 180);
        doc.text(splitText, 14, currentY);
        currentY += splitText.length * 4.5 + 4;
      };

      printQandA('• Roots (x-intercepts):', progress.definitions.roots);
      printQandA('• Turning Point (Vertex):', progress.definitions.turningPoint);
      printQandA('• Inflection Point:', progress.definitions.inflectionPoint);
      printQandA('• Asymptotes:', progress.definitions.asymptote);

      currentY += 4;
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }

      // Section 2: Student Analysis
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('2. Student Analysis & Conclusions:', 14, currentY);
      currentY += 6;

      printQandA('• Parabola Orientation (Upward vs Downward):', progress.analysis.parabolaDirection);
      printQandA('• Hyperbola Positions & Boundaries:', progress.analysis.hyperbolaPosition);
      printQandA('• How Curves Emerge from Points:', progress.analysis.curveFromPointsInsight);

      // Save the PDF
      doc.save(`Curve_Graph_Activity_${(progress.name || 'Student').replace(/\s+/g, '_')}.pdf`);
      confetti({ particleCount: 70, spread: 80 });
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-sky-950/80 border border-teal-800/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-teal-900/80 text-teal-300 border border-teal-700">
                <Award className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Final Results & Submission</h2>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Congratulations on completing your exploration of curve graphs! Review your score, save a PDF copy for your
              records, and submit your work directly to your teacher.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Teacher Contact</span>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800">
              {teacherEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Student Profile Input Card */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <User className="w-4 h-4 text-sky-400" />
          <span>Student Information for Official Report</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Student Full Name:</label>
            <input
              type="text"
              value={progress.name}
              onChange={(e) => onUpdateInfo('name', e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Class / Grade:</label>
            <input
              type="text"
              value={progress.studentClass}
              onChange={(e) => onUpdateInfo('studentClass', e.target.value)}
              placeholder="e.g. Class 10A / Grade 10"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">School Name:</label>
            <input
              type="text"
              value={progress.school}
              onChange={(e) => onUpdateInfo('school', e.target.value)}
              placeholder="e.g. Semesta School"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Score Cards Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Score */}
        <div className="bg-gradient-to-br from-amber-950/70 to-slate-900 border border-amber-600/60 rounded-2xl p-5 shadow-xl flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Overall Score</span>
          <div className="text-4xl font-extrabold text-white my-2 font-mono">
            {totalScore} <span className="text-lg text-slate-400 font-normal">/ {maxScore}</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {percentage}% Mastery
          </span>
        </div>

        {/* Parabola Score */}
        <div className="bg-slate-900/90 border border-sky-800/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-sky-400 font-bold mb-1">
              <span>Parabola</span>
              <span>Subtopic 1</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">{parabolaScore} / 5</div>
            <p className="text-[11px] text-slate-400 mt-1">Roots & Turning Point (Min/Max)</p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
            <div className="bg-sky-400 h-1.5 rounded-full" style={{ width: `${(parabolaScore / 5) * 100}%` }}></div>
          </div>
        </div>

        {/* Cubic Score */}
        <div className="bg-slate-900/90 border border-purple-800/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-purple-400 font-bold mb-1">
              <span>Cubic</span>
              <span>Subtopic 2</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">{cubicScore} / 5</div>
            <p className="text-[11px] text-slate-400 mt-1">Inflection Point (0, c) & Bend</p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
            <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: `${(cubicScore / 5) * 100}%` }}></div>
          </div>
        </div>

        {/* Hyperbola Score */}
        <div className="bg-slate-900/90 border border-orange-800/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-orange-400 font-bold mb-1">
              <span>Hyperbola</span>
              <span>Subtopic 3</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">{hyperbolaScore} / 5</div>
            <p className="text-[11px] text-slate-400 mt-1">Asymptotes (x=0, y=0) & Quadrants</p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
            <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: `${(hyperbolaScore / 5) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Submission Actions */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>📤 Download PDF or Submit to Teacher</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action 1: Download PDF */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-1">
                <Download className="w-4 h-4" />
                <span>1. Download Official PDF Report</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate a clean formatted PDF file on your device with your full scorecard, collection of points records,
                definitions, and analysis conclusions.
              </p>
            </div>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download My PDF Result'}</span>
            </button>
          </div>

          {/* Action 2: Send Email to Teacher */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <Mail className="w-4 h-4" />
                <span>2. Send Result to Teacher Email</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directly email your teacher at <strong className="text-amber-300 font-mono">{teacherEmail}</strong> with
                your complete answers and analysis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={emailMailto}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Open Mail Client</span>
              </a>

              <button
                onClick={handleCopyReport}
                className="flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                title="Copy entire text report to paste manually"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Email Text Preview */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Submission Content Preview:</span>
            <span className="text-[11px] text-slate-500 font-mono">Recipient: {teacherEmail}</span>
          </div>
          <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
            {generateEmailBody()}
          </pre>
        </div>
      </div>
    </div>
  );
};
