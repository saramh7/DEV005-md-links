const fs = require('fs');
const path = require('path');

// funcion que lee archivo
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// funcion que indica si es un archivo MD

function isMarkdownFile(filePath) {
  const fileExtension = path.extname(filePath);
  return fileExtension === '.md';
}
// funcion que utiliza una expresión regular para extraer enlaces de contenido de Md 
//  y devuelve un array de objetos que contienen los textos de los enlaces y sus respectivas URLs.

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


module.exports = { readFile, isMarkdownFile, findLinksInMarkdown };