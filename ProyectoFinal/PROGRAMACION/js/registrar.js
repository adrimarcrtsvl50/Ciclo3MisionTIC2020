const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    appellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    id: /^\d{7,14}$/, // numeros.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

}

const campos = {
    nombre: false,
    apellido: false,
    id: false,
    password: false,
    email: false,

}
const validarFormulario = (e) => {

    console.log(e.target.name)
    switch (e.target.name) {

        case "first_name":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "last_name":
            validarCampo(expresiones.appellido, e.target, 'apellido');
            break;
        case "id":
            validarCampo(expresiones.id, e.target, 'id');
            break;
        case "email":
            validarCampo(expresiones.correo, e.target, 'email');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;

    }
}
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.nombre && campos.apellido && campos.password && campos.email && campos.id && terminos.checked) {
        save()
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 2000);
    }


});

//metodo de guardar datos
const save = () => {
    console.log("me diste")
    const id = document.getElementById('numid').value
    const apellido = document.getElementById('appellido').value
    const contrasena = document.getElementById('password').value
    const email = document.getElementById('email').value
    const nombre = document.getElementById('name').value
    const tipo = document.getElementById('tipous').value
    const tipodedocumento = document.getElementById('tipodoc').value
    console.log(id, apellido, contrasena, email, nombre, tipo, tipodedocumento)
    fetch('http://localhost:8080/profiles', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                apellido: apellido,
                contrasena: contrasena,
                email: email,
                nombre: nombre,
                tipo: tipo,
                tipodedocumento: tipodedocumento
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        /*
    $.ajax({
        url: 'http://localhost:8080/profiles',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
            id: id,
            apellido: apellido,
            contrasena: contrasena,
            email: email,
            nombre: nombre,
            tipo: tipo,
            tipodedocumento: tipodedocumento
        }),
        dataType: 'json',
*/
}