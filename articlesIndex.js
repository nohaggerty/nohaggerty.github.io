fetch('/articles.json')
    .then(response => response.json())
    .then(data => {
        const articleContainer = document.getElementById('featured-work-container');

        displayArticlesWithIcon({
            data: data, 
            container: articleContainer, 
            articleFilter: article => article.featured,
            range: [0, 10]
        });
    });