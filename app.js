const nombreInput = document.querySelector('#nombre')
const codigoInput = document.querySelector('#codigo')
const cantidadInput = document.querySelector('#cantidad')
const costoInput = document.querySelector('#costo')
const eliminarInput = document.querySelector('#eliminar-input')
const form = document.querySelector('#nuevo-producto')
const botonBuscar = document.querySelector('#buscar');


const botonListado = document.querySelector('#listar')
const botonEliminar = document.querySelector('#eliminar')
const botonListadoInverso = document.querySelector('#listar-inverso')


let productos = document.querySelector('#productos');


eventListeners();

const productoObj = {
    codigo: '',
    nombre: '',
    costo: '',
    cantidad: '',
}


function datosProducto(e) {
    productoObj[e.target.name] = e.target.value
}

class UI {
    mostrarProductos(producto) {
            const li = document.createElement('li');
            li.innerHTML = `Nombre: ${producto.nombre} <br>
                            Codigo: ${producto.codigo} <br>
                            Cantidad: ${producto.cantidad} <br>
                            Costo: ${producto.costo} <br>`
            productos.appendChild(li);
    }
}
const ui = new UI();

class Inventario {
    constructor() {
        this.productos = [{"codigo":"1","nombre":"1","cantidad":"1","costo":"1"}, {"codigo":"4","nombre":"1","cantidad":"1","costo":"1"}, {"codigo":"10","nombre":"1","cantidad":"1","costo":"1"}];

    }

    addProducto(producto) {
        let ubi = this.ubicarPosicion(producto.codigo);
        for (let i = this.productos.length - 1; ubi <= i; i--) {
            this.productos[i + 1] = this.productos[i]
        }

        this.productos[ubi] = producto;

    }


    eliminarProducto(codigo) {
        let ubi = this.busquedaBinaria(codigo); // BUSQUEDA BINARIA
        if(!ubi) {
            return null
        }
        let length = this.productos.length
        let i = 0
    
        while( i + ubi < length) {
            this.productos[ubi + i] = this.productos[ubi + i + 1]
            i++
        }
    
        arrayss.length -= 1;

        return this.productos[ubi]
    }

    listar() {
        for (let i = 0; i < this.productos.length; i++) {
            ui.mostrarProductos(this.productos[i])
        }
    }

    listarInverso() {
        let invertido = []
        for(let i = this.productos.length - 1; i >= 0 ; i--) {
            ui.mostrarProductos(this.productos[i])
        }
    }

    busquedaBinaria(codigo) {
        let high = this.productos.length - 1;
        let low = 0;

        while (high - low > 1) {
            let mid = Math.floor((high + low) / 2);
             if(this.productos[mid].codigo < codigo) {
                low = mid;
            }
            else {
                high = mid;
            }
        }
        if (this.productos[low].codigo == codigo) {
            return low;
        }
        else if (this.productos[high].codigo == codigo) {
            return high;
        }
        else {
            return null
        }
    }

    ubicarPosicion(codigo) {
        let i = 0;
        let codigoNumber = Number(codigo);
        while ( codigoNumber > Number(this.productos[i]?.codigo)) {
            i++
        }
    
        return i
    }
}
const inventario = new Inventario();

function eventListeners() {
    nombreInput.addEventListener('input', datosProducto)
    codigoInput.addEventListener('input', datosProducto)
    costoInput.addEventListener('input', datosProducto)
    cantidadInput.addEventListener('input', datosProducto)
    botonEliminar.addEventListener('click', eliminarProducto)
    botonListado.addEventListener('click', listar)
    botonListadoInverso.addEventListener('click', listarInverso)
    botonBuscar.addEventListener('click', buscarProducto)

    form.addEventListener('submit', nuevoProducto)
}

function listar() {
    limpiarHTML();
    inventario.listar()
}

class Producto {
    constructor(codigo, nombre, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
    }
}



function nuevoProducto(e) {
    e.preventDefault();
    const {codigo, nombre, costo , cantidad} = productoObj
    // if(!codigo || !nombre || !costo || !cantidad) {
    //     alert('Todos los campos son obligatorios')
    // } else {
        let producto = new Producto(codigo, nombre, costo, cantidad);
        reiniciarObj();
        inventario.addProducto(producto)
    // }
}


function reiniciarObj() {
    productoObj.nombre = '';
    productoObj.codigo = 0;
    productoObj.costo = '';
    productoObj.cantidad = '';
}

function limpiarHTML() {
    while(productos.firstChild) {
        productos.removeChild(productos.firstChild)
    }
}

function eliminarProducto() {
    const codigo = Number(eliminarInput.value)
    console.log(codigo)
    inventario.eliminarProducto(codigo)
    console.log('Eliminando')
}

function listarInverso() {
    limpiarHTML();
    inventario.listarInverso();
}

function buscarProducto() {
    const codigo = Number(eliminarInput.value)
    console.log(inventario.buscar(codigo));
}