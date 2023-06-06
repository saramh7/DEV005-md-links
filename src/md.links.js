const { infoPath, convertToAbsolutePath } = require('./validateRoutes')
const { readFileContent, isMarkdownFile, findLinksInMarkdown, pathIsAFile } = require('./readFile')
const validateLinks = require('./validateLinks')

function mdLinks(filePath, options = { validate: false }) {
  console.log('Procesando.....')
  return new Promise((resolve, rejects) => {
    try {
      if (infoPath(filePath)) {
        const absolutePath = convertToAbsolutePath(filePath)
        console.log('Path Absoluto:', absolutePath);

        pathIsAFile(absolutePath)
          .then((result) => {
            const isMD = isMarkdownFile(absolutePath)
            if (isMD === true) {
              console.log('Procesando Archivo Markdown...');
              const content = readFileContent(absolutePath);

              console.log('Encontrando Links en el texto...');
              const links = findLinksInMarkdown(content);

              if (links.length > 0) {
                console.log('Procesando Links...');
                resolve(validateLinks(links, options, absolutePath))
              } else {
                rejects('No se encontraron links en el texto del archivo.');
              }
            } else {
              rejects('El archivo proporcionado no tiene extensión .md.');
            }
          })
          .catch((error) => {
            rejects('La ruta proporcionada es un directorio.');
          });

      } else {
        rejects(`No se encuentra ruta: ${filePath}`)
      }
    } catch (error) {
      rejects('No pudimos procesar tu archivo. Por favor verifica la ruta proporcionada')
    }
  })
}

module.exports = mdLinks;