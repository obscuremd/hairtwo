import { Instagram, MessageCircleDashed, Twitter } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-[#27272A] text-tertiary-c p-8 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-c">
            About Us
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Home</li>
            <li>About us</li>
            <li>Blog</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-c">
            Our Services
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Find Stylists</li>
            <li>Marketplace</li>
            <li>Job Seekers</li>
          </ul>
        </div>

        {/* Help Centre */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-c">
            Help Centre
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>FAQ</li>
            <li>Safety Tips</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-c">Socials</h3>
          <div className="flex items-center gap-4">
            <Button variant={"default"} size={"icon-lg"}>
              <Instagram />
            </Button>
            <Button variant={"default"} size={"icon-lg"}>
              <Twitter />
            </Button>
            <Button variant={"default"} size={"icon-lg"}>
              <MessageCircleDashed />
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 pt-6 text-center text-xs opacity-60 flex flex-col md:flex-row justify-between w-full gap-3">
        <p className="text-primary-c">
          Copyright © 2025 Hairkify. All rights reserved
        </p>

        <p className="">
          Please note that we use cookies to improve our site and your usage
          experience. By using this site, you accept our cookie policy.
        </p>
      </div>
    </footer>
  );
}
