import { Icon } from "./icon";

type FaqListProps = {
  items: { question: string; answer: string }[];
};

/** Native <details> accordion: keyboard and screen-reader support for free, no JS. */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-navy [&::-webkit-details-marker]:hidden">
            {item.question}
            <Icon name="chevron-right" className="size-5 shrink-0 transition-transform group-open:rotate-90" />
          </summary>
          <p className="pb-5 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
