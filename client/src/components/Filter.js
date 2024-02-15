import React from "react";
import { Form, Dropdown } from "react-bootstrap";

const Filter = ({ selectedFilter, setFilter }) => {
  const handleSelectFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <Form>
      <Dropdown>
        <Dropdown.Toggle className="m-5 fw-bold" size="lg" variant="dark">
          {selectedFilter === "myTasks" ? "My Tasks" : "Other Tasks"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className="fw-bold"
            onClick={() => handleSelectFilter("myTasks")}
          >
            My Tasks
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="fw-bold"
            onClick={() => handleSelectFilter("otherTasks")}
          >
            Other Tasks
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );
};

export default Filter;
