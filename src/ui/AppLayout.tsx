// Main layout component that provides the app structure with sidebar, header, and main content
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useSidebar } from "../contexts/SidebarContext";

// Props interface for the styled layout component
interface StyledAppLayoutProps {
  $isSidebarOpen: boolean; // Controls whether sidebar is visible (affects grid layout)
}

// Main layout container with responsive grid layout
const StyledAppLayout = styled.div<StyledAppLayoutProps>`
  display: grid;
  // Dynamic grid columns: sidebar (26rem) + main content (1fr) when open, or just main content (1fr) when closed
  grid-template-columns: ${(props) =>
    props.$isSidebarOpen ? "26rem 1fr" : "1fr"};
  grid-template-rows: auto 1fr; // Header (auto height) + main content (remaining space)
  height: 100vh; // Full viewport height
  transition: grid-template-columns 0.3s ease; // Smooth transition when sidebar toggles
`;

// Main content area styling
const Main = styled.main`
  background-color: var(--color-grey-50); // Light grey background
  padding: 4rem 4.8rem 6.4rem; // Generous padding for content spacing
`;

function AppLayout() {
  // Get sidebar state from context
  const { isSidebarOpen } = useSidebar();

  return (
    <StyledAppLayout $isSidebarOpen={isSidebarOpen}>
      {/* Header always visible at the top */}
      <Header />

      {/* Sidebar conditionally rendered based on state */}
      {isSidebarOpen && <Sidebar />}

      {/* Main content area - renders child routes via React Router Outlet */}
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
