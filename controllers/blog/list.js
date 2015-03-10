module.exports = function(pluginConf, web) {
	var Blog = web.cms.getCmsModel('Blog');
  	var utils = require('../../utils.js');
  	var marked = require('marked');
	var S = require('string');
	return {
		get: function(req, res) {

			web.utils.getTableFromModel(Blog, {
				  query: {docType: 'Blog', blogStatus: 'A'},
				  columns: ['_id', 'blogTitle', 'content','blogPublishDate', 'blogSlug', 'gist'],
				  sort: {'blogPublishDate': -1},
				  handlers: {
				  	gist: function(record, column, escapedVal, callback) {
				  		var gist = null;
				  		if (record.content) {
					  		var str = S(marked(record.content.toString())).stripTags('img').s;
					  		gist = utils.specialTruncate(str, 400, '.. <a href="/blog/' + record.blogSlug + '/' + record._id + '">read more</a>');
					  	}
				  		callback(null, gist);
				  	}
				  }
				}, 
				function(err, tableObj) {
					pluginConf.blogListTitle = pluginConf.blogListTitle || 'Blog List';
					res.render(pluginConf.pluginPath + '/views/blog/list.html', {table: tableObj, blogListTitle: pluginConf.blogListTitle});
			});
		}
	}
}