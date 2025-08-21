import styled from "styled-components";
import { useSidebar } from "../contexts/SidebarContext";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 0.8rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  color: var(--color-grey-600);
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const ShortcutHint = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  background-color: var(--color-grey-100);
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  pointer-events: none;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  &:hover ${ShortcutHint} {
    opacity: 1;
    transform: translateX(0);
  }
`;

function Header() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <StyledHeader>
      <HeaderContent>
        <ToggleButton onClick={toggleSidebar}>
          {isSidebarOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
        </ToggleButton>
        <ShortcutHint>Ctrl+B</ShortcutHint>
      </HeaderContent>
      <div>HEADER</div>
    </StyledHeader>
  );
}

export default Header;
