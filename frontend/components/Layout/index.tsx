import { useEffect, useState } from 'react';

import { Container, Main } from "./LayoutElements";
import Navbar from "./Navbar";


export default function Layout({ children, connection, setConnection }) {
  return (
    <Container>
      <Navbar connection={connection} setConnection={setConnection} />
      <Main>
        {children}
      </Main>
    </Container>
  );
}