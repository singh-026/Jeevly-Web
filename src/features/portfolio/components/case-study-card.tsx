import { Artwork } from "@/components/ui/artwork";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardFooter, CardMedia, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { disciplineLabels } from "@/features/services/constants";
import type { CaseStudy } from "../types";

export function CaseStudyCard({ study, className }: { study: CaseStudy; className?: string }) {
  const isComplete = study.engagement === "complete";
  const category = isComplete
    ? "Development + Marketing"
    : study.disciplines.map((d) => disciplineLabels[d]).join(" + ");

  return (
    <Card interactive={!!study.href} className={className}>
      <CardMedia
        className={cn(study.featured && "sm:aspect-[21/9]")}
        overlay={
          isComplete && (
            <Badge tone="navy">
              <Icon name="layers" className="size-3.5 text-accent" />
              Complete Package
            </Badge>
          )
        }
      >
        <Artwork media={study.media} seed={study.slug} variant={study.featured ? "screen" : "cover"} />
      </CardMedia>
      <CardBody>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="outline">{category}</Badge>
          {study.featured && <Badge tone="accent">Featured</Badge>}
        </div>
        <CardTitle href={study.href} linkLabel={study.href ? `Read the ${study.client} case study` : undefined}>
          {study.client}
          <span className="mt-0.5 block text-sm font-normal text-muted">{study.project}</span>
        </CardTitle>
        <CardFooter className="text-base text-ink">
          <p className="flex items-start gap-2">
            <Icon name="target" className="mt-0.5 size-5 shrink-0 text-navy" />
            {study.outcome}
          </p>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
