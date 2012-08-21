var fs = require('fs')
, readline = require('readline')
, util = require('util')
, config = require('./config');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var d = new Date();
var date = util.format("%s-%s-%s %s:%s:%s",
  d.getFullYear(),
  ('0' + (d.getMonth()+1)).slice(-2),
  ('0' + d.getDate()).slice(-2),
  ('0' + d.getHours()).slice(-2),
  ('0' + d.getMinutes()).slice(-2),
  ('0' + d.getSeconds()).slice(-2)
);

var file_date = util.format("%s-%s-%s",
  d.getFullYear(),
  ('0' + (d.getMonth()+1)).slice(-2),
  ('0' + d.getDate()).slice(-2)
);

var file_title = null;
var title = null;
var tags = [];
rl.question("Enter a title:", function(s){
  title = s;
  file_title = s.replace(/\s+/g, "-").replace(/['\",!\.&]/g, "");
  
  rl.setPrompt("Enter tags separated by commas:");
  rl.prompt();
  rl.on('line', function(s){
    s = s.replace(/\s*/g,"");
    if(s.length == 0){
      console.log("\nNo tags entered.\nAdd \"tags: ['tag','another','etc']\" before the '" + config.article.separator + "' article separator if you change your mind.");
    }
    else {
      tags = s.split(",");
    }

    rl.close();

    var contents = util.format("---\ntitle: %s\ndate: %s\n%s%s\n"
      , title
      , date
      , (tags.length > 0 ? "tags: [\"" + tags.join("\",\"") + "\"]\n" : "")
      , config.article.separator
    );

    var file_path = util.format("%s/articles/%s-%s.txt", __dirname, file_date, file_title);
    fs.writeFile(file_path, contents, function(err){
      if(err){
        throw err;
      }
      console.log("\n\nYour article '%s' has been created, go write some Markdown and publish that thing!", file_path);
      process.exit(code=0);
    });
  });
});