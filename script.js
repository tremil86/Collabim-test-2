document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchQuery = document.getElementById('searchInput').value;
    var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);

    fetch(searchUrl)
    .then(response => response.text())
    .then(data => {
        var searchResults = parseSearchResults(data);
        downloadSearchResults(searchResults);
    })
    .catch(error => console.error(error));
});

function parseSearchResults(html) {
    // Zde implementujte kód pro extrakci výsledků z Google vyhledávání
    // Např. můžete použít knihovnu Cheerio nebo provést parsování pomocí regulárních výrazů
    // Výsledky uložte do vhodné datové struktury (např. pole nebo objektu)
    // a vraťte tuto datovou strukturu
}

function downloadSearchResults(results) {
    var json = JSON.stringify(results);
    var blob = new Blob([json], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'search_results.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
