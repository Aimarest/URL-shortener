const fs = require('fs');

const getUrlsFromDatabase = () => {
    return JSON.parse(fs.readFileSync('./source/urls.json', 'utf8'));
}

function shortUrl(url) {
    const urls = getUrlsFromDatabase();
    if (urls[url]) throw new Error("URL_ALREADY_SHORTED");
    const id = Object.keys(urls).length + 1;
    urls[url] = { url: 'http://localhost:3000/s/' + id, counter: 0 };
    fs.writeFileSync('./source/urls.json', JSON.stringify(urls), 'utf8');
    return urls[url];
}
module.exports = shortUrl;
