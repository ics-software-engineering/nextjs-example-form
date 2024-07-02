"use client";
import { Container, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Next.js Example Form</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
