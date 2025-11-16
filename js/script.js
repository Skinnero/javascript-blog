const
  optArticleSelector = '.post',

  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTitleListSelectorA = '.titles a',
  optTitleListSelectorAActiveClass = '.titles a.active',

  optArticleTagsSelector = '.post-tags .list',
  optArticleTagsSelectorActive = '.post-tags .list a.active',
  optArticleTagsSelectorA = '.post-tags .list a',

  optTagsListSelector = '.tags.list',
  optTagsListSelectorA = '.tags.list a',

  optAuthorListSelector = '.list.authors',
  optAuthorListSelectorA = '.list.authors a',

  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',

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

function calculateTagsParams(allTags) {

  let smallestOccurrence = Infinity;
  let largestOccurrence = -Infinity;

  for (const tag in allTags) {
    const value = allTags[tag];

    if (typeof value === 'number') {
      if (value < smallestOccurrence) smallestOccurrence = value;
      if (value > largestOccurrence) largestOccurrence = value;
    }
  }

  return {
    min: smallestOccurrence,
    max: largestOccurrence
  };
}

function calculateTagClass(count, params) {
  if (count === params['min']) {
    return 1;
  }
  if (count === params['max']) {
    return 5;
  }

  return Math.floor(((count - params['min']) / (params['max'] - params['min']) * optCloudClassCount + 1));
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const tags = article.getAttribute('data-tags').split(' ');

    for (let tag of tags) {
      html += '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;

  }
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHtml = '';
  for (let tag in allTags) {
    allTagsHtml += '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
  }
  tagList.innerHTML = allTagsHtml;
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
  const cloudTags = document.querySelectorAll(optTagsListSelectorA);

  for (let tag of cloudTags) {
    tag.addEventListener('click', tagClickHandler);
  }

  for (let tag of tags) {
    tag.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  let allAuthors = {};

  for (let article of articles) {
    const authorWrapper = article.querySelector(optAuthorSelector);
    const author = article.getAttribute('data-author');

    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    authorWrapper.innerHTML = 'by ' + '<a href="#' + author + '">' + author + '</a>';
  }

  const authorList = document.querySelector(optAuthorListSelector);
  let allAuthorsHTML = '';
  const authorParams = calculateTagsParams(allAuthors);
  for (let author in allAuthors) {
    allAuthorsHTML += '<li><a class="' + optCloudClassPrefix + calculateTagClass(allAuthors[author], authorParams) + '" href="#' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
  }
  authorList.innerHTML = allAuthorsHTML;
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
  const couldAuthors = document.querySelectorAll(optAuthorListSelectorA);

  for (let author of couldAuthors) {
    author.addEventListener('click', authorClickHandler);
  }

  for (let author of authors) {
    author.addEventListener('click', authorClickHandler);
  }
}

generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags();
addClickListenersToAuthors();