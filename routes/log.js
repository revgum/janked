var reader = require('../lib/article_reader')
, config = require('../config');

/*
 * GET log page.
 */
exports.log = function(req, res) {
  var articles = reader.get_sorted_articles('descending');
  console.log("%s articles found.", articles.length);
  res.locals.blog = config.blog;
  res.locals.articles = articles;
  res.render('../views/log/list');
};