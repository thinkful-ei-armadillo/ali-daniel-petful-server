'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { catRefill, dogRefill, Cats, Dogs } = require('./src/store');
const {PORT, NODE_ENV, CLIENT_ORIGIN} = require('./src/config');

const app = express();
app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));
app.use(helmet());
app.use(cors({
  origin: CLIENT_ORIGIN
}));


app.get('/', function (req, res, next) {
  res.json(console.log('Hello World'))
    .catch(next);
});

app.get('/api/cat', function (req, res, next) {
  const cat = Cats.peek();
  if (!cat) {
    catRefill();
    const newCat = Cats.peek();
    return res.send(newCat);
  }
  return res.send(cat)
    .catch(next);
});

app.get('/api/dog', (req, res, next) => {
  const dog = Dogs.peek();
  if (!dog) {
    dogRefill();
    const newDog = Dogs.peek();
    return res.send(newDog);
  } 
  else
    return res.send(dog)
      .catch(next);
});

app.delete('/api/cat', (req, res, next) => {
  Cats.dequeue();
  res.status(204).send();
});

app.delete('/api/dog', (req, res, next) => {
  Dogs.dequeue();
  res.status(204).send();
});


// // Catch-all 404
// app.use(function (req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});



// // Catch-all Error handler
// // Add NODE_ENV check to prevent stacktrace leak
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: app.get('env') === 'development' ? err : {}
//   });
// });

app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
});