import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import Logo from "../assets/logo.png";

const CustomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const role = getLoginInfo()?.role || "";

  return (
    <Navbar className="bg-primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} className="cursor-pointer d-flex align-items-center">
          <img src={Logo} alt="Logo" className="me-2" style={{ height: "40px" }} />
          <span>Todo App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/active")}>Active Todos</Nav.Link>
            <Nav.Link onClick={() => navigate("/completed")}>Completed</Nav.Link>
            {role === "ADMIN" && <Nav.Link onClick={() => navigate("/users")}>Users</Nav.Link>}
          </Nav>
          <Button
            variant="outline-light"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Log out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
