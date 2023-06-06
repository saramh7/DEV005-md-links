const axios = require('axios');

function checkLinkHttpStatus(linkData) {
  return axios.head(linkData.href)
    .then((response) => {
      linkData.status = response.status;
      linkData.ok = (response.status >= 200 && response.status < 400) ? 'ok' : 'fail';
      return linkData;
    })
    .catch((error) => {
      if (error.response) {
        linkData.status = error.response.status;
      } else if (error.request) {
        linkData.status = error.code;
      } else {
        linkData.status = error.message;
      }
      linkData.ok = 'fail';
      return linkData;
    });
}

function validateLinks(links, options, filePath) {
  // función que recibe un link y crea objeto con formato de retorno solicitado
  // si la opción de validación está activa llama a checkLinkHttpStatus para verificar la url
  const processLink = (link) => {
    const linkData = {
      href: link.url,
      text: link.text,
      filePath: filePath,
    };

    if (options.validate === true) {
      const linkDataWithStatus = checkLinkHttpStatus(linkData)
      return linkDataWithStatus;
    } else {
      return linkData
    }
  };

  const promises = links.map(link => processLink(link));

  return Promise.all(promises)
    .then(arrayLinks => {
      return arrayLinks;
    })
    .catch(error => {
      console.error('Error al validar los enlaces:', error);
      throw error;
    });
}

module.exports = validateLinks;