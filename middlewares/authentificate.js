const { User } = require("../models/user");
const { RequestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        console.log("user", user);
        throw RequestError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentificate;
