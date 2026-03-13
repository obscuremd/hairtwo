"use client";

import About from "@/screens/ServiceProviderScreen/About";
import Amenities from "@/screens/ServiceProviderScreen/Amenities";
import Hero from "@/screens/ServiceProviderScreen/Hero";
import {
  ProviderNotFound,
  ProviderSkeleton,
} from "@/screens/ServiceProviderScreen/ProviderStates";
import Reviews from "@/screens/ServiceProviderScreen/Reviews";
import Services from "@/screens/ServiceProviderScreen/Services";
import { SimilarStylist } from "@/screens/ServiceProviderScreen/SimilarStylist";
import { GetProviderServices, GetSingleProvider } from "@/utils/providers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Index() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [serivces, setServices] = useState<ServiceGroup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProvider() {
      setLoading(true);
      try {
        const response = await GetSingleProvider(id);
        if (response.success) {
          setProvider(response.data);
        } else {
          toast.message(response.message);
        }
      } finally {
        setLoading(false);
      }
    }
    async function getServices() {
      setLoading(true);
      try {
        const response = await GetProviderServices(id);
        console.log(response);
        if (response.success) {
          setServices(response.data);
        } else {
          toast.message(response.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getProvider();
    getServices();
  }, [id]);

  if (loading) {
    return <ProviderSkeleton />;
  }
  if (provider === null) {
    return <ProviderNotFound />;
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-5">
        <div className=" md:w-4/6">
          <Hero provider={provider} />
          <Services provider={provider} services={serivces} />
          <Amenities />
        </div>
        <div className="md:w-2/6">
          <About provider={provider} />
        </div>
      </div>
      <Reviews />
      <SimilarStylist />
    </div>
  );
}
