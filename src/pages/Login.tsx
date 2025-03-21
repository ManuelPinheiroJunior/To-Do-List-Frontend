import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from "react-bootstrap";
import { RootState } from "../store/store";
import Logo from "../assets/logo.png";
import { loginRequest } from "../store/auth/authSlice";
import { useTranslation } from "../hooks/usetTranslation";
import LanguageToggle from "../components/LanguageToggle";




const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { loading, loginError } = useSelector((state: RootState) => state.auth);
  const t = useTranslation();

  const handleLogin = () => {
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      alert(t.fillAllFields);
      return;
    }
    dispatch(
      loginRequest({ email: emailRef.current.value, password: passwordRef.current.value })
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container>
        
        <Row className="w-100 justify-content-center">
          <Col md={5}>
            <Card className="shadow-lg p-4 border-0" style={{ background: "#ffffff", borderRadius: "15px" }}>
              <Card.Body>
                  <div className="d-flex justify-content-end mb-3">
                  <LanguageToggle />
                </div>
                <div className="text-center mb-4">
                  <img src={Logo} alt="Logo" style={{ height: "180px" }} />
                  <h2 className="mt-2" style={{ color: "#0077B6" }}>{t.title}</h2>
                </div>

                {loginError && <Alert variant="danger">{loginError}</Alert>}

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.email}</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder={t.enterEmail} style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.password}</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder={t.enterPassword} style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>

                  <Button variant="primary" className="w-100" onClick={handleLogin} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : t.login}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <a
                    onClick={() => navigate("/signUp")}
                    className="cursor-pointer"
                    style={{ color: "#0077B6", textDecoration: "none" }}
                  >
                    {t.dontHaveAccount}
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