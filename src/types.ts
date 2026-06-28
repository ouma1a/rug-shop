export type RugStyle =
  | 'medallion'
  | 'diamonds'
  | 'stripes'
  | 'lattice'
  | 'bordered'

export type RugSize = "2'×3'" | "5'×8'" | "8'×10'" | "9'×12'" | 'Runner'

export interface Palette {
  field: string
  border: string
  motif: string
  accent: string
  fringe: string
}

export interface Rug {
  id: string
  name: string
  origin: string
  style: RugStyle
  /** A short colour family label used for filtering, e.g. "Ivory", "Terracotta". */
  color: string
  sizes: RugSize[]
  price: number
  knotCount: string
  material: string
  description: string
  palette: Palette
  featured?: boolean
}

export interface CartLine {
  rugId: string
  size: RugSize
  quantity: number
}
