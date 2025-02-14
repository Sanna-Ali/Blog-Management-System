const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  console.log(authToken);
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      console.log("rr");
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedPayload);
      req.user = decodedPayload;
      next();
    } catch (error) {
      console.log("333");
      return res.status(401).json({ message: "invalid token, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "no token provided, access denied" });
  }
}

// Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    console.log("ad");
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "not allowed, only admin" });
    }
  });
}

// Verify Token & Only User Himself
function verifyTokenAndOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "not allowed, only user himself" });
    }
  });
}

// Verify Token & Authorization
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "not allowed, only user himself or admin" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyTokenAndAuthorization,
};
