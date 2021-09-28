  document.getElementById('file').onchange = function(e) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function() {
          let preview = document.getElementById('preview');
          image = document.createElement('img');
          image.src = reader.result;
          image.style.width = "100%"
          image.style.height = "200px"
          preview.innerHTML = '';
          preview.append(image);
      }
  }


  $(document).ready(() => {

      //metodo de guardar datos
      const save = () => {
              $('#boton').on('click', function() {
                  const datosBike = {

                      marca: $('#marca').val(),
                      tipo: $('#tipo').val(),
                      tamano: $('#tamano').val(),
                      genero: $('#genero').val(),
                      color: $('#color').val(),
                      modelo: $('#modelo').val(),
                      estado: $('#estado').val(),


                  }
                  $.ajax({
                      url: 'http://localhost:8080/bikes',
                      contentType: 'application/json',
                      type: 'POST',
                      data: JSON.stringify(datosBike),
                      dataType: 'json',
                      success: (data) => {
                          resert();
                          console.log('bike registrado!')
                      }


                  })
              })
          }
          //metodo para limpiar el formulario
      const resert = () => {
          $('#marca').val('');
          $('#tipo').val('');
          $('#tamano').val('');
          $('#genero').val('');
          $('#color').val('');
          $('#modelo').val('');
          $('#estado').val('');
      }

      //llamadas a funciones
      save();

  })