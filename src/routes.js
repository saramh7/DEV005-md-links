const fs = require('fs');
const path = require('path');
const { isAbsolute } = require('path');


// funcion para validar una ruta
function pathValid(path) {
  return fs.existsSync(path);
}

// funcion que verifica si una ruta es absoluta o no
// si es relativa la convierte en absoluta
function pathInfo(filePath) {
  if (!fs.existsSync(filePath)) {
    return {
      path: filePath,
      exists: false,
      type: "Invalid"
    };
  }

  const isPathAbsolute = path.isAbsolute(filePath);
  const absolutePath = isPathAbsolute ? filePath : path.resolve(filePath);

  return {
    path: absolutePath,
    exists: true,
    type: "Absolute"
  };
}

module.exports = pathInfo;
