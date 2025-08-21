import styled from "styled-components";

const Button = styled.button`
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.6rem;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

export default Button;
