# Redis-Express-TypeScript App

This is a simple Express-based Node.js application that integrates with Redis for caching and demonstrates how to fetch data from GitHub's public API. The application is built with TypeScript for type safety and clarity.

## Features

- **Express Server**: Handles HTTP requests and responses.
- **Redis Cache**: Caches GitHub user repository data for improved performance.
- **TypeScript**: Adds static typing to enhance code reliability and maintainability.
- **Unit Tests**: Uses Jest and Supertest to test application routes.

## Requirements

- **Node.js** (version 14 or later)
- **Redis**: Ensure Redis is installed and running on your machine.
- **GitHub API**: No authentication is required, but you need internet access to reach the GitHub API.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/redis-express-ts.git
   cd redis-express-ts

2. Install Dependencies:

    ```bash
    npm install

3. **Start Redis**: Make sure Redis is running on the default port (6379) on your local machine.

4. Running the Application
    1. ```bash
        npm start

    2. **Access the Application:** Open your browser and go to http://localhost:4000 to see the application running.

    3. Available Routes:

        GET /: Returns "Hello World!" as a basic response.
        GET /repos/
        : Fetches the public repository count of a GitHub user by username. Caches the result in Redis for 1 hour.

**Testing**

1. Run tests
    ```bash
        npm test
    ```
    ```bash 
    ├── src
    │   ├── index.ts        # Main application file
    ├── tests
    │   ├── app.test.ts     # Jest tests for application routes
    ├── README.md           # Project documentation
    ├── package.json        # Node package manager file with dependencies and scripts
    ├── tsconfig.json       # TypeScript configuration file
    ```

## Dependencies

- **express**: Web server framework.
- **ioredis**: Redis client for caching.
- **typescript**: Adds static typing.
- **jest**: JavaScript testing framework.
- **supertest**: HTTP assertions for testing Express.

## DevDependencies

- **@types/express**: Type definitions for Express.
- **@types/ioredis**: Type definitions for ioredis.
- **@types/jest**: Type definitions for Jest.
- **@types/supertest**: Type definitions for Supertest.
- **ts-jest**: TypeScript preprocessor for Jest.
- **ts-node**: TypeScript execution environment for Node.js.
