$(document).ready(() => {

    //metodo de guardar datos
    const save = () => {
        $('#btn_Regis').on('click', function () {
            const datosCard = {
                cvv: $('#cvv').val(),
                nombre: $('#nombre').val(),
                numero: $('#numero').val(),
                vencimiento: $('#vencimiento').val()
            }
            $.ajax({
                url: 'http://localhost:8080/card',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(datosCard),
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
    const deleteCard = () => {
        $(document).on('click', '#btn_Elim', function () {

            let detalle = document.getElementById('serial');
            let id = $(detalle).val();
            console.log(id)
            $.ajax({
                url: 'http://localhost:8080/card/' + id,
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
        $('#cvv').val(),
            $('#nombre').val(),
            $('#numero').val(),
            $('#vencimiento').val()
    }

    const reset1 = () => {
        $('#id').val('');

    }

    //llamadas a funciones
    save();
    deleteCard();
})