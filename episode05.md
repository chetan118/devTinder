## Episode-05 | Middlewares & Error Handlers

- Multiple Route Handlers - play with the code
- next()
- next function and errors along with res.send
- app.use("/route", rH1, [rH2, rH3], rH4, rH5);
- What is a Middleware? Why do we need it?
- How Express JS handles requests behind the scenes?
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy user middleware for all user routes except /user/login
- Error Handling using app.use("/", (err, req, res, next) => {});
