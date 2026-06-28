import type { Rug, RugStyle } from '../types'
import data from './rugs.json'

// ─────────────────────────────────────────────────────────────────────────────
// To add / edit / remove rugs, edit `rugs.json` in this folder — not this file.
// Each entry needs: id, name, origin, style, color, sizes, price, knotCount,
// material, description, palette. Optional: images (real photos) and featured.
//   • style must be one of: medallion | diamonds | stripes | lattice | bordered
//   • sizes use: 2'×3' | 5'×8' | 8'×10' | 9'×12' | Runner
//   • images live in /public/rugs and are referenced as "/rugs/your-photo.jpg"
//     (when omitted, a generated pattern from `palette` is shown instead)
// ─────────────────────────────────────────────────────────────────────────────

export const STYLE_LABELS: Record<RugStyle, string> = {
  medallion: 'Medallion',
  diamonds: 'Berber Diamonds',
  stripes: 'Striped Kilim',
  lattice: 'Lattice',
  bordered: 'Bordered Field',
}

export const rugs = data as unknown as Rug[]

export const getRug = (id: string) => rugs.find((r) => r.id === id)

export const allColors = [...new Set(rugs.map((r) => r.color))].sort()
export const allStyles = [...new Set(rugs.map((r) => r.style))]
export const allSizes = [...new Set(rugs.flatMap((r) => r.sizes))]
