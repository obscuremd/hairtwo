import { Instagram, MessageCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary-c text-primary-c px-8 py-14 mt-16">
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        {/* BRAND */}
        <div className="max-w-xs">
          <Link href="/" className="text-xl font-bold">
            <img src={"/Logo.png"} className="w-36 rounded-xl" />
          </Link>
          <p className="text-sm text-tertiary-c opacity-80 mt-3">
            Connecting clients with beauty professionals — empowering style,
            wellness, and confidence.
          </p>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-md text-tertiary-c opacity-80">
              <li>About us</li>
              <li>Blog</li>
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">
              Services
            </h3>
            <ul className="space-y-2 text-md text-tertiary-c opacity-80">
              <li>Find Stylists</li>
              <li>Marketplace</li>
              <li>Job Seekers</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-2 text-md text-tertiary-c opacity-80">
              <li>FAQ</li>
              <li>Safety Tips</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Follow Us
          </h3>
          <div className="flex items-center gap-3">
            <Button variant="default" size="icon">
              <Instagram className="w-5 h-5" />
            </Button>
            <Button variant="default" size="icon">
              <X className="w-5 h-5" />
            </Button>
            <Button variant="default" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-primary-c pt-6 flex flex-col md:flex-row justify-between text-xs opacity-70 gap-3">
        <p>
          © 2025 <span className="font-extrabold ">HAIRXIFY</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
