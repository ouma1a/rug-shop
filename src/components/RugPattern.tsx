import { useId, type ReactElement } from 'react'
import type { Palette, RugStyle } from '../types'

interface Props {
  style: RugStyle
  palette: Palette
  className?: string
  fringe?: boolean
}

const W = 300
const H = 400

const diamond = (cx: number, cy: number, rx: number, ry: number) =>
  `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`

/**
 * Renders a rug as a richly layered SVG: fringe, a multi-band guard-stripe border, a field motif
 * that varies by weave, plus a woven sheen and an edge vignette for depth. Fully self-contained
 * (no images), deterministic, and unique per instance.
 */
export default function RugPattern({ style, palette, className, fringe = true }: Props) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const clipId = `clip-${raw}`
  const weaveId = `weave-${raw}`
  const sheenId = `sheen-${raw}`
  const vignetteId = `vig-${raw}`

  const fringeH = fringe ? 14 : 0
  const bodyTop = fringeH
  const bodyH = H - fringeH * 2

  const mOuter = 9 // solid outer frame
  const mGuard = 15 // guard-stripe band
  const m = mOuter + mGuard
  const fx = m
  const fy = bodyTop + m
  const fw = W - m * 2
  const fh = bodyH - m * 2
  const cx = W / 2
  const cy = bodyTop + bodyH / 2

  // small diamonds running around the border band
  const guard: ReactElement[] = []
  const gInset = mOuter + mGuard / 2
  const stepX = fw / 9
  const stepY = fh / 12
  for (let i = 0; i <= 9; i++) {
    const x = fx + i * stepX
    guard.push(
      <polygon key={`gt${i}`} points={diamond(x, bodyTop + gInset, 5, 6)} fill={i % 2 ? palette.accent : palette.fringe} />,
      <polygon key={`gb${i}`} points={diamond(x, bodyTop + bodyH - gInset, 5, 6)} fill={i % 2 ? palette.accent : palette.fringe} />,
    )
  }
  for (let i = 1; i < 12; i++) {
    const y = fy + i * stepY
    guard.push(
      <polygon key={`gl${i}`} points={diamond(fx - mGuard / 2, y, 5, 6)} fill={i % 2 ? palette.accent : palette.fringe} />,
      <polygon key={`gr${i}`} points={diamond(fx + fw + mGuard / 2, y, 5, 6)} fill={i % 2 ? palette.accent : palette.fringe} />,
    )
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="xMidYMid slice" role="img">
      <defs>
        <clipPath id={clipId}>
          <rect x={fx} y={fy} width={fw} height={fh} />
        </clipPath>
        <pattern id={weaveId} width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M0 3 L3 0" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id={sheenId} cx="50%" cy="36%" r="72%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={vignetteId} cx="50%" cy="50%" r="72%">
          <stop offset="58%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
        </radialGradient>
      </defs>

      {/* fringe */}
      {fringe &&
        Array.from({ length: 48 }, (_, i) => {
          const x = 4 + (i * (W - 8)) / 47
          return (
            <g key={i} stroke={palette.fringe} strokeWidth="1.4">
              <line x1={x} y1={0} x2={x} y2={bodyTop} />
              <line x1={x} y1={H - fringeH} x2={x} y2={H} />
            </g>
          )
        })}

      {/* border + field base */}
      <rect x={0} y={bodyTop} width={W} height={bodyH} fill={palette.border} />
      {guard}
      <rect x={fx - 3} y={fy - 3} width={fw + 6} height={fh + 6} fill="none" stroke={palette.accent} strokeWidth="1.5" />
      <rect x={fx} y={fy} width={fw} height={fh} fill={palette.field} />

      <g clipPath={`url(#${clipId})`}>
        {style === 'medallion' && (
          <g>
            <polygon points={diamond(cx, cy, fw * 0.46, fh * 0.36)} fill="none" stroke={palette.motif} strokeWidth="2" strokeDasharray="4 3" />
            <polygon points={diamond(cx, cy, fw * 0.4, fh * 0.31)} fill="none" stroke={palette.motif} strokeWidth="3" />
            <polygon points={diamond(cx, cy, fw * 0.3, fh * 0.23)} fill={palette.accent} opacity="0.85" />
            <polygon points={diamond(cx, cy, fw * 0.2, fh * 0.15)} fill={palette.field} stroke={palette.motif} strokeWidth="2" />
            <polygon points={diamond(cx, cy, fw * 0.1, fh * 0.08)} fill={palette.motif} />
            <polygon points={diamond(cx, cy, fw * 0.04, fh * 0.03)} fill={palette.field} />
            <polygon points={diamond(cx, fy + 24, fw * 0.1, fh * 0.06)} fill={palette.motif} />
            <polygon points={diamond(cx, fy + fh - 24, fw * 0.1, fh * 0.06)} fill={palette.motif} />
            {[
              [fx + 20, fy + 24],
              [fx + fw - 20, fy + 24],
              [fx + 20, fy + fh - 24],
              [fx + fw - 20, fy + fh - 24],
            ].map(([sx, sy], i) => (
              <g key={i}>
                <polygon points={diamond(sx, sy, 18, 22)} fill={palette.motif} opacity="0.45" />
                <polygon points={diamond(sx, sy, 7, 9)} fill={palette.accent} />
              </g>
            ))}
          </g>
        )}

        {style === 'diamonds' &&
          (() => {
            const cols = 4
            const rows = 6
            const dw = fw / cols
            const dh = fh / rows
            const cells: ReactElement[] = []
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const dcx = fx + dw * (c + 0.5)
                const dcy = fy + dh * (r + 0.5)
                const filled = (r + c) % 2 === 0
                cells.push(
                  <g key={`${r}-${c}`}>
                    <polygon points={diamond(dcx, dcy, dw * 0.47, dh * 0.47)} fill={filled ? palette.accent : 'none'} stroke={palette.motif} strokeWidth="1.6" />
                    <polygon points={diamond(dcx, dcy, dw * 0.3, dh * 0.3)} fill="none" stroke={filled ? palette.field : palette.motif} strokeWidth="1.2" />
                    <polygon points={diamond(dcx, dcy, dw * 0.1, dh * 0.1)} fill={filled ? palette.field : palette.motif} />
                  </g>,
                )
              }
            }
            return cells
          })()}

        {style === 'stripes' &&
          (() => {
            const bands = 9
            const bh = fh / bands
            const out: ReactElement[] = []
            for (let i = 0; i < bands; i++) {
              const by = fy + i * bh
              const kind = i % 3
              if (kind === 1) {
                out.push(<rect key={`bg${i}`} x={fx} y={by} width={fw} height={bh} fill={palette.accent} opacity="0.8" />)
                for (let d = 0; d < 7; d++) {
                  const ddx = fx + (fw * (d + 0.5)) / 7
                  out.push(<polygon key={`d${i}-${d}`} points={diamond(ddx, by + bh / 2, 7, bh * 0.34)} fill={palette.field} />)
                }
              } else if (kind === 2) {
                const pts: string[] = []
                const zig = 10
                for (let z = 0; z <= zig; z++) {
                  const zx = fx + (fw * z) / zig
                  const zy = by + (z % 2 === 0 ? bh * 0.28 : bh * 0.72)
                  pts.push(`${zx},${zy}`)
                }
                out.push(<polyline key={`z${i}`} points={pts.join(' ')} fill="none" stroke={palette.motif} strokeWidth="2" />)
              } else {
                for (let d = 0; d < 11; d++) {
                  const ddx = fx + (fw * (d + 0.5)) / 11
                  out.push(<polygon key={`p${i}-${d}`} points={diamond(ddx, by + bh / 2, 3.5, 5)} fill={palette.motif} />)
                }
              }
            }
            return out
          })()}

        {style === 'lattice' &&
          (() => {
            const step = 32
            const els: ReactElement[] = []
            for (let x = fx - fh; x < fx + fw; x += step) {
              els.push(<line key={`a${x}`} x1={x} y1={fy} x2={x + fh} y2={fy + fh} stroke={palette.motif} strokeWidth="1.5" />)
            }
            for (let x = fx; x < fx + fw + fh; x += step) {
              els.push(<line key={`b${x}`} x1={x} y1={fy} x2={x - fh} y2={fy + fh} stroke={palette.motif} strokeWidth="1.5" />)
            }
            for (let gy = fy; gy <= fy + fh; gy += step) {
              for (let gx = fx; gx <= fx + fw; gx += step) {
                els.push(<polygon key={`p${gx}-${gy}`} points={diamond(gx, gy, 5, 6)} fill={palette.accent} />)
              }
            }
            for (let gy = fy + step / 2; gy < fy + fh; gy += step) {
              for (let gx = fx + step / 2; gx < fx + fw; gx += step) {
                els.push(<circle key={`c${gx}-${gy}`} cx={gx} cy={gy} r="1.6" fill={palette.motif} />)
              }
            }
            return els
          })()}

        {style === 'bordered' && (
          <g>
            {[0, 1, 2, 3].map((i) => {
              const inset = 12 + i * 11
              return (
                <rect key={i} x={fx + inset} y={fy + inset} width={fw - inset * 2} height={fh - inset * 2} fill="none" stroke={i % 2 === 0 ? palette.motif : palette.accent} strokeWidth={i === 0 ? 3 : 1.5} />
              )
            })}
            <polygon points={diamond(cx, cy, fw * 0.2, fh * 0.15)} fill={palette.accent} stroke={palette.motif} strokeWidth="2" />
            <polygon points={diamond(cx, cy, fw * 0.1, fh * 0.08)} fill={palette.field} stroke={palette.motif} strokeWidth="1.5" />
            <polygon points={diamond(cx, cy, fw * 0.035, fh * 0.027)} fill={palette.motif} />
            {[
              [fx + 26, fy + 26],
              [fx + fw - 26, fy + 26],
              [fx + 26, fy + fh - 26],
              [fx + fw - 26, fy + fh - 26],
            ].map(([sx, sy], i) => (
              <polygon key={i} points={diamond(sx, sy, 8, 10)} fill={palette.motif} />
            ))}
          </g>
        )}

        {/* depth overlays */}
        <rect x={fx} y={fy} width={fw} height={fh} fill={`url(#${weaveId})`} />
        <rect x={fx} y={fy} width={fw} height={fh} fill={`url(#${sheenId})`} />
      </g>

      {/* vignette over the whole body for a soft, woven depth */}
      <rect x={0} y={bodyTop} width={W} height={bodyH} fill={`url(#${vignetteId})`} />
    </svg>
  )
}
