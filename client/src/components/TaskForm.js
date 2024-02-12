// define a task form component to add a task
import React, { useState } from "react";
import {
  Form,
  Button,
  OverlayTrigger,
  Popover,
  Dropdown,
  Col,
  Row,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({ handleAddTask }) => {
  // set task data to state
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
    useDatepicker: false, // track whether to use date picker or not
  });

  // set the inputted task data to the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // set input deadline date to the state
  const handleDateChange = (date) => {
    setTaskData({
      ...taskData,
      deadline: date,
    });
  };

  // once a task is added, clear the task data from state,
  // and call the handleAddTask function - passing in the task data
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(taskData);
    setTaskData({
      title: "",
      description: "",
      deadline: "",
      useDatepicker: false, // reset the useDatepicker state
    });
  };

  // declare popover component
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">How to Add a Task</Popover.Header>
      <Popover.Body>
        You will need to add a title and a description to your tasks.
        <br />
        <br />
        Deadlines are optional, and can be either plaintext or dates. Task cards
        will only glow the relevant colour if the date picker is selected.
        <br />
        <br />
        Task cards will glow red if the deadline is 3 days away or less; amber
        if between 7 and 4 days from the deadline, and green if over 7 days from
        the deadline.
        <br />
        <br />
        Once you have selected an input type, and added the task - you will no
        longer be able to change the deadline type on the added task.
      </Popover.Body>
    </Popover>
  );

  // render the component
  return (
    <div
      style={{
        width: "50rem",
      }}
      className="m-auto"
    >
      <h3 className="addATask mb-3 mt-5">
        Add a task
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button variant="outline-warning" className="ms-2" size="sm">
            info
          </Button>
        </OverlayTrigger>
      </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mx-5" controlId="formBasicTitle">
          <Form.Control
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            placeholder="Add a title (required)"
            className="m-auto w-50"
          />
        </Form.Group>

        <Form.Group className="mb-3 mx-5" controlId="formBasicDescription">
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Add a description (required)"
            className="m-auto w-50"
          />
        </Form.Group>

        <Form.Group className="m-auto w-50" controlId="formBasicDeadline">
          <Row className="align-items-center">
            <Col className="d-flex justify-content-start">
              <Dropdown className="ms-4">
                <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                  Input Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      setTaskData({
                        ...taskData,
                        useDatepicker: true,
                      })
                    }
                  >
                    Pick a Date
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      setTaskData({
                        ...taskData,
                        useDatepicker: false,
                      })
                    }
                  >
                    Free Text Input
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="d-flex justify-content-start">
              {taskData.useDatepicker ? (
                <DatePicker
                  selected={taskData.deadline}
                  onChange={handleDateChange}
                  placeholderText="Choose a date (optional)"
                  dateFormat="dd/MM/yyyy"
                  className="mx-4 ms-0 datepicker-input"
                  style={{ width: "13rem" }}
                />
              ) : (
                <Form.Control
                  type="text"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={handleChange}
                  placeholder="Insert deadline (optional)"
                  className="mx-4 ms-0"
                  style={{ width: "13rem" }}
                />
              )}
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3 mt-3" controlId="formBasicButton">
          <Button variant="dark" type="submit">
            Add Task
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TaskForm;
