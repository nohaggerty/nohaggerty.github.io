async function fetchArticles() {
    const response = await fetch('/articles.json');
    return response.json();
}

const articlesPerPage = 5;
let currentPage = 1;
const container = document.getElementById('article-container');

const displayOptions = document.querySelectorAll('.article-selector-container .option');
const realSelect = document.getElementById('article-selector-real');
realSelect.value = "None";
const titleText = document.getElementById('articles-page-title');

function selectorFilter(article, selector) {
    if (!(article.show)) {return false;}
    else if (selector === "None") {return true;}
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
            updateDisplayedArticles(articles, currentPage, realSelect.value);
            updatePagination(articles, currentPage, realSelect.value);
        }
    });

    document.getElementById('nxt-btn').addEventListener('click', () => {
        const filteredArticles = articles.filter(article => selectorFilter(article, realSelect.value))
        const totalArticles = filteredArticles.length; //TODO: not the cleanest way to handle this ...
        const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplayedArticles(articles, currentPage, realSelect.value);
            updatePagination(articles, currentPage, realSelect.value);
        }
    });

    displayOptions.forEach(option => {
        option.addEventListener('click', () => {
            displayOptions.forEach(opt => opt.classList.remove('selected'));

            option.classList.add('selected');

            realSelect.value = option.getAttribute('value');

            updateDisplayedArticles(articles, currentPage, realSelect.value);
            updatePagination(articles, currentPage, realSelect.value);
            
            if (realSelect.value === "None") {
                titleText.textContent = "Articles";
            }
            else {
                titleText.textContent = realSelect.value + " Articles";
            }
        })
    })
}

(async function init() {
    const articles = await fetchArticles();
    updateDisplayedArticles(articles, currentPage, realSelect.value);
    updatePagination(articles, currentPage, realSelect.value);
    addPaginationListeners(articles);
})();
