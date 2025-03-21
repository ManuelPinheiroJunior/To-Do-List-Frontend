import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import Logo from "../assets/logo.png";
import { useLanguage } from "../hooks/useLanguage";
import { useTranslation } from "../hooks/usetTranslation";


const CustomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const role = getLoginInfo()?.role || "";
  const { changeLanguage } = useLanguage();
  const t = useTranslation();

  return (
    <Navbar expand="lg" style={{ background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} className="cursor-pointer d-flex align-items-center">
          <img src={Logo} alt="Logo" className="me-2" style={{ height: "60px" }} />
          <span style={{ color: "#0077B6", fontWeight: "bold" }}>To Do List</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/tasks")} style={{ color: "#0077B6", transition: "transform 0.2s ease-in-out" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Task Active
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/completedTasks")} style={{ color: "#0077B6", transition: "transform 0.2s ease-in-out" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Task Complete
            </Nav.Link>
             <Nav.Link onClick={() => navigate("/books")} style={{ color: "#0077B6", transition: "transform 0.2s ease-in-out" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Books
            </Nav.Link>
            {role === "ADMIN" && (
              <Nav.Link onClick={() => navigate("/users")} style={{ color: "#0077B6", transition: "transform 0.2s ease-in-out" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Users
              </Nav.Link>
            )}
          </Nav>
          <Button variant="link" onClick={() => changeLanguage("pt")} style={{ color: "#0077B6" }}>
            {t.switchToPortuguese}
          </Button>
          <Button
            variant="outline-primary"
            style={{ borderColor: "#0077B6" }}
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

