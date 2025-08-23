// Main navigation component with styled navigation links
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

// Navigation list container
const NavList = styled.ul`
  display: flex;
  flex-direction: column; // Stack navigation items vertically
  gap: 0.8rem; // Space between navigation items
`;

// Styled navigation link with hover and active states
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center; // Center items vertically
    gap: 1.2rem; // Space between icon and text

    color: var(--color-grey-600); // Default text color
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem; // Generous padding for clickable area
    transition: all 0.3s; // Smooth transitions
  }

  /* Active and hover states - React Router automatically adds 'active' class */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800); // Darker text on hover/active
    background-color: var(--color-grey-50); // Light background
    border-radius: var(--border-radius-sm); // Rounded corners
  }

  /* Icon styling */
  & svg {
    width: 2.4rem;
    height: 2.4rem; // Consistent icon size
    color: var(--color-grey-400); // Default icon color
    transition: all 0.3s; // Smooth icon transitions
  }

  /* Icon color changes on hover and active states */
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600); // Brand color for active/hover icons
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        {/* Dashboard/Home navigation item */}
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>

        {/* Bookings navigation item */}
        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>

        {/* Cabins navigation item */}
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>

        {/* Users navigation item */}
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>

        {/* Settings navigation item */}
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
