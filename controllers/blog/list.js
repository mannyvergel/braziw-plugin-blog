module.exports = function(pluginConf, web) {
	var Blog = web.cms.getCmsModel('Blog');
  	var utils = require('../../utils.js');
  	var marked = web.require('marked');
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
				  			var rawContent = marked(record.content.toString()) || "";
				  			var contentWoImg = rawContent.replace(/<img[^>]*>/g, "");
					  		gist = utils.specialTruncate(contentWoImg, 400, '.. <a href="/blog/' + record.blogSlug + '/' + record._id + '">read more</a>');
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