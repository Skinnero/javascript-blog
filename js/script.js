const titleClickHandler = function (event) {
    const clickedElement = this;
    const targetPost = document.querySelector(clickedElement.getAttribute('href'))
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activePosts = document.querySelectorAll('.post')

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    for (let activePost of activePosts) {
        activePost.classList.remove('active')
    }

    targetPost.classList.add('active')
    clickedElement.classList.add('active')
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}