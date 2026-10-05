import { HeroSection } from "@/features/hero";
import { AboutSection } from "@/features/about";
import { SkillsSection } from "@/features/skills";
import { ProjectsSection } from "@/features/projects";
import { ExperienceSection } from "@/features/experience";
import { CertificatesSection } from "@/features/certificates";
import { ServicesSection } from "@/features/services";
// import { TestimonialsSection } from "@/features/testimonials";
import { BlogSection } from "@/features/blog";
import { ContactSection } from "@/features/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificatesSection />
      <ServicesSection />
      {/* <TestimonialsSection /> */}
      <BlogSection />
      <ContactSection />
    </>
  );
}
