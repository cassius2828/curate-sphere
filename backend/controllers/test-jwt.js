const jwt = require("jsonwebtoken");
// jwt module has two main jobs
// to Sign tokens
// to Verify tokens

function verify(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  // verify our token (decode it!)eventually to add to req.user
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  res.json({ token });
}



module.exports = {
  verify,
 
};
