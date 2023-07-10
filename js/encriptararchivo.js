export class Encriptador{

  constructor(){
    this.textos={};
  }

  encriptarDesencriptarArchivo(pArchivo,pNombre,tipo){
    
    const fileReader = new FileReader();
  
    fileReader.onload = function(event) {
      const arrayBuffer = event.target.result;
      const dataView = new DataView(arrayBuffer);
      
      const bytesActualizados = new Uint8Array(arrayBuffer.byteLength);
      
      for (let i = 0; i < arrayBuffer.byteLength; i++) {
        const byteOriginal = dataView.getUint8(i);
        var byteActualizado = 0;
        if (tipo){
          byteActualizado = byteOriginal - 200;
        }else{
          byteActualizado = byteOriginal + 200;
        }        
        bytesActualizados[i] = byteActualizado;
      }

      const nuevoArchivo = new Blob([bytesActualizados], { type: pArchivo.type });
      const url = URL.createObjectURL(nuevoArchivo);
      
      const link = document.createElement('a');
      link.href = url;
      if (tipo) {
        link.download = `encriptado_${pNombre}`;
      }else{
        link.download = `desencriptado_${pNombre}`;
      }
            
      document.body.appendChild(link);
      
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    fileReader.readAsArrayBuffer(pArchivo);
  }

  descargarArchivo(contenido, nombreArchivo){
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    
    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  descargarChat(){    
    const contenido = this.convertirDiccionarioAString(this.textos);
    const nombreArchivo = "chat.txt";
    
    const archivo = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(archivo);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    
    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  convertirDiccionarioAString(diccionario) {
    console.log(diccionario)
    let contenido = "";    
    for (const clave in diccionario) {
      if (diccionario.hasOwnProperty(clave)) {
        contenido += `${clave}: ${diccionario[clave]}\n`;
      }
    }    
    return contenido;
  }

  agregarTextos(pTexto, pSalida){
    this.textos[pTexto] = pSalida;
  }
}

export default Encriptador;