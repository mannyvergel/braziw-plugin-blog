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
				  		var str = S(marked(record.content.toString())).stripTags().s;
				  		var gist = utils.specialTruncate(str, 400, '.. <a href="' + record.link + '">read more</a>');

				  		callback(null, gist);
				  	}
				  }
				}, 
				function(err, tableObj) {
					res.render(pluginConf.pluginPath + '/views/blog/list.html', {table: tableObj});
			});
		}
	}
}