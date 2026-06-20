import React from 'react';
import { Layers, MapPin, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export default function WhyLokalChina() {
  const advantages = [
    {
      icon: <Layers className="w-8 h-8 stroke-[1.2] text-[#c5a880]" />,
      title: "One-Stop Solution",
      description: "Seamlessly integrating bespoke travel, medical concierge, and enterprise sourcing into a singular, premium experience."
    },
    {
      icon: <MapPin className="w-8 h-8 stroke-[1.2] text-[#c5a880]" />,
      title: "True Local Insiders",
      description: "Going far beyond the tourist wall to grant you exclusive access to China's most authentic, well-guarded resources."
    },
    {
      icon: <FileText className="w-8 h-8 stroke-[1.2] text-[#c5a880]" />,
      title: "No-Obligation Quotes",
      description: "Explore your tailored blueprints and dynamic pricing with complete flexibility and zero hidden commitments."
    },
    {
      icon: <MessageSquare className="w-8 h-8 stroke-[1.2] text-[#c5a880]" />,
      title: "Premium Native Communication",
      description: "Bridging cultural divides with flawless elite bilingual dialogue, tailored strictly to the nuances of global high-net-worth clients."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 stroke-[1.2] text-[#c5a880]" />,
      title: "24/7 On-the-Ground Support",
      description: "Your absolute peace of mind in China. Our dedicated fixers are live around the clock to navigate every digital and logistical frontier."
    }
  ];

  return (
    <section className={`w-full bg-[#f9f9fb] text-[#111215] py-24 border-t border-b border-black/5 ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-2xl md:text-3xl font-light tracking-[0.25em] uppercase text-black">
            Why LokalChina?
          </h2>
          <div className="w-12 h-[1px] bg-[#c5a880] mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 items-start">
          {advantages.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 px-2 group">
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 transition-transform duration-300 group-hover:-translate-y-1">
                {item.icon}
              </div>
              <h3 className="text-[12px] tracking-[0.15em] uppercase font-semibold text-black leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] text-gray-500 font-light leading-relaxed tracking-wide max-w-[240px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
