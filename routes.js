module.exports = function(pluginConf, web) {
  var routes = new Object();
  var context = web.cms.conf.context;
  routes[context + '/blog'] = {
	get: function(req, res) {
		res.redirect(context + '/blog/list');
	}
  }

  routes[context + '/blog/new'] = require('./controllers/blog/new.js')(pluginConf);

  routes[context + '/blog'] = {
	get: function(req, res) {
		res.redirect(context + '/blog/list');
	}
  }

  routes['/css/plugin/blog/ghostdown.css'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/ghostdown.css', res);
    }
  }

  routes['/js/plugin/blog/ghostdown.js'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/ghostdown.js', res);
    }
  }

  routes['/js/plugin/blog/jquery.ghostdown.js'] = {
    get: function(req, res) {
      web.utils.serveStaticFile(pluginConf.pluginPath + '/pub/jquery.ghostdown.js', res);
    }
  }

  return routes;
}