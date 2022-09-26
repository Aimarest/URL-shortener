const fs = require('fs');

const getUrlsFromDatabase = () => {
    return JSON.parse(fs.readFileSync('./source/urls.json', 'utf8'));
}

function navigateUrl(url) {
    const urls = getUrlsFromDatabase();
    return Object.keys(urls).filter(longURl => urls[longURl].url === url)[0];
}

module.exports= navigateUrl;
