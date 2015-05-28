request = require 'request'
parser = require '..'
should = require 'should'

describe 'node-feedparser unit test', ()->
  it 'rss without tags', (done)->
    request 'http://www.u148.net/rss/', (error, resp, body)->
      parser body, (error, ret)->
        should(error).be.exactly(null)
        should(ret.site).have.property('title')
        should(ret.site).have.property('description')
        should(ret.site).have.property('date')
        should(ret.site).have.property('link')
        should(ret.site).have.property('author')

        should(ret.items[0]).have.property('title')
        should(ret.items[0]).have.property('description')
        should(ret.items[0]).have.property('summary')
        should(ret.items[0]).have.property('date')
        should(ret.items[0]).have.property('link')
        should(ret.items[0]).have.property('author')
        done()

  it 'atom without tags', (done)->
    request 'http://www.ruanyifeng.com/blog/atom.xml', (error, resp, body)->
      parser body, (error, ret)->
        should(error).be.exactly(null)
        should(ret.site).have.property('title')
        should(ret.site).have.property('description')
        should(ret.site).have.property('date')
        should(ret.site).have.property('link')
        should(ret.site).have.property('author')

        should(ret.items[0]).have.property('title')
        should(ret.items[0]).have.property('description')
        should(ret.items[0]).have.property('summary')
        should(ret.items[0]).have.property('date')
        should(ret.items[0]).have.property('link')
        should(ret.items[0]).have.property('author')
        done()

  it 'rss with tags', (done)->
    request 'http://www.u148.net/rss/', (error, resp, body)->
      opts =
        siteTags: ['title', 'date']
        itemTags: ['title', 'link', 'date']
      parser body, opts, (error, ret)->
        should(error).be.exactly(null)
        should(ret.site).have.property('title')
        should(ret.site).have.property('date')
        should(ret.site).not.have.property('description')
        should(ret.site).not.have.property('link')
        should(ret.site).not.have.property('author')

        should(ret.items[0]).have.property('title')
        should(ret.items[0]).have.property('link')
        should(ret.items[0]).have.property('date')
        should(ret.items[0]).not.have.property('description')
        should(ret.items[0]).not.have.property('summary')
        should(ret.items[0]).not.have.property('author')
        done()

  it 'atom with tags', (done)->
    request 'http://www.ruanyifeng.com/blog/atom.xml', (error, resp, body)->
      opts =
        siteTags: ['title', 'date']
        itemTags: ['title', 'link', 'date']
      parser body, opts, (error, ret)->
        should(error).be.exactly(null)
        should(ret.site).have.property('title')
        should(ret.site).have.property('date')
        should(ret.site).not.have.property('description')
        should(ret.site).not.have.property('link')
        should(ret.site).not.have.property('author')

        should(ret.items[0]).have.property('title')
        should(ret.items[0]).have.property('link')
        should(ret.items[0]).have.property('date')
        should(ret.items[0]).not.have.property('description')
        should(ret.items[0]).not.have.property('summary')
        should(ret.items[0]).not.have.property('author')
        done()

