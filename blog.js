

module.exports = function WaterooBlog(pluginConf, web, next) {
  
  web.cms.adminMenu.push({
  	headerText:'Blog',
  	items:[
  	  { text: 'Write a New Blog', link:'/admin/blog/new'},
  	  { text: 'All Posts', link:'/admin/blog/list'} 
  	]
  })

  web.cms.registerCmsModel('Blog', (pluginConf.pluginPath + '/models/Blog.js'))

  var routes = require('./routes')(pluginConf, web);

  web.applyRoutes(routes);
  var dmsUtils = web.cms.utils;
  web.syspars.get('BLOG_RUN_ONCE', function(err, syspar) {
    if (!syspar) {
      dmsUtils.mkdirs('/blogs', function() {});
      web.syspars.set('BLOG_RUN_ONCE', 'Y');
    }
    next();
  });

  
}

