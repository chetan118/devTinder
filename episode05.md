# Episode-05 | Middlewares & Error Handlers

## TODOs

- Multiple Route Handlers - play with the code
- next()
- next function and errors along with res.send
- app.use("/route", rH1, [rH2, rH3], rH4, rH5);
- What is a Middleware? Why do we need it?
  - It is a function that processes requests before reaching the route handlers
  - These functions can modify the request and response objects, end the request-response cycle, or call the next middleware function
  - They are executed in the order they are defined
  - We use middleware to perform tasks like authentication, authorization, logging or error handling
  - It helps in separating the concerns and managing complex routing
- How Express JS handles requests behind the scenes?

  - Express.js, built on Node.js, handles requests through a series of steps involving routing and middleware.
  - **Server Receives Request**: When a client sends an HTTP request (e.g., GET, POST) to the Express server, Node.js's built-in http module, which Express utilizes, receives this request. The app.listen() method in Express creates this HTTP server and registers a function to handle incoming requests.
  - **Request Matching and Routing**: Express then attempts to match the incoming request's URL path and HTTP method (e.g., /users with a GET request) against the defined routes in your application. Each route is associated with one or more handler functions.
  - **Middleware Execution**: Before the final route handler is executed, the request passes through a chain of middleware functions. These functions can perform various tasks, such as:

    - Parsing request bodies (e.g., express.json(), express.urlencoded()).
    - Logging requests.
    - Authentication and authorization checks.
    - Modifying the request or response objects.
    - Serving static files (e.g., express.static()).

    Middleware functions can either terminate the request-response cycle by sending a response or pass control to the next middleware or route handler using the next() function.

  - **Route Handler Execution**: Once all applicable middleware functions have executed, the specific route handler function associated with the matched route and HTTP method is invoked. This handler contains the core logic to process the request and generate a response.
  - **Response Sent**: The route handler, or a preceding middleware, constructs and sends an HTTP response back to the client. This response can be in various formats, such as HTML, JSON, or a redirect.
  - **Error Handling (Optional)**: If an error occurs during any stage of this process, Express can utilize dedicated error-handling middleware to catch and process these errors, providing a structured way to manage exceptions and send appropriate error responses to the client.

- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy user middleware for all user routes except /user/login
- Error Handling using app.use("/", (err, req, res, next) => {});
