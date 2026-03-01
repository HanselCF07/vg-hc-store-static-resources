const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt");
const User = require("../models/User");
const UserStatus = require("../models/UserStatus");
const Role = require("../models/Role");
const RolePermission = require("../models/RolePermission");
const Profile = require("../models/Profile");


function authMiddleware(requiredPermissions = []) {
  return async function (req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Invalid Access" });

    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), jwtSecret);
      const userPublicKey = decoded.key;

      const user = await User.findOne({
        where: {
          user_public_key: userPublicKey,
          record_status: 1
        },
        include: [
          { model: UserStatus, where: { record_status: 1 } },
          { model: Role, include: [{ model: RolePermission }] },
          { model: Profile }
        ]
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid Access" });
      }

      // Validar permisos
      const permissions = user.Role.RolePermissions.map(p => p.permission);

      // Cambia según si quieres "todos" o "alguno"
      const hasPermission = requiredPermissions.some(p => permissions.includes(p));
      if (!hasPermission) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      //req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Invalid Access" });
    }
  };
}

module.exports = authMiddleware;