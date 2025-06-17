**Episode-02 | Features, HLD, LLD and Planning**

We'll be building the **DevTinder** app

> Requirement Gathering

This will be a Tinder like platform for developers with the following requirements

1. Create an account
2. Login
3. Update your profile
4. Feed page - explore other devs on the platform
5. Send Connection Request
6. See our matches
7. See the requests we've sent/received

> Tech Planning

_HLD - 2 microservices_

1. Frontend - React
2. Backend - NodeJS, MongoDB, Security - JWT Token (Oauth 2)

_LLD - DB Design_

1. User - firstname, lastname, emailId, password, age, gender
2. ConnectionRequest - fromUserId, toUserId, status (ignored, pending, accepted, rejected)

_API Design (REST API) - GET, POST, PUT, PATCH, DELETE_

- POST /signup
- POST /login
- GET /profile
- POST /profile
- PATCH /profile
- DELETE /profile
- POST /sendRequest (ignore/interested)
- POST /reviewRequest (accept/reject)
- GET /requests
- GET /connections
