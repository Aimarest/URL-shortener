const express = require('express');
const shorUrl = require('./shortUrl');
const navigateUrl = require('./navigateUrl');
const app = express();
const protocol = 'http:';
const host = 'localhost';
const port = 3000
const urlBase = protocol + '//' + host + ':' + port;

app.use(express.static('public'));
app.use(express.json());
app.post('/short', (req, res) => {
    
  const newUrl =  shorUrl(req.body.url)
  res.send(newUrl)
})

app.listen(port, () => {
  console.log(`Url shortener listening on port ${port}`)
})

app.get('/s/:id', (req, res)=>{
    
   const id = urlBase + req.originalUrl;
   const longUrl = navigateUrl(id);
   (longUrl) ?  res.redirect(longUrl) : res.redirect(urlBase)
  
})