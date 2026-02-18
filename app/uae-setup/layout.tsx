
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Business Setup in UAE | Trade License from AED 3,999 | BWMC",
    description: "Set up your UAE business with BWMC. Trade licenses from AED 3,999, 48-hour issuance, Free Zone & Mainland options. FTA registered. Get a free quote today.",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
