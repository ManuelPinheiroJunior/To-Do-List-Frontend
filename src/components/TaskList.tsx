import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { TaskListProps } from "../types";
import { editTaskRequest } from "../store/task/taskSlice";
import { useTranslation } from "../hooks/usetTranslation";

const ActiveTaskList = (props: TaskListProps) => {

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.task);

  const t = useTranslation();


  const formatDate = (dateString: string) => {
    return dateString.split(",")[0]; 
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    dispatch(editTaskRequest({ id: props.id, title: editedTask }));
  };

  return (
    <Card className="shadow-lg border-0 rounded-3 p-4 mb-3">
      <Row className="align-items-center">
        <Col xs={8} className="d-flex flex-column">
          {isEditing ? (
            <Form.Control
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          ) : (
            <h5 className="fw-bold text-dark">{props.task}</h5>
          )}
          <small className="text-muted">{formatDate(props.dateTime)}</small>
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
          {isEditing ? (
            <Button variant="outline-success" size="sm" className="me-2 fw-bold" onClick={handleSaveClick}>
              💾 {t.save}
            </Button>
          ) : (
            <Button variant="outline-warning" size="sm" className="me-2 fw-bold" onClick={handleEditClick}>
              ✏ Edit
            </Button>
          )}
          <Button 
            variant="outline-success" 
            size="sm" 
            className="me-2 fw-bold" 
            onClick={() => props.markComplete(props.id)}
          >
            ✔ {t.complete}
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="fw-bold"
            onClick={() => props.deleteTask(props.id)}
          >
            ✖ {t.Delete}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ActiveTaskList;