var fs = require('fs')
, markdown = require('marked')
, _ = require('underscore')
, parser = require('../lib/article_parser');
/*
 * GET article page.
 */
module.exports = {
  read : function(req, res) {
    var id = req.params.article_id;
    var article = parser.parse(id + ".txt");
    article.body = markdown(article.body); 

    res.locals.article = article;
    res.render('../views/article/read');
  }
};