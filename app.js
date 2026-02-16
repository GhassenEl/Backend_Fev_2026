var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");

const { connectToMongoDB } = require("./config/db");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.routes");

require("dotenv").config(); // Load environment variables

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Uniquement index et users
app.use("/index", indexRouter);
app.use("/users", usersRouter);

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "API fonctionne!",
    routes: ["/index", "/users"],
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    error: err.message,
    status: err.status || 500,
  });
});

// CHANGEMENT DU PORT - Essayez 3007 
const server = http.createServer(app);
const PORT = 3007; // Changé à 3007

server.listen(PORT, () => {
  connectToMongoDB();
  console.log("\n" + "=".repeat(50));
  console.log(`SERVEUR DÉMARRÉ SUR LE PORT ${PORT}`);
  console.log(` http://localhost:${PORT}`);

});

// Gestionnaire d'erreur avec suggestion automatique
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n Le port ${PORT} est déjà utilisé!`);
    process.exit(1);
  }
});

module.exports = app;
