import "./main.css";
const map = require('./functions/menu');
const back = require('./functions/background');
const obj = require('./functions/objects');

back.getBackgroundImage();
obj.createForms();

map.showPlaces();