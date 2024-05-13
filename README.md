# Project Name
Task Management App

# Table of Contents
- Installation
- Project setup 
- API Documentation

# installation command
- To install the dependencies.<be>
  > **npm install**
- To run the project.<be>
  > **npm start**
# Project setup
- You need to add a .env file
- .env contains PORT, Mongo_uri,JWT_SECRET
  
# API Documentation
## Base URL :  http://localhost/5000

## Endpoints

## GET /tasks/
- **Description:** Retrieves all tasks.
- **Authentication:** Not required.
- **Parameters:** None.
- **Response:** 
  - Status: 200 OK
  - Body: Array of task objects.

---

## GET /tasks/:id
- **Description:** Retrieves a single task by ID.
- **Authentication:** Not required.
- **Parameters:**
  - `id` (String): Task ID.
- **Response:** 
  - Status: 200 OK
  - Body: Single task object.
  - Status: 404 Not Found
  - Body: If the task with the provided ID does not exist.

---

## POST /tasks/
- **Description:** Creates a new task.
- **Authentication:** Required (JWT Token).
- **Parameters:** None (Task data in request body).
- **Request Body:** JSON object with task data.
- **Response:** 
  - Status: 201 Created
  - Body: Created task object.

---

## PUT /tasks/:id
- **Description:** Updates an existing task by ID.
- **Authentication:** Required (JWT Token).
- **Parameters:**
  - `id` (String): Task ID.
- **Request Body:** JSON object with updated task data.
- **Response:** 
  - Status: 200 OK
  - Body: Updated task object.
  - Status: 404 Not Found
  - Body: If the task with the provided ID does not exist.

---

## DELETE /tasks/:id
- **Description:** Deletes a task by ID.
- **Authentication:** Required (JWT Token).
- **Parameters:**
  - `id` (String): Task ID.
- **Response:** 
  - Status: 204 No Content
  - Body: Empty.
  - Status: 404 Not Found
  - Body: If the task with the provided ID does not exist.

---

## Middleware
- **Authentication Middleware:** 
  - `authenticateToken`: Verifies JWT token for protected routes.

---

