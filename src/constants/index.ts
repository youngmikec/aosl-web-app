import { Review } from "../common";
import { Step } from "../components/frontend-components/services/traing-service-comp";

export const whatsAppUrl: string = `https://wa.me/447784284117`;
export type Faq = {
  question: string;
  answers: string[];
};

export const faqs: Faq[] = [
  {
    question: "What is AOSL and what services does it offer?",
    answers: [
      `AOSL provides you with a lot of services ranging from Personal Assistant service (PA),`,
      `Driving and transportation service, quality health care services`,
      `Accomodation guidelines, jobs and job trainings in compliance with the UK govt standards.`
    ],
  },
  {
    question: "How does ASOL ensure that all services follow UK government standards?",
    answers: [
        `ASOL adheres strictly to the guidelines set by the UK government, as outlined on www.gov.uk/working-for-yourself. We ensure that all our services, 
        from healthcare to transportation and training, meet the required standards for safety, quality, and professionalism.`
    ],
  },
  {
    question: "What kind of healthcare services do you provide?",
    answers: [
      `We employ qualified healthcare professionals to take care of patients in various settings, including homes and healthcare facilities.`,
      `Our personnel are trained to provide high-quality care, ensuring the well-being and comfort of patients.`
    ],
  },
  {
    question: "Can ASOL help with accommodation guidelines?",
    answers: [
        `Yes, ASOL offers guidance on finding and securing accommodation. 
        We provide advice on the best practices for renting or purchasing property, ensuring that clients make informed decisions.`
    ],
  },
  {
    question: "What types of job training does ASOL offer?",
    answers: [
      `ASOL offers both paid and unpaid job training opportunities. Our training programs are designed to equip individuals with the skills they need to excel in their chosen occupations, 
      with a strong emphasis on meeting UK standards.`
    ],
  },
  {
    question: "How can I apply for job training with ASOL?",
    answers: [
      `To apply for job training, you can visit our website and fill out the application form under the "Job Training" section.`, 
      `Our team will review your application and get in touch with you regarding the next steps.`
    ],
  },
  {
    question: "Does ASOL provide services for businesses as well as individuals?",
    answers: [
      `Yes, ASOL provides services to both businesses and individuals. 
      Whether you need PA services for personal use or healthcare services for a business, we tailor our services to meet your specific needs.`
    ],
  },
  {
    question: "How do I book a service with ASOL?",
    answers: [
      `You can book a service by visiting our website, contacting us via phone, Whatsapp or sending an email through our contact us page.`, 
      `Our customer service team is available to assist you in scheduling and customizing the services you need.`,
      `To ensure you get the best of services, ensure you create an account with us`
    ],
  },
  {
    question: "How much does it cost to book a service with AOSL",
    answers: [
      `All our services are very affordable and pocket friendly. However, we also give you the opportunity to negotiate with us for the best price and best service.`
    ],
  },
  {
    question: "How Can I make payment for my service?",
    answers: [
      `After your negotiation with us, we generate an invoice tailored to your request and price which you can proceed to make payment through our automated Paypal gateway
      which allows you to make payment however and whenever you want to within the due date of the invoice.
      `
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
