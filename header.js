document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data; 
        });
});