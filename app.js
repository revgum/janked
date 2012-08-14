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
, cons = require('consolidate');

var app = module.exports = express();

// Configuration
app.engine('.jade', cons.jade);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(app.router);


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/log', routes.log);
app.get('/article/:article_id', routes.article.read);
app.get('/tag/:tag_id', routes.tag.tagged);
app.get('/', routes.index);



var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);