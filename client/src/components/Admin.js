// create a page for the admin tab
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

// define an Admin component
const Admin = () => {
  // set an empty array of users to state
  const [users, setUsers] = useState([]);
  // add loading state for spinner
  const [loading, setLoading] = useState(true);

  const PREFIX = process.env.REACT_APP_API_URL;

  // define a function to fetch all users from the db
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${PREFIX}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userList = await response.json();
        setUsers(userList);
      } else {
        console.error("Error fetching users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      // set loading to false once the data is fetched - success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  // define a function to allow an admin to grant/revoke admin status to other users
  const handleAdminStatusChange = async (userId, newAdminStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${PREFIX}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAdmin: newAdminStatus }),
      });

      if (response.ok) {
        // update the local state to reflect the change in admin status
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin: newAdminStatus } : user
          )
        );
      } else {
        console.error("Error updating admin status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  // define a function to delete a user
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${PREFIX}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the deleted user from the local state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // render the component
  return (
    <div className="m-3">
      <h2 className="usersHeader mb-3 p-2">Users:</h2>
      {loading ? ( // Display Spinner while loading
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead className="tableHead align-middle fs-5">
            <tr>
              <th className="p-3">Username</th>
              <th>Admin User</th>
              <th>Admin Status</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {/* render all users in a table, and display their current admin
                status, as well as a Deny/Allow button depending on the
                action that can be performed, and a Delete button to delete
                the user */}
            {users.map((user) => (
              <tr key={user._id}>
                <td className="align-middle fs-5">{user.username}</td>
                <td className="align-middle fs-5">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
                <td className="align-middle p-3">
                  <Button
                    variant={user.isAdmin ? "danger" : "success"}
                    className="fs-5"
                    onClick={() =>
                      handleAdminStatusChange(user._id, !user.isAdmin)
                    }
                  >
                    {user.isAdmin ? "Deny" : "Allow"}
                  </Button>
                </td>
                <td className="align-middle p-3">
                  <Button
                    variant="danger"
                    className="fs-5"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Admin;
