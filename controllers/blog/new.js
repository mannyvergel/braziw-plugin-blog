module.exports = function(pluginConf) {

	return {
		get: function(req, res) {
			res.render(pluginConf.pluginPath + '/views/blog/new.html', {});
		}
	}
	
}