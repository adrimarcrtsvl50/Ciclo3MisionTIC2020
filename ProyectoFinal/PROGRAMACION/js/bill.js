$(document).ready(() => {

    //metodo de guardar datos
    const save = () => {
            $('#btn_Conf').on('click', function() {
                console.log('me diste')
                const datosDireccion = {
                    ciudad: $('#city').val(),
                    departamento: $('#state').val(),
                    direccion: $('#adr').val(),
                    email: $('#email').val(),
                    nombre: $('#fname').val(),
                    telefono: $('#telephone').val(),
                }
                console.log(datosDireccion)
                $.ajax({
                    url: 'http://localhost:8080/bill',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(datosDireccion),
                    dataType: 'json',
                    success: (data) => {
                        resert()
                        const alert = document.querySelector('.alert')
                        setTimeout(function() {
                            alert.classList.add('hide')
                        }, 2000)
                        alert.classList.remove('hide')
                    }
                })
            })
        }
        //eliminar
    const deleteBill = () => {
            $(document).on('click', '#btn_Elim', function() {

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
                        setTimeout(function() {
                            alert.classList.add('hide')
                        }, 2000)
                        alert.classList.remove('hide')
                        reset1();
                    }

                });

            })

        }
        //metodo para limpiar el formulario
    const resert = () => {
        $('#city').val('');
        $('#state').val('');
        $('#adr').val('');
        $('#email').val('');
        $('#fname').val('');
        $('#telephone').val('');
    }

    //llamadas a funciones
    save();
    deleteBill();
})