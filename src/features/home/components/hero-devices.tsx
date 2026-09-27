import { Swoosh } from "./swoosh";

const activity = ["New user signed up", "Payment received", "Project updated", "New message"];

const growth = [18, 24, 20, 30, 27, 36, 33, 44];

/**
 * Laptop + phone illustration for the hero, drawn in markup so it stays
 * crisp and needs no image assets. Everything is sized in `em` off a
 * container-relative font size, so the whole scene scales as one piece.
 */
export function HeroDevices() {
  return (
    <div aria-hidden="true" className="@container relative mx-auto w-full max-w-2xl select-none">
      <div className="relative aspect-[5/4] text-[2.2cqw]">
        {/* Handwritten notes */}
        <div className="absolute top-0 left-[8%] -rotate-[10deg] font-hand text-[1.9em] leading-[0.95] text-navy">
          <p>Ideas</p>
          <p className="pl-[0.3em]">Products</p>
          <p className="pl-[0.6em]">Growth</p>
          <Swoosh className="mt-[0.1em] ml-[0.4em] w-[2.6em] -rotate-12" />
        </div>
        <div className="absolute right-0 bottom-0 -rotate-[8deg] text-right font-hand text-[1.45em] leading-[1] text-navy">
          <svg viewBox="0 0 40 40" fill="none" className="mb-[0.1em] ml-auto w-[1.6em]">
            <path
              d="M30 36C36 24 30 10 14 6m0 0 7-4m-7 4 5 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Software</p>
          <p>for a better</p>
          <p>tomorrow</p>
        </div>
        <svg viewBox="0 0 60 60" className="absolute top-[3%] right-[2%] w-[4em] text-accent" fill="none">
          <path d="M28 30 44 6M30 44l26-8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>

        {/* Laptop */}
        <div className="absolute top-[14%] right-[4%] w-[78%] drop-shadow-[0_2em_2em_rgb(26_31_60/0.25)]">
          <div className="rounded-t-[1.1em] bg-navy p-[0.55em] pb-[0.7em]">
            <div className="flex aspect-[16/10] overflow-hidden rounded-[0.45em] bg-white">
              <div className="flex w-[21%] flex-col gap-[0.7em] bg-navy-800 p-[0.7em]">
                <div className="flex items-center gap-[0.35em]">
                  <span className="grid size-[1.1em] place-items-center rounded-[0.25em] bg-accent text-[0.6em] font-bold text-navy">
                    J
                  </span>
                  <span className="text-[0.55em] font-semibold text-white">Jeevly</span>
                </div>
                {[0.9, 0.7, 0.8, 0.6, 0.75].map((w, i) => (
                  <div key={i} className="flex items-center gap-[0.35em]">
                    <span className={i === 0 ? "size-[0.4em] rounded-full bg-accent" : "size-[0.4em] rounded-full bg-white/30"} />
                    <span className="h-[0.3em] rounded-full bg-white/25" style={{ width: `${w * 3}em` }} />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-[0.6em] p-[0.8em]">
                <div>
                  <p className="text-[0.95em] font-bold text-navy">Good Morning!</p>
                  <p className="text-[0.45em] text-muted">Let&apos;s build something amazing today.</p>
                </div>
                <div className="grid flex-1 grid-cols-[1.35fr_1fr] gap-[0.45em]">
                  <div className="flex flex-col rounded-[0.4em] border border-line p-[0.45em]">
                    <p className="text-[0.5em] font-semibold text-navy">Growth</p>
                    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="mt-[0.3em] w-full flex-1">
                      {growth.map((v, i) => (
                        <rect key={i} x={4 + i * 12} y={50 - v} width="7" height={v} rx="1.5" fill="#dbeafe" />
                      ))}
                      <polyline
                        points={growth.map((v, i) => `${7.5 + i * 12},${46 - v}`).join(" ")}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  <div className="rounded-[0.4em] border border-line p-[0.45em]">
                    <p className="text-[0.5em] font-semibold text-navy">Recent Activity</p>
                    <ul className="mt-[0.4em] flex flex-col gap-[0.45em]">
                      {activity.map((item, i) => (
                        <li key={item} className="flex items-center gap-[0.3em]">
                          <span className={i === 0 ? "size-[0.4em] shrink-0 rounded-full bg-accent" : "size-[0.4em] shrink-0 rounded-full bg-blue-400"} />
                          <span className="truncate text-[0.38em] text-navy/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative -mx-[6%] h-[0.9em] rounded-b-[0.9em] bg-gradient-to-b from-slate-200 to-slate-400">
            <span className="absolute top-0 left-1/2 h-[0.35em] w-[5em] -translate-x-1/2 rounded-b-[0.4em] bg-slate-400/70" />
          </div>
        </div>

        {/* Phone */}
        <div className="absolute bottom-[5%] left-[3%] w-[24%] -rotate-[5deg] drop-shadow-[0_1.5em_1.5em_rgb(26_31_60/0.3)]">
          <div className="aspect-[9/19] rounded-[1.7em] bg-navy p-[0.32em]">
            <div className="relative flex h-full flex-col items-center justify-center gap-[0.7em] rounded-[1.4em] bg-white text-center">
              <span className="absolute top-[0.5em] h-[0.45em] w-[2.6em] rounded-full bg-navy" />
              <svg viewBox="0 0 32 32" className="w-[2.3em]">
                <rect width="32" height="32" rx="9" fill="#1a1f3c" />
                <path d="M19 8v11a5 5 0 0 1-10 0" fill="none" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <p className="text-[0.95em] leading-tight font-semibold text-navy">
                Simpler
                <br />
                Software
                <br />
                Brighter
                <br />
                Lives
              </p>
              <Swoosh className="w-[2.6em]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
