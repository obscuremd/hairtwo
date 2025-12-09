import { Instagram, MessageCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#002917] text-[#94A49D] px-10 md:px-20 py-20 mt-16">
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-[20%] mb-12 md:pr-32">
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
        <div className="flex flex-col md:flex-row justify-between w-full gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-[#3BCB66]">
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
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-[#3BCB66]">
              Services
            </h3>
            <ul className="space-y-2 text-md text-tertiary-c opacity-80">
              <li>Find Stylists</li>
              <li>Marketplace</li>
              <li>Job Seekers</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-[#3BCB66]">
              Support
            </h3>
            <ul className="space-y-2 text-md text-tertiary-c opacity-80">
              <li>FAQ</li>
              <li>Safety Tips</li>
              <li>Contact Us</li>
            </ul>
          </div>
          {/* SOCIALS */}
          <div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-[#3BCB66]">
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
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-[#94A49D] pt-6 flex flex-col md:flex-row justify-between text-xs opacity-70 gap-3">
        <p className="font-bold ">© 2025 HAIRXIFY. All rights reserved.</p>
      </div>
    </footer>
  );
}
