var config = {};

config.disqus = {};
config.web = {};
config.article = {};

config.web.host_name = "www.yoursite.com";
config.web.environment = process.env.NODE_ENV || "development";
config.web.port = process.env.NODE_PORT || 3000;
config.web.cache_for_seconds = 31557600000;

config.disqus.short_name = "yourshortname";

config.article.summary_length = 50;
config.article.separator = "___";

module.exports = config;