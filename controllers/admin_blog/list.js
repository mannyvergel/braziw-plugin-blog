module.exports = function(pluginConf, web) {
	var Blog = web.cms.getCmsModel('Blog');
	var cmsContext = web.cms.conf.context;
	return {
		get: function(req, res) {
			var query = {docType: 'Blog'};
			if (req.user && (req.user.role != 'ADMIN' || req.user.role != 'EDITOR')) {
				query = {'meta.createBy' : req.user._id};
			}
			web.renderTable(req, Blog, {
				  query: query,
				  columns: ['blogTitle','blogStatus'],
				  labels: ['Title', 'Status'],
				  sort: {'meta.createDt': -1},
				  handlers: {
				  	blogTitle: function(record, column, escapedVal, callback) {
				  		callback(null, '<a href="' + cmsContext + '/blog/edit/' + record._id + '">' + escapedVal + '</a>');
				  	},
				  	blogStatus: function(record, column, escapedVal, callback) {
				  		if (record.blogStatus == 'A') {
				  			callback(null, 'Published')
				  		} else if (record.blogStatus == 'D') {
				  			callback(null, 'Draft');
				  		}
				  	}
				  }
				}, 
				function(err, table) {
				res.render(pluginConf.pluginPath + '/views/admin_blog/list.html', {table: table});
			});
		}
	}
}