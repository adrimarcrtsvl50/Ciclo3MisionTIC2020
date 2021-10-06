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
              $('#btn_Regis').on('click', function() {
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
                      }
                  })
              })
          }
          //eliminar una lista de la bicicletas
      const deleteBikes = () => {
              $(document).on('click', '#btn_Elim', function() {

                  let detalle = document.getElementById('serial');
                  let id = $(detalle).val();
                  console.log(id)
                  $.ajax({
                      url: 'http://localhost:8080/bikes/' + id,
                      contentType: 'application/json',
                      type: 'DELETE',
                      dataType: 'json',
                      success: (data) => {

                          const alert = document.querySelector('.alert')
                          setTimeout(function() {
                              alert.classList.add('hide')
                          }, 2000)
                          alert.classList.remove('hide')
                          resert1();
                      }

                  });

              })

          }
          //metodo de modificar los datos 
      const modificarBike = () => {
              $(document).on('click', '#btn_cons', function() {

                  let detalle = document.getElementById('serialm');
                  let id = $(detalle).val();
                  console.log(id)
                  $.ajax({
                      url: 'http://localhost:8080/bikes/' + id,
                      type: 'GET',
                      dataType: 'json',
                      success: function(res) {
                          const data = res
                          mostrarProductos(data)


                      }

                  });

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

      const resert1 = () => {
          $('#serial').val('');

      }


      //llamadas a funciones
      save();
      deleteBikes();
      modificarBike();

  })
  const items = document.querySelector('#tbody_modi')
  const mostrarProductos = (data) => {
      console.log("mostrar", data)
      items.innerHTML = ''
      const template = document.querySelector('#template_modificar').content
      const fragment = document.createDocumentFragment()
      Object.values(data).forEach(producto => {
          //console.log("dentro", producto)
          template.querySelector('.marca_mod').textContent = producto.marca

          const clone = template.cloneNode(true)
              //console.log(clone)
          fragment.appendChild(clone)
              //console.log(fragment)

      })
      items.appendChild(fragment)
      console.log(items)
  }