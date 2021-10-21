const express = require('express');
const { errorHandler } = require('./error-handling/errorHandler');
const { userHandler } = require('./middleware/userHandler');
const userRouter = require('./routers/userRouter')
const router = require('./routers/pokemonRouter');
const app = express();
const port = 8080;

app.use(express.json());

app.use('/pokemon', userHandler, router);
app.use('/users', userHandler, userRouter);
app.use(errorHandler);

// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
// app.get('/', function(req, res) {
//   res.send('hello world!');
// });