// Header component with sidebar toggle functionality and keyboard shortcut hint
import styled from "styled-components";
import { useSidebar } from "../contexts/SidebarContext";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

// Main header container with flexbox layout
const StyledHeader = styled.header`
  background-color: var(--color-grey-0); // White background
  padding: 1.2rem 4.8rem; // Horizontal and vertical padding
  border-bottom: 1px solid var(--color-grey-100); // Subtle bottom border
  display: flex;
  align-items: center;
  justify-content: space-between; // Space between left and right content
`;

// Button for toggling sidebar visibility
const ToggleButton = styled.button`
  background: none; // Transparent background
  border: none; // No border
  padding: 0.8rem; // Clickable area padding
  border-radius: var(--border-radius-sm); // Rounded corners
  cursor: pointer; // Hand cursor on hover
  color: var(--color-grey-600); // Default text color
  transition: all 0.3s; // Smooth transitions

  &:hover {
    background-color: var(--color-grey-100); // Light grey background on hover
    color: var(--color-grey-800); // Darker text on hover
  }

  svg {
    width: 2.4rem;
    height: 2.4rem; // Icon size
  }
`;

// Keyboard shortcut hint that appears on hover
const ShortcutHint = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500); // Muted text color
  background-color: var(--color-grey-100); // Light background
  padding: 0.4rem 0.8rem; // Small padding
  border-radius: var(--border-radius-sm); // Rounded corners
  opacity: 0; // Hidden by default
  transform: translateX(-10px); // Slightly offset to the left
  transition: all 0.3s ease; // Smooth animation
  pointer-events: none; // Doesn't interfere with button clicks
`;

// Container for the toggle button and shortcut hint
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem; // Space between button and hint

  // Show shortcut hint when hovering over this container
  &:hover ${ShortcutHint} {
    opacity: 1; // Fully visible
    transform: translateX(0); // Move to normal position
  }
`;

function Header() {
  // Get sidebar state and toggle function from context
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <StyledHeader>
      <HeaderContent>
        {/* Toggle button with dynamic icon based on sidebar state */}
        <ToggleButton onClick={toggleSidebar}>
          {isSidebarOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
        </ToggleButton>

        {/* Keyboard shortcut hint */}
        <ShortcutHint>Ctrl+B</ShortcutHint>
      </HeaderContent>

      {/* Placeholder for future header content */}
      <div>HEADER</div>
    </StyledHeader>
  );
}

export default Header;
