import AboutHero from "@/components/AboutHero";
import VisionMission from "@/components/VisionMission";
import Process from "@/components/Process";
import TrustedBy from "@/components/TrustedBy";
import ClientTrust from "@/components/ClientTrust";
import { aboutMetadata } from "@/lib/metadata";

export const metadata = aboutMetadata;

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
