/**
 * Module dependencies.
 */

var express = require('express')
, routes = {
      index: require(__dirname + '/routes').index
    , log: require(__dirname + '/routes/log.js').log
    , article: require(__dirname + '/routes/article.js')
    , tag: require(__dirname + '/routes/tag.js')
  }
, jade = require('jade')
, cons = require('consolidate')
, error = require(__dirname + '/lib/error_handler.js');


var app = module.exports = express();

if(process.argv.length == 3){
  app.settings.env = process.argv[2];
}

// Configuration
app.engine('.jade', cons.jade);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.configure('development', function(){
  app.use(error({dumpExceptions: true, showStack: true, showMessage: true, targetView: __dirname + '/views/error/500.jade'}));
});

app.configure('production', function(){
  app.use(error({dumpExceptions: true, targetView: __dirname + '/views/error/500.jade'}));
});

// Routes
app.get('/log', routes.log);
app.get('/article/:article_id', routes.article.read);
app.get('/tag/:tag_id', routes.tag.tagged);
app.get('/', routes.index);

var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);