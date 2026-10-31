"use client";

import Link from "next/link";
import {
  Clock,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { siFacebook, siInstagram, siX, siYoutube } from "simple-icons";

import { Separator } from "@/components/ui/separator";

/* ------------------------------ types ------------------------------ */

type BrandIcon = { path: string; title: string };

type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon | BrandIcon;
};

/* ------------------------------- data ------------------------------ */

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/joined-events", label: "Joined Events" },
  { href: "/manage-events", label: "Manage Events" },
];

const programLinks = [
  { href: "/events?type=clothes", label: "Winter Clothes Drive" },
  { href: "/events?type=fajr", label: "Fajr Gift Campaign" },
  { href: "/events?type=quran", label: "Quran Recitation Gifts" },
  { href: "/events?type=islamic", label: "Islamic Program Gifts" },
  { href: "/events?type=food", label: "Monthly Food Packs" },
];

const contactInfo: { icon: LucideIcon; text: string }[] = [
  {
    icon: MapPin,
    text: "Rohanpur, Gomastapur, Rajshahi, Bangladesh",
  },
  { icon: Phone, text: "+880 1700-000000" },
  { icon: Mail, text: "hello@youthfoundationrohanpur.org" },
  { icon: Clock, text: "Sat – Thu, 9:00 AM – 8:00 PM" },
];

const socials: SocialLink[] = [
  { href: "#", label: "Facebook", icon: siFacebook },
  { href: "#", label: "X", icon: siX },
  { href: "#", label: "Instagram", icon: siInstagram },
  { href: "#", label: "YouTube", icon: siYoutube },
];

/* -------------------------- icon renderer -------------------------- */

function SocialIcon({
  icon,
  className,
}: {
  icon: LucideIcon | BrandIcon;
  className?: string;
}) {
  if ("path" in icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    );
  }

  const Icon = icon;
  return <Icon className={className} />;
}

/* ---------------------------- footer ------------------------------ */

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-12">
          {/* ---------- Brand column ---------- */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <b className="text-base font-bold">Youth Foundation</b>
                <span className="text-xs text-muted-foreground">Rohanpur</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A youth-led community platform for creating, joining and tracking
              social service events across Rohanpur, Gomastapur, Rajshahi.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-background text-muted-foreground ring-1 ring-border transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <SocialIcon icon={icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- Explore column ---------- */}
          <nav className="lg:col-span-2" aria-label="Explore">
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Programs column ---------- */}
          <nav className="lg:col-span-3" aria-label="Our Programs">
            <h4 className="text-sm font-semibold">Our Programs</h4>
            <ul className="mt-4 space-y-2.5">
              {programLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Contact column ---------- */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold">Get in Touch</h4>
            <ul className="mt-4 space-y-3">
              {contactInfo.map(({ icon: Icon, text }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <span className="leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <span>© 2025 Youth Foundation Rohanpur. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with
            <Heart className="h-3.5 w-3.5 fill-current text-red-500" />
            for the people of Rohanpur
          </span>
        </div>
      </div>
    </footer>
  );
}