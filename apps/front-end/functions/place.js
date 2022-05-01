let place = {
    name: "bedroom",
    scene: "bedroom-bed",
    objects: [

    ],
    scenes: [],
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

async function clearObjects(){
    place.objects = [];
    const forms = document.getElementById('forms');
    forms.textContent = '';
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