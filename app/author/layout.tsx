export default function AuthorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Author pages have their own header — skip the global nav + footer
    return <>{children}</>;
}
