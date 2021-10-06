$(document).ready(() => {


    //metodo de guardar datos
    const save = () => {

            $('#btn_Conf').on('click', function() {
                console.log('me diste')
                const datosCard = {
                    cvv: $('#cvv').val(),
                    nombre: $('#cname').val(),
                    numero: $('#ccnum').val(),
                    vencimiento: $('#expmonth').val(),


                }
                console.log(datosCard)
                $.ajax({
                    url: 'http://localhost:8080/cards',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(datosCard),
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
    const deleteCard = () => {
            $(document).on('click', '#btn_Elim', function() {
                let detalle = document.getElementById('id');
                let id = $(detalle).val();
                console.log(id)
                $.ajax({
                    url: 'http://localhost:8080/cards/' + id,
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
        $('#cvv').val('');
        $('#cname').val('');
        $('#ccnum').val('');
        $('#expmonth').val('');
    }


    //llamadas a funciones
    save();
    deleteCard();
})