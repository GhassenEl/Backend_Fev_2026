var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');

const { connectToMongoDB } = require('./config/db');
var usersRouter = require('./routes/users.routes');
var animalRouter = require('./routes/animal.routes');
var clientRouter = require('./routes/client.routes');
var commandeRouter = require('./routes/commande.routes');
var evaluationRouter = require('./routes/evaluation.routes');
var livreurRouter = require('./routes/livreur.routes');
var panierRouter = require('./routes/panier.routes');
var produitRouter = require('./routes/produit.routes');

require('dotenv').config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/animaux', animalRouter);
app.use('/clients', clientRouter);
app.use('/commandes', commandeRouter);
app.use('/evaluations', evaluationRouter);
app.use('/livreurs', livreurRouter);
app.use('/paniers', panierRouter);
app.use('/produits', produitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json('error');
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});