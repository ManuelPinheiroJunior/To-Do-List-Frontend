import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from "react-bootstrap";
import { RootState } from "../store/store";
import Logo from "../assets/logo.png";
import { signUpRequest } from "../store/auth/authSlice";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, validationErrors } = useSelector((state: RootState) => state.auth);

  const handleSignUp = () => {
    dispatch(signUpRequest(form));
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
                  {["firstName", "lastName", "email", "dateOfBirth", "password", "confirmPassword"].map((field) => (
                    <Form.Group className="mb-3" key={field}>
                      <Form.Label style={{ color: "#0077B6" }}>{field.replace(/([A-Z])/g, " $1")}</Form.Label>
                      <Form.Control
                        type={field.includes("password") ? "password" : field === "dateOfBirth" ? "date" : "text"}
                        placeholder={`Enter your ${field}`}
                        value={form[field as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        isInvalid={!!validationErrors[field]}
                      />
                      <Form.Control.Feedback type="invalid">{validationErrors[field]}</Form.Control.Feedback>
                    </Form.Group>
                  ))}

                  <Button variant="primary" className="w-100" onClick={handleSignUp} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <a onClick={() => navigate("/login")} className="cursor-pointer" style={{ color: "#0077B6", textDecoration: "none" }}>
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
