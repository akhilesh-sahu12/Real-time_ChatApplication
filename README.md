
# Real-time Chat Application

This is a real-time chat application built using Node.js, Express.js, PostgreSQL, WebSocket, Redis, Kafka, and Socket.io.

## Setup

1. Clone the repository:

   git clone https://github.com/akhilesh-sahu12/Real-time_ChatApplication.git
   
2. Navigate to the project directory:
   ```
   cd Real-time_ChatApplication
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Setup PostgreSQL:
   - Ensure PostgreSQL is installed and running.
   - Create a PostgreSQL database named `real_time_chat_application`.
   - Execute the SQL script provided in the `sql-scripts inside sql_script.sql file` attacthed to create the required tables and insert sample data.

5. Setup Kafka:
   - Download Kafka from [here](https://kafka.apache.org/downloads).
   - Extract the Kafka archive.
   - Start Zookeeper:
     ```
     cd kafka_2.13-3.7.0  

     bin/zookeeper-server-start.sh config/zookeeper.properties
     ```
   - Start Kafka server:
     ```
     bin/kafka-server-start.sh config/server.properties
     ```

6. Setup Redis:
   - Install Redis server:
     ```
     sudo apt update
     sudo apt install redis-server
     ```
   - Start Redis server:
     ```
     sudo systemctl start redis-server
     ```

7. Configure environment variables:
   - Create a `.env` file in the project root directory.
   - Define the following environment variables in the `.env` file:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret
     ```
     Replace `your_jwt_secret` with appropriate values.

8. Start the application:
   ```
   node server.js
   ```

## Technologies & Topics
- **Database:** Postgres
- **Caching:** Redis
- **Messaging Queue:** Kafka
- **Backend Development:** NodeJS
- **Communcation:** WebSocket

## Components
- **User Account Management:** Sign up, sign in, and user profile management.
- **Chat Functionality:** Real-time messaging, including private chats.
- **Message History:** Storage and retrieval of message history from Postgres.
- **Session Management and Caching:** Redis for managing user sessions and caching recent messages.
- **Message Queue:** Kafka for real-time message delivery.
- **Security:** Basic authentication, authorization, and message encryption.
- **APIs:** RESTful and WebSocket endpoints.

# API Endpoints

This document outlines the available API endpoints for the Real-time Chat Application.

## Register
- **URL:** `POST /api/auth/register`
- **Description:** Endpoint to register a new user.
- **Request Body:**
  ```json
  {
    "username": "akhileshsahu",
    "password": "akhileshSahu@123"
  }
  ```
- **Response:** 
  - Status: 201 Created
  - Body: 
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": 1,
        "username": "akhileshsahu"
      }
    }
    ```

## Login
- **URL:** `POST /api/auth/login`
- **Description:** Endpoint to authenticate a user.
- **Request Body:**
  ```json
  {
    "username": "akhileshsahu",
    "password": "akhileshSahu@123"
  }
  ```
- **Response:** 
  - Status: 200 OK
  - Body: 
    ```json
    {
      "token": "<JWT token>"
    }
    ```

## User Profile
- **URL:** `GET /api/auth/profile`
- **Description:** Endpoint to get the user's profile.
- **Authorization:** Bearer Token (JWT)
- **Response:** 
  - Status: 200 OK
  - Body: 
    ```json
    {
      "id": 1,
      "username": "akhileshsahu"
    }
    ```

## Get All Users
- **URL:** `GET /api/auth/getAllUsers`
- **Description:** Endpoint to retrieve all users.
- **Authorization:** Bearer Token (JWT)
- **Response:** 
  - Status: 200 OK
  - Body: 
    ```json
    [
      {
        "id": 1,
        "username": "akhileshsahu"
      },
      {
        "id": 2,
        "username": "sachin"
      },
      {
        "id": 3,
        "username": "abdevilliers"
      }
    ]
    ```

## Send Message
- **URL:** `POST /api/chat/`
- **Description:** Endpoint to send a message.
- **Request Body:**
  ```json
  {
    "content": "Hey, I am good.",
    "senderId": 2,
    "recipientId": 1
  }
  ```
- **Authorization:** Bearer Token (JWT)
- **Response:** 
  - Status: 201 Created
  - Body: 
    ```json
    {
      "message": "Message sent successfully",
      "data": {
        "id": 1,
        "content": "Hey, I am good.",
        "senderId": 2,
        "recipientId": 1
      }
    }
    ```

## Get History
- **URL:** `GET /api/chat/`
- **Description:** Endpoint to retrieve message history.
- **Authorization:** Bearer Token (JWT)
- **Response:** 
  - Status: 200 OK
  - Body: 
    ```json
    [
      {
        "id": 1,
        "content": "Hello, Sachin!",
        "senderId": 1,
        "recipientId": 2
      },
      {
        "id": 2,
        "content": "Hi, Akhil!",
        "senderId": 2,
        "recipientId": 1
      },
      {
        "id": 3,
        "content": "Hey, AB De villiers!",
        "senderId": 1,
        "recipientId": 3
      }
    ]
    ```

## Running Tests

To run unit and integration tests using Jest, use the following command:
```
npm test
```

## Usage

Once the application is running, you can access the chat application through a web browser at `http://localhost:3000`.

## Technologies & Topics
- **Database:** Postgres
- **Caching:** Redis
- **Messaging Queue:** Kafka
- **Backend Development:** NodeJS
- **Communcation:** WebSocket

## Components
- **User Account Management:** Sign up, sign in, and user profile management.
- **Chat Functionality:** Real-time messaging, including private chats.
- **Message History:** Storage and retrieval of message history from Postgres.
- **Session Management and Caching:** Redis for managing user sessions and caching recent messages.
- **Message Queue:** Kafka for real-time message delivery.
- **Security:** Basic authentication, authorization, and message encryption.
- **APIs:** RESTful and WebSocket endpoints.

## External Resources
- [Postgres Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [NodeJS Documentation](https://nodejs.org/en/docs/)
- [Jest Documentation](https://jestjs.io/docs/en/getting-started)
- [Jmeter Documentation](https://jmeter.apache.org/usermanual/index.html)
- [Socket IO Documentation](https://socket.io/docs/v4)
