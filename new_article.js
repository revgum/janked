var fs = require('fs')
, readline = require('readline')
, util = require('util');

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
  rl.close();
  rl.question("Enter tags separted by commas:", function(s){
    s = s.replace(/\s*/g,"");
    tags = s.split(",");
    rl.close();

    var contents = util.format("---\ntitle: %s\ndate: %s\n%s\n___\n"
      , title
      , date
      , (tags.length > 0 ? "tags: [\"" + tags.join("\",\"") + "\"]" : "")
    );

    var file_path = util.format("%s/articles/%s-%s.txt", __dirname, file_date, file_title);
    fs.writeFile(file_path, contents, function(err){
      if(err){
        throw err;
      }
      console.log("Your article '%s' has been created!", file_path);
      process.exit(code=0);
    });
  });
});