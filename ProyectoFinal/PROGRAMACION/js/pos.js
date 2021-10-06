$(document).ready(() => {


    //metodo de guardar datos
    const save = () => {
            $('#btn_Conf').on('click', function() {
                console.log('me diste')
                const datosPos = {
                    sub_total: $('.itemCartSubTotal').val(),
                    iva: $('.itemCartIva').val(),
                    multa: $('.itemCartMulta').val(),
                    total: $('.itemCartTotal').val(),
                }
                console.log(datosPos)
                $.ajax({
                    url: 'http://localhost:8080/pos',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(datosPos),
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
                    url: 'http://localhost:8080/pos/' + id,
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
        $('.itemCartSubTotal').val('');
        $('.itemCartIva').val('');
        $('.itemCartMulta').val('');
        $('.itemCartTotal').val('');
    }


    //llamadas a funciones
    save();
    deleteCard();
})