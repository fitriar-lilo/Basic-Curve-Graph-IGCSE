export type CurveType = 'parabola' | 'cubic' | 'hyperbola';

export interface Point {
  x: number;
  y: number;
}

export interface StudentAnswersTable {
  [xVal: number]: string;
}

export interface ExerciseQuestion {
  id: string;
  subtopic: CurveType;
  prompt: string;
  hint: string;
  options: {
    label: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface StudentProgress {
  name: string;
  studentClass: string;
  school: string;
  date: string;
  parabolaTable: StudentAnswersTable;
  cubicTable: StudentAnswersTable;
  hyperbolaTable: StudentAnswersTable;
  parabolaPointsConnected: boolean;
  cubicPointsConnected: boolean;
  hyperbolaPointsConnected: boolean;
  quizAnswers: { [questionId: string]: number }; // questionId -> selectedOptionIndex
  definitions: {
    roots: string;
    turningPoint: string;
    inflectionPoint: string;
    asymptote: string;
  };
  analysis: {
    parabolaDirection: string;
    hyperbolaPosition: string;
    curveFromPointsInsight: string;
  };
}
