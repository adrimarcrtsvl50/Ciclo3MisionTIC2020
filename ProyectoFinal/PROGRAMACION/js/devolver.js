function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

$(document).ready(() => {
    const list = () => {
        $(document).on('click', '#btn_cons_dev', function() {

            let detalle = document.getElementById('serial_dev');
            let id = $(detalle).val();
            $.ajax({
                url: 'http://localhost:8080/bikes/' + id,
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    const data = res
                    console.log(data)
                    devoluciones(data)
                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
        })
    }
    list();
})
const contenedorProductos = document.querySelector('#tbody_devoluciones')
const devoluciones = (data) => {
    contenedorProductos.innerHTML = ''
    const template = document.querySelector('#template-devoluciones').content
    const fragment = document.createDocumentFragment()
    template.querySelector('.table_marca').textContent = data.marca
    template.querySelector('.table_modelo').textContent = data.modelo
    template.querySelector('.table_tipo').textContent = data.tipo
    template.querySelector('.table_tamano').textContent = data.tamano
    template.querySelector('.table_genero').textContent = data.genero
    template.querySelector('.table_color').textContent = data.color
    template.querySelector('.table_edad').textContent = data.edad
    template.querySelector('.table_precio').textContent = data.precio
    template.querySelector('.table_estado').textContent = data.estado
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    contenedorProductos.appendChild(fragment)
    cambiarestado(data)
}

const cambiarestado = (data) => {

    $('#btn_dev').on('click', function() {
        const id_tabla = data.id
        const table_marca = data.marca
        const table_modelo = data.modelo
        const table_tipo = data.tipo
        const table_tamano = data.tamano
        const table_genero = data.genero
        const table_color = data.color
        const table_edad = data.edad
        const table_precio = data.precio

        const table_estado = $('#estado_dev').val()
        console.log("cambios", id_tabla, table_marca, table_modelo, table_tipo, table_tamano, table_genero, table_color, table_edad, table_precio, table_estado)
        fetch('http://localhost:8080/bikes', {
                method: 'PUT',
                body: JSON.stringify({
                    id: id_tabla,
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
                resertcamb()
                devoluciones(data)
            })

    })
}
const resertcamb = () => {
    $('#estado_dev').val("");
}