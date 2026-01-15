import { StylistHeader } from "@/components/localComponents/header";

export default function StylistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <StylistHeader /> {children}
    </main>
  );
}
