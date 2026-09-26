import { Artwork } from "@/components/ui/artwork";
import { Card, CardBody, CardFooter, CardMedia, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { StatBadge } from "@/components/ui/stat-badge";
import { productHref } from "../routes";
import type { ProductSummary } from "../types";
import { AudienceBadge } from "./audience-badge";

export function ProductCard({ product, priority }: { product: ProductSummary; priority?: boolean }) {
  return (
    <Card interactive>
      <CardMedia>
        <Artwork media={product.media} seed={product.slug} priority={priority} />
      </CardMedia>
      <CardBody>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle href={productHref(product.slug)} linkLabel={`${product.name}: view product details`}>
            {product.name}
          </CardTitle>
          <AudienceBadge audience={product.audience} />
        </div>
        <p className="line-clamp-3 text-sm text-muted">{product.summary}</p>
        <CardFooter className="justify-between">
          <StatBadge
            value={product.stat.value}
            label={product.stat.label}
            icon={product.stat.label === "downloads" ? "download" : "users"}
          />
          <StarRating value={product.rating.value} count={product.rating.count} />
        </CardFooter>
      </CardBody>
    </Card>
  );
}
