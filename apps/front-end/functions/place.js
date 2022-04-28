let place = {
    name: "bathroom",
    scene: "bathroom-complete",
    objects: [

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
    place.objects = objects;
}

function pushObject(object){
    place.objects.push(object);
}

function clearObjects(){
    place.objects = [];
}

function getObjects(){
    return place.objects;
}

module.exports = {
    setPlace,
    getPlace,
    setScene,
    getScene,
    setObjects,
    getObjects,
    pushObject,
    clearObjects,
}