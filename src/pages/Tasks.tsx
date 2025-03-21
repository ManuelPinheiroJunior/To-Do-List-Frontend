import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { addTaskRequest, deleteTaskRequest, fetchTaskRequest, MarkTaskCompleteRequest } from "../store/task/taskSlice";
import ActiveTaskList from "../components/TaskList";
import { RootState } from "../store/store";
import { useTranslation } from "../hooks/usetTranslation";

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.activeTasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const titleRef = useRef<HTMLInputElement>(null);
  const t = useTranslation();

  useEffect(() => {
    dispatch(fetchTaskRequest());
  }, [dispatch]);

  const saveTask = () => {
    if (titleRef.current?.value) {
      dispatch(addTaskRequest(titleRef.current.value));
      titleRef.current.value = "";
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <Row className="justify-content-center w-100">
          <Col md={8}>
            <Card className="shadow-lg p-4 border-0" style={{ background: "#ffffff", borderRadius: "15px" }}>
              <Card.Body>
                <h2 className="text-center mb-4" style={{ color: "#0077B6" }}>{t.tasks}</h2>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#0077B6" }}>{t.newTask}:</Form.Label>
                    <Form.Control type="text" ref={titleRef} placeholder={t.enterNewTask} style={{ background: "#f8f9fa", color: "#333", border: "1px solid #ced4da" }} />
                  </Form.Group>
                  <Button variant="success" className="w-100" onClick={saveTask} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : t.saveTask}
                  </Button>
                </Form>

                <ul className="list-group mt-4 text-center">
                  {tasks.map((task: any) => (
                    <ActiveTaskList
                      key={task.Id}
                      dateTime={task.date}
                      deleteTask={() => dispatch(deleteTaskRequest(task.Id))}
                      markComplete={() => dispatch(MarkTaskCompleteRequest(task.Id))}
                      id={task.Id}
                      task={task.title}
                    />
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tasks;
