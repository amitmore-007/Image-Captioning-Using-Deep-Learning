import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
// import Reachout from "@/pages/reachout";
import Reachout from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy";

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reachout" element={<Reachout />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Protected routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}