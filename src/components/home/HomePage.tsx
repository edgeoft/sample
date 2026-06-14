import { Toaster } from "@/components/toaster";
import { TopBar } from "@/components/home/TopBar";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Services } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { PastWorks } from "@/components/home/PastWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { BookingSection } from "@/components/home/BookingSection";
import { FAQ } from "@/components/home/FAQ";
import { Footer } from "@/components/home/Footer";
import { MobileCallButton } from "@/components/home/MobileCallButton";
import { ScrollToTopButton } from "@/components/home/ScrollToTopButton";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy">
      <Toaster richColors position="top-center" />
      <TopBar />
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <PastWorks />
      <Testimonials />
      <BookingSection />
      <FAQ />
      <Footer />
      <MobileCallButton />
      <ScrollToTopButton />
    </div>
  );
}
