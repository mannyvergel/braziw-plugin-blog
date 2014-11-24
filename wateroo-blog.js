

module.exports = function WaterooBlog(pluginConf, web, next) {
  
  web.cms.adminMenu.push({
  	headerText:'Blog',
  	items:[
  	  { text: 'Write a New Blog', link:'/admin/blog/new'},
  	  { text: 'All Posts', link:'/admin/blog/list'} 
  	]
  })



  var routes = require('./routes')(pluginConf, web);

  web.applyRoutes(routes);

  next();
}

