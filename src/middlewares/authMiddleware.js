const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt");


function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Invalid authorization NPT" });

  jwt.verify(token.replace("Bearer ", ""), jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid authorization NVT" });
    req.userId = decoded.id; // opcional, si quieres usar el id en la lógica
    next();
  });
}


module.exports = authMiddleware;