var request = require('request');
var should = require('should');

var parser = require('..');

describe('node-feedparser unit test', function() {

  it('rss without tags', function(done) {
    this.timeout(10000);

    return request('http://www.u148.net/rss/', function(error, resp, body) {
      return parser(body, function(error, ret) {
        should(error).be.exactly(null);
        should(ret.site).have.property('title');
        should(ret.site).have.property('description');
        should(ret.site).have.property('date');
        should(ret.site).have.property('link');
        should(ret.site).have.property('author');
        should(ret.items[0]).have.property('title');
        should(ret.items[0]).have.property('description');
        should(ret.items[0]).have.property('summary');
        should(ret.items[0]).have.property('date');
        should(ret.items[0]).have.property('link');
        should(ret.items[0]).have.property('author');
        return done();
      });
    });
  });

  it('atom without tags', function(done) {
    this.timeout(10000);

    return request('http://www.ruanyifeng.com/blog/atom.xml', function(error, resp, body) {
      return parser(body, function(error, ret) {
        should(error).be.exactly(null);
        should(ret.site).have.property('title');
        should(ret.site).have.property('description');
        should(ret.site).have.property('date');
        should(ret.site).have.property('link');
        should(ret.site).have.property('author');
        should(ret.items[0]).have.property('title');
        should(ret.items[0]).have.property('description');
        should(ret.items[0]).have.property('summary');
        should(ret.items[0]).have.property('date');
        should(ret.items[0]).have.property('link');
        should(ret.items[0]).have.property('author');
        return done();
      });
    });
  });

  it('rss with tags', function(done) {
    this.timeout(10000);

    return request('http://www.u148.net/rss/', function(error, resp, body) {
      var opts;
      opts = {
        siteTags: ['title', 'date'],
        itemTags: ['title', 'link', 'date']
      };
      return parser(body, opts, function(error, ret) {
        should(error).be.exactly(null);
        should(ret.site).have.property('title');
        should(ret.site).have.property('date');
        should(ret.site).not.have.property('description');
        should(ret.site).not.have.property('link');
        should(ret.site).not.have.property('author');
        should(ret.items[0]).have.property('title');
        should(ret.items[0]).have.property('link');
        should(ret.items[0]).have.property('date');
        should(ret.items[0]).not.have.property('description');
        should(ret.items[0]).not.have.property('summary');
        should(ret.items[0]).not.have.property('author');
        return done();
      });
    });
  });

  it('atom with tags', function(done) {
    this.timeout(10000);

    return request('http://www.ruanyifeng.com/blog/atom.xml', function(error, resp, body) {
      var opts;
      opts = {
        siteTags: ['title', 'date'],
        itemTags: ['title', 'link', 'date']
      };
      return parser(body, opts, function(error, ret) {
        should(error).be.exactly(null);
        should(ret.site).have.property('title');
        should(ret.site).have.property('date');
        should(ret.site).not.have.property('description');
        should(ret.site).not.have.property('link');
        should(ret.site).not.have.property('author');
        should(ret.items[0]).have.property('title');
        should(ret.items[0]).have.property('link');
        should(ret.items[0]).have.property('date');
        should(ret.items[0]).not.have.property('description');
        should(ret.items[0]).not.have.property('summary');
        should(ret.items[0]).not.have.property('author');
        return done();
      });
    });
  });

  it('issue#1', function(done) {
    this.timeout(10000);

    return request('http://feed.rutracker.org/atom/f/1880.atom', function(error, resp, body) {
      var opts;
      opts = {
        siteTags: ['title', 'date'],
        itemTags: ['title', 'link', 'date']
      };
      return parser(body, opts, function(error, ret) {
        should(error).be.exactly(null);
        should(ret.site).have.property('title');
        should(ret.site).have.property('date');
        should(ret.site).not.have.property('description');
        should(ret.site).not.have.property('link');
        should(ret.site).not.have.property('author');
        should(ret.items[0]).have.property('title');
        should(ret.items[0]).have.property('link');
        should(ret.items[0]).have.property('date');
        should(ret.items[0]).not.have.property('description');
        should(ret.items[0]).not.have.property('summary');
        should(ret.items[0]).not.have.property('author');
        return done();
      });
    });
  });
});
