const get = require("./http");
const place = require("./place");
const forms = document.getElementById("forms");
const menu = document.getElementById("menu");
const grid = document.getElementById("cardGrid");
const main = document.getElementById("main");

const menuContext = {
    scenes: [],
    page: 1,
    pageSize: 8,
    menu: true,
};

document.getElementById("arrowNext").addEventListener("click", () => {
    menuContext.page = 2;
    document.getElementById("0").classList = "";
    document.getElementById("1").classList = "selected";

    removeImages();
    showPlaces();
});

document.getElementById("arrowBack").addEventListener("click", () => {
    menuContext.page = 1;
    document.getElementById("0").classList = "selected";
    document.getElementById("1").classList = "";

    removeImages();
    showPlaces();
});

document.getElementById("divMap").addEventListener("click", () => {
    showMenu();
});

function showMenu() {
    showPlaces();
    const i = main.childElementCount;

    if (menuContext.menu) {
        while (main.childElementCount === i) main.removeChild(menu);
    } else {
        main.appendChild(menu);
        showPlaces();
    }

    menuContext.menu = !menuContext.menu;
}

async function getObjects() {
    let current = {
        place: place.getPlace(),
        scene: place.getScene(),
    };

    if (current.place == "main") {
        return place.pushObject({
            name: "Door",
            cord: {
                x: "500",
                y: "300",
                h: "500",
                w: "500",
            },
            path: "",
            form: "square",
            text: "Menu",
            func: "menu",
        });
    }

    const texts = await get.texts(current.scene).then((texts) => {
        return texts[current.scene].objects;
    });

    place.setTexts(texts);

    return await get.objects(current.place, current.scene).then((objects) => {
        objects.forEach((object) => {
            place.pushObject({
                name: getObjectName(object),
                cord: getCordObject(object),
                path: getObjectPath(object),
                form: getTypeObject(object),
                text: getTextObject(object),
            });
        });
    });
}

function createForms() {
    getObjects().then((a) => {
        let current = {
            objects: place.getObjects(),
        };

        current.objects.forEach((object) => {
            let form = document.createElement("div");
            let circle = document.createElement("div");

            circle.className = "styleSelection";

            form.id = object.name;
            form.style.width = `${object.cord.w}px`;
            form.style.height = `${object.cord.h}px`;
            form.style.left = `${object.cord.x}px`;
            form.style.top = `${object.cord.y}px`;

            form.style.position = "absolute";

            form.style.display = "grid";
            form.style.placeItems = "center";

            form.addEventListener("click", () => {
                object.func ? showMenu() : showPopup(object);
            });

            forms.appendChild(form);
            form.appendChild(circle);
        });
    });
}

function showPopup(object) {
    const menu = document.getElementById("popupObjects");

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

    menu.style.display = "grid";

    document
        .getElementById("popUpReturnButton")
        .addEventListener("click", () => {
            menu.style.display = "none";
        });
}

function getBackgroundImage() {
    let current = {
        place: place.getPlace(),
        scene: place.getScene(),
    };
    const sceneUrl =
        current.scene === ""
            ? `${current.place}.jpg`
            : `${current.place}$${current.scene}.jpg`;

    get.search(sceneUrl).then((data) => {
        main.style.backgroundImage = `url(${get.url}${data})`;
    });

    createForms();
}

async function getScenes() {
    return await get.scenes().then((data) => {
        removeImages();
        menuContext.scenes = [];
        menuContext.scenes2 = [];
        return data;
    });
}

async function constructPlace() {
    return await getScenes().then((data) => {
        data.forEach((scene) => {
            const current = {
                name: getSceneName(scene),
                path: scene,
                place: getPlaceName(scene),
            };

            menuContext.scenes.push(current);
        });
    });
}

function showPlaces() {
    if (menuContext.menu)
        constructPlace().then((a) => {
            const trimStart = (menuContext.page - 1) * 8;
            const trimEnd = trimStart + 8;
            const items = menuContext.scenes.splice(trimStart, trimEnd);

            items.forEach((item) => {
                grid.appendChild(createScene(item));
            });
        });
}

function createScene(s) {
    let scene = document.createElement("div");

    let name = document.createElement("p");
    name.innerText = `${s.name}`;

    scene.appendChild(name);

    scene.id = `$${s.name}`;
    scene.classList = "cardPlace";
    scene.style.backgroundImage = `url(${get.url}/${s.path})`;
    scene.style.backgroundSize = "cover";

    scene.addEventListener("click", () => {
        place.clearObjects();
        place.setPlace(s.place);
        place.setScene(s.name);
        getBackgroundImage();
        showPlaces();
        showMenu();
    });

    return scene;
}
module.exports = {
    getObjects,
    createForms,
    getBackgroundImage,
    showMenu,
};

function getObjectName(obj) {
    let object = String(obj);

    if (!object.includes(".png")) {
        return obj;
    }

    let name = "";

    for (let i = object.indexOf(".png") - 1; object[i] !== "."; i--) {
        name += object[i];
    }

    return name.split("").reverse().join("");
}

function getCordObject(obj) {
    let object = String(obj);
    let coordinates = {};

    if (getTypeObject(obj) === "circle") {
        object = object.replace("-c-.", "");
    }

    let cords = object.includes(".r") ? "xywhr" : "xywh";
    object = "." + object;

    cords.split("").forEach((cord) => {
        let value = "";

        for (let i = object.indexOf(`.${cord}`) + 2; object[i] !== "."; i++) {
            value += object[i];
        }

        coordinates[cord] = value;
    });

    return coordinates;
}

function getObjectPath(obj) {
    let object = String(obj);
    let current = {
        place: place.getPlace(),
        scene: place.getScene(),
    };

    path = `/assets/objects/${current.place}`;

    path += current.scene === "" ? `/${object}` : `/${current.scene}/${object}`;

    return path;
}

function getTypeObject(obj) {
    let object = String(obj);

    if (object.includes("-c-")) {
        return "circle";
    }

    return "square";
}

function getTextObject(obj) {
    let name = getObjectName(obj);

    const texts = place.getTexts();

    return texts.filter((text) => {
        return text.name === name;
    })[0].text;
}

function removeImages() {
    grid.textContent = "";
}

function getSceneName(obj) {
    let object = String(obj);

    if (!object.includes(".jpg")) {
        return obj;
    }

    let name = "";

    for (let i = object.indexOf(".jpg") - 1; object[i] !== "/"; i--) {
        name += object[i];
    }

    return name.split("").reverse().join("");
}

function getPlaceName(obj) {
    let object = String(obj);
    object = object.replace("assets/places/", "");

    let name = "";

    for (let i = 0; object[i] !== "/"; i++) {
        name += object[i];
    }

    return name;
}
