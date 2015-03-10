
module.exports = function(pluginConf, web) {
  
  var Blog = web.cms.getCmsModel('Blog');
  var dmsUtils = web.cms.utils;
  var async = require('async');
  var utils = require('../../utils.js');
  return {

    post: function(req, res) {
      
      var blog = new Blog();
      
      blog.blogTitle = utils.trim(req.body.blogTitle);  
      if (req.body.content) {
        blog.content = new Buffer(req.body.content, 'utf-8');
      }

      
      
      //create mode
      blog.blogSlug = utils.slugify(blog.blogTitle);

      blog.name = getBlogName(blog.blogSlug);
      blog.blogYear = utils.getYear();

      if (req.user) {
        blog.meta.createBy = req.user._id;
      }
     
      if (req.body.publish) {
        blog.blogStatus = 'A';
        if (!blog.blogPublishDate) {
          blog.blogPublishDate = new Date();
        }
      } else {
        blog.blogStatus = 'D';
        blog.blogPublishDate = null;
      }

      if (req.body.anonymous) {
        blog.blogAnonymousInd = 'Y';
      } else {
        blog.blogAnonymousInd = 'N';
      }

      if (req.user) {
        blog.meta.lastUpdateBy = req.user._id;
      }


      res.render(pluginConf.pluginPath + '/views/blog/blog.html', {blog: blog, isPreview: true});
      
     
      
    }
  }
  
}

function getBlogName(blogSlug) {
  return blogSlug + '.md';
}

