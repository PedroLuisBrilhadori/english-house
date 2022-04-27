let place = {
    name: "bathroom",
    scene: "bathroom-complete",
    objecs: [

    ],
}
function setPlace(name){
    place.name = name;
}

function getPlace(){
    return place.name;
}

function setScene(scene){
    place.scene = scene;
}

function getScene(){
    return place.scene;
}

function setObjects(objects){
    place.objecs = objects;
}

function getObjects(){
    return place.objecs;
}

module.exports = {
    setPlace,
    getPlace,
    setScene,
    getScene,
    setObjects,
    getObjects,
}