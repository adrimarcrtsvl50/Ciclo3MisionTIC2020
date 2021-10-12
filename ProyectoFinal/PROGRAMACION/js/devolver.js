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
                    cambiarestado(data)

                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
            /*
            fetch('http://localhost:8080/bikes/' + id, {
                    method: 'GET',
                })
                .then(res => res.json())
                .then(data => {
                    console.log("rents", data);
                    const data1 = data
                    devoluciones(data1)
                })*/
        })
    }

    list();
})
const contenedorProductos = document.querySelector('#tbody_devoluciones')
const devoluciones = (data) => {
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

}

const cambiarestado = (data) => {
    const subtotal = nSubtotal
    const iva = nIva
    const multas = multaTotal
    const total = nTotal
    $('#estado_dev').on('click', function() {
        fetch('http://localhost:8080/bikes', {
                method: 'PUT',
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
            })
    })
}