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

const devoluciones = (data) => {

}