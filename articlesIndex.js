fetch('/articles.json')
    .then(response => response.json())
    .then(data => {
        const articleContainer = document.getElementById('featured-work-container');

        displayArticles({
            data: data, 
            container: articleContainer, 
            articleFilter: article => article.featured
        });
    });