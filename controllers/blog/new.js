
module.exports = function(pluginConf, web) {
  var slug = require('slug');
  var Blog = web.cms.getCmsModel('Blog');
  var dmsUtils = web.cms.utils;
  var async = require('async');
  var utils = require('../../utils.js');
	return {
		get: function(req, res) {
      var blog = new Object();
      blog._id = req.query.blogId;
			res.render(pluginConf.pluginPath + '/views/blog/edit.html', {blog: blog});
		},

    post: function(req, res) {
      
      //console.log('!!!' + JSON.stringify(req.body));
      async.waterfall([
        function(done) {
           var blogId = req.body['_id'];
           if (blogId) {

              //update mode
              Blog.findOne({_id:blogId}, function(err, blog) {
                if (!blog) {
                  err = new Error('Blog not found.');
                }
                done(err, blog, false);
              })
            } else {
              //create mode
              var blogTitle = utils.trim(req.body.blogTitle);
              if (!blogTitle) {
                // console.log('!!!2')
                done(new Error('Blog title is required.'))
              } else {
                dmsUtils.createFileIfNotExist('/blogs/' + utils.getYear() + '/' + getBlogName(slug(blogTitle)), {docType: 'Blog'}, function(err, blog, exists) {
                  if (exists) {
                     //console.log('!!!3')
                    done(new Error('Blog of the similar title already exists'));
                  } else {
                     //console.log('!!!4')
                    done(err, blog, true)
                  }
                  
                });
                
              }
              
            }
        }], 
        function(err, blog, createMode) {
          if (err) {
             console.warn(err);
          }
          
          

          if (err) {
            var blog = new Object();
            blog.blogTitle = utils.trim(req.body.blogTitle);  
            if (req.body.content) {
              blog.content = new Buffer(req.body.content, 'utf-8');
            }
            req.flash('error', err.message);
            res.render(pluginConf.pluginPath + '/views/blog/edit.html', {blog: blog});
            return;
          }

          if (!blog) {
            blog = new Blog();
          }
          
          blog.blogTitle = utils.trim(req.body.blogTitle);  
          if (req.body.content) {
            blog.content = new Buffer(req.body.content, 'utf-8');
          }

          
          if (createMode) {
            //create mode
            blog.blogSlug = slug(blog.blogTitle);

            blog.name = getBlogName(blog.blogSlug);
            blog.blogYear = utils.getYear();
          }
          if (req.body.publish) {
            blog.blogStatus = 'A';
            if (!blog.blogPublishDate) {
              blog.blogPublishDate = new Date();
            }
          } else {
            blog.blogStatus = 'D';
          }
          

          blog.save(function(err) {
            if (err) throw err;

            res.redirect(web.cms.conf.context + '/blog/list');

          })
        }
        );
     
      
    }
	}
	
}

function getBlogName(blogSlug) {
  return blogSlug + '.md';
}

