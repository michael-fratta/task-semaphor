// FRONTEND TESTS
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import LoginRegister from "./components/LoginRegister";

// SNAPSHOT TEST
test("App component renders without crashing", () => {
  const { asFragment } = render(
    <Router>
      <App />
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});

// LOGINREGISTER UNIT TEST
test("LoginRegister component is present when there is no userData", () => {
  // Render the LoginRegister component without providing userData
  render(<LoginRegister handleLogin={() => {}} handleRegister={() => {}} />);

  // Check if the LoginRegister component is rendered by querying its data-testid
  const loginRegisterCard = screen.queryByTestId("login-register-card");

  // Assert that the LoginRegister component is present
  expect(loginRegisterCard).toBeInTheDocument();
});
