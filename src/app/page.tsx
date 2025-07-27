"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  return (
    <main className="max-w-screen-sm mx-auto px-4 md:px-0 py-12 space-y-14 text-primary">
      <div className="space-y-0.5">
          <h1 className="font-semibold">Nick Mayernik</h1>
      </div>

      <section className="space-y-4">
          
          <div className="leading-relaxed space-y-4 text-primary">
            <p>
              I'm Nick, a designer and software engineer based in Philly. I work on design systems and college admissions advising tools at <Link href="http://brighthorizons.com" className="underline decoration-wavy underline-offset-2">Bright Horizons</Link>.
            </p>
            <p>
              Outside of design, I'm into cycling, meditation, lifting, Tottenham Hotspur, and nonfiction books.
            </p>
            <p>
              Back in the day, I studied at <Link href="http://www.lafayette.edu" className="underline decoration-wavy underline-offset-2">Lafayette College</Link>, and I'm constantly striving to be <Link href="https://calnewport.com" className="underline decoration-wavy underline-offset-2 text-nowrap">Cal Newport</Link> when I grow up.
            </p>
          </div>
      </section>

      <section className="space-y-4">
        <h2 className=" text-stone-600">
          Links
        </h2>
        <ul className="space-y-2">
          <li>
            <Link href="https://www.strava.com/athletes/61721461" className="underline decoration-wavy underline-offset-2">Strava</Link>
          </li>
          <li>
            <Link href="https://github.com/nmayernik" className="underline decoration-wavy underline-offset-2">Github</Link>
          </li>
          <li>
            <Link href="https://figma.com/@nickmayernik" className="underline decoration-wavy underline-offset-2">Figma</Link>
          </li>
          <li>
            <Link href="https://www.goodreads.com/user/show/179743154-nick-mayernik" className="underline decoration-wavy underline-offset-2">Goodreads</Link>
          </li>
        </ul>
        

      </section>
    </main>
  );
}
