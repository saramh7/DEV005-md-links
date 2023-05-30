
const path = require('path');
const fs = require('fs');

/** Función extraída de la librería 
 * https://www.npmjs.com/package/extract-md-links?activeTab=code 
 * retorna un array de objetos con el texto
 * del link en el key y la url en el value del objeto
 * ejemplo [{'TEXTO1': 'https://www.google.com'}, {'TEXTO2': 'https://www.facebook.com'} ]
 **/
function extraiLinks(markdownContent) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s]*.[^\s]*)\)/gm;
  const arrayResultados = []
  let tmp;
  while ((tmp = regex.exec(markdownContent)) !== null) { //Enquanto tmp for diferente de Null, percorra texto;
    arrayResultados.push({ [tmp[1]]: tmp[2] }) //A chave é o índice 1 e o valor dessa chave é o índice 2
  }
  return arrayResultados.length === 0 ? [] : arrayResultados;
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
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  const links = extraiLinks(markdownContent);
  return links;
}

module.exports = { markdownFile, extractLinksAndText };


