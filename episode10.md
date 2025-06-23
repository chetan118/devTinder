## Episode-10 | Authentication, JWT & Cookies

**Overview**

- User/Client makes login request with email and password
- Server then
  - validates the credentials
  - wraps a JWT token inside a cookie
  - and sends the cookie in the response
- User/Client Browser's inbuilt feature is to store this cookie. For requesting some information from the server, the browser
  - opens a new connection to the server
  - and sends the cookie with the request
- Server then
  - validates the token in the cookie
  - fetches the appropriate information from the DB
  - and only then sends a response
- The connection is then closed
- For each new api call, a new connection is opened
- When the cookie expires, the validation at the server fails and it redirects the user to the login page

- Install cookie-parser
- Just send a dummy cookie to user
- Create GET /profile API and check if you can get the cookie back
- Install jsonwebtoken
- In Login API, after email and password validation, create a JWT token and send it to the user in a cookie
- Read the cookie inside your profile API and find the logged in user
