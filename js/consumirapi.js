let todosLosPersonajes = [];

async function consumeApiDragonBall() {
    let url = 'https://dragonball-api.com/api/characters?limit=50&page=1';
    let todasLasPaginas = [];

    try {
        let primeraRespuesta = await fetch(url);
        let primerData = await primeraRespuesta.json();

        todasLasPaginas = todasLasPaginas.concat(primerData.items);
        let totalPaginas = primerData.meta?.totalPages || 1;

        for (let i = 2; i <= totalPaginas; i++) {
            let resp = await fetch('https://dragonball-api.com/api/characters?limit=50&page=' + i);
            let data = await resp.json();
            todasLasPaginas = todasLasPaginas.concat(data.items);
        }

        todosLosPersonajes = todasLasPaginas;
        llenarSelectRazas();
        charactersDragonBall(todosLosPersonajes);

    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
}

function charactersDragonBall(personajes) {
    let container = document.getElementById('container');
    container.innerHTML = '';

    if (personajes.length === 0) {
        container.innerHTML = '<p>No se encontraron personajes.</p>';
        return;
    }

    for (const dragon of personajes) {
        let div = createElement('div');
        let img = createImg(dragon.image);
        let name = createText('h2', dragon.name);
        let race = createText('p', 'Raza: ' + (dragon.race || 'Desconocida'));
        let gender = createText('p', 'Género: ' + (dragon.gender || 'Desconocido'));
        let ki = createText('p', 'Ki: ' + (dragon.ki || '???'));
        let max = createText('p', 'Max Ki: ' + (dragon.maxKi || '???'));
        let buton = createButton('Ver detalle', 'html/detalles.html?id=' + dragon.id);

        createContainer(img, div);
        createContainer(name, div);
        createContainer(race, div);
        createContainer(gender, div);
        createContainer(ki, div);
        createContainer(max, div);
        createContainer(buton, div);
        createContainer(div, container);
    }
}

function filtrarPersonajes() {
    let textoBusqueda = document.getElementById('search').value.toLowerCase().trim();
    let razaSeleccionada = document.getElementById('type').value;

    let filtrados = todosLosPersonajes.filter(function (p) {
        let coincideNombre = p.name.toLowerCase().includes(textoBusqueda);
        let coincideRaza = razaSeleccionada === 'seleccione'
            || (p.race && p.race === razaSeleccionada);
        return coincideNombre && coincideRaza;
    });

    charactersDragonBall(filtrados);
}

function llenarSelectRazas() {
    let razas = [...new Set(todosLosPersonajes.map(p => p.race).filter(Boolean))];
    razas.sort();

    let select = document.getElementById('type');
    select.innerHTML = '<option value="seleccione">Todas las razas</option>';

    razas.forEach(function (raza) {
        let option = document.createElement('option');
        option.value = raza;
        option.textContent = raza;
        select.appendChild(option);
    });
}

function consumeApiName() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let url = 'https://dragonball-api.com/api/characters/' + id;
    fetch(url)
        .then(response => response.json())
        .then(data => description(data))
        .catch(error => console.error('Error:', error));
}

function description(dragon) {

    let divPadre = document.getElementById('principal');
    divPadre.innerHTML = '';

    let div = createElement('div');
    let nav = createElement('nav');

    let img = createElement('img');
    img.src = dragon.image;
    img.alt = dragon.name;

    let h2 = createText('h2', dragon.name);
    let p = createText('p', dragon.race + ' - ' + dragon.gender + ' - ' + dragon.affiliation);
    let divCenter = createElement('span');
    let pDesc = createText('p', dragon.description);
    pDesc.style.color = 'white';
    let divLeft = createElement('article');
    let navCenter = createElement('article');
    let divRight = createElement('article');
    let pLeft = createText('small', 'Base Ki');
    let pCenter = createText('small', 'Max Ki');
    let pRight = createText('small', 'ID');
    let ki = createText('p', dragon.ki);
    let max = createText('p', dragon.maxKi);
    let id = createText('p', dragon.id);
    ki.style.color = '#FACC15';
    max.style.color = '#FACC15';
    id.style.color = '#FACC15';
    ki.style.margin = '0%';
    max.style.margin = '0%';
    id.style.margin = '0%';

    
        if (dragon.originPlanet) {
        var btnPlaneta = createButton(
            'Ver planeta: ' + dragon.originPlanet.name,
            'planeta.html?id=' + dragon.originPlanet.id
        );
    }

    createContainer(img, nav);
    createContainer(h2, div);
    createContainer(p, div);
    createContainer(pLeft, divLeft);
    createContainer(ki, divLeft);
    createContainer(pCenter, navCenter);
    createContainer(max, navCenter);
    createContainer(pRight, divRight);
    createContainer(id, divRight);
    createContainer(divLeft, divCenter);
    createContainer(navCenter, divCenter);
    createContainer(divRight, divCenter);
    createContainer(divCenter, div);
    createContainer(pDesc, div);

    // FIX: solo agregar el boton si existe
    if (btnPlaneta) {   
        createContainer(btnPlaneta, div);
    }

    createContainer(nav, divPadre);
    createContainer(div, divPadre);

    // transformaciones
    if (dragon.transformations && dragon.transformations.length > 0) {
        let gridTrans = document.getElementById('Transformation');
        gridTrans.innerHTML = '';

        dragon.transformations.forEach(function (trans) {
            let card = createElement('div');
            let imgTrans = createElement('img');
            let nombre = createText('p', trans.name);
            let ki = createText('p', 'Ki: ' + trans.ki);

            imgTrans.src = trans.image;
            imgTrans.alt = trans.name;

            createContainer(imgTrans, card);
            createContainer(nombre, card);
            createContainer(ki, card);
            createContainer(card, gridTrans);
        });
    }
}

function consumeApiPlanet() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let url = 'https://dragonball-api.com/api/planets/' + id;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            planet(data);
            characteres(data);
        })
        .catch(error => console.error('Error:', error));
}

function planet(planet) {
    let divPadre = document.getElementById('description');
    divPadre.innerHTML = '';

    let car = createElement('div');
    let img = createImg(planet.image, planet.name);
    let info = createElement('nav');
    let h1 = createText('h1', planet.name);
    let destroyed = planet.isDestroyed ? 'Planeta Destruido' : 'Planeta activo';
    let state = createText('p', destroyed);
    state.style.color = planet.isDestroyed ? 'red' : 'green';
    state.style.fontWeight = 'bold';
    let description = createText('p', planet.description || 'Sin descripcion');

    createContainer(h1, info);
    createContainer(state, info);
    createContainer(description, info);
    createContainer(img, car);
    createContainer(car, divPadre);
    createContainer(info, divPadre);
}

function characteres(planeta) {
    if (planeta.characters && planeta.characters.length > 0) {
        let divPadre = document.getElementById('characteres');

        planeta.characters.forEach(function (personaje) {
            let cardPersonaje = createElement('div');
            let imgP = createImg(personaje.image, personaje.name);
            let nombreP = createText('h2', personaje.name);
            let raza = createText('p', 'Raza: ' + (personaje.race || '???'));
            let ki = createText('p', 'Ki: ' + (personaje.ki || '???'));
            let btn = createButton('Ver detalle', '../html/detalles.html?id=' + personaje.id);

            createContainer(imgP, cardPersonaje);
            createContainer(nombreP, cardPersonaje);
            createContainer(raza, cardPersonaje);
            createContainer(ki, cardPersonaje);
            createContainer(btn, cardPersonaje);
            createContainer(cardPersonaje, divPadre);
        });
    }
}
