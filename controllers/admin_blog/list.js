module.exports = function(pluginConf, web) {
	var Blog = web.cms.getCmsModel('Blog');
	var cmsContext = web.cms.conf.context;
	return {
		get: function(req, res) {
			var query = {docType: 'Blog'};
			var cols = ['blogTitle','blogStatus'];
			var labels =  ['Title', 'Status'];
			if (req.user) {
				if (!(req.user.role == 'ADMIN' || req.user.role == 'EDITOR')) {
					query = {'meta.createBy' : req.user._id};
				} else {
					cols.push('blogAuthor');
					labels.push('Author');
				}
			}
			
			web.renderTable(req, Blog, {
				  query: query,
				  columns: cols,
				  labels: labels,
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
				  	},
				  	blogAuthor: function(record, column, escapedVal, callback) {
				  		// console.log('!!!' + JSON.stringify(record));
				  		// callback(null, "");
				  		
				  		var User = web.models('User');
				  		User.findOne({_id: record.meta.createBy}, function(err, author) {
				  			var nickname = "";
				  			if (author) {
				  				nickname = author.nickname;
				  			}
							callback(null, author.nickname);
						})
				  	}
				  }
				}, 
				function(err, table) {
				res.render(pluginConf.pluginPath + '/views/admin_blog/list.html', {table: table});
			});
		}
	}
}