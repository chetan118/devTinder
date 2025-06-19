const adminAuth = (req, res, next) => {
  const requestToken = "xyz"; // fetched from request
  const adminToken = "xyz";
  if (requestToken !== adminToken) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const requestToken = "xyz"; // fetched from request
  const userToken = "xyz";
  if (requestToken !== userToken) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
