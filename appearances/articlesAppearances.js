async function fetchArticles() {
    const response = await fetch('/articles.json');
    return response.json();
}

const articlesPerPage = 10;
let currentPage = 1;
const container = document.getElementById('article-container');

function selectorFilter(article) {
    if (!(article.show)) {return false;}
    else {return article.type.includes("appearance");}
}

function updateDisplayedArticles(articles, page) {
    const startIndex = (page-1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;

    displayArticles({
        data: articles,
        container: container,
        articleFilter: article => selectorFilter(article),
        range: [startIndex, endIndex]
    })
}

function updatePagination(articles, currentPage) {
    const filteredArticles = articles.filter(article => selectorFilter(article))
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
            updateDisplayedArticles(articles, currentPage);
            updatePagination(articles, currentPage);
        }
    });

    document.getElementById('nxt-btn').addEventListener('click', () => {
        const filteredArticles = articles.filter(article => selectorFilter(article, "None"))
        const totalArticles = filteredArticles.length; //TODO: not the cleanest way to handle this ...
        const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplayedArticles(articles, currentPage);
            updatePagination(articles, currentPage);
        }
    });
}

(async function init() {
    const articles = await fetchArticles();
    updateDisplayedArticles(articles, currentPage);
    updatePagination(articles, currentPage);
    addPaginationListeners(articles);
})();
