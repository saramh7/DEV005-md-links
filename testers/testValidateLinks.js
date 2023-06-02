const validateLinks = require('../src/validateLinks.js');

const links = [
  {
    text: 'Array.prototype.sort() - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
  },
  {
    text: 'Array.prototype.reduce() - MDN',
    url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
  },
  {
    text: 'Función Callback - MDN',
    url: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
  },
  {
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
  },
];

validateLinks(links, { validate: true }, './README.MD')
  .then((resultLinks) => {
    console.log('OK ->', resultLinks);
  })
  .catch((error) => {
    console.error('Error ->', error);
  });