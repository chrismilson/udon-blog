/*
  This script is to check the current language - stored in a cookie.
  Default to english if no cookie exists.
*/


var getLanguage = function() {
  var clang = document.cookie.split(';').find(c => {
    return c.indexOf('lang=') == 0;
  });
  if (clang === undefined) {
    return 'en';
  }
  return clang.substring(clang.indexOf('=') + 1);
};

/*
This script is to control the language of the page.
First loads all the language files on hand and then stores them in memory.

It also controls the language-menu elements on the page.
*/

var setLanguage = (function () {
  var availableLanguages = new Map();

  // Render the language menu
  var resetLangMenu = function() {
    var renderMenu = function(lang) {
      return `
      <li onclick="setLanguage('${ lang.language }')">
        ${ lang.serviceName }
      </li>
      `;
    };
    var list = "";
    availableLanguages.forEach(lang => {
      list += renderMenu(lang);
    });
    var menu = document.getElementsByClassName('language-menu');
    for (var i = 0; i < menu.length; i++) {
      menu[i].innerHTML = '<ul>' + list + '</ul>';
      menu[i].style = "display: initial"
    }
  };

  if (window.XMLHttpRequest) var request = new XMLHttpRequest();
  else var request = new ActiveXObject('Microsoft.XMLHTTP');

  request.open('GET', 'languages/');
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      // request.responseText is a folder listing
      // we will find the lisings with regex and do a request for them.
      var regex = /href="(.*?)"/g;

      var langFiles = request.responseText.match(/href=".*?"/g).map(e => {
        // Cut off full matched string.
        // Looks like ['en.json', 'en']
        return /"((.*?).json)"/.exec(e).slice(1);
      });

      langFiles.forEach(fileName => {
        if (window.XMLHttpRequest) var langRequest = new XMLHttpRequest();
        else var langRequest = new ActiveXObject('Microsoft.XMLHTTP');

        langRequest.open('GET', 'languages/' + fileName[0]);
        langRequest.send();

        langRequest.onreadystatechange = function() {
          if (langRequest.readyState === 4) {
            var langData = JSON.parse(langRequest.responseText);
            availableLanguages.set(langData.language, langData);
            resetLangMenu();
          }
        };
      });
    }
  };

  return function(langCode = 'en') {
    document.cookie = 'lang=' + langCode + ';max-age=' + 60 * 60 * 24 * 365;

    populateContent(availableLanguages.get(langCode));
    renderNav(availableLanguages.get(langCode));
    renderHeader(availableLanguages.get(langCode));
  }
})();

onload = function () {
  setLanguage(getLanguage());
};
