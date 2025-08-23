// Main application component that sets up the app structure and routing
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Account from "./pages/Account";
import GlobalStyles from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import { SidebarProvider } from "./contexts/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Configure React Query client with default options
// staleTime: How long data is considered fresh (1 minute)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute - data stays fresh for 1 minute
    },
  },
});

function App() {
  return (
    // Wrap the entire app with necessary providers
    <QueryClientProvider client={queryClient}>
      {/* React Query DevTools for debugging (only in development) */}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* Global CSS styles */}
      <GlobalStyles />

      {/* Sidebar context provider for sidebar state management */}
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            {/* Main app layout with sidebar and header */}
            <Route element={<AppLayout />}>
              {/* Redirect root to dashboard */}
              <Route index element={<Navigate to="/dashboard" />} />

              {/* Protected routes that require authentication */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Public routes (no authentication required) */}
            <Route path="/login" element={<Login />} />

            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
