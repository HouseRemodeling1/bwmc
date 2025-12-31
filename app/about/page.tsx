import AboutHero from "@/components/AboutHero";
import VisionMission from "@/components/VisionMission";
import Process from "@/components/Process";
import TrustedBy from "@/components/TrustedBy";
import ClientTrust from "@/components/ClientTrust";

export const metadata = {
    title: "About Us | Bridge Water Management Consultancies",
    description: "Discover BWMC – your trusted partner for accounting, auditing, taxation, and business setup services in the UAE.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <AboutHero />
            <VisionMission />
            <Process />
            <TrustedBy />
            <ClientTrust />
        </main>
    );
}
