const textLength = 500;

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
        lede.textContent = article.lede.substring(0, textLength) + ' ...';

        articleDiv.append(headline)
        articleDiv.append(publication)
        articleDiv.append(lede)

        container.append(articleDiv);
    });
    }

function getIcon(article) {
    const tags = article.tags;
    const iconOrder = ["Science", "Environment", "Energy", "Space", "Ocean", "Health", "Fire"];
    let iconPath = "/media/None.png";

    iconOrder.forEach( icon => {
        if(tags.includes(icon)) {iconPath = "/media/" + icon + ".png";}
    })
    return iconPath;
}

function displayArticlesWithIcon({ data, container, articleFilter = () => true, range = [0,-1]}) {
    
    const filteredArticles = data.filter(articleFilter);
    const targetArticles = filteredArticles.slice(range.at(0), range.at(1));

    container.innerHTML = "";

    targetArticles.forEach(article => {
        // creating div for the article
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article-w-cols');

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('img-column');

        const icon = document.createElement('img');
        icon.classList.add("article-icon");
        icon.src = getIcon(article);

        const textDiv = document.createElement('div');
        textDiv.classList.add('text-column');
        textDiv.classList.add('article');

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
        lede.textContent = article.lede.substring(0, textLength) + ' ...';

        iconDiv.append(icon);

        textDiv.append(headline);
        textDiv.append(publication);
        textDiv.append(lede);

        articleDiv.append(iconDiv);
        articleDiv.append(textDiv);

        container.append(articleDiv);
    });
    }