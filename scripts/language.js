/*
  This script is to check the current language - stored in a cookie.
  Default to english if no cookie exists.
*/

const languages = ['en', 'ja'];

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
  return function(langCode) {
    var hideAll = document.querySelectorAll('[lang]');
    for (var i = 0; i < hideAll.length; i++) {
      hideAll[i].style.display = 'none';
    }

    var show = document.querySelectorAll('[lang=' + langCode + ']');
    for (var i = 0; i < show.length; i++) {
      show[i].style.display = 'inherit';
    }

    document.cookie = 'lang=' + langCode + ';max-age=' + 60 * 60 * 24 * 365;
  }
})();

onload = function () {
  setLanguage(getLanguage());
};
