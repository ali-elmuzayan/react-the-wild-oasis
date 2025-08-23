// Sidebar component containing logo and main navigation
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

// Sidebar container with styling and layout
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0); // White background
  padding: 3.2rem 2.4rem; // Generous padding for content spacing
  border-right: 1px solid var(--color-grey-100); // Subtle right border

  grid-row: 1 / -1; // Span full height in the grid layout
  display: flex;
  flex-direction: column; // Stack children vertically
  gap: 3.2rem; // Space between logo and navigation
`;

function Sidebar() {
  return (
    <StyledSidebar>
      {/* Company logo at the top */}
      <Logo />

      {/* Main navigation menu */}
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
