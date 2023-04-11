const cheerio = require('cheerio');

function parseSearchResults(html) {
  // Načtení HTML pomocí Cheerio
  const $ = cheerio.load(html);

  // Extrakce výsledků z Google vyhledávání
  const results = [];
  $('div.g').each((index, element) => {
    const titleElement = $(element).find('h3');
    const title = titleElement.text().trim();
    const linkElement = titleElement.find('a');
    const link = linkElement.attr('href');
    results.push({ title, link });
  });

  // Vrácení datové struktury s výsledky
  return results;
}