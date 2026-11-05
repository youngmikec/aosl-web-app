import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import ComingSoon from "../components/ComingSoon";
import HomePage from "../pages/home";
import ServiceDetailPage from "../pages/services";
import AboutPage from "../pages/about";
import BlogsPage from "../pages/blogs";
import BlogDetail from "../pages/blogs/BlogDetail";
import ContactPage from "../pages/contact";
import FAQsPage from "../pages/faq";
import JobsTrainingPage from "../pages/jobs-trainings";
import AuthPage from "../pages/auth";
import DashboardPage from "../pages/dashboard";
import { RequireAuth } from "./ProtectedRoute";

// v1 dashboard URLs now live inside the single dashboard screen.
const LEGACY_DASHBOARD_PATHS = ["/account", "/history", "/jobs", "/job-application", "/chats"];

export default function V2Routes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<AuthPage />} />
      <Route path="/sign-up" element={<AuthPage />} />
      <Route path="/forgot-password" element={<AuthPage />} />
      <Route path="/verify" element={<AuthPage />} />
      <Route path="/verify/:code" element={<AuthPage />} />
      <Route path="/users-dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      {LEGACY_DASHBOARD_PATHS.map((path) => (
        <Route key={path} path={path} element={<Navigate to="/users-dashboard" replace />} />
      ))}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServiceDetailPage />} />
        <Route path="/services/:service" element={<ServiceDetailPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/jobs-trainings" element={<JobsTrainingPage />} />
        <Route path="/jobs-trainings/:jobId" element={<JobsTrainingPage />} />

        {/* No Figma design yet — see ENDPOINTS_NEEDED.md "Screens without a design" */}
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/view/:slug" element={<BlogDetail />} />
        <Route path="/invoice/:invoiceId" element={<ComingSoon title="Invoice" />} />
        <Route path="/paypal" element={<ComingSoon title="Checkout" />} />

        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Route>
    </Routes>
  );
}
