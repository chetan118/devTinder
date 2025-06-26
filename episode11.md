# Episode-11 | Diving into the APIs and express Router

## TODOs

- Explore tinder APIs
- List all statuses required in DevTinder
- Create a list of all APIs in DevTinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request and user routers
- Create authRouter, profileRouter, requestRouter and userRouter
- Import these routers in app.js

## Statuses

- ignored
- interested
- accepted
- rejected

## DevTinder APIs

### AuthRouter

- POST /signup
- POST /login
- POST /logout

### ProfileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

### ConnectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### UserRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform
