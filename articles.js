fetch('articles.json')
    .then(response => response.json()) // Parse JSON
    .then(data => {
        const articleContainer = document.getElementById('featured-work-container')

        data.forEach(article => {
            if (article.featured) {
                // creating div for the article
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');

                // creating headline
                const headline = document.createElement('h2');
                const link = document.createElement('a');
                link.href = article.link;
                link.target = "_blank";
                link.textContent = article.hed;
                headline.appendChild(link);

                // creating other info
                const publication = document.createElement('h3');
                publication.textContent = article.publication;

                // creating lede
                const lede = document.createElement('p');
                lede.textContent = article.lede.substring(0, 150) + ' ...';

                articleDiv.append(headline)
                articleDiv.append(publication)
                articleDiv.append(lede)

                articleContainer.append(articleDiv);
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));