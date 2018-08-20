(function ($) {
  function typeString($target, str, cursor, delay, cb) {
    $target.html(function (_, html) {
      return html + str[cursor];
    });

    if (cursor < str.length - 1) {
      setTimeout(function () {
        typeString($target, str, cursor + 1, delay, cb);
      }, delay);
    }
    else {
      cb();
    }
  }

  function deleteString($target, delay, cb) {
    var length;

    $target.html(function (_, html) {
      length = html.length;
      return html.substr(0, length - 1);
    });

    if (length > 1) {
      setTimeout(function () {
        deleteString($target, delay, cb);
      }, delay);
    }
    else {
      cb();
    }
  }

  $.fn.extend({
    teletype: function (opts) {
      var settings = $.extend({}, $.teletype.defaults, opts);

      return $(this).each(function () {
        (function loop($tar, idx) {
          typeString($tar, settings.text[idx], 0, settings.delay, function () {
            setTimeout(function () {
              deleteString($tar, settings.delay, function () {
                loop($tar, (idx + 1) % settings.text.length);
              });
            }, settings.pause);
          });

        }($(this), 0));
      });
    }
  });

  $.extend({
    teletype: {
      defaults: {
        delay: 100,
        pause: 5000,
        text: []
      }
    }
  });
}(jQuery));

$('#welcome-message').teletype({
  text: [
    'Welcome to my freeCodeCamp porfolio website.',
    '私のfreeCodeCampポートフォリオのウェブサイトへようこそ.',
    "Willkommen auf meiner FreeCodeCamp-Portfolio-Website.",
    'Bienvenido a mi portafolio web de freeCodeCamp.',
    '欢迎来到我的freeCodeCamp投资组合网站.'
  ]
});

$('#cursor').teletype({
  text: ['_'],
  delay: 0,
  pause: 500
});
