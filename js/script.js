const
  optArticleSelector = '.post',

  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTitleListSelectorA = '.titles a',
  optTitleListSelectorAActiveClass = '.titles a.active',

  optArticleTagsSelector = '.post-tags .list',
  optArticleTagsSelectorActive = '.post-tags .list a.active',
  optArticleTagsSelectorA = '.post-tags .list a',

  optAuthorSelector = '.post-author',
  optAuthorSelectorA = '.post-author a'
;

const titleClickHandler = function () {
  const clickedElement = this;
  const targetPost = document.querySelector(clickedElement.getAttribute('href'));
  const activeLinks = document.querySelectorAll(optTitleListSelectorAActiveClass);
  const activePosts = document.querySelectorAll(optArticleSelector);

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  for (let activePost of activePosts) {
    activePost.classList.remove('active');
  }

  targetPost.classList.add('active');
  clickedElement.classList.add('active');
};

function generateTitleLinks(customSelector = '') {

  const titleList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(optTitleListSelectorA);

  links[0].classList.add('active');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const tags = article.getAttribute('data-tags').split(' ');

    for (let tag of tags) {
      html += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    }

    tagsWrapper.innerHTML = html;
  }
}

const tagClickHandler = function (event) {
  event.stopPropagation();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.split('-').at(-1);
  const activeTags = document.querySelectorAll(optArticleTagsSelectorActive);

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const sameTagLinks = document.querySelectorAll(optArticleTagsSelector + ' a[href="' + href + '"]');

  for (let sameTagLink of sameTagLinks) {
    sameTagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags() {
  const tags = document.querySelectorAll(optArticleTagsSelectorA);

  for (let tag of tags) {
    tag.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector(optAuthorSelector);
    const author = article.getAttribute('data-author');

    authorWrapper.innerHTML = 'by ' + '<a href="#' + author + '">' + author + '</a>';
  }
}

const authorClickHandler = function (event) {
  event.stopPropagation();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace(/^#/, '');
  generateTitleLinks('[data-author="' + author + '"]');
};

function addClickListenersToAuthors() {
  const authors = document.querySelectorAll(optAuthorSelectorA);
  for (let author of authors) {
    author.addEventListener('click', authorClickHandler);
  }
}

generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags();
addClickListenersToAuthors();