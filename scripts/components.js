/*
  This script fills in the content of the non-post parts of the website.
  It depends on the language.
*/

function renderNav(lang) {
  if (!lang || !lang.nav) return;

  var list = lang.nav.map(pip => {
    return `
    <li>
      <a href="${ pip.page }">${ pip.title }</a>
    </li>
    `;
  }).join('');
  var nav = document.getElementsByClassName("nav");
  for (var i = 0; i < nav.length; i++) {
    nav[i].innerHTML = '<ul>' + list + '</ul>'
  }
};

function renderHeader(lang) {
  if (!lang || !lang.content || !lang.content.title) return;

  var headerTxt = `<div class="logo">
    <object id="mascot" class="logo" data="images/icon/icon.svg" type="image/svg+xml">
      Chicken Mascot
      <!-- Fallback image in CSS -->
    </object>
  </div>` + `
  <div class="container">
    <h1 class="title">
      ${ lang.content.title }
    </h1>
    ${
      lang.content.subtitle ?
      '<h4 class="title">' + lang.content.subtitle + '</h4>' : ''
    }
  </div>
  `;

  var header = document.getElementsByClassName('header');

  for (var i = 0; i < header.length; i++) {
    header[i].innerHTML = headerTxt;
  }
};
