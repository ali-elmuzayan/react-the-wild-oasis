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
import { Toaster } from "react-hot-toast";

// Configure React Query client with default options
// staleTime: How long data is considered fresh (1 minute)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute - data stays fresh for 1 minute
      retry: 1, // Only retry once
      retryDelay: 1000, // Wait 1 second before retrying
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

      {/* Toaster */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
