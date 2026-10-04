import { ExerciseQuestion } from '../types';

export const PARABOLA_QUESTIONS: ExerciseQuestion[] = [
  {
    id: 'p1',
    subtopic: 'parabola',
    prompt: 'In the complete quadratic equation y = x² - 2x - 3, does the curve open UPWARD or DOWNWARD?',
    hint: 'Look at the coefficient "a" in front of x² (a = 1). Is it positive or negative?',
    options: [
      { label: 'Upward (Smile shape ∪) because a = 1 is positive (a > 0)', isCorrect: true },
      { label: 'Downward (Frown shape ∩) because the b and c terms have minus signs', isCorrect: false },
      { label: 'It is a straight diagonal line', isCorrect: false },
      { label: 'It opens horizontally to the right', isCorrect: false }
    ],
    explanation: 'In y = ax² + bx + c, the sign of "a" completely controls the direction! Here a = 1 (positive), so the parabola curves UPWARD like a bowl/smile (∪).'
  },
  {
    id: 'p2',
    subtopic: 'parabola',
    prompt: 'For the complete quadratic parabola y = x² - 2x - 3, what are the ROOTS (x-intercepts where y = 0)?',
    hint: 'Test which x-values make (x)² - 2(x) - 3 = 0. Notice that (3)² - 2(3) - 3 = 9 - 6 - 3 = 0.',
    options: [
      { label: 'x = 3 and x = -1', isCorrect: true },
      { label: 'x = 2 and x = -2', isCorrect: false },
      { label: 'x = 0 and x = -3', isCorrect: false },
      { label: 'x = 1 and x = -4', isCorrect: false }
    ],
    explanation: 'Plugging in x = 3 gives 3² - 2(3) - 3 = 9 - 6 - 3 = 0. Plugging in x = -1 gives (-1)² - 2(-1) - 3 = 1 + 2 - 3 = 0. Thus the roots are x = 3 and x = -1.'
  },
  {
    id: 'p3',
    subtopic: 'parabola',
    prompt: 'What is the TURNING POINT (Vertex) of y = x² - 2x - 3?',
    hint: 'For complete quadratic y = ax² + bx + c, the turning point x-value is x = -b / (2a) = -(-2) / (2×1) = 1. Now find y when x = 1.',
    options: [
      { label: 'Coordinate (1, -4) — it is a Minimum turning point', isCorrect: true },
      { label: 'Coordinate (0, -3) — it is an Inflection point', isCorrect: false },
      { label: 'Coordinate (-1, 0) — it is a Maximum turning point', isCorrect: false },
      { label: 'Coordinate (2, -3) — it is an Asymptote', isCorrect: false }
    ],
    explanation: 'The axis of symmetry is at x = 1. Substituting x = 1 gives y = (1)² - 2(1) - 3 = 1 - 2 - 3 = -4. Since it opens upward, (1, -4) is the lowest turning point (Minimum).'
  },
  {
    id: 'p4',
    subtopic: 'parabola',
    prompt: 'Which of the following complete quadratic equations (y = ax² + bx + c) opens DOWNWARD with a MAXIMUM peak?',
    hint: 'A frown curve opening downward requires a negative "a" coefficient (a < 0) with all three terms present.',
    options: [
      { label: 'y = -x² + 4x - 3 (where a = -1, b = 4, c = -3)', isCorrect: true },
      { label: 'y = x² + 4x - 3 (where a = 1, b = 4, c = -3)', isCorrect: false },
      { label: 'y = 2x² - 2x + 1 (where a = 2, b = -2, c = 1)', isCorrect: false },
      { label: 'y = 3x² + 5x + 2 (where a = 3, b = 5, c = 2)', isCorrect: false }
    ],
    explanation: 'In y = -x² + 4x - 3, a = -1 is negative. A negative "a" turns the parabola upside down into a frown (∩), giving it a highest peak (Maximum).'
  },
  {
    id: 'p5',
    subtopic: 'parabola',
    prompt: 'In the complete quadratic equation y = ax² + bx + c, what point is ALWAYS the y-intercept (where x = 0)?',
    hint: 'If you substitute x = 0 into y = a(0)² + b(0) + c, what is left?',
    options: [
      { label: 'Point (0, c) — because when x = 0, both ax² and bx become 0, leaving y = c', isCorrect: true },
      { label: 'Point (0, a + b) — the sum of the first two terms', isCorrect: false },
      { label: 'Point (0, 0) — every parabola must pass through the origin', isCorrect: false },
      { label: 'Point (c, 0) — on the horizontal axis', isCorrect: false }
    ],
    explanation: 'When x = 0: y = a(0)² + b(0) + c = 0 + 0 + c = c. Thus the complete parabola always crosses the vertical y-axis at the point (0, c).'
  }
];

