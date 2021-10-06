$(document).ready(() => {

    //metodo de guardar datos
    const save = () => {
        $('#btn_Regis').on('click', function () {
            const datosRent = {
                duracion_estimada: $('#duracion_estimada').val(),
                duracion_real: $('#duracion_real').val(),
                fecha_entrega: $('#fecha_entrega').val(),
                fecha_final: $('#fecha_final').val(),
                fecha_inicial: $('#fecha_finicial').val(),
                fk_id_bike_id: $('#fk_id_bike_id').val(),
                fk_id_pos_id: $('#fk_id_pos_id').val(),
                fk_id_profile_id: $('#fk_id_profile_id').val()
            }
            $.ajax({
                url: 'http://localhost:8080/rent',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(datosRent),
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

            let detalle = document.getElementById('id');
            let id = $(detalle).val();
            console.log(id)
            $.ajax({
                url: 'http://localhost:8080/rent/' + id,
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
        $('#duracion_estimada').val(),
        $('#duracion_real').val(),
        $('#fecha_entrega').val(),
        $('#fecha_final').val(),
        $('#fecha_finicial').val(),
        $('#fk_id_bike_id').val(),
        $('#fk_id_pos_id').val(),
        $('#fk_id_profile_id').val()
    }

    const reset1 = () => {
        $('#id').val('');

    }

    //llamadas a funciones
    save();
    deleteRent();
})