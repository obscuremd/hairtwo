"use client";
import {
  Trophy,
  TrendingUp,
  Star,
  Users,
  Copy,
  Check,
  Share2,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const performanceMetrics = [
  {
    id: 1,
    label: "Overall Rating",
    value: "4.9",
    maxValue: "5.0",
    icon: Star,
    trend: "+0.3",
  },
  {
    id: 2,
    label: "Total Clients",
    value: "248",
    icon: Users,
    trend: "+12",
  },
  {
    id: 3,
    label: "Success Rate",
    value: "96%",
    icon: Trophy,
    trend: "+4%",
  },
  {
    id: 4,
    label: "Response Time",
    value: "2.3h",
    icon: TrendingUp,
    trend: "-0.5h",
    improvement: true,
  },
];

export default function Performance() {
  const [copied, setCopied] = useState(false);
  const shareLink = "https://yourplatform.com/provider/john-smith-design";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Performance Ranking Section */}
        <section>
          <div className="mb-4">
            <h1 className="text-xl font-bold text-[#003225] mb-1">
              Performance Ranking
            </h1>
            <p className="text-gray-500 text-xs">
              Track your service metrics and client satisfaction
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {performanceMetrics.map((metric) => {
              const Icon = metric.icon;
              const isPositiveTrend =
                metric.trend.startsWith("+") || metric.improvement;

              return (
                <Card
                  key={metric.id}
                  className={`border-l-2 ${
                    isPositiveTrend
                      ? "border-l-[#3ad688]"
                      : "border-l-[#003225]"
                  } rounded-md p-3 transition-all shadow-sm hover:shadow-md cursor-pointer group`}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className={`${
                        isPositiveTrend
                          ? "bg-[#3ad688]/10 text-[#3ad688]"
                          : "bg-[#003225]/5 text-[#003225]"
                      } p-2 rounded-md shrink-0`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 mb-0.5">
                        {metric.label}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-lg font-bold text-[#003225]">
                          {metric.value}
                        </p>
                        {metric.maxValue && (
                          <span className="text-xs text-gray-400">
                            / {metric.maxValue}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Trend Badge */}
                    <div className="text-[#003225] text-xs font-semibold bg-white px-2 py-0.5 rounded-full shrink-0 border border-[#e6e3d6]">
                      {metric.trend}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Performance Chart/Visual */}
          <Card className="mt-4 p-6 bg-gradient-to-br from-[#003225] to-[#003225]/90 border-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-0.5">
                  Top 5% Provider
                </h3>
                <p className="text-[#3ad688] text-xs">
                  You&apos;re outperforming 95% of service providers
                </p>
              </div>
              <Trophy className="w-10 h-10 text-[#3ad688]" />
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-white/80">
                <span>Your Ranking</span>
                <span className="font-semibold text-[#3ad688]">Top 5%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3ad688] to-[#3ad688]/80 rounded-full transition-all duration-1000"
                  style={{ width: "95%" }}
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Invite Clients Section */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#003225] mb-1">
              Invite Clients
            </h2>
            <p className="text-gray-500 text-xs">
              Share your profile link to attract new clients
            </p>
          </div>

          <Card className="p-6 bg-white border-[#e6e3d6]">
            <div className="w-full mx-auto">
              {/* Link Display */}
              <div className="mb-5">
                <label className="text-xs font-medium text-[#003225] mb-2 block">
                  Your Profile Link
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <Input
                      value={shareLink}
                      readOnly
                      className="pl-9 h-9 bg-[#e6e3d6]/30 border-[#e6e3d6] focus-visible:ring-[#3ad688] font-mono text-xs"
                    />
                  </div>
                  <Button onClick={handleCopy} size="sm">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white group h-9 text-xs"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
                  Email
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white group h-9 text-xs"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
                  Social
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white group h-9 text-xs"
                >
                  <LinkIcon className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
                  QR Code
                </Button>
              </div>

              {/* Stats Preview */}
              <div className="mt-6 pt-6 border-t border-[#e6e3d6]">
                <p className="text-xs text-gray-600 mb-3">
                  Link Performance (Last 30 Days)
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#003225]">127</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Profile Views
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#3ad688]">43</p>
                    <p className="text-xs text-gray-500 mt-0.5">Inquiries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#003225]">18</p>
                    <p className="text-xs text-gray-500 mt-0.5">New Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
