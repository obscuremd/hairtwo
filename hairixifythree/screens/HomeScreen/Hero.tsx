"use client";

import { MButton } from "@/components/moving-border";
import RollingGallery from "@/components/RollingGallery";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const data = [
    "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=600&auto=format&fit=crop&q=60",

    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60",

    "https://plus.unsplash.com/premium_photo-1683134297492-cce5fc6dae31?w=600&auto=format&fit=crop&q=60",

    "https://plus.unsplash.com/premium_photo-1664301489002-2fed4596c101?w=600&auto=format&fit=crop&q=60",

    "https://plus.unsplash.com/premium_photo-1661507250205-79ffef5cdeb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhcmQlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",

    "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2tpbmNhcmUlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",

    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=60",

    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww",

    "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=600&auto=format&fit=crop&q=60",

    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&auto=format&fit=crop&q=60",
  ];

  return (
    <main className="relative w-full h-[80vh] md:h-[80vh]">
      <div className="inset-0 flex flex-col items-center justify-between md:p-4 rounded-3xl z-20">
        <div className=" pt-[20%] md:pt-[5%] md:px-10 flex flex-col gap-5 items-center text-center">
          <MButton
            borderRadius="1.75rem"
            className="bg-white/10 border-white/70 backdrop-blur-md shadow-xl text-secondary-foreground font-semibold "
            borderClassName="bg-[radial-gradient(#ffffff_40%,transparent_60%)] opacity-[0.9]"
          >
            ✨ Excellence awaits
          </MButton>

          <h1 className="text-3xl md:text-7xl font-extrabold ">
            No.1 Free stylists <br /> and marketplace website!
          </h1>
          <p className="text-xl ">
            Discover barbers, stylists, hair salons and therapy
            <br /> professionals around you...
          </p>
          <div className="space-x-2 md:space-x-5">
            <Button className="rounded-full bg-primary-c/50 text-secondary-c font-bold px-10 md:px-15 py-3 md:py-5 border-2 border-primary-c">
              Discover
            </Button>

            <Button className="rounded-full font-bold bg-muted-foreground/50 border-2 border-muted-foreground/25 text-secondary px-10 md:px-15 py-3 md:py-5 ">
              Register
            </Button>
          </div>
        </div>

        <RollingGallery autoplay images={data} />
      </div>
    </main>
  );
}
