import Hero from "@/components/home/Hero";
import ConsultationSection from "@/components/home/ContactSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import TrackRecords from "@/components/home/TrackRecords";
import TestimonialSection from "@/components/home/TestimonialSection";
import TeamSection from "@/components/home/TeamSection";
import NewsSection from "@/components/home/NewsSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollReveal>
        <ConsultationSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ServicesOverview />
      </ScrollReveal>
      <ScrollReveal>
        <TrackRecords />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialSection />
      </ScrollReveal>
      <ScrollReveal>
        <TeamSection />
      </ScrollReveal>
      <ScrollReveal>
        <NewsSection />
      </ScrollReveal>
    </>
  );
}
