const corsMiddleware = (req, res, next) => {
  res = applyCorsHeaders(res);
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
};

const applyCorsHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // or res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  return res;
};

module.exports = corsMiddleware;
