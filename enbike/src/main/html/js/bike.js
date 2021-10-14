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
            const estado = producto.estado
            producto.cantidad = 1

            if (estado == "prestamo" || estado == "mantenimiento") {
                swal("El estado de la Bicicleta", "la bicicleta se encuentra en mantenimiento o prestada.", "error");
            } else {
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

                //console.log(producto)
            }
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
        //template.querySelector('.sumar').dataset.id = producto.id
        //  template.querySelector('.disminuir').dataset.id = producto.id
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
    const diff = Object.values(carrito).reduce((acc, {}) => acc + dias / (1000 * 3600 * 24), 0)

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
    pos(nSubtotal, multaTotal, nIva, nTotal)
    bill()
    rents1(diff)



}

const accionBotones = () => {
    //const botonesAgregar = document.querySelectorAll('#tbody .sumar')
    // const botonesDisminuir = document.querySelectorAll('#tbody .disminuir')
    const botonesEliminar = document.querySelectorAll('#tbody .delete')

    /*botonesAgregar.forEach(btn => {
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
    })*/
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

let poslis = []
let diaslis = []

//metodo de guardar datos pos
const pos = (nSubtotal, multaTotal, nIva, nTotal) => {
        //console.log("pos", "me diste")
        const subtotal = nSubtotal
        const iva = nIva
        const multas = multaTotal
        const total = nTotal
            //console.log(subtotal, iva, multas, total)
        $('#btn_Conf').on('click', function() {
            fetch('http://localhost:8080/pos', {
                    method: 'POST',
                    body: JSON.stringify({
                        multa: multas,
                        iva: iva,
                        total: total,
                        subTotal: subtotal,
                    }),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log("pos", data)
                    const producto = data;
                    const posID = producto.id
                        //console.log("posID", posID);
                    rents2(posID)

                    //console.log("idpos", poslis[0])
                })

            const alert = document.querySelector('.alert')
            setTimeout(function() {
                alert.classList.add('conf')
            }, 2000)
            alert.classList.remove('conf')
        })



    }
    //metodo de guardar datos bill
const bill = () => {
    //console.log("bill", "me diste")
    $('#btn_Conf').on('click', function() {
        // console.log('me diste')

        const ciudad = $('#city').val()
        const departamento = $('#state').val()
        const direccion = $('#adr').val()
        const email = $('#email').val()
        const nombre = $('#fname').val()
        const telefono = $('#telephone').val()

        //console.log(ciudad, departamento, direccion, email, nombre, telefono)
        fetch('http://localhost:8080/bill', {
                method: 'POST',
                body: JSON.stringify({
                    ciudad: ciudad,
                    departamento: departamento,
                    direccion: direccion,
                    email: email,
                    nombre: nombre,
                    telefono: telefono
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("bill", data);
                const producto = data;
                const billID = producto.id
                    //console.log("billID", billID);
                Card(billID);

            })
        resertbill();
        const alert = document.querySelector('.alert')
        setTimeout(function() {
            alert.classList.add('conf')
        }, 2000)
        alert.classList.remove('conf')

    })

}

//metodo para limpiar el formulario
const resertbill = () => {
    $('#city').val('');
    $('#state').val('');
    $('#adr').val('');
    $('#email').val('');
    $('#fname').val('');
    $('#telephone').val('');
}

//metodo de guardar datos
const Card = (billID) => {
    // console.log("card", "me diste")
    //console.log(billID)
    const cvv = $('#cvv').val()
    const nombrecard = $('#cname').val()
    const numero = $('#ccnum').val()
    const vencimiento = $('#expmonth').val()
    const id_bill = billID
        // console.log("card1", cvv, nombrecard, numero, vencimiento, id_bill)

    fetch('http://localhost:8080/cards', {
            method: 'POST',
            body: JSON.stringify({
                cvv: cvv,
                nombre: nombrecard,
                numero: numero,
                vencimiento: vencimiento,
                fk_id_billingAddress: { "id": id_bill }
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("card2", data);
            const producto = data;
            const cardID = producto.id
            rents3()
                //console.log("cardID", cardID);

        })

    resertCard()

    const alert = document.querySelector('.alert')
    setTimeout(function() {
        alert.classList.add('conf')
    }, 2000)
    alert.classList.remove('conf')

}

const resertCard = () => {
    $('#cvv').val('');
    $('#cname').val('');
    $('#ccnum').val('');
    $('#expmonth').val('');
}


//adicinar el diff 
const rents1 = (diff) => {
        const newItem = diff
            //console.log("items", newItem)
        addItem(newItem)

    }
    //adicinar el pos id
const rents2 = (posID) => {
        const newItem = posID
            //console.log("items", newItem)
        addItem1(newItem)

    }
    //guardar en la lista
const addItem = (newItem) => {
    diaslis.push(newItem)
    console.log("newdias", diaslis)

}
const addItem1 = (newItem) => {
    poslis.push(newItem)
    console.log("newpos", poslis)

}

const rents3 = () => {
    Object.values(carrito).forEach(item => {
        const bikeid = item.id
        let diadf = diaslis[0]
        let postid = poslis[0]
        const fechaInicial = document.getElementById('FechaI').value
        const fechaFinal = document.getElementById('FechaFin').value
        const fechaEntrega = document.getElementById('FechaFin').value
        const duracionEstimada = 3
            //console.log("resumen", fechaInicial, fechaFinal, fechaEntrega, duracionEstimada, diadf, bikeid, postid)
        rents(fechaInicial, fechaFinal, fechaEntrega, duracionEstimada, diadf, bikeid, postid)
    })
}
const rents = (fechaInicial, fechaFinal, fechaEntrega, duracionEstimada, diadf, bikeid, postid) => {
    // console.log("me entre renta")
    const Inicial = fechaInicial
    const Final = fechaFinal
    const Entrega = fechaEntrega
    const duracion = duracionEstimada
    const dias = diadf
    const bike = bikeid
    const post = postid

    fetch('http://localhost:8080/rents', {
            method: 'POST',
            body: JSON.stringify({
                fechaInicial: Inicial,
                fechaFinal: Final,
                fechaEntrega: Entrega,
                duracionEstimada: duracion,
                duracionReal: dias,
                fk_id_bike: { "id": bike },
                fk_id_profile: { "id": 1 },
                fk_id_pos: { "id": post }

            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("rents", data);
            resertRent()
            cambiarbike()
            eliminarcard()
            window.location.replace("../sites/clientes.html");


        })
    const alert = document.querySelector('.alert')
    setTimeout(function() {
        alert.classList.add('conf')
    }, 2000)
    alert.classList.remove('conf')

}

const resertRent = () => {
    $('#FechaI').val('');
    $('#FechaFin').val('');
}

const eliminarcard = () => {
    diaslis.splice(0);
    poslis.splice(0);
    console.log("fueron eliminados", diaslis, poslis)
    carrito = {}
    pintarCarrito()
    renderCarritocard()
    CarritoTotal()

}

const cambiarbike = () => {

    Object.values(carrito).forEach(item => {
        const bikeid = item.id
        const table_marca = item.marca
        const table_modelo = item.modelo
        const table_tipo = item.tipo
        const table_tamano = item.tamano
        const table_genero = item.genero
        const table_color = item.color
        const table_edad = item.edad
        const table_precio = item.precio
        const table_estado = "prestamo"
        console.log("prestamo bike", bikeid, table_marca, table_modelo, table_tipo, table_tamano, table_genero, table_color, table_edad, table_precio, table_estado)
        fetch('http://localhost:8080/bikes', {
                method: 'PUT',
                body: JSON.stringify({
                    id: bikeid,
                    marca: table_marca,
                    tipo: table_tipo,
                    tamano: table_tamano,
                    genero: table_genero,
                    color: table_color,
                    estado: table_estado,
                    modelo: table_modelo,
                    precio: table_precio,
                    edad: table_edad
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("cambios", data)

            })
    })

}