
const fs = require('fs');
const path = require('path');

// función para validar una ruta
function infoPath(filePath) {
  if (fs.existsSync(filePath)) {
    return true
  } else {
    return false
  }
}

// función que verifica si una ruta es absoluta o no
// si es relativa la convierte en absoluta
function convertToAbsolutePath(filePath) {
  const isPathAbsolute = path.isAbsolute(filePath);
  const absolutePath = isPathAbsolute ? filePath : path.resolve(filePath);

  return absolutePath
}


module.exports = { infoPath, convertToAbsolutePath }; 
