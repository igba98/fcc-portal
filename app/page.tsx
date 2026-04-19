import { TopUtilityBar } from '@/components/landing/TopUtilityBar';
import { MainNavigation } from '@/components/landing/MainNavigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ProcessesSection } from '@/components/landing/ProcessesSection';
import { FeesSection } from '@/components/landing/FeesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PortIntegrationSection } from '@/components/landing/PortIntegrationSection';
import { NewsAndNoticesSection } from '@/components/landing/NewsAndNoticesSection';
import { PartnersMarquee } from '@/components/landing/PartnersMarquee';
import { SiteFooter } from '@/components/landing/SiteFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <TopUtilityBar />
      <MainNavigation />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProcessesSection />
      <FeesSection />
      <HowItWorksSection />
      <PortIntegrationSection />
      <NewsAndNoticesSection />
      <PartnersMarquee />
      <SiteFooter />
    </div>
  );
}
