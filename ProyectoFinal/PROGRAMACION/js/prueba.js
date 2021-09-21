const Clickbutton = document.querySelectorAll('.buttonaña')
const tbody = document.querySelector('.tbody')
const tbody1 = document.querySelector('.tbody1')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addTocarritoItem)
})

function addTocarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemTalla = item.querySelector('.product_talla').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        talla: itemTalla,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function() {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemnto[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }
    carrito.push(newItem)
    renderCarrito()
    renderCarritocard()
}

function renderCarrito() {
    tbody.innerHTML = ''

    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        <th scope="row">1</th>
        <td class="table_productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table_precio">
            <p>${item.precio}</p>
        </td>
        <td class="table_talla">
            <p>${item.talla}</p>
        </td>
        <td class="table_cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
        </td>
    `
        tr.innerHTML = Content;
        tbody.append(tr)
        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()

}

function renderCarritocard() {
    tbody1.innerHTML = ''
    carrito.map(item => {
        const p = document.createElement('p')
        p.classList.add('ItemCarrito1')
        const Content = `
        <a class="nombrepro">${item.title} </a> <span class="price ">${item.precio}</span> <span class="price ml-4">can: ${item.cantidad}</span>
    `
        p.innerHTML = Content;
        tbody1.append(p)

    })
}



function CarritoTotal() {
    let SubTotal = 0;
    let Iva = 0;
    let Multa = 0;
    let Total = 0;
    const itemCartSubTotal = document.querySelector('.itemCartSubTotal')
    const itemCartIva = document.querySelector('.itemCartIva')
    const itemCartMulta = document.querySelector('.itemCartMulta')
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        SubTotal = SubTotal + precio * item.cantidad
        Iva = SubTotal * 0.19
        Multa
        Total = SubTotal + Iva + Multa

    })

    itemCartSubTotal.innerHTML = `$${SubTotal}`
    itemCartIva.innerHTML = `$${Iva}`
    itemCartMulta.innerHTML = `$${Multa}`
    itemCartTotal.innerHTML = `$${Total}`
    addLocalStorage()
}



function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function() {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()
    renderCarritocard()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;

    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
            renderCarritocard()


        }

    })
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


window.onload = function() {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
        renderCarritocard()
    }
}