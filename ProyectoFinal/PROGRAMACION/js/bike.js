$(document).ready(() => {
    //metodo agregar productos 
    const list = () => {
        $.ajax({
            url: 'http://localhost:8080/bikes',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                const data = res
                pintarProductos(data)
                detectarBotones(data)

            },
            error: function(e) {
                console.log("ERROR : ", e);
            }
        });
    }
    list();

})

const fottertotal = document.querySelector('#tbodyfooter')
const contenedorProductos = document.querySelector('#pills-producto1')
const items = document.querySelector('#tbody')
const tbody1 = document.querySelector('#tbody1')


let carrito = {}


const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()

    data.forEach(producto => {
        //template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h5').textContent = producto.marca
        template.querySelector('.product_serie').textContent = producto.id
        template.querySelector('.product_marca').textContent = producto.marca
        template.querySelector('.product_tipo').textContent = producto.tipo
        template.querySelector('.product_tamano').textContent = producto.tamano
        template.querySelector('.product_genero').textContent = producto.genero
        template.querySelector('.product_color').textContent = producto.color
        template.querySelector('.product_modelo').textContent = producto.modelo
        template.querySelector('.product_estado').textContent = producto.estado
        template.querySelector('.product_edad').textContent = producto.edad
        template.querySelector('.precio').textContent = producto.precio
        template.querySelector('.button_add').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')
    botones.forEach(btn => {
        btn.addEventListener('click', () => {

            const producto = data.find(item => item.id === parseInt(btn.dataset.id))

            producto.cantidad = 1

            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            carrito[producto.id] = {...producto }

            const alert = document.querySelector('.alert')

            setTimeout(function() {
                alert.classList.add('hide')
            }, 2000)
            alert.classList.remove('hide')
            pintarCarrito()
            renderCarritocard()
            console.log(producto)

        })

    })
}

const pintarCarrito = () => {
    items.innerHTML = ''
    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
    Object.values(carrito).forEach(producto => {

        template.querySelector('th').textContent = producto.id
            //template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h6').textContent = producto.marca
        template.querySelector('.table_precio').textContent = producto.precio
        template.querySelector('.table_tamano').textContent = producto.tamano
        template.querySelector('.table_cantidad').textContent = producto.cantidad

        //botones 
        template.querySelector('.sumar').dataset.id = producto.id
        template.querySelector('.disminuir').dataset.id = producto.id
        template.querySelector('.delete').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.appendChild(fragment)
    accionBotones()
}

function renderCarritocard() {
    tbody1.innerHTML = ''
    Object.values(carrito).forEach(item => {
        const p = document.createElement('p')
        p.classList.add('ItemCarrito1')
        const Content = `
        <a class="idprod">${item.id} </a> <a class="nombrepro">${item.marca} </a> <span class="price ">${item.precio}</span> <span class="price ml-4">can: ${item.cantidad}</span>
                `
        p.innerHTML = Content;
        tbody1.append(p)

    })
    CarritoTotal()

}

const fechasonIguales = () => {
    var fechaInicio = $("#FechaI").val().split("-");
    var fechaFin = $("#FechaFin").val().split("-");
    var fechadesde = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
    var fechahasta = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
    if (fechadesde.getTime() == fechahasta.getTime()) {
        swal("La Fecha de Entrega", "las dos fechas son iguales por favor coloque otra fecha.", "error");
    } else {
        if (fechadesde.getTime() >= fechahasta.getTime()) {
            swal("La Fecha de Entrega", "es menor de la fecha de inicio.", "error");
        } else {
            CarritoTotal()
        }
    }
}

const CarritoTotal = () => {
    fottertotal.innerHTML = ''
    var fechaInicio = $("#FechaI").val().split("-");
    var fechaFin = $("#FechaFin").val().split("-");
    var fechadesde = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
    var fechahasta = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
    var dias = fechahasta.getTime() - fechadesde.getTime();
    var diff = dias / (1000 * 3600 * 24);

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()
    const nSubtotal = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    const nTotalDias = Object.values(carrito).reduce((acc, {}) => acc + nSubtotal * diff, 0)

    const multa = nTotalDias

    if (diff >= 4) {
        multaTotal = multa * 0.10;
        template.querySelector('.itemCartMulta').textContent = `$${multaTotal}`
    } else {
        if (diff <= 3) {
            multaTotal = 0
            template.querySelector('.itemCartMulta').textContent = `$${multaTotal}`
        }
    }
    const nIva = Object.values(carrito).reduce((acc, {}) => acc + nTotalDias * 0.19, 0)
    const nTotal = Object.values(carrito).reduce((acc, {}) => acc + (multaTotal + nIva + nTotalDias), 0)
    template.querySelector('.itemCartIva').textContent = `$${nIva}`
    template.querySelector('.itemCartTotal').textContent = `$${nTotal}`

    template.querySelector('.itemCartSubTotal').textContent = `$${nSubtotal}`
    template.querySelector('.itemCartDias').textContent = `${diff}`
    template.querySelector('.itemCartTotalDias').textContent = `$${nTotalDias}`



    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    fottertotal.appendChild(fragment)
}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#tbody .sumar')
    const botonesDisminuir = document.querySelectorAll('#tbody .disminuir')
    const botonesEliminar = document.querySelectorAll('#tbody .delete')

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad++
                carrito[btn.dataset.id] = {...producto }
            pintarCarrito()
            renderCarritocard()
        })
    })
    botonesDisminuir.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
                if (producto.cantidad === 0) {
                    const alert = document.querySelector('.remove')
                    setTimeout(function() {
                        alert.classList.add('remove')
                    }, 2000)
                    alert.classList.remove('remove')
                    delete carrito[btn.dataset.id]
                    pintarCarrito()
                    renderCarritocard()
                } else {
                    carrito[btn.dataset.id] = {...producto }
                }
            pintarCarrito()
            renderCarritocard()
        })
    })
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const alert = document.querySelector('.remove')
            setTimeout(function() {
                alert.classList.add('remove')
            }, 2000)
            alert.classList.remove('remove')
            delete carrito[btn.dataset.id]
            pintarCarrito()
            renderCarritocard()
        })
    })
}



const rentFactura = () => {
    const Fechas = {


    }
    const rent = {
        ciudad: $('#city').val(),
        departamento: $('#state').val(),
        direccion: $('#adr').val(),
        email: $('#email').val(),
        nombre: $('#fname').val(),
        telefono: $('#telephone').val(),
    }
    console.log(rent)
}