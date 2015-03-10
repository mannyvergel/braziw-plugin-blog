var Blog = web.cms.getCmsModel('Blog');

module.exports = {
	post: function(req, res) {
		console.log('!!!!' + req.body._id);
		Blog.findOne({_id: req.body._id}, function(err, blog) {
			if (!blog) {
				throw new Error("Blog not found.");
			}
			
			if (req.user.role == 'ADMIN' || req.user.role == 'EDITOR' || req.user._id == blog.meta.createBy) {
				blog.remove(function(err) {
					if (err) {
						console.error(err);
						throw new Error("Error deleting blog.");
					}
					req.flash('info', 'Blog deleted.');
					res.redirect('/admin/blog/list')
				});
			} else {
				//doesn't have permissions;
				throw new Error("Blog not found.");
			}
			
		})
		
	}
}