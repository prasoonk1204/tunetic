import Hero from "@/components/landing/Hero";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-white">
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
