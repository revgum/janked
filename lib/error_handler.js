/**
 * Originally from : http://mikevalstar.com/Blog/105/Coding_with_Nodejs_Part_2_Error_Handling_and_404_pages_with_Express
 * Refactored for janked purposes by @revgum
 *
 * //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * Modified from the Connect project: https://github.com/senchalabs/connect/blob/master/lib/middleware/errorHandler.js
 *
 * Flexible error handler, providing (_optional_) stack traces and logging
 * and error message responses for requests accepting text, html, or json.
 *
 * Options:
 *
 *   - `showStack` respond with both the error message and stack trace. Defaults to `false`
 *   - `showMessage`, respond with the exception message only. Defaults to `false`
 *   - `dumpExceptions`, dump exceptions to stderr (without terminating the process). Defaults to `false`
 *   - `logErrors`, will dump a log entry and stack trace into the gievn file. Defaults to `false`
 *   - `targetView`, the view that we'll be rendering. Defaults to `error.jade` 
 *
 * Text:
 *   By default, and when _text/plain_ is accepted a simple stack trace
 *   or error message will be returned.
 *
 * JSON:
 *   When _application/json_ is accepted, connect will respond with
 *   an object in the form of `{ "error": error }`. 
 *
 * HTML:
 *   When accepted connect will output a nice html stack trace.
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

var fs = require('fs');

exports = module.exports = function errorHandler(options){
  options = options || {};
  // defaults
  var showStack = options.showStack
    , showMessage = options.showMessage
    , dumpExceptions = options.dumpExceptions
    , logErrors = options.logErrors
    , logErrorsStream = false
    , targetView = options.targetView;

  if(options.logErrors)
    logErrorsStream = fs.createWriteStream(logErrors, {'flags': 'a', encoding: 'utf-8', mode: 0666});

  return function errorHandler(err, req, res, next){
    res.statusCode = 500;

    if(dumpExceptions) console.error(err.stack);

    if(logErrors){
      var now = new Date();
      logErrorsStream.write(now.toJSON() + ' - Error Happened: \n' + err.stack + "\n");
    }

    targetView = targetView || "error.jade";
    var errorMessage = "There was a server error generating the content.";
    if(showMessage) errorMessage = err.toString();

    var accept = req.headers.accept || '';
    if(showStack) {
      // html
      if (~accept.indexOf('html')) {
        res.render(targetView, {
          stack: err.stack || ''
        , error: errorMessage 
        });
      // json
      } else if (~accept.indexOf('json')) {
        var json = JSON.stringify({ error: errorMessage });
        res.setHeader('Content-Type', 'application/json');
        res.end(json);
      // plain text
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err.stack);
      }
    } else {
      // public error page render
      // html
      if (~accept.indexOf('html')) {
        res.render(targetView, {
          stack: ""
        , error: errorMessage 
        });
      // json
      } else if (~accept.indexOf('json')) {
        var json = JSON.stringify({ error: errorMessage });
        res.setHeader('Content-Type', 'application/json');
        res.end(json);
      // plain text
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("500 - Server Error");
      }
    }
  };
};