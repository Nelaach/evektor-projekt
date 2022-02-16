import React from 'react'
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { BsFillPersonFill, BsNutFill, BsFillGrid1X2Fill } from "react-icons/bs";
import './shared.css'

function App() {

  return (
      <Navbar variant="dark" bg="dark" expand="lg">
          <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#users">Users (admin)</Nav.Link>  {/* Tohle zobrazit JEN KDYZ JE PRIHL. USER V GuestWifi */}
                      <Nav.Link href="#my-items">My Items</Nav.Link>
                      <NavDropdown title="Assets" id="basic-nav-dropdown"> {/* Testovaci, ignorovat */}
                          <NavDropdown.Item href="#action/3.1"><BsFillPersonFill></BsFillPersonFill> By User</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2"><BsNutFill></BsNutFill> By Asset</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3"><BsFillGrid1X2Fill></BsFillGrid1X2Fill> By Department</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Admin</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                      Signed in as: <a href="#login">LordOfTheRings</a>
                  </Navbar.Text>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  )
}

export default App;