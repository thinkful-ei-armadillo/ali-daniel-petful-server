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
app.use(cors());

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get(`${PORT}/api/cat`, function (req, res, next) {
  res.json(catInfo[0])
    .catch(err => {
      next(err);
    });

});

app.get(`${PORT}/api/dog`, (req, res, next) => {
  res.json(dogInfo[0])
    .catch(err => {
      next(err);
    });
});

app.delete(`${PORT}/api/cat`, (req, res, next) => {
  Promise.all([
    catInfo.shift(),
    res.sendStatus(204)
      .catch(err => {
        next(err);
      })
  ]);
});

app.delete(`${PORT}/api/dog`, (req, res, next) => {
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