module.exports = {
  name: 'Blog',
  label: 'Blog',
  schema: {
    docType: {type: String, required:true, default: 'Blog'},
    blogTitle: {type: String},
    blogSlug: {type: String},
    blogStatus: {type: String},
    blogYear: {type: Number},
    blogPublishDate: {type: Date}
  },

  initSchema: function(schema){
    //schema.index({blogYear: -1, blogSlug: 1}, {unique: true});
  },

  parentModel: web.cms.conf.models.Document,

  editables: [{"name": "name", "type": "text", "label": "Name", "required": true},
  {"name": "blogTitle", "type": "text", "label": "Title"},
  {"name": "blogSlug", "type": "text", "label": "Slug"},
  {"name": "blogStatus", "type": "text", "label": "Status"},
  {"name": "blogYear", "type": "text", "label": "Year"},
  {"name": "blogPublishDate", "type": "text", "label": "Publish Date"},
  {"name": "content", "type": "file", "label": "Content"}  
    ]

}