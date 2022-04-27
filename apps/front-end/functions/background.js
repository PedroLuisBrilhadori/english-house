const place = require('./place');
const get = require('./http');

const main = document.getElementById('main');

// main.style.background = url(getBackgroundImage());

function getBackgroundImage(){
    console.log(place.getPlace());
    console.log(place.getScene());
    
    get.search(`${place.getScene}.jpg`).then(data => {
        console.log(data);
    })
}


module.exports = {
    getBackgroundImage,
}