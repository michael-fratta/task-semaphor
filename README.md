# Welcome to TaskSemaphor!

TaskSemaphor is a task management app with a straightforward interface designed for easy task addition and management.

Tasks, represented as 'cards', glow red, amber, or green based on their deadline to completion.

This is a full stack MERN app, which means it is built using MongoDB, Express.js, React.js, and Node.js. MongoDB is used as the database to store task & user information, Express.js handles the backend server logic and routes, React.js manages the frontend user interface, and Node.js powers the backend server environment.

## How to use TaskSemaphor

The deployed app (frontend) can be found here: https://task-semaphor-frontend.vercel.app/

Login if you already have an account, else register. **Do not use a real email/password.**

1. Add a task. This will show in the task list below.

2. Edit or delete any existing tasks.

3. If you are an admin user, you will see an Admin page on the right-hand side of the header.

4. Navigate to this tab to see all users in the system, deny/allow admin privileges, or delete a user.

5. If you are an admin, you will also see a dropdown in the task lists, allowing you to see your tasks, or every task in the system. You will then be able to edit or delete any task in the system.

Logout when finished (top right of header).

**To login as an admin user** use `admin@example.com` as the username, and `admin` as the password.

## How to install TaskSemaphor

To install the app – clone the repo from github, open in an IDE, navigate to the client directory, and type `npm start` – this will install all packages/dependencies, and open the app automatically in the browser of your choice.

You will also either have to replace the `MONGODB_URI` and `JWT_SECRET` environment variables with your chosen values, or create a new `.env` file in the root of the `api` directory, and add them there. The same will have to be done for the `client` directory – `REACT_APP_API_URL` will need to be replaced with the localhost address of your choice; either directly, or via `.env` file in the root of the `client` directory.

## How to run the existing tests

To run the existing tests – navigate to the `client` directory in your terminal, type and run the command `npm test`. This will run the tests for the frontend. To run the tests for the backend, navigate to the `api` directory, type and run the same command.

You might have to delete/update existing snapshots, by pressing `u` after running the tests the first time - should they fail.

To find out more about what the tests are testing - check out the code comments.

## Security measures

To ensure the security of this app, I have used JWT for user authentication. I do not allow non-admin users to perform any CRUD operations on other users/tasks in the system. I have also generated a secure JWT secret and stored it in an `.env` file, as well as storing the MongoDB URI to a `.env` file too – this is so that nobody can view my password or tamper with the database; the JWT secret meanwhile ensures the auth tokens cannot be decrypted by malicious actors.

## App deployment

The application was deployed to Vercel, as a separate frontend and backend. This was necessary due to the way that Vercel builds apps. I also had to add a Vercel.json file to my backend to route the destinations accordingly.
