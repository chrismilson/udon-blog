/*
  This script gets at least 5 posts from the folder of posts
  and renders them on the page.
*/

var populateContent = (function() {
  var postNames = [
    '2019-7-15',
    '2019-7-7'
  ];
  var posts = [];

  var renderPost = function(post) {
    return `
      <div class="container post">
        <div class="title">
          <h2>
            ${
              languages.map(lang => {
                return '<span lang="'+lang+'">'+post[lang].title+'</span>';
              }).join('\n')
            }
          </h2>
        </div>
        <div class="content">
          ${
            languages.map(lang => {
              return post[lang].body.map(p => {
                return '<p lang="' + lang + '">' + p + '</p>';
              }).join('\n');
            }).join('\n')
          }
        </div>
      </div>
    `;
  };

  postNames.forEach(post => {
    if (window.XMLHttpRequest) var request = new XMLHttpRequest();
    else var request = new ActiveXObject('Microsoft.XMLHTTP');

    request.open('GET', 'posts/' + post + '.json');
    request.send();

    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        var post = JSON.parse(request.responseText);
        posts.push(renderPost(post))
        populateContent();
      }
    };
  });

  return function() {
    document.getElementById("content-main").innerHTML = posts.join('');
  };
})();
