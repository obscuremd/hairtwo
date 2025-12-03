import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomeCard({
  image,
  primary_text,
  secondary_text,
  button_text,
  reverse,
}: {
  image: string;
  primary_text: string;
  secondary_text: string;
  button_text: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`p-5 bg-accent flex flex-col md:flex-row gap-8 rounded-3xl items-center ${
        reverse && "md:flex-row-reverse md:justify-between"
      }`}
    >
      <img
        src={image}
        alt="image"
        className="object-cover w-[400px] h-[300px] rounded-3xl"
      />
      <div className="flex flex-col gap-5">
        <h3 className="text-primary-c text-2xl md:text-3xl font-semibold">
          {primary_text}
        </h3>
        <p className="text-lg font-semibold">{secondary_text}</p>
        <Button className="bg-secondary-c w-fit">{button_text}</Button>
      </div>
    </div>
  );
}
