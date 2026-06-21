"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

interface FormSuccessProps {
  title?: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
}

export function FormSuccess({
  title = "Thank you for your enquiry",
  subtitle = "We've received your message and will respond within 24 hours.",
  linkHref = "/en/routes",
  linkLabel = "Explore our routes",
}: FormSuccessProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-light tracking-wide text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{subtitle}</p>
        </div>
        <div className="pt-4">
          <Link
            href={linkHref}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-gray-500 hover:text-black transition-colors"
          >
            {linkLabel} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
