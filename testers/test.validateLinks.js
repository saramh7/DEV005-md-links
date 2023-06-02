const validateLinks = require('./validateLinks');


// Llama a la función validateLinks con los argumentos necesarios
validateLinks('../README.md', { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

