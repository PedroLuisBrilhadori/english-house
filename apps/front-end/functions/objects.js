const get = require('./http');
const place = require('./place');
const forms = document.getElementById('forms');

async function getObjects() {
    let current = {
        place : place.getPlace(),
        scene: place.getScene(),
    };

    if(current.place == 'main')
        return;

    return await get.objects(current.place, current.scene).then(objects => {
        objects.forEach(object => {
            place.pushObject({
                name: getObjectName(object),
                cord: getCordObject(object),
                path: getObjectPath(object),
                form: getTypeObject(object),
            });
        })
    })
}

function createForms() {
    getObjects().then(a => {
        let current = {
            objects: place.getObjects()
        };

        current.objects.forEach(object => {    
            let form = document.createElement('div');
    
            form.id = object.name;
            form.style.width = `${object.cord.w}px`;
            form.style.height = `${object.cord.h}px`;
            form.style.left = `${object.cord.x}px`;
            form.style.top = `${object.cord.y}px`;
            
            form.style.position = 'absolute';
            form.style.border = 'solid black 4px';

            form.addEventListener('click', showPopup)

            let testebotao = document.querySelector(".returnButton");

            let popupObjects = document.querySelector(".popupObjects");
            testebotao.addEventListener('click', hidePopup)

            function hidePopup() {
                popupObjects.style.display = "none";
            }

            function showPopup() {
                let textObject = document.querySelector(".textObject");
                let nameObject = document.querySelector(".nameObject");
                let root = "https://my-dream-house-fatec.herokuapp.com" + object.path;
                let objectImage = document.querySelector(".popupImage");
                let finalText = "";

                textObject.innerHTML = "teste";
                if(object.name.slice(-1) == 's') {
                    finalText += "There are ";
                } else {
                    finalText += "There is a ";
                }

                objectImage.setAttribute("src", root);
                
                textObject.innerHTML = finalText + object.name;

                popupObjects.style.display = "grid";

            }
    
            forms.appendChild(form);
        });
    });
}

module.exports = {
    getObjects,
    createForms
}

function getObjectName(obj){    
    let object = String(obj);

    if(!object.includes('.png')){
        return obj;
    }

    let name = '';
    
    for(let i = object.indexOf('.png') -1; object[i] !== '.'; i--) {
        name += object[i];   
    }

    return name.split('').reverse().join('');
}

function getCordObject(obj) {
    let object = String(obj);
    let coordinates = {};

    if(getTypeObject(obj) === 'circle'){
        object = object.replace('-c-.', '');
    }

    let cords = object.includes('.r') ? 'xywhr' : 'xywh';
    object = '.' + object;

    cords.split('').forEach(cord => {
        let value = '';

        for(let i = (object.indexOf(`.${cord}`) + 2); object[i] !== '.'; i++) {
            value += object[i];
        }

        coordinates[cord] = value;
    });

    return coordinates;
}

function getObjectPath(obj) {
    let object = String(obj);
    let current = {
        place : place.getPlace(),
        scene: place.getScene(),
    };

    path = `/assets/objects/${current.place}`;

    path += (current.scene === '') ? `/${object}` : `/${current.scene}/${object}`;

    return path;
}

function getTypeObject(obj){
    let object = String(obj);
    
    if(object.includes('-c-')){
        return 'circle';
    }

    return 'square';
}