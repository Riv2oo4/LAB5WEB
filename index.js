const usuarioActual = "Yo";

function generarChat() {
    const contenedorChat = document.createElement("div");
    contenedorChat.classList.add('contenedor-chat'); 
    contenedorChat.style.width = "98vw";
    contenedorChat.style.height = "98vh";
    contenedorChat.style.border = "1px solid #ccc";
    contenedorChat.style.display = "flex";
    contenedorChat.style.flexDirection = "column";
    contenedorChat.style.justifyContent = "space-between";
    contenedorChat.style.position = "relative";
    const encabezado = document.createElement("div");
    encabezado.style.backgroundColor = "#333";
    encabezado.style.color = "white";
    encabezado.style.padding = "10px";
    encabezado.style.display = "flex";
    encabezado.style.justifyContent = "space-between";
    encabezado.style.alignItems = "center";
    encabezado.innerHTML = "<h1>ChatHugoUVG</h1><div id='dark-mode'>🌙</div>";
  
    const infoUsuario = document.createElement("div");
    infoUsuario.style.backgroundColor = "purple";
    infoUsuario.style.color = "white";
    infoUsuario.style.padding = "10px";
    infoUsuario.style.display = "flex";
    infoUsuario.style.alignItems = "center";
    infoUsuario.innerHTML = "<div id='user-avatar'>🍻🍻</span></div><h2>LOS SANTOS</h2>";
    
    const contenedorMensajes = document.createElement("div");
    contenedorMensajes.id = "mensajes";
    contenedorMensajes.style.flex = "1";
    contenedorMensajes.style.overflowY = "auto";
    contenedorMensajes.style.overflowX= "hidden";
    contenedorMensajes.style.padding = "10px";
    contenedorMensajes.style.display = "flex";
    contenedorMensajes.style.flexDirection = "column";
    contenedorMensajes.style.alignItems = "flex-end"; 
  
    const contenedorInput = document.createElement("div");
    contenedorInput.style.display = "flex";
    contenedorInput.style.alignItems = "center";
    contenedorInput.style.padding = "10px";
    contenedorInput.style.backgroundColor = "#f2f2f2";
    contenedorInput.style.borderTop = "1px solid #ccc";
    contenedorInput.innerHTML = "<input type='text' id='input-message' style='width: 80%;' placeholder='Escribe tu mensaje...'><span id='char-counter'>140</span><button id='send-button'>➤</button>";
  
    contenedorChat.appendChild(encabezado);
    contenedorChat.appendChild(infoUsuario);
    contenedorChat.appendChild(contenedorMensajes);
    contenedorChat.appendChild(contenedorInput);
  
    document.body.appendChild(contenedorChat);
    
    document.getElementById('send-button').addEventListener('click', function(){
        enviarMensaje();
        let objeto = document.getElementById('input-message');
        objeto.value = ""; 
    });
    document.getElementById('input-message').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            enviarMensaje();
            document.getElementById('input-message').value = ""; 
        }
    });

    document.getElementById('input-message').addEventListener('input', actualizarContadorCaracteres);

    document.getElementById('dark-mode').addEventListener('click', alternarModoOscuro);

    aplicarTema();
}

function enviarPost(data) {
    const url = "https://chat.arpanetos.lol/messages"; 
  
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Hubo un problema al enviar el POST.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Respuesta del servidor:", data);
        })
        .catch((error) => {
            console.error("Error al enviar POST:", error);
        });
}

function obtenerDatosDeAPI() {
    const url = "https://chat.arpanetos.lol/messages";
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("La solicitud no fue exitosa");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}

function mostrarMensajesObtenidos(lista) {
    for (let i = 0; i < lista.length; i++) {
        mostrarMensaje(lista[i].message, lista[i].username);
    }
}

function enviarMensaje() {
    var inputMensaje = document.getElementById('input-message');
    var mensaje = inputMensaje.value.trim();
    if (mensaje !== '') {
        if (mensaje.length > 140) {
            alert("El mensaje excede los 140 caracteres.");
        } else {
            mostrarMensaje(mensaje, usuarioActual); 
            inputMensaje.value = ''; 
            enviarPost({
                username: "Hugo",
                message: mensaje,
                created_at: new Date().toLocaleTimeString()
            });
            actualizarContadorCaracteres();
            inputMensaje.focus();
        }
    }
}


function aplicarTemaOscuro() {
    document.body.classList.add('modo-oscuro');
    const contenedorChat = document.querySelector('.contenedor-chat');
    if (contenedorChat) {
        contenedorChat.style.backgroundColor = 'black';
    }
}

function aplicarTemaClaro() {
    document.body.classList.remove('modo-oscuro');
    const contenedorChat = document.querySelector('.contenedor-chat');
    if (contenedorChat) {
        contenedorChat.style.backgroundColor = 'white';
    }
}

