const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ✅ Add manual CORS middleware (works in Vercel functions)
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or specific domain instead of '*'
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Pre-flight response for OPTIONS requests
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
});

server.use(middlewares);

// Optional rewrites
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

module.exports = server;
