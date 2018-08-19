const createProjectTitle = title => (
  $('<h3 />').text(title)
);

const createProjectLinks = arr => {
  const list = $('<ul class="project-links" />');
  arr.map(link => {
    const linkItem = $('<li />');
    const anchor = $('<a />');
    anchor.attr('href', link.link);
    anchor.attr('rel', 'noopener');
    anchor.attr('target', '_blank');
    anchor.html(`<i class="${link.icon}"></i>`);
    linkItem.append(anchor);
    list.append(linkItem);
  });
  return list;
};

const createProjectLanguage = lang => {
  const languageIcon = {
    HTML: 'fab fa-html5',
    CSS: 'fab fa-css3-alt',
    JavaScript: 'fab fa-js'
  };

  const colors = {
    HTML: '#f16529',
    CSS: '#16a2da',
    JavaScript: '#f7e018'
  };

  const span = $('<span class="project-lang"/>');
  span.html(`<i class="${languageIcon[lang]}" style="color: ${colors[lang]}; font-size: 1.5rem"></i>`);

  return span;
};

$(document).ready(() => {
  fetch('https://api.github.com/users/estebanborai/repos')
  .then(res => res.json())
  .then(json => json.filter(repo => {
    if (repo.name.indexOf('fcc') !== -1) {
      const projectTile = $('<li />');
      projectTile.addClass('project-tile');
      // Create project title
      const title = createProjectTitle(repo.name);
      projectTile.append(title);
      // Create project description
      const description = $('<span class="project-desc" />');
      description.text(repo.description);
      projectTile.append(description);
      const dataContainer = $('<div class="project-data"/>');
      // Create project links list
      const links = createProjectLinks([
        { link: repo.homepage, icon: 'fa fa-link' },
        { link: repo.html_url, icon: 'fab fa-github-alt' }
      ]);
      dataContainer.append(links);
      // Create project predominant language logo
      const logo = createProjectLanguage(repo.language);
      dataContainer.append(logo);
      projectTile.append(dataContainer);
      // Append block to list
      $('#projects-list').append(projectTile);
    }
  }))
  .catch(error => {
    $('#portfolio-error').text(error)
  });
});
