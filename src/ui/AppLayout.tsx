import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useSidebar } from "../contexts/SidebarContext";

interface StyledAppLayoutProps {
  $isSidebarOpen: boolean;
}

const StyledAppLayout = styled.div<StyledAppLayoutProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isSidebarOpen ? "26rem 1fr" : "1fr"};
  grid-template-rows: auto 1fr;
  height: 100vh;
  transition: grid-template-columns 0.3s ease;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  const { isSidebarOpen } = useSidebar();

  return (
    <StyledAppLayout $isSidebarOpen={isSidebarOpen}>
      <Header />
      {isSidebarOpen && <Sidebar />}
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
