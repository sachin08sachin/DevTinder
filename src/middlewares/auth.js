const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decodedObj = jwt.verify(token, "devTinderSecretKey");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    req.user = user;
    if (!user) {
      return res.status(401).send("User not authorized");
    }
    next();
  } catch (err) {
    return res.status(400).send("ERROR FROM MIDDLEWARE :" + err.message);
  }
};

module.exports = {
  userAuth,
};
