const mdLinks = require('./md.links');

const path = './README.md';
const options = { validate: true };

mdLinks(path, options)
  .then(links => {
    console.log('Links encontrados:', links);
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  }); 