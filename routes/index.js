var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Udon Blog',
    nav: [
      {
        name: 'Home',
        href: '/'
      },
      {
        name: 'About',
        href: '/about'
      }
    ],
    langs: [
      {
        serviceName: 'English',
        abbr: 'en'
      },
      {
        serviceName: '日本語',
        abbr: 'ja'
      }
    ]
  });
});

module.exports = router;
