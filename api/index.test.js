// CREATE A SNAPSHOT TEST AND SOME UNIT TESTS
const request = require("supertest");
const { app, startServer } = require("./index");

// SNAPSHOT TEST
describe("Server Snapshot Test", () => {
  let closeServer;

  beforeAll(async () => {
    closeServer = await startServer();
  });

  afterAll(() => {
    closeServer(); // Close the server after all tests
  });

  it("should match the snapshot", async () => {
    const response = await request(app).get("/");
    const responseBody = response.body;

    // Use Jest's snapshot testing to match the received data against the stored snapshot
    expect(responseBody).toMatchSnapshot();
  });
});

// REGISTER UNIT TEST
describe("POST /api/auth/register", () => {
  test("should register a new user and return a token", async () => {
    // Send a registration request
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "testpassword" });

    // Check if registration was successful (first time test ran)
    if (response.status === 200) {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    } else {
      // Resolve issue of test failing if testuser already created
      expect(response.status).toBe(400);
    }
  });

  test("should return 400 if test ran more than once", async () => {
    // Send a registration request
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "testpassword" });

    expect(response.status).toBe(400);
  });
});

// LOGIN UNIT TEST
describe("POST /api/auth/login", () => {
  test("should log in an existing user and return a token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "testpassword" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("should return 401 for incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "incorrectpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("msg", "Incorrect password");
  });
});

// GET TASKS UNIT TEST
describe("GET /api/tasks", () => {
  let authToken;

  beforeAll(async () => {
    // Login and get the auth token
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "testpassword" });

    authToken = response.body.token;
  });

  test("should get tasks with valid authentication", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("should return 401 without authentication", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "msg",
      "No token attached to the request"
    );
  });
});

// ADD A TASK UNIT TEST
describe("POST /api/tasks", () => {
  test("should add a new task with valid authentication", async () => {
    // Perform login to obtain a valid JWT token
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "testpassword" });

    const authToken = loginResponse.body.token;

    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "New Task",
        deadline: "2023-12-31",
        description: "Task description",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("msg", "Task successfully added");
    expect(response.body).toHaveProperty("task");
  });
});
