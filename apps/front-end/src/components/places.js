const { resolve } = require('path');

let PlacesConfig = {
    currentPlace: '',
    lastPlace: '',
    imagePlace: '',
    url: '',
    objects: [
    ],
}

function changePlace(place) {
    if(!verifyPlace(place.url))
        return false;

    PlacesConfig.lastPlace = PlacesConfig.currentPlace;
    PlacesConfig.currentPlace = place.name;
    PlacesConfig.imagePlace = place.image;
    PlacesConfig.url = `./assets/${place.name}/${place.image}.jpg`;
}

function verifyPlace(url) {
    return fetch(url).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
}