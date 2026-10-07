import Metadata from "next";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Commercial Licensing & Pricing | SUTRA / NEXUS",
  description: "Transparent single license options for Core Launch Tier, Growth Stack Tier, and Enterprise Engine Tier with 100% source code ownership.",
};

export default function PricingPage() {
  return (
    <div className="pt-24 bg-[#07090E] min-h-screen">
      <PricingSection />
      <ContactSection />
    </div>
  );
}
