import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { deleteTaskRequest, fetchTaskRequest } from "../store/task/taskSlice";
import CompleteTaskList from "../components/CompleteTaskList";
import { RootState } from "../store/store";
import { useLanguage } from "../hooks/useLanguage";

const CompletedTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.completedTasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const { language, switchLanguage } = useLanguage();

  useEffect(() => {
    dispatch(fetchTaskRequest());
  }, [dispatch]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container>
        <NavBar />
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg p-4 border-0" style={{ background: "#ffffff", borderRadius: "15px" }}>
              <Card.Body>
                <h2 className="text-center mb-4" style={{ color: "#0077B6" }}>{language === "en" ? "Completed Tasks" : "Tarefas Completas"}</h2>
                {loading ? (
                  <div className="text-center mt-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <ul className="list-group mt-4">
                    {tasks.map((task: any) => (
                      <CompleteTaskList
                        key={task.id}
                        dateTime={task.date}
                        deleteTodo={() => dispatch(deleteTaskRequest(task.id))}
                        id={task.id}
                        task={task.title}
                      />
                    ))}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CompletedTasks;