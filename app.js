'use strict';

const express = require(`express`),
      app = express(),
      fs = require(`fs`),
      path = require(`path`);

let PORT = process.env.PORT || 3000;

app.use(express.static(`dist`));
app.use(express.static(`static`)); 

app.get(`/*`, (req, res) => {
  res.sendFile(path.join(__dirname, `./dist`, `index.html`));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
});

app.listen(PORT, () => {
  console.log(`http server listening on port ${ PORT }`)
});
