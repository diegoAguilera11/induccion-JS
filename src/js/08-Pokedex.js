const resultado = document.querySelector('#container')
const paginacion = document.querySelector('#paginate')
const formulario = document.querySelector('#form');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    console.log(terminoBusqueda)

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }

    buscarPokemon()
}

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-200')

    if (!alerta) {
        const alerta = document.createElement('p');

        alerta.classList.add("w-full", "bg-red-200", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center")
        alerta.textContent = mensaje;


        formulario.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

async function buscarPokemon() {
    const terminoBusqueda = document.querySelector('#termino').value;
    const url2 = `https://pokeapi.co/api/v2/type/${terminoBusqueda.toLowerCase()}`

    try {
        const response = await axios.get(url2)
        mostrarPokemon(response.data.pokemon)
    } catch (error) {
        console.log(error)
    }

}

async function mostrarPokemon(informacion) {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    informacion.forEach(pokemon => {
        const { name, url } = pokemon.pokemon
        const response = axios.get(url)
            .then(function (response) {
                // handle success
                crearPokemon(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    });

}

function crearPokemon(info) {

    // Destructurar la información
    const { name, sprites, types, id } = info

    const url_base_image = `https://img.pokemondb.net/artwork/large/${name}.jpg`

    // front y back image
    const front_img = sprites.front_default
    const back_img = sprites.back_default
    console.log(front_img)

    // types
    const type = types[0].type.name
    console.log(type)


    resultado.innerHTML += `
            <div class="bg-white m-10 rounded p-4">
                <h3 id="name_pokemon" class="text-center text-3xl font-mono">${name}</h3>
                <img id="img-pokemon" src="${url_base_image}" 
                    alt="pokemon-img-${id}"
                >
                <p class="text-lg font-semibold">Tipo: <span id="type" class="font-bold">${type}</span></p>
                <p class="text-lg font-semibold">N° Pókedex : <span id="number_p" class="font-bold">${id}</span></p>
                <div class="grid grid-cols-4 gap-2">
                    <div class="bg-gray-500 rounded">
                        <img
                        id="sprite-1" 
                        src="${front_img}" 
                        alt="front-pokemon"
                        >
                    </div>
                    <div class="bg-gray-500 rounded">
                        <img 
                        id="sprite-2" 
                        src="${back_img}" 
                        alt="back-pokemon"
                    >
                    </div>
                </div>
                <a class="mt-4 block bg-green-400 text-lg p-3 rounded cursor-pointer text-center uppercase font-semibold hover:bg-green-600 transition">Más Información</a>
            </div>
            `;
}
