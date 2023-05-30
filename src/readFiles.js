const axios = require('axios');
const { error } = require('console');
const path = require('path');

function readFiles(directoryPath) {
  return axios.get(directoryPath)
    .then(response => {
      const files = response.data;

      const filePromises = files.map(file => {
        const filePath = path.join(directoryPath, file);

        return axios.head(filePath)
          .then(fileResponse => {
            if (fileResponse.headers['content-type'] !== 'text/html') {
              return filePath;
            }
          })
          .catch(error => {
            console.log(`Error al leer el archivo ${filePath}:`, error);
          });
      });

      return Promise.all(filePromises)
        .then(resolvedFiles => resolvedFiles.filter(Boolean));
    })
    .catch(error => {
      console.error('Error al leer los archivos:', error);
      return [];
    });
}

const directoryPath = 'https:../../readFiles.js';

readFiles(directoryPath)
  .then(files => {
    console.log('Archivos encontrados:', files);
  })
  .catch(err => {
    console.error('Error a leer los archivos:', err);
  });


