"use client";

import PageTitle from "@/components/page-title";
import AboutCard from "@/components/pages/about/about-card";
import Address from "@/components/pages/about/address";
import CardInformation from "@/components/pages/about/card-information";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F5EE] dark:bg-slate-800 flex" dir="rtl">
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8 space-y-6">
          <PageTitle title="درباره ما" description="آشنایی با زروان" />

          {/* About Content */}
          <AboutCard />

          {/* Contact Information */}
          <CardInformation />

          {/* Address */}
          <Address />
        </main>
      </div>
    </div>
  );
}
