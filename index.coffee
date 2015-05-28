FeedParser = require 'feedparser'
StringStream = require 'string-stream'
_ = require 'lodash'

defaultSiteTags = ['title', 'description', 'date', 'link', 'author']
defaultItemTags = ['title', 'description', 'summary', 'date', 'link', 'author']

###
xmlContent String
  rss,feed,rdf xml content

options Object or Function
  if Object
    options.siteTags Array
      select site tags
    options itemTags Array
      select article tags
  if Function
    callback

callback Function
  callback Error, {site,items}
###
module.exports = (xmlContent, options, callback)->
  feedparser = new FeedParser()
  site = {}
  items = []

  if _.isFunction options
    callback = options
    options = {siteTags:defaultSiteTags, itemTags: defaultItemTags}

  stream = new StringStream xmlContent
  stream.pipe feedparser

  feedparser.on 'error', (error)->
    callback error

  feedparser.on 'readable', ()->
    if _.isEmpty(site) and @meta
      site = _.pick @meta, options.siteTags

    while item = @read()
      items.push _.pick item, options.itemTags

  feedparser.on 'end', ()->
    callback null, {site:site || {}, items:items}
