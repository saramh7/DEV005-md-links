const { infoPath, convertToAbsolutePath } = require('../src/validateRoutes');
const path = require('path');
const fs = require('fs');

// Mock para fs.existsSync
jest.mock('fs');
jest.mock('path');
path.isAbsolute.mockReturnValue(true);
path.resolve.mockReturnValue(true);


describe('infoPath', () => {
  it('debería llamar a fs.existsSync con la ruta proporcionada', () => {
    fs.existsSync.mockReturnValue(true);
    const route = '../README.md';

    infoPath(route);

    expect(fs.existsSync).toHaveBeenCalledWith(route);
  });

  it('debería retornar falso para una ruta que no existe', () => {
    fs.existsSync.mockReturnValue(false);
    const route = '../mock-path.test';

    const resultado = infoPath(route);

    expect(fs.existsSync).toHaveBeenCalledWith(route);
    expect(resultado).toBe(false);
  });

  it('debería llamar a path.isAbsolute con la ruta proporcionada', () => {
    const route = '../Readme_lite.md';

    convertToAbsolutePath(route);

    expect(path.isAbsolute).toHaveBeenCalledWith(route);
  });

  it('debería llamar a path.resolve con la ruta proporcionada', () => {
    path.isAbsolute.mockReturnValue(false);

    const route = '../Readme_lite.md';
    convertToAbsolutePath(route);

    expect(path.resolve).toHaveBeenCalledWith(route);
  });

})


