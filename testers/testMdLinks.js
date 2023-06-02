const mdLinks = require('../src/md.links');

const path = './testers';
const options = { validate: true };

mdLinks(path, options)
  .then(links => {
    console.log('Links encontrados:', links);
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  }); 