import "./main.css";
const map = require('./functions/menu');
const back = require('./functions/background');
const obj = require('./functions/objects');

back.getBackgroundImage();

map.showPlaces();
map.showMenu();

document.getElementById('divMap').addEventListener('click', () => {
    map.showMenu();
})
