import { Review } from "../common";
import { Step } from "../components/frontend-components/services/traing-service-comp";

export const whatsAppUrl: string = `https://wa.me/447784284117`;
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

export const trainingServiceSteps: Step[] = [
  {
      title: '',
      subTitle: 'Infection Prevention & Control Levels 1 and 2'
  },
  {
      title: '',
      subTitle: 'Information Governance & Data Security - Inclusive of Counter Fraud + GDPR'
  },
  {
      title: '',
      subTitle: 'Fire Safety'
  },
  {
      title: '',
      subTitle: 'Health, Safety & Welfare'
  },
  {
      title: '',
      subTitle: 'Equality, Diversity & Human Rights'
  },
  {
      title: '',
      subTitle: 'Preventing Radicalisation'
  },
  {
      title: '',
      subTitle: 'Conflict Resolution - Inclusive of Complaints Handling + Lone Working'
  },
  {
      title: '',
      subTitle: 'Safeguarding Adults Level 1 and 2 - Inclusive of Learning Disability & Autism Awareness, Mental Health & Mental Capacity Act'
  },
  {
      title: '',
      subTitle: 'Safeguarding Children Level 1 and 2'
  },
  {
      title: '',
      subTitle: 'Moving & Handling Level 1 and 2'
  },
  {
      title: '',
      subTitle: 'Resuscitation Level 1 - Inclusive of Anaphylaxis'
  },
  {
      title: '',
      subTitle: 'Resuscitation Level 2 - Adult Basic Life Support'
  },
  {
      title: '',
      subTitle: 'Resuscitation Level 3 - Adult Immediate Life Support'
  },
  {
      title: '',
      subTitle: 'Resuscitation - Level 2 - Paediatric Basic Life Support'
  },
  {
      title: '',
      subTitle: 'Resuscitation - Level 3 - Paediatric Immediate Life Support'
  },
  {
      title: '',
      subTitle: 'Resuscitation - Level 2 - New-born Basic Life Support'
  },
  {
      title: '',
      subTitle: 'Resuscitation - Level 3 - New-born Immediate Life Support'
  },
  {
      title: '',
      subTitle: 'Blood Component Transfusion'
  },
  {
      title: '',
      subTitle: 'Safeguarding Children Level 3'
  },
  {
      title: '',
      subTitle: 'Food Hygiene'
  },
  {
      title: '',
      subTitle: 'Medication Awareness'
  },
  {
      title: '',
      subTitle: 'Physical Restraint Awareness'
  },
  {
      title: '',
      subTitle: 'Safeguarding Adults Level 3'
  },
  {
      title: '',
      subTitle: 'Tissue Viability'
  },
  {
      title: '',
      subTitle: 'Your Healthcare Career'
  },
  {
      title: '',
      subTitle: 'Duty of Care'
  },
  {
      title: '',
      subTitle: 'Person Centred Care'
  },
  {
      title: '',
      subTitle: 'Communication'
  },
  {
      title: '',
      subTitle: 'Consent'
  },
  {
      title: '',
      subTitle: 'Fluids & Nutrition'
  },
  {
      title: '',
      subTitle: 'Dementia Awareness'
  },
  {
      title: '',
      subTitle: 'Sedation'
  },
  {
      title: '',
      subTitle: 'MHFA Mental Health First Aid 2 Day'
  },
  {
      title: '',
      subTitle: 'Emergency First Aid At Work - Level 3'
  },
  {
      title: '',
      subTitle: 'First Aid at Work - Level 3'
  },
  {
      title: '',
      subTitle: 'Fire Warden'
  },
  {
      title: '',
      subTitle: 'First Responder/ Bomb Awareness'
  },
  {
      title: '',
      subTitle: 'Train the Trainer – Moving and handling'
  }
]
