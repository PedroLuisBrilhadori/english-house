const place = require('./place');
const get = require('./http');
const main = document.getElementById('main');

// main.style.background = url(getBackgroundImage());

function getBackgroundImage(){

    let current = {
        place: place.getPlace(),
        scene: place.getScene()
    } 

    get.search(`${current.place}$${current.scene}.jpg`).then(data => {
        main.style.backgroundImage = `url(${get.url}${data})`;
    })

}


module.exports = {
    getBackgroundImage,
}