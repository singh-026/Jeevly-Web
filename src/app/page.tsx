import { Artwork } from "@/components/ui/artwork";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardFooter, CardMedia, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeader } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

const doors = [
  {
    href: "/services",
    title: "Services",
    audience: "For businesses",
    description: "Development and marketing teams for hire: à la carte, or as one complete package from build to launch.",
    media: { tone: "indigo", alt: "Illustration of a product dashboard" },
  },
  {
    href: "/products",
    title: "Products",
    audience: "For everyone",
    description: "Apps and tools we build and run ourselves, for teams, households and individuals.",
    media: { tone: "amber", alt: "Illustration of a mobile app" },
  },
] as const;

export default function HomePage() {
  return (
    <Section aria-labelledby="home-title" className="sm:py-28">
      <SectionHeader id="home-title" as="h1" eyebrow={siteConfig.name} title={siteConfig.tagline} align="center" />
      <ul className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {doors.map((door) => (
          <li key={door.href}>
            <Card interactive>
              <CardMedia>
                <Artwork media={door.media} seed={door.href} priority />
              </CardMedia>
              <CardBody>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle href={door.href} className="text-2xl">
                    {door.title}
                  </CardTitle>
                  <Badge tone="outline">{door.audience}</Badge>
                </div>
                <p className="text-muted">{door.description}</p>
                <CardFooter className="font-semibold text-navy">
                  Explore {door.title.toLowerCase()}
                  <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
                </CardFooter>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