export const CUBIC_QUESTIONS: ExerciseQuestion[] = [
  {
    id: 'c1',
    subtopic: 'cubic',
    prompt: 'For the cubic curve y = x³ - 8, what integer value of x is the ROOT (makes y = 0)?',
    hint: 'We need x³ = 8. Think: what integer times itself three times gives 8? ( __ × __ × __ = 8)',
    options: [
      { label: 'x = 2 (since 2 × 2 × 2 = 8)', isCorrect: true },
      { label: 'x = 4 (since 4 × 2 = 8)', isCorrect: false },
      { label: 'x = -2 (since -2 cubed is -8)', isCorrect: false },
      { label: 'x = 8', isCorrect: false }
    ],
    explanation: '2³ - 8 = 8 - 8 = 0. So the root where the curve cuts through the x-axis is at x = 2.'
  },
  {
    id: 'c2',
    subtopic: 'cubic',
    prompt: 'Where is the INFLECTION POINT of the cubic curve y = x³ + 3?',
    hint: 'For y = ax³ + c, the point where the curvature changes from concave down to concave up is at x = 0.',
    options: [
      { label: 'At coordinate (0, 3)', isCorrect: true },
      { label: 'At coordinate (3, 0)', isCorrect: false },
      { label: 'At coordinate (1, 4)', isCorrect: false },
      { label: 'Cubic curves do not have inflection points', isCorrect: false }
    ],
    explanation: 'For y = ax³ + c, the center of rotational symmetry and inflection point is at (0, c). Here c = 3, so the inflection point is (0, 3).'
  },
  {
    id: 'c3',
    subtopic: 'cubic',
    prompt: 'If a is negative in y = -x³ + 1, how does the cubic curve travel from left to right?',
    hint: 'When x is very negative (like x = -3), -(-3)³ = +27 (very high). When x is positive (like x = +3), -(+3)³ = -27 (very low).',
    options: [
      { label: 'It starts high on the top-left and falls downward to the bottom-right', isCorrect: true },
      { label: 'It starts low on the bottom-left and rises upward to the top-right', isCorrect: false },
      { label: 'It forms a closed circle', isCorrect: false },
      { label: 'It forms a U-shape like a parabola', isCorrect: false }
    ],
    explanation: 'When a is negative, the graph flips upside down: it starts in the high top-left (Quadrant II) and drops down to the bottom-right (Quadrant IV).'
  },
  {
    id: 'c4',
    subtopic: 'cubic',
    prompt: 'Calculate the value of y for the curve y = 2x³ when x = -2:',
    hint: 'First find (-2)³ = (-2) × (-2) × (-2) = -8. Then multiply by 2.',
    options: [
      { label: 'y = -16', isCorrect: true },
      { label: 'y = +16', isCorrect: false },
      { label: 'y = -12', isCorrect: false },
      { label: 'y = -8', isCorrect: false }
    ],
    explanation: 'y = 2 × (-2)³ = 2 × (-8) = -16. A negative number multiplied three times stays negative!'
  },
  {
    id: 'c5',
    subtopic: 'cubic',
    prompt: 'What special event happens at an INFLECTION POINT on a curve?',
    hint: 'Think about how the curve bends (like bending a flexible ruler).',
    options: [
      { label: 'The curve changes its bend/curvature (from curving down to curving up or vice versa)', isCorrect: true },
      { label: 'The curve completely stops and bounces back like a ball', isCorrect: false },
      { label: 'The curve splits into two separate broken lines', isCorrect: false },
      { label: 'The curve must cross the x-axis at y = 0', isCorrect: false }
    ],
    explanation: 'An inflection point is the exact transition point where the curve switches its curvature (from concave to convex or vice versa).'
  }
];

