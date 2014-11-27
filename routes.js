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

  /*routes['/css/plugin/blog/ghostdown.css'] = {
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
  }*/

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