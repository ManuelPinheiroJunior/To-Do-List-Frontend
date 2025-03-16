import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Table, Container, Button, Alert, Card, Spinner, Row, Col, Form } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { deleteUserRequest, editUserRequest, fetchUsersRequest } from "../store/user/usersSlice";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ firstName: string; lastName: string; email: string }>({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleEditClick = (user: any) => {
    setEditUserId(user.id);
    setEditData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const handleSaveEdit = () => {
    if (editUserId !== null) {
      dispatch(editUserRequest({ id: editUserId, data: editData }));
      setEditUserId(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container>
        <NavBar />
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-lg p-4 border-0" style={{ background: "#ffffff", borderRadius: "15px" }}>
              <Card.Body>
                <h1 className="text-center mt-2" style={{ color: "#0077B6" }}>Users</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? (
                  <div className="text-center mt-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <Table striped bordered hover responsive className="mt-3 text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: any) => (
                        <tr key={user.id}>
                          {editUserId === user.id ? (
                            <>
                              <td>
                                <Form.Control type="text" value={editData.firstName} onChange={(e) => setEditData({ ...editData, firstName: e.target.value })} />
                              </td>
                              <td>
                                <Form.Control type="text" value={editData.lastName} onChange={(e) => setEditData({ ...editData, lastName: e.target.value })} />
                              </td>
                              <td>
                                <Form.Control type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                              </td>
                              <td>
                                <Button variant="success" size="sm" onClick={handleSaveEdit}>
                                  💾 Save
                                </Button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.email}</td>
                              <td>
                                <div className="d-flex justify-content-center gap-2">
                                  {user.role !== "ADMIN" && (
                                    <Button
                                      variant="warning"
                                      size="sm"
                                      onClick={() => handleEditClick(user)}
                                    >
                                      ✏ Edit
                                    </Button>
                                  )}
                                  {user.role !== "ADMIN" && (
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => dispatch(deleteUserRequest(user.id))}
                                    >
                                      ✖ Delete
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UsersPage;
