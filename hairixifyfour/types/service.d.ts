interface ServiceGroup {
  id?: number;
  name: string;
  user: number;
  provider: number;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
  services: Array<Service>;
}

interface Service {
  id?: number;
  title: string;
  price: string;
  discount_price?: string;
  duration: string;
  description: string;
  recurrence: number;
  provider?: number;
  premium?: number;
  status?: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
  images?: Array<string>;
}
