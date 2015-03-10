var slug = require('slug');

exports.isEmpty = function(str) {
  return str == null || str.length == 0;
}


exports.getYear = function() {
  return new Date().getFullYear();
}

exports.slugify = function(str) {
	return slug(str).toLowerCase();
}

exports.trim = function(str) {
  if (str) {
    return str.replace(/^\s+|\s+$/, '');
  }

  return null;
}

exports.specialTruncate = function(str, limit, truncateSuffix) {
  var bits, lengthCount = 0;
  str = str.replace(new RegExp('<p>','g'),'');
  bits = str.split('</p>');
  var s = [];
  
  


  for (var i in bits) {
    var str = exports.trim(bits[i]);
    if (!exports.isEmpty(str)) {
      lengthCount += str.length;
      if (lengthCount > limit) {
        var excess = lengthCount - limit;
        if (str.length > excess) {
          s.push(wrapSpecial(str.substr(0, (str.length-1) - excess) + truncateSuffix));      
        }
        break;
      }
      
        s.push(wrapSpecial(str));
    
    }
  }

  return s.join('')

};

function wrapSpecial(str) {
  return '<p>' + str + '</p>';
}
