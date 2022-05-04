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

    const texts = await get.texts(current.scene).then(texts => {
        return texts[current.scene].objects
    });

    place.setTexts(texts);

    return await get.objects(current.place, current.scene).then(objects => {
        objects.forEach(object => {
            place.pushObject({
                name: getObjectName(object),
                cord: getCordObject(object),
                path: getObjectPath(object),
                form: getTypeObject(object),
                text: getTextObject(object),
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

            form.addEventListener('click', () => {
                showPopup(object);
            })

            forms.appendChild(form);
        });
    });
}

function showPopup(object) {
    const menu = document.getElementById('popupObjects');

    const title = `
        <h1 class="textObject"> 
            <span class="nameObject">${object.text}</span>
        </h1>
    `;

    const image = `
        <div class="objectImage">
            <img class="popupImage" src="${get.url}${object.path}" alt="">
        </div>
    `;

    const returnButton = `
        <div id="popUpReturnButton" class="returnButton">
            <img src="./assets/icons/return-icon-white.svg"> </img> 
        </div>
    `;

    menu.innerHTML = `${title} \n ${image} \n ${returnButton}`;

    menu.style.display = 'grid';

    document.getElementById('popUpReturnButton').addEventListener('click', () => {
        menu.style.display = 'none';
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

function getTextObject(obj) {
    let name = getObjectName(obj);

    const texts = place.getTexts();

    return texts.filter(text => { return text.name === name })[0].text
}