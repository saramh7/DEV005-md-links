const fs = require('fs');
const path = require('path');

//Lee información del archivo
function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

//Indica si el archivo tiene extensión .md
function isMarkdownFile(filePath) {
  const fileExtension = path.extname(filePath);
  return fileExtension === '.md';
}

//Indica si ruta corresponde a un directorio o a un archivo
function pathIsAFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error al obtener la información del archivo:', err);
        reject(false);
      } else {
        if (stats.isFile()) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    });
  });
}

/** 
 * Función que devuelve un array de objetos que contienen los textos de los enlaces y sus respectivas URLs.
 * Utiliza una expresión regular para extraer enlaces desde el contenido del archivo .md 
 * */
function findLinksInMarkdown(content) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^\)]*)\)/gm;
  const links = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const text = match[1];
    const url = match[2];
    links.push({ text, url });
  }

  return links;
}


module.exports = { readFileContent, isMarkdownFile, findLinksInMarkdown, pathIsAFile };