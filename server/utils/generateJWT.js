const jwt = require("jsonwebtoken");

const generateJWT = async (_id, name, email) => {
  const token = jwt.sign(
    { _id: _id, name: name, email: email },
    process.env.TOKEN_KEY
  );

  return token;
};

module.exports = {
  generateJWT,
};
