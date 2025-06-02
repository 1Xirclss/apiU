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
              <button>Eliminar</button>  
            </td>
        </tr>
        `;
  });
}
//llamado incial para que se carguen los datos que vienen del servidor
obetnerPersonas();
