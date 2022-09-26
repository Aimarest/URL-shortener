'use strict';


//This is for CSS animation at the input text

const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {

    label.innerHTML = label.innerText
        .split("")
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join("");

})

//Comunication with the backend

const form = document.querySelector('.form-control');
const button = document.querySelector('.btn');
const input = document.querySelector('.input');
const textError = document.querySelector('.error');
const newUrlText = document.querySelector('.newUrlText');
const copyButton = document.querySelector('.copyBtn');
const protocol = 'http:';
const host = 'localhost';
const port = '3000';
const urlBase = protocol + '//' + host + ':' + port;

const copyTextToClipboard = (text) => {
    
   
    navigator.clipboard.writeText(text)
  .then(() => {   document.querySelector('.messageCopy').classList.add('showMessage')})
  .catch((error) => { alert(`Copy failed! ${error}`) })
  
  setTimeout(()=>{
    document.querySelector('.messageCopy').classList.remove('showMessage');
  }, 1500)
}

button.addEventListener('click', () =>{
    if(!input.value) return textError.innerHTML = 'You have to enter a valid url'
    textError.innerHTML = '' ;
} )

form.addEventListener('submit', async (ev)=> { 
    ev.preventDefault();
  
        const rawResponse = await fetch(urlBase + '/short', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url: input.value })
        });
        const content = await rawResponse.json();
        newUrlText.innerHTML = `This is the shorter url: ${content.url}`;
        copyButton.classList.remove('hidden');
        copyButton.addEventListener('click', (ev) =>{
            ev.preventDefault();
            console.log('hello Im a button to copy')
            copyTextToClipboard(content.url)
        })
});




