// define a task form component to add a task
import React, { useState } from "react";
import { Form, Button, OverlayTrigger, Popover } from "react-bootstrap";
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

  // set inputted deadline date to the state
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
        Deadlines are optional, and can be either plaintext or dates. Task cards
        will only glow the relevant colour if the date picker is selected.
        <br />
        They will glow red if the deadline is 3 or fewer days away, amber if 7
        or fewer days away (up to 3 days to the deadline), and green if 14 or
        fewer days away (up to 7 days to the deadline).
      </Popover.Body>
    </Popover>
  );

  // render the component
  return (
    <div>
      <h3 className="addATask mb-3 mt-5">
        Add a task
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button variant="outline-light" className="ms-2" size="sm">
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

        <Form.Group className="mb-3 mx-5" controlId="formBasicDeadline">
          {/* Deadline input */}
          <Form.Check
            inline
            label="Use Date Picker? (tasks won't glow otherwise)"
            type="checkbox"
            id="useDatepicker"
            name="useDatepicker"
            checked={taskData.useDatepicker}
            onChange={() =>
              setTaskData({
                ...taskData,
                useDatepicker: !taskData.useDatepicker,
              })
            }
          />
          {taskData.useDatepicker ? (
            <DatePicker
              selected={taskData.deadline}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          ) : (
            <Form.Control
              type="text"
              name="deadline"
              value={taskData.deadline}
              onChange={handleChange}
              placeholder="Add a deadline (optional)"
              className="m-auto w-50"
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicButton">
          <Button variant="dark" type="submit">
            Add Task
          </Button>
        </Form.Group>
      </Form>
      <hr className="mx-5 mt-5" />
    </div>
  );
};

export default TaskForm;
