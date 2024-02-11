// CREATE A HEADER COMPONENT
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar, Container, Nav } from "react-bootstrap";

const Header = ({ userData, handleLogout }) => {
  // define a link style
  const linkStyle = {
    color: "black",
    textDecoration: "none",
    fontFamily: ["ethnocentric", "Roboto"],
    margin: "2%",
    alignSelf: "center",
  };

  const navigate = useNavigate();

  // handle the home click
  const handleHomeClick = () => {
    // force navigate to the home page
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="AppTitle fs-1">TaskSemaphor</Navbar.Brand>
        <Nav>
          {/* show admin link only if the (logged in) user is an admin */}
          {userData && userData.isAdmin && (
            <Link to="/admin" style={linkStyle} className="fs-5">
              Admin
            </Link>
          )}
          {/* show the home link and logout button is a user is logged in */}
          {userData && (
            <>
              <Link
                to="/"
                style={linkStyle}
                onClick={handleHomeClick}
                className="fs-5"
              >
                Home
              </Link>
              <Button
                variant="outline-dark"
                onClick={handleLogout}
                style={linkStyle}
                className="fs-5"
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
