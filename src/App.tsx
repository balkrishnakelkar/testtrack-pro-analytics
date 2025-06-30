
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import TestInterface from "./pages/TestInterface";
import ResultsAnalytics from "./pages/ResultsAnalytics";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case 'parent':
        return "/parent-dashboard";
      case 'admin':
      case 'educator':
        return "/admin";
      default:
        return "/dashboard";
    }
  };

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={getDashboardPath()} replace /> : <LoginScreen />} />
      <Route path="/" element={<Navigate to={user ? getDashboardPath() : "/login"} replace />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/test/:testId" element={<TestInterface />} />
        <Route path="/results/:resultId" element={<ResultsAnalytics />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
