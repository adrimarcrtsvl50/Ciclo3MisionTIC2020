$(document).ready(() => {

    //metodo de guardar datos
    const save = () => {
        $('#btn_Regis').on('click', function () {
            const datosBill = {
                ciudad: $('#ciudad').val(),
                departamento: $('#departamento').val(),
                direccion: $('#direccion').val(),
                email: $('#email').val(),
                nombre: $('#nombre').val(),
                telefono: $('#telefono').val()
            }
            $.ajax({
                url: 'http://localhost:8080/bill',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(datosBill),
                dataType: 'json',
                success: (data) => {
                    reset();
                    const alert = document.querySelector('.alert')
                    setTimeout(function () {
                        alert.classList.add('hide')
                    }, 2000)
                    alert.classList.remove('hide')
                }
            })
        })
    }
    //eliminar
    const deleteBill = () => {
        $(document).on('click', '#btn_Elim', function () {

            let detalle = document.getElementById('id');
            let id = $(detalle).val();
            console.log(id)
            $.ajax({
                url: 'http://localhost:8080/bill/' + id,
                contentType: 'application/json',
                type: 'DELETE',
                dataType: 'json',
                success: (data) => {

                    const alert = document.querySelector('.alert')
                    setTimeout(function () {
                        alert.classList.add('hide')
                    }, 2000)
                    alert.classList.remove('hide')
                    reset1();
                }

            });

        })

    }
    //metodo para limpiar el formulario
    const reset = () => {
        $('#ciudad').val(),
            $('#departamento').val(),
            $('#direccion').val(),
            $('#email').val(),
            $('#nombre').val(),
            $('#telefono').val()
    }

    const reset1 = () => {
        $('#id').val('');

    }

    //llamadas a funciones
    save();
    deleteBill();
})