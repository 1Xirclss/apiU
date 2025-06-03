//URL DE LA API
const API_URL = "https://retoolapi.dev/EdlGOC/data";

//FUNCION QUE MANDA A TRAER AL JSON
async function obetnerPersonas() {
  //La respuesta del servidor
  const res = await fetch(API_URL); //SE HACE UNA LLAMADA AL ENDPOINT

  //Pasamos a JSON la repsuesta del servidor
  const data = await res.json(); //ESTO ES UN JSON

  //ENVIAMOS EL JSON QUE NOS MANDA A LA API A LA FUNCION QUE CREA LA TABLA EN HTML
  mostrarDatos(data);
}

//LA FUNCION LLEVA PARAMETRO "DATOS" QUE REPRESENTA AL JSON
function mostrarDatos(datos) {
  //SE LLAMA AL TBODY DENTRO DEL ELEMENTO CON ID "tabla"
  const tabla = document.querySelector("#tabla tbody");
  //PARA INYECTAR CODIGO HTML USAMOS innerHTML
  tabla.innerHTML = ""; //VACIA EL CONTENIDO DE LA taBLA

  datos.forEach((persona) => {
    tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.email}</td>
            <td>${persona.edad}</td>
            <td>
              <button>Editar</button>
              <button onClick="EliminarPersona(${persona.id})">Eliminar</button>  
            </td>
        </tr>
        `;
  });
}
//llamado incial para que se carguen los datos que vienen del servidor
obetnerPersonas();







//Agregar un nuevo registro
const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click" , () => {
  modal.showModal(); //Abrir el modal al hacer click en el boton
});


btnCerrar.addEventListener("click" , () => {
  modal.close(); //Cerrar Modal
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
  e.preventDefault(); //"e" representa al evento "submit" evita que ele formularo se envie de golpe

  //Capturar los valores del formulario
const nombre = document.getElementById("nombre").value.trim();
const apellido = document.getElementById("apellido").value.trim();
const email = document.getElementById("email").value.trim();
const edad = document.getElementById("edad").value.trim();

//validacion basica
if(!nombre || !apellido || !email || !edad){
  alert("Complete todos los campos");
  return; //evitar que el formulario se envie
};

//Llamamos a la API para enviar el usuario
const respuesta = await fetch(API_URL, {
  method: "POST", 
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify({nombre,apellido,email,edad})
});

if(respuesta.ok){
  alert("El registro fue agregado correctamente");

  //Limpiar el formulario y cerrar el modal
  document.getElementById("frmAgregar").reset();
  document.getElementById("frmAgregar").close();
  //Recagar la tabla 
  obetnerPersonas();
}
else{
  alert("Hubo un error al agregar");
}

});





//Funcion para borrar registros
async function EliminarPersona(id){
  const confirmacion = confirm("¿Estas seguro que deseas borrar este registro?");

  //Validamos si el usuario dijo que si desea borrar
  if(confirmacion){
    await fetch(`${API_URL}/${id}`, {method: "DELETE"});

    //Recargamos la tabla para ver la eliminacion
    obetnerPersonas();
  }

}
  


