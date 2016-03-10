'use strict';

const http = require('http');
const fs = require('fs');
const Router = require('../lib/router');
const locationsRouter = new Router();

// Make a /data directory
fs.mkdir(__dirname + '/../data', (err) => {
  if (err) return console.log('directory "/data" already exists');
  console.log('directory "/data" created');
});

// variable for the next location to add
var fileNum;
fs.readdir(__dirname + '/../data', (err, files) => {
  fileNum = files.length + 1;
});

locationsRouter.get('/locations', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Locations</h1><p>locations page</p>');

  // Need to figure out async stuff
  /*
  fs.readdir(__dirname + '/../data', (err, files) => {
    var location;
    files.forEach((file) => {
      fs.readFile(`${__dirname}/../data/${file}`, (err, data) => {
        location = JSON.parse(data.toString());
        res.write(`<p>${location.location}</p>`);
      });
    });
  });
  */
  res.end();
});

// post request data needs to use the naming convention {"location":"locationName"}
locationsRouter.post('/locations', (req, res) => {
  var newData;
  // do we need this for a post request and should the Content-Type be different?
  res.writeHead(200, {'Content-Type': 'text/plain'});

  req.on('data', (data) => {
    newData = data.toString();
    fs.writeFile(`${__dirname}/../data/location-${fileNum}.json`, newData, () => {
      console.log('New location added');
      fileNum++;
    });
  });
  res.write('New location added');
  res.end();
});

http.createServer(locationsRouter.route()).listen(3000, () => console.log('server started'));
