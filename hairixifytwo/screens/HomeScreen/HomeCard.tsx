import { Button } from "@/components/ui/button";

export default function HomeCard({
  image,
  primary_text,
  secondary_text,
  button_text,
}: {
  image: string;
  primary_text: string;
  secondary_text: string;
  button_text: string;
}) {
  return (
    <div className="relative rounded-3xl overflow-hidden flex flex-col w-full h-full justify-end">
      <img
        src={image}
        alt="image"
        className="object-cover absolute inset-0 w-full h-full z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/70 z-10" />

      <div className="relative z-20 flex flex-col gap-4 p-6 md:w-[70%]">
        <p className="text-white text-xl font-bold leading-tight">
          {primary_text}
        </p>

        <p className="text-white/90 text-sm leading-relaxed">
          {secondary_text}
        </p>

        <Button className="bg-secondary-c w-fit text-tertiary-c font-semibold">
          {button_text}
        </Button>
      </div>
    </div>
  );
}