function alternarModoOscuro() {
    const iconoModoOscuro = document.getElementById('dark-mode');
    const currentIcon = iconoModoOscuro.textContent;
    iconoModoOscuro.textContent = currentIcon === '🌙' ? '☀️' : '🌙';
    const modoOscuroActivado = currentIcon === '🌙';
    localStorage.setItem('modoOscuro', modoOscuroActivado);
    localStorage.setItem('iconoModoOscuro', iconoModoOscuro.textContent); 
    aplicarTema();
}

function aplicarTema() {
    let modoOscuroActivado = localStorage.getItem('modoOscuro') === 'true';
    const iconoModoOscuro = localStorage.getItem('iconoModoOscuro');
    const elementoIconoModoOscuro = document.getElementById('dark-mode');

    if (iconoModoOscuro) {
        elementoIconoModoOscuro.textContent = iconoModoOscuro;
    }

    if (modoOscuroActivado) {
        aplicarTemaOscuro();
    } else {
        aplicarTemaClaro();
    }

    actualizarTemaMensajes(); 

    const mensajesEnviados = document.querySelectorAll('.enviado');
    mensajesEnviados.forEach(mensaje => {
        aplicarTemaMensajeEnviado(mensaje);
    });
}

function actualizarContadorCaracteres() {
    var inputMensaje = document.getElementById('input-message');
    var contadorCaracteres = document.getElementById('char-counter');
    var caracteresRestantes = 140 - inputMensaje.value.length;
    if (caracteresRestantes < 0) {
        caracteresRestantes = 0;
        inputMensaje.value = inputMensaje.value.slice(0, 140);
    }
    contadorCaracteres.textContent = caracteresRestantes;
}

function mostrarMensaje(mensaje, remitente) {
    var contenedorMensajes = document.getElementById('mensajes');
    var elementoMensaje = document.createElement('div');

    elementoMensaje.textContent = mensaje; 
    elementoMensaje.classList.add('mensaje');
    elementoMensaje.style.padding = '10px';
    elementoMensaje.style.margin = '5px 0'; 

    if (remitente === usuarioActual) {
        elementoMensaje.classList.add('enviado');
        elementoMensaje.style.alignSelf = 'flex-end'; 
        aplicarTemaMensajeEnviado(elementoMensaje);
    } else {
        elementoMensaje.classList.add('recibido');
        elementoMensaje.style.alignSelf = 'flex-start'; 
        aplicarTemaMensajeRecibido(elementoMensaje);
    }

    contenedorMensajes.appendChild(elementoMensaje);
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;


}

function aplicarTemaMensajeEnviado(elementoMensaje) {
    const modoOscuroActivado = localStorage.getItem('modoOscuro') === 'true';
    if (modoOscuroActivado) {
        elementoMensaje.style.backgroundColor = 'purple'; 
        elementoMensaje.style.color = '#fff'; 
    } else {
        elementoMensaje.style.backgroundColor = '#dcf8c6'; 
        elementoMensaje.style.color = 'black'; 
    }
}

function aplicarTemaMensajeRecibido(elementoMensaje) {
    const modoOscuroActivado = localStorage.getItem('modoOscuro') === 'true';
    if (modoOscuroActivado) {
        elementoMensaje.style.backgroundColor = 'white'; 
        elementoMensaje.style.color = 'black'; 
    } else {
        elementoMensaje.style.backgroundColor = 'black'; 
        elementoMensaje.style.color = 'white'; 
    }
}

function actualizarTemaMensajes() {
    const mensajes = document.querySelectorAll('.mensaje');
    mensajes.forEach(mensaje => {
        aplicarTemaMensaje(mensaje);
    });
}

function aplicarTemaMensaje(elementoMensaje) {
    const modoOscuroActivado = localStorage.getItem('modoOscuro') === 'true';
    if (modoOscuroActivado) {
        if (!elementoMensaje.classList.contains('enviado')) { 
            elementoMensaje.style.backgroundColor = 'white'; 
            elementoMensaje.style.color = 'black'; 
        }
    } else {
        if (!elementoMensaje.classList.contains('enviado')) { 
            elementoMensaje.style.backgroundColor = 'black'; 
            elementoMensaje.style.color = 'white'; 
        }
    }
}

actualizarTemaMensajes();

obtenerDatosDeAPI()
function actualizarMensajesDeAPI() {
    obtenerDatosDeAPI()
        .then(lista => {
            lista.reverse();
            mostrarMensajesObtenidos(lista);
        })
        .catch(error => console.error("Error al obtener mensajes de la API:", error));
}
actualizarMensajesDeAPI();
setInterval(actualizarMensajesDeAPI, 5000); 

