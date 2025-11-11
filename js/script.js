const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optTitleListSelectorA = '.titles a',
    optTitleListSelectorAActiveClass = '.titles a.active';

const titleClickHandler = function (event) {
    const clickedElement = this;
    const targetPost = document.querySelector(clickedElement.getAttribute('href'))
    const activeLinks = document.querySelectorAll(optTitleListSelectorAActiveClass);
    const activePosts = document.querySelectorAll(optArticleSelector)

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    for (let activePost of activePosts) {
        activePost.classList.remove('active')
    }

    targetPost.classList.add('active')
    clickedElement.classList.add('active')
}

function generateTitleLinks() {

    const titleList = document.querySelector(optTitleListSelector)
    const articles = document.querySelectorAll(optArticleSelector)

    let html = ''

    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id')

        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        /* insert link into titleList */
        html += linkHTML

    }

    titleList.innerHTML = html

    const links = document.querySelectorAll(optTitleListSelectorA);

    links[0].classList.add('active')

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();
