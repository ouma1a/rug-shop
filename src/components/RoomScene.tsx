import type { Rug } from '../types'
import RugPattern from './RugPattern'

/** A stylised interior that places the rug on the floor in perspective — a quick "see it styled" view. */
export default function RoomScene({ rug }: { rug: Rug }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md shadow-[var(--shadow-soft)]">
      {/* wall + floor */}
      <div className="absolute inset-x-0 top-0 h-[52%]" style={{ background: 'linear-gradient(to bottom, #efe9dd, #e7ddcc)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[48%]" style={{ background: 'linear-gradient(to bottom, #c9a981, #b89469)' }} />
      <div className="absolute inset-x-0 top-[52%] h-px bg-black/10" />

      {/* framed art on the wall */}
      <div className="absolute left-[10%] top-[12%] h-20 w-14 rounded-sm border-[5px] border-[#f4efe5] bg-[#d8c7a8] shadow-md" />

      {/* sofa */}
      <div className="absolute left-1/2 top-[28%] h-16 w-[62%] -translate-x-1/2 rounded-t-[1.4rem] bg-[#5c6b4c]" />
      <div className="absolute left-1/2 top-[41%] h-7 w-[62%] -translate-x-1/2 rounded-b-md bg-[#4c5a3e]" />

      {/* potted plant */}
      <div className="absolute bottom-[40%] right-[8%]">
        <div className="relative">
          <span className="absolute -left-3 -top-7 block h-9 w-3 -rotate-12 rounded-full bg-[#5c6b4c]" />
          <span className="absolute -top-8 left-0 block h-10 w-3 rounded-full bg-[#6f8059]" />
          <span className="absolute -right-3 -top-7 block h-9 w-3 rotate-12 rounded-full bg-[#5c6b4c]" />
          <span className="block h-7 w-8 rounded-b-md rounded-t-sm bg-[#9a5b54]" />
        </div>
      </div>

      {/* the rug, laid on the floor in perspective */}
      <div className="absolute bottom-[6%] left-1/2 w-1/2 -translate-x-1/2 [perspective:700px]">
        <div className="origin-bottom [transform:rotateX(58deg)] drop-shadow-[0_22px_18px_rgba(0,0,0,0.4)]">
          <div className="aspect-[3/4] overflow-hidden rounded-sm">
            <RugPattern style={rug.style} palette={rug.palette} fringe className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
