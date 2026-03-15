import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header, { BottomTabs } from "@/components/localComponents/header";
import Footer from "@/components/localComponents/footer";
import { Toaster } from "sonner";
import { GeneralProvider } from "@/context/GeneralContext";

const OpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title:
    "Hairxify - Barbers, Hair Stylists, Booking Appointments & Marketplace",
  description:
    "You can find and book local beauty professionals such as hair stylists or barbers near you. Our marketplace has beautician items for sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${OpenSans.className} antialiased relative`}>
        <GeneralProvider>
          <Toaster />
          <Header />
          {children}
          <Footer />
          <div className="fixed -bottom-1 w-full z-50 md:hidden">
            <BottomTabs />
          </div>
        </GeneralProvider>
      </body>
    </html>
  );
}
