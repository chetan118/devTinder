const express = require("express");

const app = express();

// this will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstname: "Akshay", lastname: "Saini" });
});

// this will only handle POST call to /user
app.post("/user", (req, res) => {
  // Save data to the database
  res.send("User Created");
});

// this will only handle PUT call to /user
app.put("/user", (req, res) => {
  // Fetch the user from the database and update it
  res.send("User Updated");
});

// this will only handle PATCH call to /user
app.patch("/user", (req, res) => {
  // Fetch the user from the database and update a specific property
  res.send("User Property Updated");
});

// this will only handle DELETE call to /user
app.delete("/user", (req, res) => {
  // Delete user from the database"
  res.send("User Deleted");
});

// this will match all the HTTP Api method
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(7777, () => {
  console.log("Server is running and listening on port 7777...");
});
