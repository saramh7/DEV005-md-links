const axios = require('axios');
const { extractLinksAndText } = require('./markdown')


function mdLinks(filePath, options = { validate: false }) {
  return new Promise((resolve, rejects) => {
    try {
      const links = [];
      const extractLinks = extractLinksAndText(filePath);

      extractLinks.forEach((link) => {
        const linkObj = {
          href: Object.values(link)[0],
          text: Object.keys(link)[0],
          file: filePath,
        };

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
    } catch (error) {
      rejects('No pudimos procesar tu archivo.')
    }
  });
}

module.exports = mdLinks;