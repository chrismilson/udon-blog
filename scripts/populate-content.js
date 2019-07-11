/*
  This script gets at least 5 posts from the folder of posts
  and renders them on the page.
*/

var populateContent = (function() {
  var posts = [];

  var renderPost = function(post, lang) {
    if (!lang) {
      return;
    }

    return `
      <div class="container post">
        <div class="title">
          <h2>${ post[lang.language].title }</h2>
        </div>
        <div class="content">
          ${
            post[lang.language].body.map((p) => {
              return '<p>\n' + p + '</p>'
            }).join('\n')
          }
        </div>
      </div>
    `;
  };

  if (window.XMLHttpRequest) var request = new XMLHttpRequest();
  else var request = new ActiveXObject('Microsoft.XMLHTTP');

  request.open('GET', 'posts/');
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      // request.responseText is a folder listing
      // we will find the lisings with regex and do a request for them.
      var regex = /href="(.*?)"/g;

      var postFiles = request.responseText.match(/href=".*?"/g).map(e => {
        return /"((.*?).json)"/.exec(e).slice(1); // cut off full matched string
      });

      postFiles.forEach(fileName => {
        if (window.XMLHttpRequest) var postRequest = new XMLHttpRequest();
        else var postRequest = new ActiveXObject('Microsoft.XMLHTTP');

        postRequest.open("GET", 'posts/' + fileName[0]);
        postRequest.send();

        postRequest.onreadystatechange = function() {
          if (postRequest.readyState === 4) {
            posts.push(JSON.parse(postRequest.responseText));
          }
        }
      });
    }
  }

  return function(lang) {
    document.getElementById("content-main").innerHTML = posts.map(p => {
      return renderPost(p, lang);
    }).join('');
  };
})();
