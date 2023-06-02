const readFile = require('../src/readFile.js');
const isMarkdownFile = require('../src/readFile.js');
const findLinksInMarkdown = require('../src/readFile.js');

const filePath = '../README.md';

// Prueba la función de lectura de archivo
const content = readFile(filePath);
console.log('Contenido del archivo:', content);

// Prueba la función de verificación de archivo Markdown
const isMd = isMarkdownFile(filePath);
console.log('¿Es un archivo Markdown?', isMd);

// Prueba la función de búsqueda de enlaces en archivo Markdown
const links = findLinksInMarkdown(content);
console.log('Enlaces encontrados:', links);