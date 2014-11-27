module.exports = function(pluginConf, web) {
	var Blog = web.cms.getCmsModel('Blog');

	return {
		get: function(req, res) {
			var blogId = req.params.BLOG_ID;
			Blog.findOne({_id:blogId}, function(err, blog) {
				if (err) throw err;

				if (!blog) {
					res.status(404).end('Blog not found.');
					throw Error('Blog not found.');
				}

				res.render(pluginConf.pluginPath + '/views/blog/blog.html', {blog: blog});
			})
		}
	}
}