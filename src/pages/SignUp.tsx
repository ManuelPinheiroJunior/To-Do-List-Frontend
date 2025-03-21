import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from "react-bootstrap";
import { RootState } from "../store/store";
import Logo from "../assets/logo.png";
import { signUpRequest } from "../store/auth/authSlice";
import { useTranslation } from "../hooks/usetTranslation";


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

  const { loading, signUpError, validationErrors } = useSelector((state: RootState) => state.auth);
  const  t  = useTranslation();

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
                  <h2 className="mt-2" style={{ color: "#0077B6" }}>{t.createAccount}</h2>
                </div>

                {signUpError && <Alert variant="danger">{signUpError}</Alert>}

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.firstName}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t.enterFirstName}
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      isInvalid={!!validationErrors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.firstName}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.lastName}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t.enterLastName}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      isInvalid={!!validationErrors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.lastName}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.email}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t.enterEmail}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      isInvalid={!!validationErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.dateOfBirth}</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder={t.enterDateOfBirth}
                      value={form.dateOfBirth}
                      onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                      isInvalid={!!validationErrors.dateOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.dateOfBirth}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.password}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t.enterPassword}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      isInvalid={!!validationErrors.password}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.confirmPassword}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t.enterConfirmPassword}
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      isInvalid={!!validationErrors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{validationErrors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" className="w-100" onClick={handleSignUp} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : t.signUp}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <a onClick={() => navigate("/login")} className="cursor-pointer" style={{ color: "#0077B6", textDecoration: "none" }}>
                    {t.alreadyHaveAccount}
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