# Octane Dashboard
This project is a simple dashboard application built using React and Mantine UI for the user interface, with JSON Server to mock API endpoints for data management. The project also includes Jest for unit testing to ensure code quality.

## Features
- Orders Overview: Allows the sales team to manage customer orders with functionalities like viewing order details, updating statuses, and deleting orders.
- User Management: Allows admins to manage user accounts, including editing user details, activating/deactivating accounts, and deleting users.
- JSON Server to mock RESTful APIs for orders and users data
- Reusable Table Component: A highly configurable table component designed for reuse across different parts of the application.
- State Management: Efficient management of application state, ensuring smooth user interactions.

## Features

- Framework: React.js
- State Management: Zustand 
- TypeScript
- Testing: Cypress

## Installation & Setup
Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Install Dependencies
Clone the repository and install all dependencies using npm or yarn:
    git clone https://github.com/kem73/octane-dashboard.git
    cd octane-dashboard
    npm install

### Running Project
To run the project locally, start both the JSON Server and the React development server.

1- Start JSON Server (it runs on port 3001):
   npm run server
This will serve data from the db.json file located at the root of the project. You can access it at http://localhost:3001.

2- Start the React App (runs on port 3000):
   npm start

## Available Scripts
In the project directory, you can run:

### npm start
Runs the React app in development mode.
Open http://localhost:3000 to view it in the browser.





### npm run server
Starts the JSON Server to mock backend endpoints at http://localhost:3001.


## Code Structure

- /orders: Orders Overview page with table and order actions.
- /: User Management page with table and user actions.

## Testing
This project uses Cypress for unit tests. The tests ensure that the components render correctly and that interactions work as expected.

To run tests, use:
npx cypress open

## API Routes (JSON Server)
The JSON Server simulates RESTful API calls. Below are some example routes you can interact with:

- GET /orders:
- GET /orders/:id
- PATCH /orders/:id
- DELETE /orders/:id
- GET /users
- PATCH /users/:id
