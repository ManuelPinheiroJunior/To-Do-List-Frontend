
import { Card, Row, Col, Button } from "react-bootstrap";
import { CompleteTaskProps } from "../types/CompleteTaskTypes";


const CompleteTaskList = (props: CompleteTaskProps) => {
  return (
    <Card className="shadow-lg border-0 rounded-3 p-4 mb-3">
      <Row className="align-items-center">
    
        <Col xs={8} className="d-flex flex-column">
          <h5 className="fw-bold text-dark">{props.task}</h5>
          <small className="text-muted">{props.dateTime}</small>
        </Col>

       
        <Col xs={4} className="d-flex justify-content-end">
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="fw-bold"
            onClick={() => props.deleteTodo(props.id)}
          >
            ✖ Delete
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CompleteTaskList;
