import { Instagram, MessageCircle, X } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-muted text-primary px-8 py-14 rounded-3xl mt-16">
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        {/* BRAND */}
        <div className="max-w-xs">
          <h2 className="text-2xl font-extrabold tracking-wide">HAIRKIFY</h2>
          <p className="text-sm opacity-70 mt-3">
            Connecting clients with beauty professionals — empowering style,
            wellness, and confidence.
          </p>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Home</li>
              <li>About us</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
              Services
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Find Stylists</li>
              <li>Marketplace</li>
              <li>Job Seekers</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
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
      <div className="border-t border-primary pt-6 flex flex-col md:flex-row justify-between text-xs opacity-70 gap-3">
        <p>
          © 2025 <span className="font-extrabold ">HAIRKIFY</span>. All rights
          reserved.
        </p>

        <p>
          We use cookies to improve your experience. By continuing, you accept
          our cookie policy.
        </p>
      </div>
    </footer>
  );
}
