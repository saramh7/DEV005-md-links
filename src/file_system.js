const { error } = require('console');
const fs = require('fs');
const path = require('path');

// fs.writeFile('./modulos/data1.txt', 'Sara Martinez', (error) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   }
// });

// fs.readFile('./README.md', 'utf-8', (error, data) => { console.log(data) });

const directorio = './modulos';

fs.readdir(directorio, (error, archivos) => {
  if (error) {
    console.error('Error al leer el directorio:', error);
    return;
  }

  console.log('Archivos en el directorio:', archivos);
});

const path1 = './modulos/';
const path2 = '/Users/patricioanabalon/workspace/DEV005-md-links';
fs.readdir(path.join(path2, path1), (error, archivos) => {
  if (error) {
    console.error('Error al leer el directorio:', error);
    return;
  }

  console.log('Archivos en el directorio:', archivos);
});