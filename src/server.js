'use strict';
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use('/api/cat', function (req, res, next) {
  req.app.get()
    .then(res => {
      if (res.ok) {
        return res.json({
          imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
          imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
          name: 'Fluffy',
          sex: 'Female',
          age: 2,
          breed: 'Bengal',
          story: 'Thrown on the street'
        });
      }
    })
    .catch(next);

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

app.listen(8080,()=>{
  console.log('Serving on 8080');
});