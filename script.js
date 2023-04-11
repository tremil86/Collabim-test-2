document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchQuery = document.getElementById('searchInput').value;
    var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);

    fetch(searchUrl)
    .then(response => response.text())
    .then(data => {
        var searchResults = parseSearchResults(data);
        displaySearchResults(searchResults);
    })
    .catch(error => console.error(error));
});

function parseSearchResults(html) {
    var results = [];
    var regex = /<div class="g">(.*?)<\/div>/g;
    var match;
    while ((match = regex.exec(html)) !== null) {
        var result = match[1];
        var title = /<h3 class="[^"]+">(.*?)<\/h3>/.exec(result)[1];
        var link = /<a href="(\/url\?q=[^"]+)"/.exec(result)[1];
        results.push({ title, link });
    }
    return results;
}

function displaySearchResults(results) {
    var resultsContainer = document.createElement('div');
    resultsContainer.id = 'searchResults';
    resultsContainer.innerHTML = '<h2>Výsledky vyhledávání:</h2>';
    for (var i = 0; i < results.length; i++) {
        var resultItem = document.createElement('div');
        var titleElement = document.createElement('h3');
        titleElement.textContent = results[i].title;
        resultItem.appendChild(titleElement);
        var linkElement = document.createElement('a');
        linkElement.href = results[i].link;
        linkElement.textContent = results[i].link;
        resultItem.appendChild(linkElement);
        resultsContainer.appendChild(resultItem);
    }
    document.body.appendChild(resultsContainer);
}
