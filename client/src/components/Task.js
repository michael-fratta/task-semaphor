// define a task component
import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import classNames from "classnames"; // conditionally apply CSS class names to an element

const Task = ({ task, handleEditTask, handleRemoveTask, userData }) => {
  // keep track of the editing state
  const [isEditing, setIsEditing] = useState(false);
  // set the updated task to the state
  const [updatedTask, setUpdatedTask] = useState(task);

  // set is editing to true when edit button clicked
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // pass the task id and updated task to handleEditTask,
  // and set isEditing back to false, after save button clicked
  const handleSaveClick = () => {
    handleEditTask(task._id, updatedTask);
    setIsEditing(false);
  };

  // set is editing to false if cancel button clicked
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const getGlowClass = () => {
    if (!task.deadline) return ""; // No glow if no deadline set

    const daysUntilDeadline = Math.ceil(
      (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline <= 3) return "glow-red"; // Red glow for 3 days or less
    if (daysUntilDeadline <= 7) return "glow-amber"; // Amber glow for 7 days or less
    if (daysUntilDeadline <= 14) return "glow-green"; // Green glow for 14 days or less

    return ""; // No glow if deadline is further than 2 weeks
  };

  // check if the string is a valid date
  const isValidDate = (dateString) => {
    return !isNaN(Date.parse(dateString));
  };

  // format deadline if it's a valid date
  const formatDeadline = (deadline) => {
    return isValidDate(deadline)
      ? new Date(deadline).toLocaleDateString()
      : deadline;
  };

  // render the component
  return (
    <Card
      key={task._id}
      style={{ width: "18rem" }}
      className={classNames("m-3 text-light", getGlowClass())}
      bg="dark"
      border="light"
    >
      <Card.Body>
        {/* allow in-place editing of a given task - via form */}
        {isEditing ? (
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTask.title}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedTask.description}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="text"
                value={updatedTask.deadline}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    deadline: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button
              onClick={handleSaveClick}
              variant="secondary"
              className="mt-4"
            >
              Save
            </Button>
            <Button
              variant="outline-secondary"
              className="mt-4 ms-1 text-light"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </div>
        ) : (
          // render as a card if not editing
          <div>
            <Card.Title className="taskTitle mb-3">{task.title}</Card.Title>
            <hr />
            {/* show the username attribute on task card only to admin user */}
            {userData.isAdmin && task.creator !== userData.userId && (
              <Card.Text
                style={{
                  whiteSpace: "pre-line",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                Created by:{"\n"}
                {task.username}
              </Card.Text>
            )}

            <Card.Text className="fs-5">{task.description}</Card.Text>
            <hr />
            {/* only render deadline if present */}
            {task.deadline && (
              <Card.Text className="fw-bold">
                Due by {formatDeadline(task.deadline)}
              </Card.Text>
            )}
            <Button
              variant="secondary"
              className="m-1"
              onClick={handleEditClick}
            >
              Edit
            </Button>
            {/* pass the task id to handleRemoveTask if Delete is clicked */}
            <Button variant="danger" onClick={() => handleRemoveTask(task._id)}>
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;
