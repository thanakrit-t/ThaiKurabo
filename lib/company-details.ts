export type CompanyLocation = {
  label: string;
  addressLines: string[];
  phone: string;
  telephoneHref: string;
  mapUrl?: string;
};

export const companyLocations: CompanyLocation[] = [
  {
    label: "Head Office",
    addressLines: [
      "9th Floor, Sindhorn Tower 2",
      "130-132 Wireless Road, Lumphini",
      "Pathum Wan, Bangkok 10330",
    ],
    phone: "02-256-6839-49",
    telephoneHref: "tel:+6622566839",
  },
  {
    label: "Factory",
    addressLines: [
      "14/8, 14/12 Moo 1, Phahonyothin Road",
      "Khlong Nueng Subdistrict, Khlong Luang District",
      "Pathum Thani 12120, Thailand",
    ],
    phone: "02-516-8421-4",
    telephoneHref: "tel:+6625168421",
    mapUrl: "https://maps.app.goo.gl/zqzzscWeqgauiimN9",
  },
];