export const HYPERBOLA_QUESTIONS: ExerciseQuestion[] = [
  {
    id: 'h1',
    subtopic: 'hyperbola',
    prompt: 'For the hyperbola y = 6/x, what value can x NEVER equal?',
    hint: 'Can you divide any number by zero in mathematics?',
    options: [
      { label: 'x = 0 (Division by zero is undefined/impossible)', isCorrect: true },
      { label: 'x = 6', isCorrect: false },
      { label: 'x = 1', isCorrect: false },
      { label: 'x = -6', isCorrect: false }
    ],
    explanation: 'Division by zero is mathematically impossible. Therefore, x cannot be 0, creating a vertical break called the asymptote at x = 0.'
  },
  {
    id: 'h2',
    subtopic: 'hyperbola',
    prompt: 'What are the two ASYMPTOTES for the standard hyperbola y = 4/x?',
    hint: 'What lines does the curve get closer and closer to without ever touching?',
    options: [
      { label: 'Vertical line x = 0 (y-axis) and Horizontal line y = 0 (x-axis)', isCorrect: true },
      { label: 'Diagonal lines y = x and y = -x', isCorrect: false },
      { label: 'Lines x = 4 and y = 4', isCorrect: false },
      { label: 'There are no asymptotes for hyperbolas', isCorrect: false }
    ],
    explanation: 'The curve gets infinitely close to the y-axis (x = 0) and the x-axis (y = 0), but never touches either! These are the two asymptotes.'
  },
  {
    id: 'h3',
    subtopic: 'hyperbola',
    prompt: 'For y = -8/x (where a = -8 is negative), in which quadrants are the two wings located?',
    hint: 'When x > 0, y = -8/(+) is NEGATIVE (bottom right). When x < 0, y = -8/(-) is POSITIVE (top left).',
    options: [
      { label: 'Quadrant II (top-left) and Quadrant IV (bottom-right)', isCorrect: true },
      { label: 'Quadrant I (top-right) and Quadrant III (bottom-left)', isCorrect: false },
      { label: 'Quadrant I and Quadrant II only', isCorrect: false },
      { label: 'Quadrant III and Quadrant IV only', isCorrect: false }
    ],
    explanation: 'When "a" is negative (a < 0), positive x gives negative y (Quadrant IV) and negative x gives positive y (Quadrant II).'
  },
  {
    id: 'h4',
    subtopic: 'hyperbola',
    prompt: 'On the hyperbola y = 12/x, what is the integer value of y when x = 3?',
    hint: 'Calculate 12 divided by 3.',
    options: [
      { label: 'y = 4 (because 12 ÷ 3 = 4)', isCorrect: true },
      { label: 'y = 36', isCorrect: false },
      { label: 'y = 9', isCorrect: false },
      { label: 'y = -4', isCorrect: false }
    ],
    explanation: '12 ÷ 3 = 4, so the point (3, 4) lies directly on the hyperbola curve.'
  },
  {
    id: 'h5',
    subtopic: 'hyperbola',
    prompt: 'As x becomes a gigantic number (like 1,000, 10,000, 1,000,000), what value does y = 6/x approach?',
    hint: 'If you share 6 pizzas among 1,000,000 people, how much pizza does each person get?',
    options: [
      { label: 'y approaches 0 (very close to 0, but never quite 0)', isCorrect: true },
      { label: 'y approaches infinity', isCorrect: false },
      { label: 'y approaches 6', isCorrect: false },
      { label: 'y approaches -1', isCorrect: false }
    ],
    explanation: 'As x becomes huge, 6/x shrinks closer and closer to 0. This explains why the horizontal line y = 0 is a horizontal asymptote!'
  }
];

export const ALL_QUESTIONS = [...PARABOLA_QUESTIONS, ...CUBIC_QUESTIONS, ...HYPERBOLA_QUESTIONS];
