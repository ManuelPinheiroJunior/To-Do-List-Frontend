import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { fetchBooksRequest } from "../store/book/bookSlice";
import { RootState } from "../store/store";
import { useTranslation } from "../hooks/usetTranslation";

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state: RootState) => state.books);
  const [search, setSearch] = useState("react");
   const t = useTranslation();

  useEffect(() => {
    dispatch(fetchBooksRequest(search));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchBooksRequest(search));
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #4A90E2, #50E3C2)", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1 mt-4">
        <h2 className="text-center mb-4" style={{ color: "#4A90E2" }}>📚 {t.booksList}</h2>

        <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
          <Form.Control
            type="text"
            placeholder="Digite um tema de livro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-50 me-2"
            style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }}
          />
          <Button  style={{
            background: "linear-gradient(135deg, #4A90E2, #50E3C2)", 
            border: "none",
            color: "#ffffff",
            fontWeight: "bold",
          }} type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : t.search}
          </Button>
        </Form>

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="mt-3">
            {books.map((book) => (
              <Col key={book.id} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm border-0 rounded-3 text-center" style={{
                  background: "#ffffff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
                }}>
                  <Card.Img variant="top" src={book.thumbnail} className="p-3 rounded-top" />
                  <Card.Body>
                    <Card.Title className="fw-bold" style={{ fontSize: "1rem", color: "#4A90E2" }}>{book.title}</Card.Title>
                    <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>
                      <strong>author(es):</strong> {book.authors.join(", ")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Books;