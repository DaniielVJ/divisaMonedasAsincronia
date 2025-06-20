// AMBAS FUNCIONES HACEN LO MISMO PERO ES PARA PRACTICAR SIMPLEMENTE
// DIFERENTES FORMAS (SUGAR SYNTAX)

function consultarMonedaConPromesas(urlAPI){
    return new Promise(function (resolve, reject){
        let requestHTTP = new XMLHttpRequest();
        requestHTTP.open("GET", urlAPI);
        requestHTTP.responseType = 'json';
        requestHTTP.onload = function () {
            if(requestHTTP.status === 200){
                resolve(requestHTTP.response);
            } else {
                reject(new Error(`Error en procesar la solicitud ${requestHTTP.status}`));
            }
        }

        // Pregunte a chatgpt como manejar los errores usando xmlhttprequest, y resulta que podemos programar
        // funciones que se ejecutan cuando hay un error, o el servidor no responde porque el paquete se perdio, el servidor ya no existe etc.
        // como en el caso de ontimeout entonces en ambas rechazamos la promesa y capturamos el error con catch y registramos callback.
        requestHTTP.onerror = function () {
            reject(new Error('Error de red: No se pudo realizar la solicitud'));
        };

        requestHTTP.ontimeout = function () {
            reject(new Error('Tiempo de espera agotado para la solicitud'));
        };
        requestHTTP.send();
        console.log("Solicitud Enviada");
    });
}

// una funcion asincrona regresa una promesa que representa la ejecucion de la funcion
// esta se resuelve cuando la funcion se ejecuta todas sus lineas correctamente
// pasa a un estado de fullfilled
async function consultarMonedaConAsincronia(urlAPI) {
    try {
        // await dice que esperaremos a que se resuelva la promesa que regresa fetch
        let respuestaServidor = await fetch(urlAPI);
        // metodo json tambien devuelve una promesa que se resuelve cuando termina de procesar
        // la cadena json y lo pasa a un tipo de dato compatible con javascript, asi que usamos
        // await para que termine de esperar que se resuelva dicha promesa.
        let datos = await respuestaServidor.json();
        // esperamos a que la promesa se resuelva para continuar con la ejecucion del codigo (y que el hilo de ejecucion principal
        // call stack este libre)
        return datos;
    } catch (error) {
        console.error(error);
    }
    
}

