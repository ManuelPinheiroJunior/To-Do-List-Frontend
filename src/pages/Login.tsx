import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from "react-bootstrap";
import { RootState } from "../store/store";

import Logo from "../assets/logo.png";
import { loginRequest } from "../store/auth/authSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(
      loginRequest({ email: emailRef.current.value, password: passwordRef.current.value })
    );
  };
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  console.log("🚀 ~ API_BASE_URL:", API_BASE_URL)
  console.log("🚀 ~ API_BASE_URL:", typeof(API_BASE_URL))
  

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container>
        <Row className="w-100 justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg p-4 border-0" style={{ background: "#ffffff", borderRadius: "15px" }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <img src={Logo} alt="Logo" style={{ height: "180px" }} />
                  <h2 className="mt-2" style={{ color: "#0077B6" }}>{API_BASE_URL} To-Do List</h2>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter your email" style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Enter your password" style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Button variant="primary" className="w-100" onClick={handleLogin} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <a
                    onClick={() => navigate("/signUp")}
                    className="cursor-pointer"
                    style={{ color: "#0077B6", textDecoration: "none" }}
                  >
                    Don't have an account? Sign Up
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;