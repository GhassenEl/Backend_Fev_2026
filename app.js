var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const { connectToMongoDB } = require("./config/db");
require("dotenv").config();
// Import des routes basées sur vos modèles (sans index)
var usersRouter = require("./routes/users.routes");
var animalRouter = require("./routes/animal.routes");
var clientRouter = require("./routes/client.routes");
var commandeRouter = require("./routes/commande.routes");
var evaluationRouter = require("/routes/evaluation.routes");
var livreurRouter = require("/routes/livreur.routes");
var panierRouter = require("/routes/panier.routes");
var produitRouter = require("/routes/produit.routes");
const { error } = require("console");
const { connect } = require("http2");

var app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/users", usersRouter);
app.use("/animaux", animalRouter);
app.use("/clients", clientRouter);
app.use("/commandes", commandeRouter);
app.use("/evaluations", evaluationRouter);
app.use("/livreurs", livreurRouter);
app.use("/paniers", panierRouter);
app.use("/produits", produitRouter);

// Route racine (optionnelle)
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API PFE 2026",
    endpoints: [
      "/users",
      "/animaux",
      "/clients",
      "/commandes",
      "/evaluations",
      "/livreurs",
      "/paniers",
      "/produits",
    ],
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

// Création et démarrage du serveur
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectToMangoDB();
  console.log(" Serveur démarré  sur  http://localhost:${PORT}");
  console.log(" Routes disponibles:");
  console.log("  http://localhost:${PORT}");
  console.log("  http://localhost:${PORT}/users");
  console.log("  http://localhost:${PORT}/animaux");
  console.log("  http://localhost:${PORT}/clients");
  console.log("  http://localhost:${PORT}/commandes");
  console.log("  http://localhost:${PORT}/evaluations");
  console.log("  http://localhost:${PORT}/livreurs");
  console.log("  http://localhost:${PORT}/paniers");
  console.log("  http://localhost:${PORT}/produits");
});
