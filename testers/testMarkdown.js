const path = require('path');
const fs = require('fs');
const { markdownFile, extractLinksAndText } = require('./markdown');


const filePath = path.resolve(__dirname, '../README.md');
// '/Users/patricioanabalon/workspace/DEV005-md-links';

// funcion para obtener información sobre un archivo o directorio en el sistema de archivos. 
fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error('Error al obtener la información del archivo:', err);
    return;
  }

  // Si es archivo entra al proceso, si no (directorio) sale del proceso.
  if (stats.isFile()) {
    const isMD = markdownFile(filePath);
    if (isMD) {
      console.log('Es un archivo Markdown');
      const links = extractLinksAndText(filePath);
      if (links.length > 0) {
        console.log('Enlaces encontrados:', links);
      } else {
        console.log('No hay enlaces en el archivo Markdown');
        return;
      }
    } else {
      console.log('No es un archivo Markdown');
      return;
    }
  } else {
    console.log('La ruta proporcionada es un directorio');

  }
});

