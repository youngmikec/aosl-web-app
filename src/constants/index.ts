import { Review } from "../common";

export const whatsAppUrl: string = `https://wa.me/447872078432`;
export type Faq = {
  question: string;
  answers: string[];
};

export const faqs: Faq[] = [
  {
    question: "How long does it take to get paid?",
    answers: [
      "It all depends on the time we receive your order and as well as if your receiving bank is not having a temporary downtime. Please exercise patient.",
    ],
  },
  {
    question: "Why haven’t i received my cryptocurrency?",
    answers: [
      "Your wallet will be successfully credited once the transaction meets the minimum required network confirmation specified by the our system. Please note that the minimum requirement is different for each cryptocurrency",
    ],
  },
  {
    question: "What happens if i paste  the wrong address?",
    answers: [
      "If you mistakenly withdraw funds to a wrong address chinos exchange is unable to locate the receiver of your funds and provide you any further assistance. As we initiates the withdrawal process as soon as you click [Submit]",
    ],
  },
];

export const appReviews: Review[] = [
  {
    fullName: "Collins Obinna",
    stars: 4.2,
    review:
      "Good user experience, awesome user interface and simple to use. I can attest to this platform anytime any day",
  },
  {
    fullName: "Bob Daniel",
    stars: 5,
    review:
      "I have been transacting on this website for long and I can boldly say they are good to go",
  },
  {
    fullName: "Blake Joshua",
    stars: 4.2,
    review:
      "Good user experience, awesome user interface and simple to use. I can attest to this platform anytime any day.",
  },
  {
    fullName: "Princess Amaka",
    stars: 5,
    review:
      "Fast and easy transaction. When you initiate a transaction customer services are always available to give you responses.",
  },
];
