"use client";
import Hero from "@/components/landing/Hero";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const TuneticLanding = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-white">
      <Hero />
      <CTA />
      <Footer />
    </div>
  );
};

export default TuneticLanding;
