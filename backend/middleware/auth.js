const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authenticateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  let token;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  console.log("token: ", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, User) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = User;

    console.log("user :" ,User);

    next();
  });
});

module.exports = { authenticateToken };
