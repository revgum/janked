var fs = require('fs')
, _ = require('underscore')
, parser = require('../lib/article_parser');

function getSortedFiles(path, sort, limit){
  var sorted_by_name = _.sortBy(fs.readdirSync(path), function(f){ return f;});
  if(sort == "descending") {
    sorted_by_name = sorted_by_name.reverse();
  }
  if(limit){
    return sorted_by_name.slice(0, limit);
  }
  return sorted_by_name;
}

module.exports = {
  articles_directory: __dirname + '/../articles',
  
  get_sorted_files: function(sort, limit){
    return getSortedFiles(this.articles_directory, sort, limit);
  },

  get_sorted_articles: function(sort, limit){
    var files = getSortedFiles(this.articles_directory, sort, limit);
    var articles = [];
    _.each(files, function(file){
      articles.push(parser.parse(file));
    });
    return articles;
  }
}