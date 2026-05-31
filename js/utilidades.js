function createElement(type) {
    let nodo = document.createElement(type);
    return nodo;
}  
 
function createText(type, text) {
    let nodo = document.createElement(type);
    let textEnd = document.createTextNode(text);

    nodo.appendChild(textEnd);

    return nodo;
}

function createContainer(element, container) {
    container.appendChild(element);
}

function addElement(nodo) {
    document.body.appendChild(nodo);
}

function createImg(src, alt) {
    let nodo = document.createElement("img");

    nodo.src = src;
    nodo.alt = alt;

    return nodo;
}

function createLink(href, text) {

    let link = document.createElement("a");

    link.href = href;
    link.textContent = text;

    return link;
}

function createButton(text, url) {
    let button = document.createElement('button')
    button.textContent = text;
    button.onclick = function () {
        window.location.href = url;
    };
    return button
}

function redirect(element, route) {

    element.style.cursor = "pointer";

    element.addEventListener("click", function () {
        window.location.href = route;
    });
}
