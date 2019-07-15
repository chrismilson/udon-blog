/*
  This script will show or hide the about me, contact and posts.
*/

var navigate = (function() {
  var pages = new Map([
    ['about', 'about-me'],
    ['contact', 'contact'],
    ['main', 'content-main']
  ]);

  return function(dest) {
    pages.forEach((id, name) => {
      if (dest == name) {
        document.getElementById(id).style.display = 'inherit';
      } else {
        document.getElementById(id).style.display = 'none';
      }
    });
  };
})();
