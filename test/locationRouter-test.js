'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http'); chai.use(chaiHTTP);
const request = chai.request;
const expect = chai.expect;
const fs = require('fs');
require(__dirname + '/../routes/locationsRouter');

describe('locationsRouter correctly responds to requests', () => {
  var fileContents;
  before((done) => {
    request('localhost:3000')
    .post('/locations')
    .send({location: 'Seattle'})
    .end((err, res) => {
      fs.readdir(__dirname + '/../data', (err, files) => {
        var testFile = files.pop();
        fs.readFile(`${__dirname}/../data/${testFile}`, (err, data) => {
          fileContents = JSON.parse(data.toString());
        });
      });
      done();
    });
  });
  it('should respond to GET request to /locations with a 200 status', (done) => {
    request('localhost:3000')
    .get('/locations')
    .end((err, res) => {
      // expect(true).eql(false);
      expect(res).to.have.status(200);
      expect(res.text).eql('<h1>Locations</h1><p>locations page</p>');
      done();
    });
  });
  it('should respond to POST request, sending {"location": "Seattle"}, to write new file to /data folder', (done) => {
    // expect(true).eql(false);
    expect(fileContents).to.eql({ location: 'Seattle' });
    done();
  });
  after((done) => {
    fs.readdir(__dirname + '/../data', (err, files) => {
      fs.unlink(__dirname + '/../data/' + files.pop(), (err) => {
        if (err) return console.log(err);
      });
      done();
    });
  });
});
