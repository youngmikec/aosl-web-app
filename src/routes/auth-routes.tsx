import { ReactNode } from "react";
import { Home, SignUP, SignIn, ForgotPassword } from "../pages";
import AboutUs from "../pages/about-us";
import ContactUs from "../pages/contact-us";
import EmailVerificationPage from "../pages/email-verification";
import Faq from "../pages/faq";
import ServicesPage from "../pages/services";
import ServicesDetailPage from "../pages/services/servicesDetail";
import JobSearchPage from "../pages/job-search";
import JobDetailsPage from "../pages/job-detail-page";
import InvoicePage from "../pages/InvoicePage";
import PaypalCheckoutPage from '../pages/PaypalCheckoutPage';



export type RouteType = {
    path: string;
    component: ReactNode
}

const authRoutes: RouteType[] = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/about-us',
        component: <AboutUs />
    },
    {
        path: '/contact-us',
        component: <ContactUs />
    },
    {
        path: '/services',
        component: <ServicesPage />
    },
    {
        path: '/services/:service',
        component: <ServicesDetailPage />
    },
    
    {
        path: '/invoice/:invoiceId',
        component: <InvoicePage />
    },
    {
        path: '/paypal',
        component: <PaypalCheckoutPage />
    },
    {
        path: '/jobs-trainings',
        component: <JobSearchPage />
    },
    {
        path: '/jobs-trainings/:jobId',
        component: <JobDetailsPage />
    },
    {
        path: '/faqs',
        component: <Faq />
    },
    
    
    {
        path: '/sign-up',
        component: <SignUP/>
    },
    {
        path: '/sign-in',
        component: <SignIn/>
    },
    {
        path: '/verify',
        component: <EmailVerificationPage />
    },
    {
        path: '/verify/:code',
        component: <EmailVerificationPage />
    },
    {
      path: '/forgot-password',
      component:<ForgotPassword />
    },

    // {
    //     path: '*',
    //     component: <NotFoundPage/>
    // }
]

export default authRoutes;