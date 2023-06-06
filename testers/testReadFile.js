const path = require('path');
const { readFileContent, isMarkdownFile, findLinksInMarkdown, pathIsAFile } = require('../src/readFile');

const pathReadmeFile = path.resolve(__dirname, '../Readme.md');

// Prueba si ruta corresponde a un archivo 
pathIsAFile(pathReadmeFile)
  .then((result) => {
    console.log('OK ->', result);

    // Prueba la función de lectura de archivo
    const content = readFileContent(pathReadmeFile);
    console.log('Contenido del archivo:', content);

    // Prueba la función de verificación de archivo Markdown
    const isMd = isMarkdownFile(pathReadmeFile);
    console.log('¿Es un archivo Markdown?', isMd);

    // Prueba la función de búsqueda de enlaces en archivo Markdown
    const links = findLinksInMarkdown(content);
    console.log('Enlaces encontrados:', links);
  })
  .catch((error) => {
    console.error('Error ->', error);
  });
