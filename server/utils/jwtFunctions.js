const jwt = require("jsonwebtoken");

const generateJWT = async (_id, name, email) => {
  const token = jwt.sign(
    { _id: _id, name: name, email: email },
    process.env.TOKEN_KEY
  );

  return token;
};

const decodeAuthToken = async (token) => {
  // Decode the JWT (without verification)
  const decoded = jwt.decode(token, { complete: true });
  //   console.log(decoded);

  let ans = "";
  // Verify the JWT (optional but recommended)
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      // Token is invalid or has been tampered with
      console.error("JWT verification failed:", err);
      return;
    }

    // Token is valid; you can access the payload data
    ans = decoded;
  });

  return ans;
};

module.exports = {
  generateJWT,
  decodeAuthToken,
};
