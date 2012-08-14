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
    article.header = yaml.load(data.substring(0, separator));
    return article;
  }
}