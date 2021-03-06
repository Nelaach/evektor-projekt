import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Fragment } from 'react';
import { BsFillPersonFill, BsNutFill, BsFillGrid1X2Fill } from "react-icons/bs";
import { LinkContainer } from 'react-router-bootstrap';

import LoggedInUser from "../../helper/LoggedInUser"

import '../../shared.css'

function MyNavbar() {

    const loggedInUser = LoggedInUser();
    const isInGuestWifiGroup = loggedInUser.isInGuestWifiGroup;
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {isInGuestWifiGroup == "True" &&
                        <LinkContainer to="/users">
                            <Nav.Link> Users (admin)</Nav.Link>
                        </LinkContainer>
                        }
                        <LinkContainer to="/my-items">
                            <Nav.Link>My Items</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Assets" id="basic-nav-dropdown"> {/* Testovaci, ignorovat */}
                            <NavDropdown.Item href="#action/3.1"><BsFillPersonFill></BsFillPersonFill> By User</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"><BsNutFill></BsNutFill> By Asset</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3"><BsFillGrid1X2Fill></BsFillGrid1X2Fill> By Department</NavDropdown.Item>
                            {isInGuestWifiGroup == "True" &&
                            <Fragment>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Admin</NavDropdown.Item>
                            </Fragment>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">{loggedInUser.loggedInUser}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;