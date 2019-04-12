'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dogInfo, catInfo } = require('./store');
const PORT = require('./config');

const app = express();
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);
app.use(cors());

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/api/cat', function (req, res, next) {
  res.json(catInfo[0])
    .catch(err => {
      next(err);
    });

});

app.get('/api/dog', (req, res, next) => {
  res.json(dogInfo[0])
    .catch(err => {
      next(err);
    });
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

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
});