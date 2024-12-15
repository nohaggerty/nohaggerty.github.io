function displayArticles({ data, container, articleFilter = () => true, range = [0,-1]}) {
    
    const filteredArticles = data.filter(articleFilter);
    const targetArticles = filteredArticles.slice(range.at(0), range.at(1));

    container.innerHTML = "";

    targetArticles.forEach(article => {
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

        container.append(articleDiv);
    });
    }

