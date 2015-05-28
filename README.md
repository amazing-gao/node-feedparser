# feedparser
This module depends on https://github.com/danmactough/node-feedparser
No need to care about stream, Just use xml feed content

---

## Install
```
npm install node-feedparser
```

---

## Usage
```coffeescript

request = require('request')
parser = require('node-feedparser')

request 'http://www.u148.net/rss/', (error, resp, body)->
  parser body, (error, ret)->
    console.log(error)
    console.log(ret)
```

---

## API
parser(xmlContent, [options], [callback])

xmlContent is String
  rss,feed,rdf xml content

options is Object or Function
  if Object
    options.siteTags Array
      select site tags
    options itemTags Array
      select article tags
  if Function
    callback

callback is Function
  callback Error, {site,items}

---

### List of meta properties

* title
* description
* link (website link)
* xmlurl (the canonical link to the feed, as specified by the feed)
* date (most recent update)
* pubdate (original published date)
* author
* language
* image (an Object containing `url` and `title` properties)
* favicon (a link to the favicon -- only provided by Atom feeds)
* copyright
* generator
* categories (an Array of Strings)

### List of article properties

* title
* description (frequently, the full article content)
* summary (frequently, an excerpt of the article content)
* link
* origlink (when FeedBurner or Pheedo puts a special tracking url in the `link` property, `origlink` contains the original link)
* permalink (when an RSS feed has a `guid` field and the `isPermalink` attribute is not set to `false`, `permalink` contains the value of `guid`)
* date (most recent update)
* pubdate (original published date)
* author
* guid (a unique identifier for the article)
* comments (a link to the article's comments section)
* image (an Object containing `url` and `title` properties)
* categories (an Array of Strings)
* source (an Object containing `url` and `title` properties pointing to the original source for an article; see the [RSS Spec](http://cyber.law.harvard.edu/rss/rss.html#ltsourcegtSubelementOfLtitemgt) for an explanation of this element)
* enclosures (an Array of Objects, each representing a podcast or other enclosure and having a `url` property and possibly `type` and `length` properties)
* meta (an Object containing all the feed meta properties; especially handy when using the EventEmitter interface to listen to `article` emissions)
