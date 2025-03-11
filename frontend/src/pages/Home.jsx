import React from "react";
import Hero from "../home/Hero";
import Trending from "../home/Trending";
import Devotional from "../home/Devotional";
import Creator from "../home/Creator";

export default function Home() {
  return (
    <div>
      <Hero />
      <h1 className="text-2xl font-bold mb-4 container mx-auto md:px-32">
        Trending
      </h1>
      <Trending />
      <Devotional />
      <Creator />
    </div>
  );
}
