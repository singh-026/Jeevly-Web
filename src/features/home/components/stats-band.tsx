import { Container } from "@/components/ui/section";
import { stats } from "../data/home";
import { Swoosh } from "./swoosh";

export function StatsBand() {
  return (
    <section aria-label="Jeevly in numbers" className="pb-16 sm:pb-20">
      <Container>
        <div className="grid items-center gap-8 rounded-3xl bg-navy-50 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_auto]">
          <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-navy/10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <dt className="order-2 mt-1 text-sm text-muted">{stat.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="border-navy/10 text-center lg:border-l lg:pl-10 lg:text-left">
            <p className="text-lg text-navy">
              Building products
              <br className="hidden lg:block" /> for a brighter tomorrow.
            </p>
            <Swoosh className="mx-auto mt-2 w-28 lg:mx-0 lg:ml-12" />
          </div>
        </div>
      </Container>
    </section>
  );
}
