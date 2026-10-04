import React, { useState } from 'react';
import { Point, CurveType } from '../types';

interface CoordinatePlaneProps {
  type: CurveType;
  a: number;
  b?: number;
  c?: number;
  studentPoints?: Point[];
  showCurve?: boolean;
  showRoots?: boolean;
  showTurningPoint?: boolean;
  showInflectionPoint?: boolean;
  showAsymptotes?: boolean;
  xRange?: [number, number];
  yRange?: [number, number];
  title?: string;
}

export const CoordinatePlane: React.FC<CoordinatePlaneProps> = ({
  type,
  a,
  b = 0,
  c = 0,
  studentPoints = [],
  showCurve = true,
  showRoots = true,
  showTurningPoint = true,
  showInflectionPoint = true,
  showAsymptotes = true,
  xRange = [-6, 6],
  yRange = [-8, 8],
  title,
}) => {
  const width = 560;
  const height = 480;
  const padding = 40;

  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);

  // Coordinate transforms
  const xMin = xRange[0];
  const xMax = xRange[1];
  const yMin = yRange[0];
  const yMax = yRange[1];

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toSvgY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  // Generate grid ticks (integer values)
  const xTicks = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    if (x !== 0) xTicks.push(x);
  }

  const yTicks = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    if (y !== 0) yTicks.push(y);
  }

  // Calculate Curve Path
  const getCurvePath = (): string => {
    if (type === 'parabola') {
      const step = 0.1;
      const points: [number, number][] = [];
      for (let x = xMin; x <= xMax + 0.01; x += step) {
        const y = a * x * x + b * x + c;
        if (y >= yMin - 15 && y <= yMax + 15) {
          points.push([toSvgX(x), toSvgY(y)]);
        }
      }
      if (points.length === 0) return '';
      return 'M ' + points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ');
    } else if (type === 'cubic') {
      const step = 0.08;
      const points: [number, number][] = [];
      for (let x = xMin; x <= xMax + 0.01; x += step) {
        const y = a * Math.pow(x, 3) + c;
        if (y >= yMin - 20 && y <= yMax + 20) {
          points.push([toSvgX(x), toSvgY(y)]);
        }
      }
      if (points.length === 0) return '';
      return 'M ' + points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ');
    } else if (type === 'hyperbola') {
      // Two branches: left branch (x < 0) and right branch (x > 0)
      const step = 0.05;
      const leftPoints: [number, number][] = [];
      for (let x = xMin; x <= -0.15; x += step) {
        const y = a / x;
        if (y >= yMin - 20 && y <= yMax + 20) {
          leftPoints.push([toSvgX(x), toSvgY(y)]);
        }
      }
      const rightPoints: [number, number][] = [];
      for (let x = 0.15; x <= xMax; x += step) {
        const y = a / x;
        if (y >= yMin - 20 && y <= yMax + 20) {
          rightPoints.push([toSvgX(x), toSvgY(y)]);
        }
      }
      let path = '';
      if (leftPoints.length > 0) {
        path += 'M ' + leftPoints.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ');
      }
      if (rightPoints.length > 0) {
        path += ' M ' + rightPoints.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ');
      }
      return path;
    }
    return '';
  };

  // Calculate Key Feature Coordinates
  // 1. Roots (where y = 0)
  const roots: { x: number; y: number; label: string }[] = [];
  if (type === 'parabola') {
    // ax^2 + bx + c = 0
    const disc = b * b - 4 * a * c;
    if (a !== 0 && disc >= 0) {
      const r1 = (-b + Math.sqrt(disc)) / (2 * a);
      const r2 = (-b - Math.sqrt(disc)) / (2 * a);
      if (r1 >= xMin && r1 <= xMax) {
        roots.push({ x: r1, y: 0, label: `Root (${Number.isInteger(r1) ? r1 : r1.toFixed(1)}, 0)` });
      }
      if (Math.abs(r1 - r2) > 0.001 && r2 >= xMin && r2 <= xMax) {
        roots.push({ x: r2, y: 0, label: `Root (${Number.isInteger(r2) ? r2 : r2.toFixed(1)}, 0)` });
      }
    }
  } else if (type === 'cubic') {
    // ax^3 + c = 0 -> x^3 = -c/a -> x = cbrt(-c/a)
    if (a !== 0) {
      const val = -c / a;
      const rootVal = Math.sign(val) * Math.pow(Math.abs(val), 1 / 3);
      if (rootVal >= xMin && rootVal <= xMax) {
        roots.push({
          x: rootVal,
          y: 0,
          label: `Root (${Number.isInteger(rootVal) ? rootVal : rootVal.toFixed(1)}, 0)`,
        });
      }
    }
  }

  // 2. Turning point (Vertex) for parabola: xv = -b / (2a)
  let turningPoint: { x: number; y: number; isMin: boolean; label: string } | null = null;
  if (type === 'parabola' && a !== 0) {
    const xv = -b / (2 * a);
    const yv = a * xv * xv + b * xv + c;
    if (xv >= xMin && xv <= xMax && yv >= yMin && yv <= yMax) {
      const isMin = a > 0;
      turningPoint = {
        x: xv,
        y: yv,
        isMin,
        label: `Turning Point (${Number.isInteger(xv) ? xv : xv.toFixed(1)}, ${Number.isInteger(yv) ? yv : yv.toFixed(1)}) [${isMin ? 'Minimum Peak' : 'Maximum Peak'}]`,
      };
    }
  }

  // 3. Inflection point for cubic: at x = 0, y = c
  let inflectionPoint: { x: number; y: number; label: string } | null = null;
  if (type === 'cubic') {
    const xi = 0;
    const yi = c;
    if (xi >= xMin && xi <= xMax && yi >= yMin && yi <= yMax) {
      inflectionPoint = {
        x: xi,
        y: yi,
        label: `Inflection Point (0, ${c}) [Change of bend]`,
      };
    }
  }

  // Handle plane mouse hover
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const mathX = xMin + ((clientX - padding) / (width - 2 * padding)) * (xMax - xMin);
    const mathY = yMin + ((height - padding - clientY) / (height - 2 * padding)) * (yMax - yMin);

    if (mathX >= xMin && mathX <= xMax && mathY >= yMin && mathY <= yMax) {
      setHoverCoord({ x: Math.round(mathX * 10) / 10, y: Math.round(mathY * 10) / 10 });
    } else {
      setHoverCoord(null);
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-slate-900 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden text-slate-100">
      {/* Top status bar */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-950/70 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-400">{title || 'Coordinate Grid'}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-mono">
            Scale: X[{xMin}, {xMax}], Y[{yMin}, {yMax}]
          </span>
        </div>
        {hoverCoord && (
          <div className="font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
            Cursor: ({hoverCoord.x >= 0 ? `+${hoverCoord.x}` : hoverCoord.x},{' '}
            {hoverCoord.y >= 0 ? `+${hoverCoord.y}` : hoverCoord.y})
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-x-auto flex justify-center p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[560px] h-auto select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverCoord(null)}
        >
          <defs>
            {/* Pulsing animation styles */}
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Grid Pattern */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Background grid */}
          <rect x={padding} y={padding} width={width - 2 * padding} height={height - 2 * padding} fill="#0b1120" />
          <rect x={padding} y={padding} width={width - 2 * padding} height={height - 2 * padding} fill="url(#grid)" />

          {/* Quadrant labels */}
          <text x={width - padding - 24} y={padding + 24} fill="#475569" fontSize="12" fontWeight="bold">
            QI (+,+)
          </text>
          <text x={padding + 10} y={padding + 24} fill="#475569" fontSize="12" fontWeight="bold">
            QII (-,+)
          </text>
          <text x={padding + 10} y={height - padding - 12} fill="#475569" fontSize="12" fontWeight="bold">
            QIII (-,-)
          </text>
          <text x={width - padding - 28} y={height - padding - 12} fill="#475569" fontSize="12" fontWeight="bold">
            QIV (+,-)
          </text>

          {/* Grid lines & Ticks */}
          {xTicks.map((x) => {
            const sx = toSvgX(x);
            return (
              <g key={`xtick-${x}`}>
                <line
                  x1={sx}
                  y1={padding}
                  x2={sx}
                  y2={height - padding}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <line x1={sx} y1={originY - 3} x2={sx} y2={originY + 3} stroke="#64748b" strokeWidth="1.5" />
                <text x={sx} y={originY + 16} fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  {x}
                </text>
              </g>
            );
          })}

          {yTicks.map((y) => {
            const sy = toSvgY(y);
            return (
              <g key={`ytick-${y}`}>
                <line
                  x1={padding}
                  y1={sy}
                  x2={width - padding}
                  y2={sy}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <line x1={originX - 3} y1={sy} x2={originX + 3} y2={sy} stroke="#64748b" strokeWidth="1.5" />
                <text x={originX - 8} y={sy + 3} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">
                  {y}
                </text>
              </g>
            );
          })}

          {/* Main X Axis */}
          <line
            x1={padding - 10}
            y1={originY}
            x2={width - padding + 15}
            y2={originY}
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          {/* Main Y Axis */}
          <line
            x1={originX}
            y1={height - padding + 10}
            x2={originX}
            y2={padding - 15}
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Axis Labels */}
          <text x={width - padding + 18} y={originY + 4} fill="#e2e8f0" fontSize="12" fontWeight="bold">
            X
          </text>
          <text x={originX} y={padding - 18} fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">
            Y
          </text>
          <text x={originX - 10} y={originY + 14} fill="#64748b" fontSize="10" textAnchor="end">
            0
          </text>

          {/* HYPERBOLA ASYMPTOTES with animated dashed line & glow */}
          {type === 'hyperbola' && showAsymptotes && (
            <g className="asymptotes-group">
              {/* Vertical Asymptote at x = 0 */}
              <line
                x1={originX}
                y1={padding}
                x2={originX}
                y2={height - padding}
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              {/* Horizontal Asymptote at y = 0 */}
              <line
                x1={padding}
                y1={originY}
                x2={width - padding}
                y2={originY}
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />

              {/* Badges for Asymptotes */}
              <rect
                x={originX + 8}
                y={padding + 8}
                width="140"
                height="22"
                rx="4"
                fill="#881337"
                fillOpacity="0.9"
                stroke="#f43f5e"
                strokeWidth="1"
              />
              <text x={originX + 14} y={padding + 23} fill="#ffe4e6" fontSize="10" fontWeight="bold">
                Vertical Asymptote: x = 0
              </text>

              <rect
                x={width - padding - 152}
                y={originY - 26}
                width="150"
                height="22"
                rx="4"
                fill="#881337"
                fillOpacity="0.9"
                stroke="#f43f5e"
                strokeWidth="1"
              />
              <text x={width - padding - 146} y={originY - 11} fill="#ffe4e6" fontSize="10" fontWeight="bold">
                Horizontal Asymptote: y = 0
              </text>
            </g>
          )}

          {/* Continuous Curve */}
          {showCurve && (
            <path
              d={getCurvePath()}
              fill="none"
              stroke={type === 'parabola' ? '#38bdf8' : type === 'cubic' ? '#a855f7' : '#f97316'}
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#glow)"
            />
          )}

          {/* Student Plotted Points */}
          {studentPoints.map((pt, idx) => {
            const sx = toSvgX(pt.x);
            const sy = toSvgY(pt.y);
            const isInside = pt.x >= xMin && pt.x <= xMax && pt.y >= yMin && pt.y <= yMax;
            if (!isInside) return null;

            return (
              <g key={`pt-${idx}`} className="transition-all duration-300">
                {/* Pop halo */}
                <circle cx={sx} cy={sy} r="9" fill="#0284c7" fillOpacity="0.3" className="animate-ping" />
                <circle cx={sx} cy={sy} r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <rect
                  x={sx + 8}
                  y={sy - 18}
                  width="48"
                  height="16"
                  rx="3"
                  fill="#0f172a"
                  fillOpacity="0.9"
                  stroke="#38bdf8"
                  strokeWidth="0.8"
                />
                <text x={sx + 12} y={sy - 6} fill="#e0f2fe" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  ({pt.x},{pt.y})
                </text>
              </g>
            );
          })}

          {/* ANIMATED ROOTS (x-intercepts where y = 0) */}
          {showRoots &&
            roots.map((root, i) => {
              const rx = toSvgX(root.x);
              const ry = toSvgY(root.y);
              return (
                <g key={`root-${i}`}>
                  {/* Radar Pulse ring */}
                  <circle cx={rx} cy={ry} r="14" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.6">
                    <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={rx} cy={ry} r="5.5" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />

                  {/* Label */}
                  <rect
                    x={rx - 40}
                    y={ry + 10}
                    width="80"
                    height="18"
                    rx="4"
                    fill="#052e16"
                    fillOpacity="0.95"
                    stroke="#22c55e"
                    strokeWidth="1"
                  />
                  <text
                    x={rx}
                    y={ry + 23}
                    fill="#86efac"
                    fontSize="9.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    ROOT: {root.x}
                  </text>
                </g>
              );
            })}

          {/* ANIMATED TURNING POINT / VERTEX (for parabola) */}
          {showTurningPoint && turningPoint && (
            <g>
              const vx = toSvgX(turningPoint.x); const vy = toSvgY(turningPoint.y);
              {/* Pulsing ring */}
              <circle
                cx={toSvgX(turningPoint.x)}
                cy={toSvgY(turningPoint.y)}
                r="16"
                fill="none"
                stroke="#eab308"
                strokeWidth="2"
              >
                <animate attributeName="r" values="10;22;10" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={toSvgX(turningPoint.x)}
                cy={toSvgY(turningPoint.y)}
                r="6.5"
                fill="#eab308"
                stroke="#ffffff"
                strokeWidth="2"
              />
              {/* Badge */}
              <rect
                x={toSvgX(turningPoint.x) - 75}
                y={toSvgY(turningPoint.y) + (turningPoint.isMin ? 12 : -32)}
                width="150"
                height="22"
                rx="4"
                fill="#422006"
                fillOpacity="0.95"
                stroke="#eab308"
                strokeWidth="1.2"
              />
              <text
                x={toSvgX(turningPoint.x)}
                y={toSvgY(turningPoint.y) + (turningPoint.isMin ? 26 : -18)}
                fill="#fef08a"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
              >
                ⭐ Vertex / Turning Point ({turningPoint.x}, {turningPoint.y})
              </text>
            </g>
          )}

          {/* ANIMATED INFLECTION POINT (for cubic) */}
          {showInflectionPoint && inflectionPoint && (
            <g>
              const ix = toSvgX(inflectionPoint.x); const iy = toSvgY(inflectionPoint.y);
              <circle
                cx={toSvgX(inflectionPoint.x)}
                cy={toSvgY(inflectionPoint.y)}
                r="16"
                fill="none"
                stroke="#c084fc"
                strokeWidth="2"
              >
                <animate attributeName="r" values="8;20;8" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.15;0.9" dur="1.8s" repeatCount="indefinite" />
              </circle>
              {/* Diamond marker */}
              <polygon
                points={`
                  ${toSvgX(inflectionPoint.x)},${toSvgY(inflectionPoint.y) - 7}
                  ${toSvgX(inflectionPoint.x) + 7},${toSvgY(inflectionPoint.y)}
                  ${toSvgX(inflectionPoint.x)},${toSvgY(inflectionPoint.y) + 7}
                  ${toSvgX(inflectionPoint.x) - 7},${toSvgY(inflectionPoint.y)}
                `}
                fill="#c084fc"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              {/* Badge */}
              <rect
                x={toSvgX(inflectionPoint.x) + 12}
                y={toSvgY(inflectionPoint.y) - 13}
                width="145"
                height="22"
                rx="4"
                fill="#3b0764"
                fillOpacity="0.95"
                stroke="#c084fc"
                strokeWidth="1.2"
              />
              <text
                x={toSvgX(inflectionPoint.x) + 84}
                y={toSvgY(inflectionPoint.y) + 1}
                fill="#f3e8ff"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
              >
                ✨ Inflection Point (0, {c})
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Feature Legend Indicator */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 px-4 py-2 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-300">
        {type === 'parabola' && (
          <>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-4"></span>
              <span>Roots (x-intercepts, where y = 0)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>Turning Point / Vertex (Peak / Lowest)</span>
            </div>
          </>
        )}
        {type === 'cubic' && (
          <>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Root (Crosses X-axis)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-purple-400"></span>
              <span>Inflection Point (Where bend changes)</span>
            </div>
          </>
        )}
        {type === 'hyperbola' && (
          <>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-rose-500 border-b border-rose-300"></span>
              <span>Asymptotes (x = 0 & y = 0 lines it never touches)</span>
            </div>
          </>
        )}
        {studentPoints.length > 0 && (
          <div className="flex items-center gap-1.5 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <span>Your Plotted Points ({studentPoints.length})</span>
          </div>
        )}
      </div>
    </div>
  );
};
