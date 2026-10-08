import { Container } from "@/components/ui/section";
import { cn } from "@/lib/cn";

type TrustBarProps = {
  stats: { value: string; label: string }[];
  brands: string[];
};

export function TrustBar({ stats, brands }: TrustBarProps) {
  return (
    <section aria-label="Jeevly in numbers" className="pb-16 sm:pb-20">
      <Container>
        <div className="rounded-3xl bg-navy-50 px-6 py-8 sm:px-10">
          <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-navy/10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <dt className="order-2 mt-1 text-sm text-navy-700">{stat.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight text-navy tabular-nums sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 border-t border-navy/10 pt-6">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-navy-700 uppercase">Trusted by teams at</p>
            <div className="mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              {/* Listed twice so the loop is seamless; the copy is hidden from assistive tech. */}
              <ul className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2">
                {[...brands, ...brands].map((brand, i) => {
                  const copy = i >= brands.length;
                  return (
                    <li
                      key={i}
                      aria-hidden={copy || undefined}
                      className={cn(
                        "px-6 text-lg font-bold tracking-tight whitespace-nowrap text-navy/45",
                        copy && "motion-reduce:hidden",
                      )}
                    >
                      {brand}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
