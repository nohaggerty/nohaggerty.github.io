document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data; 
        })
        .then(__ => {if(document.getElementById("home-head")) { // not expecting prev "then" to return anything ... if homepage ...
            document.getElementById("header-title").textContent = "Home"; // ... change "Noah Haggerty" to "Home"
        }
    });
});