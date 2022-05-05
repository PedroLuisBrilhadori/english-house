import "./main.css";
const obj = require("./functions/objects");

obj.showMenu();
obj.getBackgroundImage();

document.getElementById("home").addEventListener("click", () => {
    document.location.reload();
});
