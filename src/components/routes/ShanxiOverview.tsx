import React from 'react';

const ROUTE_CONFIG = {
  days: 6,
  totalSites: 10,
};

export default function ShanxiOverview() {
  return (
    <div className="max-w-4xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-950 tracking-wide">Overview</h2>
      <p className="text-sm md:text-[14px] text-gray-600 font-normal leading-relaxed tracking-wide">
        Follow the footsteps of the Destined One through {ROUTE_CONFIG.totalSites} handpicked, real-world locations that inspired Black Myth: Wukong. Over this immersive {ROUTE_CONFIG.days}-day journey, from the awe-inspiring Yungang Grottoes to the suspended sculptures of Xiaoxitian, you will experience the ultimate architectural pilgrimage curated specifically for gamers, photographers, and cultural explorers.
      </p>
    </div>
  );
}
