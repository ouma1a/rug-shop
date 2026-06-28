import type { Rug } from '../types'
import RugPattern from './RugPattern'

interface Props {
  rug: Rug
  className?: string
  fringe?: boolean
  imageIndex?: number
}

/** Shows a real product photo when the rug has one, otherwise the generated SVG pattern. */
export default function RugMedia({ rug, className, fringe = true, imageIndex = 0 }: Props) {
  if (rug.images && rug.images.length > 0) {
    const src = rug.images[imageIndex] ?? rug.images[0]
    return <img src={src} alt={rug.name} loading="lazy" className={`object-cover ${className ?? ''}`} />
  }
  return <RugPattern style={rug.style} palette={rug.palette} fringe={fringe} className={className} />
}
