import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyle";
import Button from "./ui/Button";

const H1 = styled.h1`
  color: red;
  font-size: 30px;
  background-color: blue;
`;

const StyledApp = styled.main`
  background-color: var(--color-grey-50);
  min-height: 100vh;
  border-radius: var(--border-radius-lg);
  padding: 3.2rem 4rem;
  display: flex;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Hello World</H1>
        <Button onClick={() => alert("clicked")}>Click me</Button>
      </StyledApp>
    </>
  );
}
