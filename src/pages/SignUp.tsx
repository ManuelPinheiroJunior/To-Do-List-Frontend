import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from "react-bootstrap";
import { RootState } from "../store/store";

import Logo from "../assets/logo.png";
import { signUpRequest } from "../store/auth/authSlice";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignUp = () => {
    if (
      !firstNameRef.current?.value ||
      !lastNameRef.current?.value ||
      !emailRef.current?.value ||
      !dateOfBirthRef.current?.value ||
      !passwordRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      signUpRequest({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        dateOfBirth: dateOfBirthRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container>
        <Row className="w-100 justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg p-4 border-0" style={{ background: "#ffffff", borderRadius: "15px" }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <img src={Logo} alt="Logo" style={{ height: "50px" }} />
                  <h2 className="mt-2" style={{ color: "#0077B6" }}>Create an Account</h2>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>First Name</Form.Label>
                    <Form.Control type="text" ref={firstNameRef} placeholder="Enter your first name" style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>Last Name</Form.Label>
                    <Form.Control type="text" ref={lastNameRef} placeholder="Enter your last name" style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter your email" style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>Date of Birth</Form.Label>
                    <Form.Control type="date" ref={dateOfBirthRef} style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Enter your password" style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} placeholder="Confirm your password" style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Button variant="primary" className="w-100" onClick={handleSignUp} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <a
                    onClick={() => navigate("/login")}
                    className="cursor-pointer"
                    style={{ color: "#0077B6", textDecoration: "none" }}
                  >
                    Already have an account? Login
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

export default SignUp;