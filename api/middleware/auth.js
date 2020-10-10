const jwt = require("jsonwebtoken");
const prod = require("../utils/prod.json");

exports.authenticateToken = (req, res, next) => {
      // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, prod.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
}

exports.generateAccessToken = (id) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ id: id }, prod.SECRET, {
    expiresIn: 86400 // 24 hours
  });
}