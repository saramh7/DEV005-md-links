const axios = require('axios');
const { markdownFile, extractLinksAndText, validateIsFile } = require('./markdown')
const pathInfo = require('./routes')

//Retorna el resultado de la ruta, y la convierte a absoluta
const pathInfoData = pathInfo(filePath)
function mdLinks(filePath, options = { validate: false }) {
  const pathInfoData = pathInfo(filePath);

  if (pathInfoData.type === 'Absolute') {

    return new Promise((resolve, rejects) => {
      try {
        const isMD = markdownFile(pathInfoData.path)
        if (isMD) {
          const links = [];
          //llama a funcion que extrae links del archivo MD y los retorna en array.
          const extractLinks = extractLinksAndText(pathInfoData.path);

          // acceder al primer valor de un objeto "link" y obtener su propiedad "href" Object.values(link)[0]
          // acceder al primer nombre de propiedad de un objeto "link" y obtenerlo como texto.  text: Object.keys(link)[0],
          if (extractLinks.length > 0) {
            let linkCount = 0;

            const axios = require('axios');
            const { markdownFile, extractLinksAndText, validateIsFile } = require('./markdown')
            const pathInfo = require('./routes')

            function mdLinks(filePath, options = { validate: false }) {

              //Retorna el resultado de la ruta, y la convierte a absoluta
              const pathInfoData = pathInfo(filePath)

              if (pathInfoData.type === 'Absolute') {
                return new Promise((resolve, rejects) => {
                  try {
                    const isMD = markdownFile(pathInfoData.path)
                    if (isMD) {
                      const links = [];
                      //llama a funcion que extrae links del archivo MD y los retorna en array.
                      const extractLinks = extractLinksAndText(pathInfoData.path);

                      // acceder al primer valor de un objeto "link" y obtener su propiedad "href" Object.values(link)[0]
                      // acceder al primer nombre de propiedad de un objeto "link" y obtenerlo como texto.  text: Object.keys(link)[0],
                      if (extractLinks.length > 0) {
                        extractLinks.forEach((link) => {
                          const linkObj = {
                            href: Object.values(link)[0],
                            text: Object.keys(link)[0],
                            file: pathInfoData.path,
                          };
                          // HEAD obtiene la información de encabezado de la respuesta HTTP, sin descargar el cuerpo completo de la respuesta.
                          if (options.validate) {
                            axios.head(linkObj.href)
                              .then((response) => {
                                linkObj.status = response.status;
                                linkObj.ok = response.status >= 200 && response.status < 400 ? "ok" : "fail";
                                links.push(linkObj);
                                if (links.length === extractLinks.length) {
                                  resolve(links);
                                }
                              })
                              .catch((error) => {
                                if (error.response) {
                                  linkObj.status = error.response.status;
                                } else if (error.request) {
                                  linkObj.status = error.code;
                                } else {
                                  linkObj.status = error.message;
                                }
                                linkObj.ok = "fail";
                                links.push(linkObj);
                                if (links.length === extractLinks.length) {
                                  resolve(links);
                                }
                              });
                          } else {
                            links.push(linkObj);
                            if (links.length === extractLinks.length) {
                              resolve(links);
                            }
                          }
                        });
                      } else {
                        resolve('El archivo no tiene links.')
                      }
                    } else {
                      rejects('No es un archivo Markdown.')
                    }
                  } catch (error) {
                    rejects('No pudimos procesar tu archivo.')
                  }
                })
              } else {
                return new Promise((resolve, rejects) => {
                  rejects('La ruta del archivo es inválida.')
                })
              }
            }

            module.exports = mdLinks;
            extractLinks.forEach((link) => {
              const linkObj = {
                href: Object.values(link)[0],
                text: Object.keys(link)[0],
                file: pathInfoData.path,
              };
              // HEAD obtiene la información de encabezado de la respuesta HTTP, sin descargar el cuerpo completo de la respuesta.
              if (options.validate) {
                axios.head(linkObj.href)
                  .then((response) => {
                    linkObj.status = response.status;
                    linkObj.ok = response.status >= 200 && response.status < 400 ? "ok" : "fail";
                    links.push(linkObj);
                    if (links.length === extractLinks.length) {
                      resolve(links);
                    }
                  })
                  .catch((error) => {
                    if (error.response) {
                      linkObj.status = error.response.status;
                    } else if (error.request) {
                      linkObj.status = error.code;
                    } else {
                      linkObj.status = error.message;
                    }
                    linkObj.ok = "fail";
                    links.push(linkObj);
                    if (links.length === extractLinks.length) {
                      resolve(links);
                    }
                  });
              } else {
                links.push(linkObj);
                if (links.length === extractLinks.length) {
                  resolve(links);
                }
              }
            });
          } else {
            resolve('El archivo no tiene links.')
          }
        } else {
          rejects('No es un archivo Markdown.')
        }
      } catch (error) {
        rejects('No pudimos procesar tu archivo.')
      }
    })
  } else {
    return new Promise((resolve, rejects) => {
      rejects('La ruta del archivo es inválida.')
    })
  }
}

module.exports = mdLinks;