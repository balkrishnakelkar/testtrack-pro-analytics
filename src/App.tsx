import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import LoginScreen from "./pages/LoginScreen";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import TestInterface from "./pages/TestInterface";
import ResultsAnalytics from "./pages/ResultsAnalytics";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import TestSchedule from "./pages/TestSchedule";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Mathematics from "./pages/subjects/Mathematics";
import Science from "./pages/subjects/Science";
import English from "./pages/subjects/English";
import History from "./pages/subjects/History";
import Art from "./pages/subjects/Art";
import MusicPage from "./pages/subjects/Music";

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

  const shouldShowSidebar = user && (user.role === 'student' || user.role === 'admin' || user.role === 'educator');

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (user.role === 'parent') {
    return (
      <Routes>
        <Route path="/login" element={<Navigate to="/parent-dashboard" replace />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="*" element={<Navigate to="/parent-dashboard" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to={getDashboardPath()} replace />} />
      <Route path="/" element={<Navigate to={getDashboardPath()} replace />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/schedule" element={<TestSchedule />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/subjects/mathematics" element={<Mathematics />} />
        <Route path="/subjects/science" element={<Science />} />
        <Route path="/subjects/english" element={<English />} />
        <Route path="/subjects/history" element={<History />} />
        <Route path="/subjects/art" element={<Art />} />
        <Route path="/subjects/music" element={<MusicPage />} />
        <Route path="/test/:testId" element={<TestInterface />} />
        <Route path="/results/:resultId" element={<ResultsAnalytics />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AppContent = () => {
  const { user } = useAuth();
  const shouldShowSidebar = user && (user.role === 'student' || user.role === 'admin' || user.role === 'educator');

  if (!shouldShowSidebar) {
    return <AppRoutes />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b px-4">
            <SidebarTrigger />
          </header>
          <main className="flex-1">
            <AppRoutes />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
