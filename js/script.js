let elementTituloMoneda = document.getElementById('tituloMoneda');
let elementMoneda = document.getElementById('imagenMoneda');
let elementSeleccion = document.getElementById('monedaElegida');
let elementResultado = document.getElementById('resultado');
let elementCarga = document.getElementById('imagenCarga');
let elementListaMonedas = document.getElementById('listaMonedas');
let elementInputMoneda;
let hayCola = false;
let elementMontoIngresado = document.getElementById('monto');
let monedaSeleccionada;



// AQUI EN ESTE OBJETO IRE AGREGANDO CADA MONEDA, SUS CAMBIOS A OTRA MONEDA
// ETC PARA REPRESENTARLA EN MI JS XD (SIENTO QUE ES MAS FACIL PA MI)
function Moneda(nombre, dolar, clp, euro){
    this.nombre = nombre
    this.dolar = dolar;
    this.clp = clp;
    this.euro = euro;
}




function calcularDivisa(event){
    if((!isNaN(event.key) || event.key === 'Backspace') && !(elementSeleccion.value === 'nada')){
        if(elementMontoIngresado.value !== ""){
            let valorIngresado = parseFloat(event.target.value);
            document.getElementById('valorMonedaCLP').innerText = (parseFloat(monedaSeleccionada.clp) * valorIngresado);
            document.getElementById('valorMonedaUSD').innerText = (parseFloat(monedaSeleccionada.dolar) * valorIngresado);
            document.getElementById('valorMonedaEUR').innerText = (parseFloat(monedaSeleccionada.euro) * valorIngresado);
        }
    } else {
        event.preventDefault();
        alert("Seleccione una Divisa");
    }
}


function construirHTML(moneda){
    setTimeout(function() {
        elementCarga.setAttribute("src", "");
        elementCarga.style.display = "none";
        listaMonedas.innerHTML = `  
                    <li><strong>CLP</strong>: <span id="valorMonedaCLP">${moneda.clp}</span></li>
                    <li><strong>USD</strong>: <span id="valorMonedaUSD">${moneda.dolar}</span></li>
                    <li><strong>EUR</strong>: <span id="valorMonedaEUR">${moneda.euro}</span></li>
                `;
        hayCola = false;
        monedaSeleccionada = moneda;

    }, 1000); 
    
}


async function cambiarMoneda(event) {
    if(!hayCola){
        elementCarga.setAttribute("src", "./img/carga.gif");
        elementCarga.style.display = "inline";
        listaMonedas.innerHTML = "";
        valorAnterior = event.currentTarget.value;
        if(event.currentTarget.value.toUpperCase() === 'CLP'){
        hayCola = true;
        elementTituloMoneda.innerText = "CLP";
        elementMoneda.setAttribute("src", "./img/chileflag.png");
        consultarMonedaConPromesas("https://open.er-api.com/v6/latest/CLP")
        .then((response) => new Moneda("CLP", response.rates.USD, response.rates.CLP, response.rates.EUR))
        .then(construirHTML)
        .catch(function(error) {
            alert(error)
            hayCola = false;
        });
        } else if (event.currentTarget.value.toUpperCase() === 'USD'){
            hayCola = true;
            elementTituloMoneda.innerText = "DOLAR";
            elementMoneda.setAttribute("src", "./img/usaflag.png");
            try {
                let datos = await consultarMonedaConAsincronia("https://open.er-api.com/v6/latest/USD");
                construirHTML(new Moneda("USD", datos.rates.USD, datos.rates.CLP, datos.rates.EUR));
            } catch {
                hayCola = false;
            }
            } else if (event.currentTarget.value.toUpperCase() === 'EUR'){
            hayCola = true;
            elementTituloMoneda.innerText = "EURO";
            elementMoneda.setAttribute("src", "./img/eurflag.png");
            try {
                let datos = await consultarMonedaConAsincronia("https://open.er-api.com/v6/latest/EUR");
                construirHTML(new Moneda("EURO", datos.rates.USD, datos.rates.CLP, datos.rates.EUR));
            } catch {
                hayCola = false;
            }
            } else {
                hayCola = false;
                elementCarga.setAttribute("src", "");
                elementCarga.style.display = 'none';
                elementMoneda.setAttribute("src", "./img/moneda.png");
        }
    } else {
        event.currentTarget.value = valorAnterior;
        alert("No puedes seleccionar otra moneda hasta que termine de cargar tu seleccion");
    }
    
}

// Registro evento al selector
elementSeleccion.addEventListener('change', cambiarMoneda);
elementMontoIngresado.addEventListener('keyup', calcularDivisa);


