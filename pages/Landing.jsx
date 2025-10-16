import Hero from "@/components/landing/Hero";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-white flex flex-col justify-center items-center">
      <div className="sm:p-8 w-full flex justify-center items-center">
        <Hero />
      </div>
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
