// const url = 'https://my-dream-house-fatec.herokuapp.com';
const url = 'http://localhost:3000';

const place = require('./place');

const headers = {
    'Content-Type': 'application/json',
}

async function places() {
    return await fetch(`${url}/places`, {
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        return data.places;
    })
    .catch(error => console.error(error));
}

async function search(param) {
    return await fetch(`${url}/${param}/path`, {
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        return data.files;
    })
    .catch(error => console.error(error));
}

async function objects(place, scene = ''){
    const objUrl = scene !== '' ? `${place}/${scene}/objects` : `${place}/objects`;
    return await fetch(`${url}/${objUrl}`, {
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        return data.objects;
    })
    .catch(error => console.error(error));
}

async function scenes() {
    const sceneUrl = `scenes`;

    return await fetch(`${url}/${sceneUrl}`, {
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        return data.scenes;
    })
    .catch(error => console.error(error));
}

async function texts(scene) {
    const sceneUrl = `./assets/jsons/${scene}.json`;

    return await fetch(`${sceneUrl}`)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => console.error(error));
}


module.exports = {
    url,
    places,
    search,
    objects,
    scenes,
    texts,
}