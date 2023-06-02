
const path = require('path');
const fs = require('fs');

// /** Función extraída de la librería 
//  * https://www.npmjs.com/package/extract-md-links?activeTab=code 
//  * retorna un array de objetos con el texto
//  * del link en el key y la url en el value del objeto
//  * ejemplo [{'TEXTO1': 'https://www.google.com'}, {'TEXTO2': 'https://www.facebook.com'} ]
//  **/
// // funcion que lee el contenido y extrae los links
// function extraiLinks(markdownContent) {
//   const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s]*.[^\s]*)\)/gm;
//   const arrayResultados = []
//   let tmp;
//   while ((tmp = regex.exec(markdownContent)) !== null) { //Enquanto tmp for diferente de Null, percorra texto;
//     arrayResultados.push({ [tmp[1]]: tmp[2] }) //A chave é o índice 1 e o valor dessa chave é o índice 2
//   }
//   return arrayResultados.length === 0 ? [] : arrayResultados;
// }

// funcion que utiliza una expresión regular para extraer enlaces de contenido de Md 
//  y devuelve un array de objetos que contienen los textos de los enlaces y sus respectivas URLs.

function extraiLinks(markdownContent) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s]*.[^\s]*)\)/gm;
  return Array.from(markdownContent.matchAll(regex), match => ({ [match[1]]: match[2] }));
}


// funcion que lee el archivo e indica si es MD
function markdownFile(filePath) {
  const extension = path.extname(filePath);
  if (extension === '.md') {
    return true;
  } else {
    return false;
  }
}
// funcion que extrae los links
function extractLinksAndText(filePath) {
  const markdownContent = fs.readFile(filePath, 'utf-8');
  const links = extraiLinks(markdownContent);
  return links;
}

function validateIsFile(filePath) {
  // (stat)funcion para obtener información sobre un archivo o directorio en el sistema de archivos. 
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error('Error al obtener la información del archivo:', err);
      return false;
    }

    // Si es archivo entra al proceso, si no (directorio) sale del proceso.
    if (stats.isFile()) {
      const isMD = markdownFile(filePath);
      if (isMD) {
        console.log('Es un archivo Markdown');
        const links = extractLinksAndText(filePath);
        if (links.length > 0) {
          console.log('Enlaces encontrados:', links);
          return links
        } else {
          console.log('No hay enlaces en el archivo Markdown');
          return false;
        }
      } else {
        console.log('No es un archivo Markdown');
        return false;
      }
    } else {
      console.log('La ruta proporcionada es un directorio');
      return false;
    }
  });
}

module.exports = { markdownFile, extractLinksAndText, validateIsFile };


