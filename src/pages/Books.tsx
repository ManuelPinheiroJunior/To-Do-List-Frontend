import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { fetchBooksRequest } from "../store/book/bookSlice";
import { RootState } from "../store/store";

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state: RootState) => state.books);
  const [search, setSearch] = useState("react");

  useEffect(() => {
    dispatch(fetchBooksRequest(search));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchBooksRequest(search));
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1 mt-4">
        <h2 className="text-center mb-4" style={{ color: "#0077B6" }}>📚 Books List</h2>

        <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
          <Form.Control
            type="text"
            placeholder="Digite um tema de livro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-50 me-2"
            style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }}
          />
          <Button style={{ background: "#0077B6", borderColor: "#0077B6" }} type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Buscar"}
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
                <Card className="h-100 shadow-sm border-0 rounded-3 text-center">
                  <Card.Img variant="top" src={book.thumbnail} className="p-3 rounded-top" />
                  <Card.Body>
                    <Card.Title className="fw-bold" style={{ fontSize: "1rem" }}>{book.title}</Card.Title>
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