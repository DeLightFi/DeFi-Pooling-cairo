import { Container, Main } from "./LayoutElements";
import Navbar from "./Navbar";


export default function Layout({ children }) {
  return (
    <Container>
      <Navbar />
      <Main>
        {children}
      </Main>
    </Container>
  );
}