import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import V2Routes from "./routes";
import "./v2.css";

export default function V2App() {
  return (
    <div className="v2-root">
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <V2Routes />
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </div>
  );
}
