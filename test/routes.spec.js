const pathInfo = require('./../src/routes');
const routes = require('./../src/routes')
const path = require('path');
const fs = require('fs');

// Mock para fs.existsSync
jest.mock('fs');
jest.mock('path');
fs.existsSync.mockReturnValue(true);
path.isAbsolute.mockReturnValue(true);

describe('pathInfo', () => {
  it('deberia llamar a fs.existsSync con la ruta proporcionada', () => {
    const route = './../README.md';
    pathInfo(route);

    expect(fs.existsSync).toHaveBeenCalledWith(route);
  });

  it('deberia llamar a path.isAbsolute con la ruta proporcionada', () => {
    const route = './../Readme_lite.md';
    pathInfo(route);

    expect(path.isAbsolute).toHaveBeenCalledWith(route);
  });

  it('deberia devolver informacion sobre una ruta absoluta', () => {
    const route = './../README.md';
    const resultado = pathInfo(route);

    expect(resultado.path).toEqual(route);
    expect(resultado.exists).toBe(true);
    expect(resultado.type).toEqual('Absolute')
  })

})


