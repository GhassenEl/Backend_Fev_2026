var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");

const { connectToMongoDB } = require("./config/db");
require("dotenv").config(); // Load environment variables

// Import des routes existantes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.routes");

// Import des nouvelles routes
var animalRoutes = require("./routes/animal.routes");
var clientRoutes = require("./routes/client.routes");
var commandeRoutes = require("./routes/commande.routes");
var evaluationRoutes = require("./routes/evaluation.routes");
var livreurRoutes = require("./routes/livreur.routes");
var panierRoutes = require("./routes/panier.routes");
var produitRoutes = require("./routes/produit.routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuration des routes existantes
app.use("/index", indexRouter);
app.use("/users", usersRouter);

// Configuration des nouvelles routes avec préfixe /api
app.use("/animals", animalRoutes);
app.use("/clients", clientRoutes);
app.use("/commandes", commandeRoutes);
app.use("/evaluations", evaluationRoutes);
app.use("/livreurs", livreurRoutes);
app.use("/paniers", panierRoutes);
app.use("/produits", produitRoutes);

// Route de bienvenue pour l'API
app.get("/api", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API de votre application",
    endpoints: {
      animals: "/animals",
      clients: "/clients",
      commandes: "/commandes",
      evaluations: "/evaluations",
      livreurs: "/livreurs",
      paniers: "/paniers",
      produits: "/produits",
      users: "/users",
    },
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

// Create server and connect to database
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
