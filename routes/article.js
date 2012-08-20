var fs = require('fs')
, markdown = require('marked')
, _ = require('underscore')
, parser = require('../lib/article_parser')
, config = require('../config');
/*
 * GET article page.
 */
module.exports = {
  read : function(req, res) {
    var id = req.params.article_id;
    var article = parser.parse(id + ".txt");
    article.body = markdown(article.body); 

    res.locals.article = article;
    res.locals.disqus = config.disqus;
    res.locals.host_name = config.web.host_name;
    res.render('../views/article/read');
  }
};