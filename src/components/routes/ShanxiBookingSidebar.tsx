"use client";

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const priceTier: Record<number, number> = { 1: 4270, 2: 2360, 3: 2060, 4: 1660 };

export default function ShanxiBookingSidebar() {
  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState('');
  const pp = priceTier[travelers];
  const total = pp * travelers;

  return (
    <div className="bg-card rounded-xl border p-6 space-y-5 sticky top-24">
      <div>
        <span className="text-3xl font-bold text-primary">${pp.toLocaleString()}</span>
        <span className="text-muted-foreground text-sm"> /person</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium mb-1 block">Start Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block">Travelers</label>
          <select value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm">
            {[1,2,3,4].map(n => <option key={n} value={n}>{n} traveler{n>1?'s':''}</option>)}
          </select>
        </div>
      </div>

      <div className="border-t pt-4 space-y-1 text-sm">
        <div className="flex justify-between text-muted-foreground"><span>${pp.toLocaleString()} × {travelers}</span><span>${total.toLocaleString()}</span></div>
        <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">${total.toLocaleString()}</span></div>
      </div>

      <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:opacity-90">Book Now</button>

      <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Free cancellation within 72 hours</span>
      </div>
    </div>
  );
}
