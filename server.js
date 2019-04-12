'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { dogInfo, catInfo } = require('./src/store');
const {PORT, NODE_ENV} = require('./src/config');

const app = express();
app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000/' || '*' 
}));

// console.log(catInfo[0]);

app.get('/', function (req, res, next) {
  res.json(console.log('Hello World'))
    .catch(next);
});

app.get('/api/cat', function (req, res, next) {
  res.send(catInfo[0])
    .then(console.log('hello from cat GET request!'))
    .catch(next);
});

app.get('/api/dog', (req, res, next) => {
  res.send(dogInfo[0])
    .then(console.log('hello from dog GET request!'))
    .catch(next);
});

app.delete('/api/cat', (req, res, next) => {
  Promise.all([
    catInfo.shift(),
    res.sendStatus(204)
      .catch(err => {
        next(err);
      })
  ]);
});

app.delete('/api/dog', (req, res, next) => {
  Promise.all([
    dogInfo.shift(),
    res.sendStatus(204)
      .catch(err => {
        next(err);
      })
  ]);
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