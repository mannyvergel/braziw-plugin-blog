module.exports = function(pluginConf, web) {
  var routes = new Object();

  var context = '/blog';

  var blogListRoute = (context + '/list');
  routes[blogListRoute] = require('./controllers/blog/list.js')(pluginConf, web);
  if (pluginConf.blogListRoute) {
    routes[pluginConf.blogListRoute] = routes[blogListRoute];
  }
  routes[context + '/:BLOG_SLUG/:BLOG_ID'] = require('./controllers/blog/blog.js')(pluginConf, web);

  routes[context] = {
    get: function(req, res) {
      if (pluginConf.blogListRoute) {
        res.redirect(pluginConf.blogListRoute);
      } else {
        res.redirect(context + '/list');
      }
    }
  }

  var adminContext = web.cms.conf.context;

  routes[adminContext + '/blog/new'] = require('./controllers/admin_blog/new.js')(pluginConf, web);
  routes[adminContext + '/blog/edit/:BLOG_ID'] = require('./controllers/admin_blog/new.js')(pluginConf, web);
  routes[adminContext + '/blog/preview'] = require('./controllers/admin_blog/preview.js')(pluginConf, web);
  routes[adminContext + '/blog/list'] = require('./controllers/admin_blog/list.js')(pluginConf, web);
  routes[adminContext + '/blog/delete'] = require('./controllers/admin_blog/delete.js');

  routes[adminContext + '/blog'] = {
  	get: function(req, res) {
  		res.redirect(adminContext + '/blog/list');
  	}
  }

  routes['/css/plugin/blog/bootstrap.min.css'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/bootstrap.min.css', res);
    }
  }

  routes['/css/plugin/blog/bootstrap-markdown.min.css'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/bootstrap-markdown.min.css', res);
    }
  }

  routes['/css/plugin/blog/fonts/glyphicons-halflings-regular.eot'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/fonts/glyphicons-halflings-regular.eot', res);
    }
  }

  routes['/css/plugin/blog/fonts/glyphicons-halflings-regular.svg'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/fonts/glyphicons-halflings-regular.svg', res);
    }
  }

  routes['/css/plugin/blog/fonts/glyphicons-halflings-regular.ttf'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/fonts/glyphicons-halflings-regular.ttf', res);
    }
  }

  routes['/css/plugin/blog/fonts/glyphicons-halflings-regular.woff'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/fonts/glyphicons-halflings-regular.woff', res);
    }
  }

  routes['/js/plugin/blog/bootstrap.min.js'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/bootstrap.min.js', res);
    }
  }

  routes['/js/plugin/blog/bootstrap-markdown.js'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/bootstrap-markdown.js', res);
    }
  }

  routes['/js/plugin/blog/markdown.js'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/markdown.js', res);
    }
  }

  routes['/js/plugin/blog/to-markdown.js'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/to-markdown.js', res);
    }
  }

  return routes;
}