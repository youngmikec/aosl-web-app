import type { IconType } from "react-icons";
import { CgInstagram } from "react-icons/cg";
import { GrFacebookOption, GrTwitter } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { WHATSAPP_HREF } from "./contact";

export type SocialLink = { label: string; href: string; Icon: IconType; brand: string };

// Same accounts and icons as v1's footer.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61557766280904&_rdc=1&_rdr",
    Icon: GrFacebookOption,
    brand: "#1877F2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alloccupationservicesltd?igsh=MXFhM2ZweHdpdm1naw==",
    Icon: CgInstagram,
    brand: "#E1306C",
  },
  { label: "Twitter", href: "https://twitter.com/AOSL2023", Icon: GrTwitter, brand: "#1DA1F2" },
  { label: "WhatsApp", href: WHATSAPP_HREF, Icon: BsWhatsapp, brand: "#25D366" },
];
