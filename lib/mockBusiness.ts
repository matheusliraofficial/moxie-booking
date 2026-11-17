export type Business = {
  name: string;
  address: { line1: string; line2?: string; city: string; state: string; zip: string };
  email: string;
  phone: string;
  logoInitial: string;
};

export const goldSpa: Business = {
  name: "Gold Spa",
  address: {
    line1: "2525 Camino del Rio S",
    line2: "Suite 315 Room B",
    city: "San Diego",
    state: "CA",
    zip: "92108",
  },
  email: "goldspa@gmail.com",
  phone: "+11 123 4567 222",
  logoInitial: "G",
};
