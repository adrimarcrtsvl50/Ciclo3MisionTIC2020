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
                      color: $('#color').val(),
                      edad: $('#edad1').val(),
                      estado: $('#estado').val(),
                      genero: $('#genero').val(),
                      marca: $('#marca').val(),
                      modelo: $('#modelo').val(),
                      precio: $('#precio').val(),
                      tamano: $('#tamano').val(),
                      tipo: $('#tipo').val(),
                  }
                  $.ajax({
                      url: 'http://localhost:8080/bikes',
                      contentType: 'application/json',
                      type: 'POST',
                      data: JSON.stringify(datosBike),
                      dataType: 'json',
                      success: (data) => {
                          resert();
                          const alert = document.querySelector('.alert')

                          setTimeout(function() {
                              alert.classList.add('hide')
                          }, 2000)
                          alert.classList.remove('hide')
                          console.log('bike registrado!')
                      }


                  })
              })
          }
          //metodo para limpiar el formulario
      const resert = () => {
          $('#color').val('');
          $('#edad1').val('');
          $('#estado').val('');
          $('#genero').val('');
          $('#marca').val('');
          $('#modelo').val('');
          $('#precio').val('');
          $('#tamano').val('');
          $('#tipo').val('');
      }

      //llamadas a funciones
      save();

  })