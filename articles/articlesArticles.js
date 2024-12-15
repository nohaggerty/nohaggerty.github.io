async function fetchArticles() {
    const response = await fetch('/articles.json');
    return response.json();
}

const articlesPerPage = 5;
let currentPage = 1;
let selector = "none";
const container = document.getElementById('article-container');

function selectorFilter(article, selector) {
    if (!(article.show)) {return false;}
    else if (selector === "none") {return true;}
    else {return article.tags.includes(selector);}
}

function updateDisplayedArticles(articles, page, selector) {
    const startIndex = (page-1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;

    displayArticles({
        data: articles,
        container: container,
        articleFilter: article => selectorFilter(article, selector),
        range: [startIndex, endIndex]
    })
}

function updatePagination(articles, currentPage, selector) {
    const filteredArticles = articles.filter(article => selectorFilter(article, selector))
    const totalArticles = filteredArticles.length; //TODO: not the cleanest way to handle this ...
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    document.getElementById('prv-btn').disabled = currentPage === 1;
    document.getElementById('nxt-btn').disabled = currentPage === totalPages;
    document.getElementById('pg-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

function addPaginationListeners(articles){
    document.getElementById('prv-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateDisplayedArticles(articles, currentPage, selector);
            updatePagination(articles, currentPage, selector);
        }
    });

    document.getElementById('nxt-btn').addEventListener('click', () => {
        const filteredArticles = articles.filter(article => selectorFilter(article, selector))
        const totalArticles = filteredArticles.length; //TODO: not the cleanest way to handle this ...
        const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplayedArticles(articles, currentPage, selector);
            updatePagination(articles, currentPage, selector);
        }
    });
}

(async function init() {
    const articles = await fetchArticles();
    updateDisplayedArticles(articles, currentPage, selector);
    updatePagination(articles, currentPage, selector);
    addPaginationListeners(articles);
})();
