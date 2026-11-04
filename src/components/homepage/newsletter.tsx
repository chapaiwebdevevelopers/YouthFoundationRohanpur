"use client";

import { useState } from "react";
import { Check, Loader2, Lock, Mail, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Replace with your real API call:
      // await fetch("/api/newsletter", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      await new Promise((r) => setTimeout(r, 900)); // demo delay

      setStatus("success");
      setMessage("You're subscribed! Check your inbox.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12 lg:p-16">
          {/* decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            {/* ---------- Left: content ---------- */}
            <div className="max-w-xl">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs font-medium"
              >
                Stay in the Loop
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
                Never miss a chance to{" "}
                <span className="text-primary">do good</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Get a short weekly email with new events near you in Rohanpur,
                volunteer stories, and practical tips for organising your first
                drive.
              </p>
            </div>

            {/* ---------- Right: form ---------- */}
            <form onSubmit={handleSubmit} className="w-full max-w-md lg:ml-auto">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <label htmlFor="newsletterEmail" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="newsletterEmail"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    disabled={status === "loading"}
                    aria-invalid={status === "error"}
                    className="h-11 rounded-full pl-9"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="h-11 shrink-0 rounded-full px-5"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing…
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>

              {/* helper text / feedback */}
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                {status === "error" ? (
                  <span className="text-destructive">{message}</span>
                ) : status === "success" ? (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {message}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    No spam. Unsubscribe anytime.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}