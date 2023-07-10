
const llaves = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

export function encriptar(texto){
    texto = texto.toLowerCase();
    for(let i = 0; i < llaves.length; i++){
        if(texto.includes(llaves[i][0])){
            texto = texto.replaceAll(llaves[i][0], llaves[i][1]);
        }
    }
    return texto;
}

export function desencriptar(texto){
    texto = texto.toLowerCase();
    for(let i = 0; i < llaves.length; i++){
      if(texto.includes(llaves[i][0])){
        texto = texto.replaceAll(llaves[i][1], llaves[i][0]);
      }
    }
    return texto;
}

export function descargar(){
    
}


