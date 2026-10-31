"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Crown,
  HandHelping,
  Heart,
  ListChecks,
  Mail,
  Sparkles,
  UserPlus,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { siFacebook, siInstagram, siX } from "simple-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ------------------------------ types ------------------------------ */

type BrandIcon = { path: string; title: string };

type Social = {
  href: string;
  label: string;
  icon: LucideIcon | BrandIcon;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  roleIcon: LucideIcon;
  description: string;
  image: string;
  likes: number;
  socials: Social[];
};

/* ------------------------------- data ------------------------------ */

const team: TeamMember[] = [
  {
    id: "1",
    name: "Md. Rakibul Islam",
    role: "Founder",
    roleIcon: Crown,
    description:
      "Started Youth Foundation Rohanpur in 2019 with a group of college friends.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    likes: 128,
    socials: [
      { href: "#", label: "Facebook", icon: siFacebook },
      { href: "#", label: "X", icon: siX },
      { href: "mailto:rakib@yfr.org", label: "Email", icon: Mail },
    ],
  },
  {
    id: "2",
    name: "Ayesha Khatun",
    role: "Vice President",
    roleIcon: Briefcase,
    description:
      "Leads the winter clothes drive and coordinates with local families.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=240&q=80",
    likes: 94,
    socials: [
      { href: "#", label: "Facebook", icon: siFacebook },
      { href: "#", label: "Instagram", icon: siInstagram },
      { href: "mailto:ayesha@yfr.org", label: "Email", icon: Mail },
    ],
  },
  {
    id: "3",
    name: "Shahidul Alam",
    role: "Project Coordinator",
    roleIcon: ListChecks,
    description: "Manages event planning, logistics and volunteer schedules.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    likes: 76,
    socials: [
      { href: "#", label: "Facebook", icon: siFacebook },
      { href: "#", label: "X", icon: siX },
      { href: "mailto:shahidul@yfr.org", label: "Email", icon: Mail },
    ],
  },
  {
    id: "4",
    name: "Nasrin Sultana",
    role: "Volunteer Lead",
    roleIcon: HandHelping,
    description: "Welcomes new volunteers and runs the Fajr gift campaign.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
    likes: 112,
    socials: [
      { href: "#", label: "Facebook", icon: siFacebook },
      { href: "#", label: "Instagram", icon: siInstagram },
      { href: "mailto:nasrin@yfr.org", label: "Email", icon: Mail },
    ],
  },
];

/* -------------------------- icon renderer -------------------------- */

function SocialIcon({
  icon,
  className,
}: {
  icon: LucideIcon | BrandIcon;
  className?: string;
}) {
  // simple-icons entries are plain objects with `.path`
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

  // otherwise it's a Lucide component
  const Icon = icon;
  return <Icon className={className} />;
}

/* --------------------------- team card ----------------------------- */

function TeamCard({ member }: { member: TeamMember }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [like, setLike] = useState({ count: member.likes, liked: false });

  const RoleIcon = member.roleIcon;

  const toggleLike = () =>
    setLike((s) => ({
      liked: !s.liked,
      count: s.liked ? s.count - 1 : s.count + 1,
    }));

  return (
    <Card className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border-border/60 p-6 pt-12 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* like button */}
      <button
        type="button"
        onClick={toggleLike}
        aria-pressed={like.liked}
        aria-label={like.liked ? "Unlike this member" : "Like this member"}
        className={cn(
          "absolute right-3 top-3 flex items-center gap-1 rounded-full border border-border/60 bg-background/90 px-2.5 py-1 text-xs font-semibold tabular-nums backdrop-blur transition-colors",
          like.liked
            ? "text-red-500"
            : "text-muted-foreground hover:text-red-500"
        )}
      >
        <Heart className={cn("h-3.5 w-3.5", like.liked && "fill-current")} />
        {like.count}
      </button>

      {/* avatar */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-muted ring-4 ring-background">
        <div className="absolute inset-0 grid place-items-center text-muted-foreground/30">
          <UserRound className="h-10 w-10" strokeWidth={1.2} />
        </div>
        {!imgFailed && (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="96px"
            className="object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {/* role */}
      <Badge
        variant="secondary"
        className="gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      >
        <RoleIcon className="h-3 w-3 text-primary" />
        {member.role}
      </Badge>

      {/* name + description */}
      <h3 className="text-lg font-semibold leading-snug">{member.name}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {member.description}
      </p>

      {/* socials */}
      <div className="mt-auto flex items-center gap-2 pt-2">
        {member.socials.map(({ href, label, icon }) => (
          <Button
            key={label}
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <a href={href} aria-label={label}>
              <SocialIcon icon={icon} className="h-4 w-4" />
            </a>
          </Button>
        ))}
      </div>
    </Card>
  );
}

/* ---------------------------- section ------------------------------ */

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs font-medium"
          >
            Our Team
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            The people behind Youth Foundation Rohanpur
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            A small group of local volunteers working every week so that no
            family in Rohanpur feels cold, hungry or forgotten.
          </p>
        </div>

        {/* grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* join CTA */}
        <Card className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border-border/60 bg-primary/5 p-6 sm:flex-row sm:items-center md:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Want to serve with us?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We welcome students, teachers and anyone who wants to help
                Rohanpur.
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Become a Volunteer
            </Link>
          </Button>
        </Card>
      </div>
    </section>
  );
}