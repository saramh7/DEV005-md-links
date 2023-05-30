
const path = require('path');
const fs = require('fs');
const { markdownFile, extractLinks } = require('./markdown');


const filePath = path.resolve(__dirname, '../README.md');
// '/Users/patricioanabalon/workspace/DEV005-md-links';

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error('Error al obtener la información del archivo:', err);
    return;
  }

  if (stats.isFile()) {
    const isMD = markdownFile(filePath);
    if (isMD) {
      console.log('Es un archivo Markdown');
      const links = extractLinks(filePath);
      console.log('Enlances encontrados:', links);
    } else {
      console.log('No es un archivo Markdown');
    }
  } else {
    console.log('La ruta proporcionada es un directorio');
  }
});

