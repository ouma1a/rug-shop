import { useId } from 'react'
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
 * Renders a rug as a layered SVG — fringe, an ornamental border, and a field motif that
 * varies by `style`. Fully self-contained (no images), so the catalogue always looks intentional.
 */
export default function RugPattern({ style, palette, className, fringe = true }: Props) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const clipId = `clip-${raw}`
  const weaveId = `weave-${raw}`

  const fringeH = fringe ? 14 : 0
  const bodyTop = fringeH
  const bodyH = H - fringeH * 2
  const m = 16 // border thickness
  const fx = m
  const fy = bodyTop + m
  const fw = W - m * 2
  const fh = bodyH - m * 2
  const cx = W / 2
  const cy = bodyTop + bodyH / 2

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={fx} y={fy} width={fw} height={fh} />
        </clipPath>
        {/* faint diagonal weave texture */}
        <pattern id={weaveId} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="none" />
          <path d="M0 4 L4 0" stroke="rgba(0,0,0,0.05)" strokeWidth="0.6" />
        </pattern>
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
      <rect x={fx} y={fy} width={fw} height={fh} fill={palette.field} />

      {/* guard stripes along the border */}
      <rect
        x={m / 2}
        y={bodyTop + m / 2}
        width={W - m}
        height={bodyH - m}
        fill="none"
        stroke={palette.accent}
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />

      <g clipPath={`url(#${clipId})`}>
        {style === 'medallion' && (
          <g>
            <polygon
              points={diamond(cx, cy, fw * 0.44, fh * 0.34)}
              fill="none"
              stroke={palette.motif}
              strokeWidth="3"
            />
            <polygon
              points={diamond(cx, cy, fw * 0.34, fh * 0.26)}
              fill={palette.accent}
              opacity="0.85"
            />
            <polygon
              points={diamond(cx, cy, fw * 0.22, fh * 0.17)}
              fill={palette.field}
              stroke={palette.motif}
              strokeWidth="2"
            />
            <polygon points={diamond(cx, cy, fw * 0.08, fh * 0.07)} fill={palette.motif} />
            {/* pendants */}
            <polygon points={diamond(cx, fy + 26, fw * 0.1, fh * 0.06)} fill={palette.motif} />
            <polygon
              points={diamond(cx, fy + fh - 26, fw * 0.1, fh * 0.06)}
              fill={palette.motif}
            />
            {/* corner spandrels */}
            {[
              [fx + 18, fy + 22],
              [fx + fw - 18, fy + 22],
              [fx + 18, fy + fh - 22],
              [fx + fw - 18, fy + fh - 22],
            ].map(([sx, sy], i) => (
              <polygon key={i} points={diamond(sx, sy, 16, 20)} fill={palette.motif} opacity="0.5" />
            ))}
          </g>
        )}

        {style === 'diamonds' &&
          (() => {
            const cols = 4
            const rows = 6
            const dw = fw / cols
            const dh = fh / rows
            const cells = []
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const dcx = fx + dw * (c + 0.5)
                const dcy = fy + dh * (r + 0.5)
                const filled = (r + c) % 2 === 0
                cells.push(
                  <g key={`${r}-${c}`}>
                    <polygon
                      points={diamond(dcx, dcy, dw * 0.46, dh * 0.46)}
                      fill={filled ? palette.accent : 'none'}
                      stroke={palette.motif}
                      strokeWidth="1.8"
                    />
                    <polygon
                      points={diamond(dcx, dcy, dw * 0.16, dh * 0.16)}
                      fill={filled ? palette.field : palette.motif}
                    />
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
            const out = []
            for (let i = 0; i < bands; i++) {
              const by = fy + i * bh
              const isMotif = i % 2 === 1
              out.push(
                <rect
                  key={`b${i}`}
                  x={fx}
                  y={by}
                  width={fw}
                  height={bh}
                  fill={isMotif ? palette.accent : palette.field}
                  opacity={isMotif ? 0.8 : 1}
                />,
              )
              const dots = 7
              for (let d = 0; d < dots; d++) {
                const ddx = fx + (fw * (d + 0.5)) / dots
                out.push(
                  <polygon
                    key={`d${i}-${d}`}
                    points={diamond(ddx, by + bh / 2, 7, bh * 0.34)}
                    fill={isMotif ? palette.field : palette.motif}
                  />,
                )
              }
            }
            return out
          })()}

        {style === 'lattice' &&
          (() => {
            const step = 34
            const lines = []
            for (let x = fx - fh; x < fx + fw; x += step) {
              lines.push(
                <line
                  key={`a${x}`}
                  x1={x}
                  y1={fy}
                  x2={x + fh}
                  y2={fy + fh}
                  stroke={palette.motif}
                  strokeWidth="1.6"
                />,
              )
            }
            for (let x = fx; x < fx + fw + fh; x += step) {
              lines.push(
                <line
                  key={`b${x}`}
                  x1={x}
                  y1={fy}
                  x2={x - fh}
                  y2={fy + fh}
                  stroke={palette.motif}
                  strokeWidth="1.6"
                />,
              )
            }
            for (let gy = fy; gy <= fy + fh; gy += step) {
              for (let gx = fx; gx <= fx + fw; gx += step) {
                lines.push(
                  <polygon key={`p${gx}-${gy}`} points={diamond(gx, gy, 5, 6)} fill={palette.accent} />,
                )
              }
            }
            return lines
          })()}

        {style === 'bordered' && (
          <g>
            {[0, 1, 2].map((i) => {
              const inset = 14 + i * 12
              return (
                <rect
                  key={i}
                  x={fx + inset}
                  y={fy + inset}
                  width={fw - inset * 2}
                  height={fh - inset * 2}
                  fill="none"
                  stroke={i % 2 === 0 ? palette.motif : palette.accent}
                  strokeWidth={i === 0 ? 3 : 1.6}
                />
              )
            })}
            <polygon
              points={diamond(cx, cy, fw * 0.18, fh * 0.14)}
              fill={palette.accent}
              stroke={palette.motif}
              strokeWidth="2"
            />
            <polygon points={diamond(cx, cy, fw * 0.06, fh * 0.05)} fill={palette.motif} />
          </g>
        )}

        {/* weave overlay for subtle texture */}
        <rect x={fx} y={fy} width={fw} height={fh} fill={`url(#${weaveId})`} />
      </g>
    </svg>
  )
}
