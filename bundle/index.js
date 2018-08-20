'use strict';

var createProjectTitle = function createProjectTitle(title) {
  return $('<h3 />').text(title);
};

var createProjectLinks = function createProjectLinks(arr) {
  var list = $('<ul class="project-links" />');
  arr.map(function (link) {
    var linkItem = $('<li />');
    var anchor = $('<a />');
    anchor.attr('href', link.link);
    anchor.attr('rel', 'noopener');
    anchor.attr('target', '_blank');
    anchor.html('<i class="' + link.icon + '"></i>');
    linkItem.append(anchor);
    list.append(linkItem);
  });
  return list;
};

var createProjectLanguage = function createProjectLanguage(lang) {
  var languageIcon = {
    HTML: 'fab fa-html5',
    CSS: 'fab fa-css3-alt',
    JavaScript: 'fab fa-js'
  };

  var colors = {
    HTML: '#f16529',
    CSS: '#16a2da',
    JavaScript: '#f7e018'
  };

  var span = $('<span class="project-lang"/>');
  span.html('<i class="' + languageIcon[lang] + '" style="color: ' + colors[lang] + '; font-size: 1.5rem"></i>');

  return span;
};

$(document).ready(function () {
  fetch('https://api.github.com/users/estebanborai/repos').then(function (res) {
    return res.json();
  }).then(function (json) {
    return json.filter(function (repo) {
      if (repo.name.indexOf('fcc') !== -1 && repo.language) {
        var projectTile = $('<li />');
        projectTile.addClass('project-tile');
        // Create project title
        var title = createProjectTitle(repo.name);
        projectTile.append(title);
        // Create project description
        var description = $('<span class="project-desc" />');
        description.text(repo.description);
        projectTile.append(description);
        var dataContainer = $('<div class="project-data"/>');
        // Create project links list
        var links = createProjectLinks([{ link: repo.homepage, icon: 'fa fa-link' }, { link: repo.html_url, icon: 'fab fa-github-alt' }]);
        dataContainer.append(links);
        // Create project predominant language logo
        var logo = createProjectLanguage(repo.language);
        dataContainer.append(logo);
        projectTile.append(dataContainer);
        // Append block to list
        $('#projects-list').append(projectTile);
      }
    });
  }).catch(function (error) {
    $('#portfolio-error').text(error);
  });
});
'use strict';

if (document.documentElement.scrollIntoView) {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
} else {
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });
}
'use strict';

(function ($) {
  function typeString($target, str, cursor, delay, cb) {
    $target.html(function (_, html) {
      return html + str[cursor];
    });

    if (cursor < str.length - 1) {
      setTimeout(function () {
        typeString($target, str, cursor + 1, delay, cb);
      }, delay);
    } else {
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
    } else {
      cb();
    }
  }

  $.fn.extend({
    teletype: function teletype(opts) {
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
        })($(this), 0);
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
})(jQuery);

$('#welcome-message').teletype({
  text: ['Welcome to my freeCodeCamp porfolio website.', '私のfreeCodeCampポートフォリオのウェブサイトへようこそ.', "Willkommen auf meiner FreeCodeCamp-Portfolio-Website.", 'Bienvenido a mi portafolio web de freeCodeCamp.', '欢迎来到我的freeCodeCamp投资组合网站.']
});

$('#cursor').teletype({
  text: ['_'],
  delay: 0,
  pause: 500
});