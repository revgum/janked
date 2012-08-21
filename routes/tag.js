var fs = require('fs')
, markdown = require('marked')
, _ = require('underscore')
, reader = require('../lib/article_reader')
, parser = require('../lib/article_parser')
, config = require('../config');
/*
 * GET tag page.
 */
module.exports = {
  tagged : function(req, res) {
    var id = req.params.tag_id;
    var a = [];
    var files = reader.get_sorted_files('descending');

    _.each(files, function(file){
      var article = parser.parse(file);
      //console.log(article);
      if(article.header.tags) {
        if(_.include(article.header.tags, id)){
          console.log("File %s has tag %s.", file, id);
          article.body = markdown(article.body);
          a.push(article); 
        }
      }
    });
    res.locals.blog = config.blog;
    res.locals.articles = a;
    res.render('../views/tag/list');
  }
};
