// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");

const server = jsonServer.create();

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
// server.use(
//   jsonServer.rewriter({
//     "/api/*": "/$1",
//     "/blog/:resource/:id/show": "/:resource/:id",
//   })
// );
server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
server.options("*", cors());
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
