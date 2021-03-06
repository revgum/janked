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
, error = require(__dirname + '/lib/error_handler.js')
, config = require('./config');


var app = module.exports = express();

// take the environment from the commandline for Heroku (Procfile), or use the config for backup
if(process.argv.length == 3){
  app.settings.env = process.argv[2];
} else {
  app.settings.env = config.web.environment;
}

// Configuration
app.engine('.jade', cons.jade);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.configure('development', function(){
  app.use(error({dumpExceptions: true, showStack: true, showMessage: true, targetView: __dirname + '/views/error/500.jade'}));
  app.use(express.static(__dirname + '/public'));
});

app.configure('production', function(){
  app.use(error({dumpExceptions: true, targetView: __dirname + '/views/error/500.jade'}));
  app.use(express.static(__dirname + '/public', { maxAge: config.web.cache_for_seconds }));
});

app.locals.blog = config.blog;
app.locals.disqus = config.disqus;
app.locals.host_name = config.web.host_name;

// Routes
app.get('/about', function(req, res) {
  res.render_mobile('../views/about/me');
});
app.get('/log', routes.log);
app.get('/article/:article_id', routes.article.read);
app.get('/tag/:tag_id', routes.tag.tagged);
app.get('/', routes.index);

express.response.render_mobile = function(view, options, fn){
  var self = this
  , options = options || {}
  , req = this.req
  , app = req.app;
  var is_mobile = /mobile/i.test(req.get('user-agent'));
  this.render(view + (is_mobile ? "-mobile" : ""), options, fn);
}

var port = process.env.PORT || config.web.port;
var server = app.listen(port);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);