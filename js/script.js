import {encriptar,desencriptar} from './encriptartexto.js'
import Encriptador from './encriptararchivo.js'

const encriptador = new Encriptador();

//----------------------------------------------------------------
// menu para dispositivos no pc
//----------------------------------------------------------------
var botonMenuBarra = document.getElementById('boton_menu_barra');
var menu = document.getElementById('menu');

botonMenuBarra.addEventListener('click', function() {
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      menu.classList.add('visible');
    } else {
      menu.classList.remove('visible');
      menu.classList.add('hidden');
    }
});

//----------------------------------------------------------------
// Boton Encriptar - Desencriptar y Enviar
//----------------------------------------------------------------

var botonEncriptar = document.getElementById('boton_d_encriptar');
var textoEntrada = document.getElementById('entrada');
var botonEnviar = document.getElementById('btn_enviar');
var descripcion = document.getElementById('info_e_d');
var chatMensajes = document.getElementById('chat_mensajes');    
var entrada = document.getElementById('entrada');
var fondo = document.querySelector('.chat')
var estaEncriptado = true;
localStorage.setItem('estaEncriptado', String(estaEncriptado));
var valorBooleano = localStorage.getItem('estaEncriptado');
var estaEncriptado = valorBooleano === 'true';
var salida="";

function btnEncriptar() {
    if (estaEncriptado==false) {        
        textoEntrada.value = '';
        textoEntrada.placeholder = '¿Qué deseas encriptar?';
        botonEncriptar.textContent = 'Desencriptar';
        descripcion.textContent = "Para encriptar el texto se debe tener en cuenta; escribir con letras minúsculas y sin acentos.";
        estaEncriptado = true;    
    } else {               
        textoEntrada.value = '';
        textoEntrada.placeholder = '¿Qué deseas desencriptar?';
        botonEncriptar.textContent = 'Encriptar';
        descripcion.textContent = "El texto desencriptado aparecera en el chat actual.";
        estaEncriptado = false;    
    }
}

function bntEnviar(){
    fondo.style.backgroundImage = "none";

    if (estaEncriptado) {   
        salida=encriptar(entrada.value);
    } else {
        salida=desencriptar(entrada.value);
    }

    encriptador.agregarTextos(entrada.value,salida)

    var mensaje = document.createElement('div');
    mensaje.classList.add('mensajes_entrada');
    mensaje.textContent = entrada.value;

    var mensaje_salida = document.createElement('div');
    mensaje_salida.classList.add('mensajes_salida');
    mensaje_salida.textContent = salida;

    chatMensajes.appendChild(mensaje);
    entrada.value = '';

    chatMensajes.appendChild(mensaje_salida);
    entrada.value = '';
}


botonEncriptar.onclick = btnEncriptar;
botonEnviar.onclick = bntEnviar;
textoEntrada.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      bntEnviar();
    }
  });

//-----------------------------------------------------------------
// Botones encriptar y desencritar archivos, ademas, descargar chat
//-----------------------------------------------------------------

var eArchivo = document.getElementById('encriptar_archivo');
var desArchivo = document.getElementById('desencriptar_archivo');
var desHistorial = document.getElementById('descargar_historial_chat');

function encriptarArchivo(event){
    var archivo = event.target.files[0];
    console.log('Archivo seleccionado:', archivo.name);
    encriptador.encriptarDesencriptarArchivo(archivo,archivo.name,true);
}

function desencriptarArchivo(event){
    var archivo = event.target.files[0];
    console.log('Archivo seleccionado:', archivo.name);
    encriptador.encriptarDesencriptarArchivo(archivo,archivo.name,false);
}

function descargarArchivoTexto(){
    encriptador.descargarChat();
}

eArchivo.onchange = encriptarArchivo;
desArchivo.onchange = desencriptarArchivo;
desHistorial.onclick = descargarArchivoTexto;