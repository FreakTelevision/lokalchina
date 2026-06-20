import React from 'react';
import { Layers, MapPin, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export default function WhyLokalChina() {
  const advantages = [
    { icon: <Layers className="w-6 h-6 stroke-[1.2] text-[#c5a880]" />, title: "One-stop solution" },
    { icon: <MapPin className="w-6 h-6 stroke-[1.2] text-[#c5a880]" />, title: "True local insiders" },
    { icon: <FileText className="w-6 h-6 stroke-[1.2] text-[#c5a880]" />, title: "No-obligation quotes" },
    { icon: <MessageSquare className="w-6 h-6 stroke-[1.2] text-[#c5a880]" />, title: "Premium native communication" },
    { icon: <ShieldCheck className="w-6 h-6 stroke-[1.2] text-[#c5a880]" />, title: "24/7 on-the-ground support" },
  ];

  return (
    <section className={`w-full bg-[#f9f9fb] text-black py-14 ${montserrat.className}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl tracking-[0.2em] uppercase font-medium text-black">Why LokalChina?</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-start justify-center">
          {advantages.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3">
              {item.icon}
              <span className="text-sm tracking-wide text-gray-700 font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
