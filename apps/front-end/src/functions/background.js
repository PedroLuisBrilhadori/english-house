const place = require('./place');
const get = require('./http');
const main = document.getElementById('main');

const obj = require('./objects');

function getBackgroundImage(){    
    let current = {
        place: place.getPlace(),
        scene: place.getScene()
    } 
    const sceneUrl = current.scene === '' ? `${current.place}.jpg` : `${current.place}$${current.scene}.jpg`
    
    get.search(sceneUrl).then(data => {
        main.style.backgroundImage = `url(${get.url}${data})`;
    });

    obj.createForms();
}

module.exports = {
    getBackgroundImage,
}