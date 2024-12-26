const url = new URL(window.location.href);
const filepath = url.pathname;
console.log('File Name:', filepath);

let monthsMap = new Map();
monthsMap.set("01", "January");
monthsMap.set("02", "February");
monthsMap.set("03", "March");
monthsMap.set("04", "April");
monthsMap.set("05", "May");
monthsMap.set("06", "June");
monthsMap.set("07", "July");
monthsMap.set("08", "August");
monthsMap.set("09", "September");
monthsMap.set("10", "October");
monthsMap.set("11", "November");
monthsMap.set("12", "December");

function formatDate(dateStr) {
    const month = dateStr.slice(0,2);
    const day = dateStr.slice(3,5);
    const year = dateStr.slice(6,10);

    if (day[0] === "0") {
        day = day.slice(1,2);
    }

    return monthsMap.get(month) + " " + day + ", " + year;
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/articles.json')
    .then(response => response.json())
    .then(data => {
        const article = data.find(article => article.link === filepath);
        const articleHead = document.getElementsByClassName("article-head")[0]; // TODO: should be by ID?

        const pub = document.createElement('h3');
        pub.textContent = article.publication;
        pub.classList.add("publication-name");
        const hed = document.createElement('h1');
        hed.textContent = article.hed;
        const byline = document.createElement('h2');
        byline.textContent = article.byline;
        const date = document.createElement('h3');
        date.textContent = formatDate(article.date);

        articleHead.append(pub);
        articleHead.append(hed);
        articleHead.append(byline);
        articleHead.append(date);
    });
});