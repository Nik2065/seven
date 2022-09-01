import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function NavbarFooter2() {
  return (
    <>

      
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>ProjectSeven &copy;</Navbar.Brand>

          <Nav className="d-flex">
            <Nav.Link href="#home">Privacy Policy</Nav.Link>
            <Nav.Link href="#features">{'Terms & Conditions'}</Nav.Link>
            <Nav.Link href="#pricing">Cookie Policy</Nav.Link>
            <Nav.Link href="#pricing">Terms of Sale</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

