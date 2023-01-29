const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "Not authorized" });
    }
};

module.exports = authMiddleware;
