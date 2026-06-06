import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { Trust } from "@/components/sections/Trust";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AIAdvisor } from "@/components/sections/AIAdvisor";
import { FinancialHealth } from "@/components/sections/FinancialHealth";
import { Testimonials } from "@/components/sections/Testimonials";
import { Security } from "@/components/sections/Security";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { useTranslation } from "@/context/I18nContext";

function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
    >
      {t("a11y.skipToContent")}
    </a>
  );
}

export default function App() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <PartnerStrip />
        <Trust />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <AIAdvisor />
        <FinancialHealth />
        <Testimonials />
        <Security />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
