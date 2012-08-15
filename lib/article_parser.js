var yaml = require('js-yaml')
, fs = require('fs')
, _ = require('underscore');

module.exports = {
  summary_length: 50,

  parse: function(file){
    //TODO : Do some error checking/logging.. be sure that header will exist?
    var data = fs.readFileSync(__dirname + '/../articles/' + file, 'ascii');
    var separator = data.indexOf("___");
    var link = file.substring(0, file.indexOf("."));
    var body = data.substring((separator + 3), data.length);
    var body_summary = body.substring(0, (body.length > this.summary_length ? this.summary_length : body.length)) + "...";
    var article = { 
      body: body
      , body_summary: body_summary
      , link: link
    };
    
    try {
      article.header = yaml.load(data.substring(0, separator));
    } catch(e) {
      console.log("Error loading YAML header.");
      throw e;
    }
    
    if(article.header.tags != null){
      var tags = _.filter(article.header.tags, function(t){ return t.length > 0; });
      if(tags.length > 0){
        article.header.tags = tags;
      }
      else {
        delete article.header.tags;
      }
    }
    
    return article;
  }
}