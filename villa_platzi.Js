var teclas = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 };
var numVacas = document.getElementById("numVacas");
var numCerdos = document.getElementById("numCerdos");
var numPollos = document.getElementById("numPollos");
var bEnviar = document.getElementById("enviar");
bEnviar.addEventListener("click", iniciaVillaPlatzi);
var vp = document.getElementById("villaPlatzi");
var papel = vp.getContext("2d");
document.addEventListener("keyup", moverLobo);
var jLobo;
var fondo = {
    url: "tile.png",
    cargaOK: false
}
var vaca = {//java script object notation (JSON)
    url: "vaca.png", //variable(propiedad) con la direccion de la imagen (objeto vaca), los atributos dentro de un objeto en JSON se separan con ","
    cargaOK: false // variable con el estado de carga del objeto 
}// no se puede agregar un
var cerdo = {
    url: "cerdo.png",
    cargaOK: false
}
var pollo = {
    url: "pollo.png",
    cargaOK: false
}
var lobo = {
    url: "lobo.png",
    cargaOK: false
}

fondo.imagen = new Image(); //NO lleva "var" por que estamos agregando un atributo a la imagen
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo); // evento que carga la imagen
vaca.imagen = new Image();// dentro del objeto que esta en Vaca es donde esta el "Image"
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", () => cargarAnimales("vaca"));
cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", () => cargarAnimales("cerdo"));
pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", () => cargarAnimales("pollo"));
lobo.imagen = new Image();
lobo.imagen.src = lobo.url;
lobo.imagen.addEventListener("load", () => cargarAnimales("lobo"));
var espacio = [];
var posicion;
var j;
var x;
var y;
function posiciones(animalito) {
    posicion = numAleatorio(0, 35);
    console.log(posicion);
    while (espacio[posicion]) {
        posicion++;
        if (posicion > 35) {
            posicion = 0;
        }
    }
    if (animalito == vaca) {
        espacio[posicion] = vaca;
    }
    if (animalito == cerdo) {
        espacio[posicion] = cerdo;
    }
    if (animalito == pollo) {
        espacio[posicion] = pollo;
    }

    if (animalito == lobo) {
        espacio[posicion] = lobo;
    }
}

function moverLobo(tecla) {
    // Buscar al lobo en espacio, Ver su posicion (x, y)
    for (let i = 0; i < espacio.length; i++) {
        if (espacio[i] == lobo) {
            xLobo = 80 * (i % 6);
            yLobo = 80 * Math.floor(i / 6);
            console.log("Lobo esta en " + i + " " + xLobo + " " + yLobo);
            if (i > 0 && i < 36 && xLobo < 401 && yLobo < 401) {
                // console.log("lobo esta adentro");
                switch (tecla.keyCode) {
                    case teclas.UP:
                        j = i - 6;
                        console.log("ahora lobo esta en " + j);
                        espacio[i] = false;
                        espacio[j] = lobo;
                        break;
                    case teclas.DOWN:
                        j = i + 6;
                        console.log("ahora lobo esta en " + j);
                        espacio[i] = false;
                        espacio[j] = lobo;
                        break;
                    case teclas.LEFT:
                        j = i - 1;
                        console.log("ahora lobo esta en " + j);
                        espacio[i] = false;
                        espacio[j] = lobo;
                        break;
                    case teclas.RIGHT:
                        j = i + 1;
                        console.log("ahora lobo esta en " + j);
                        espacio[i] = false;
                        espacio[j] = lobo;
                        break;
                }
            }
            else {
                console.log("lobo esta afuera");
            }
            break;
        }
    }
    dibuja();
}

function dibujarPapel(i) {
    x = 80 * (i % 6);
    y = 80 * Math.floor(i / 6);
    papel.drawImage(espacio[i].imagen, x, y);
    // console.log(espacio[i].url + " en " + i);
}

function cargarFondo() {
    fondo.cargaOK = true;// solo puedo dibujar cuando ya esta cargado
    dibujaFondo();
}
function dibujaFondo() {
    if (fondo.cargaOK) {// if se ejecuta solo si la condicion es verdadero por lo que "fondo.cargaOK == true" es innecesario
        papel.drawImage(fondo.imagen, 0, 0); //dibuja imagenes dentro del canvas
    }
}

function cargarAnimales(animal) {
    if (animal == "vaca") {
        vaca.cargaOK = true;
    }
    if (animal == "cerdo") {
        cerdo.cargaOK = true;
    }
    if (animal == "pollo") {
        pollo.cargaOK = true;
    }
    if (animal == "lobo") {
        lobo.cargaOK = true;
    }
}

function iniciaVillaPlatzi() {
    if (vaca.cargaOK) {
        var cantVacas = parseInt(numVacas.value);
        for (i = 0; i < cantVacas; i++) {
            posiciones(vaca);
        }
    }
    if (cerdo.cargaOK) {
        var cantCerdos = parseInt(numCerdos.value);
        for (i = 0; i < cantCerdos; i++) {
            posiciones(cerdo);
        }
    }
    if (pollo.cargaOK) {
        var cantPollos = parseInt(numPollos.value);
        for (i = 0; i < cantPollos; i++) {
            posiciones(pollo);
        }
    }
    if (lobo.cargaOK) {
        if (cantVacas || cantCerdos || cantPollos) {
            posiciones(lobo);
        }
    }
    dibuja();
}
function dibuja() {
    dibujaFondo();
    // TODO: Quites los ifs dentro derl if: papel.draw...(espacio[i].imagen)
    for (let i = 0; i < espacio.length; i++) {
        if (espacio[i]) {
            dibujarPapel(i);
        }
    }
}

function numAleatorio(max, min) {
    var resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}