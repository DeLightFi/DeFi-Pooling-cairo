import { useEffect, useState } from 'react';

import { Container, Main } from "./LayoutElements";
import Navbar from "./Navbar";


export default function Layout({ children, connection, setConnection, setProvider, setAddress }) {
  return (
    <Container>
      <Navbar connection={connection} setConnection={setConnection} setProvider={setProvider} setAddress={setAddress} />
      <Main>
        {children}
      </Main>
    </Container>
  );
}