var reader = require('../lib/article_reader');

function getClientIp(req) {
  
  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

/*
 * GET home page.
 */

exports.index = function(req, res) {
  var client_ip = getClientIp(req);
  var articles = reader.get_sorted_articles('descending', 3);
  console.log("%s articles found.", articles.length);
  res.locals.articles = articles;
  res.locals.client_ip = client_ip;
  res.render_mobile('../views/home/index');
};