const {
  infoPath,
  convertToAbsolutePath
} = require('../src/validateRoutes');
const {
  readFileContent,
  isMarkdownFile,
  findLinksInMarkdown,
  pathIsAFile
} = require('../src/readFile');
const validateLinks = require('../src/validateLinks');
const mdLinks = require('../src/md.links');

// Mock de las funciones para las pruebas
jest.mock('../src/validateRoutes');
jest.mock('../src/readFile');
jest.mock('../src/validateLinks');

describe('mdLinks', () => {
  test('debería procesar el archivo Markdown y validar los links', async () => {
    // Mock de las funciones
    infoPath.mockReturnValue(true);
    convertToAbsolutePath.mockReturnValue('/path/to/file.md');
    isMarkdownFile.mockReturnValue(true);
    readFileContent.mockReturnValue('Content with [Link](https://example.com)');
    findLinksInMarkdown.mockReturnValue([{ text: 'Link', url: 'https://example.com' }]);
    pathIsAFile.mockResolvedValue(true);
    validateLinks.mockResolvedValue([{ text: 'Link', url: 'https://example.com', status: 200, isOk: true }]);

    // Llamar a la función mdLinks
    const result = await mdLinks('file.md', { validate: true });

    // Verificar que las funciones hayan sido llamadas correctamente
    expect(infoPath).toHaveBeenCalledWith('file.md');
    expect(convertToAbsolutePath).toHaveBeenCalledWith('file.md');
    expect(isMarkdownFile).toHaveBeenCalledWith('/path/to/file.md');
    expect(readFileContent).toHaveBeenCalledWith('/path/to/file.md');
    expect(findLinksInMarkdown).toHaveBeenCalledWith('Content with [Link](https://example.com)');
    expect(pathIsAFile).toHaveBeenCalledWith('/path/to/file.md');
    expect(validateLinks).toHaveBeenCalledWith([{ text: 'Link', url: 'https://example.com' }], { validate: true }, '/path/to/file.md');

    // Verificar el resultado
    expect(result).toEqual([{ text: 'Link', url: 'https://example.com', status: 200, isOk: true }]);
  });

  test('debería manejar el error cuando el path es un directorio', async () => {
    // Mock de las funciones
    infoPath.mockReturnValue(true);
    convertToAbsolutePath.mockReturnValue('/path/to/directory');
    pathIsAFile.mockRejectedValue(false);

    // Llamar a la función mdLinks
    try {
      await mdLinks('directory', { validate: true });
      // Si la función no lanza un error, la prueba falla
      expect(true).toBe(false);
    } catch (error) {
      // Verificar que el error sea manejado correctamente
      expect(error).toBe('La ruta proporcionada es un directorio.');
    }
  });

  test('debería manejar el error cuando el archivo no es un markdown file', async () => {
    // Mock de las funciones
    infoPath.mockReturnValue(true);
    convertToAbsolutePath.mockReturnValue('/path/to/file.txt');
    pathIsAFile.mockResolvedValue(true);
    isMarkdownFile.mockReturnValue(false);

    // Llamar a la función mdLinks
    try {
      await mdLinks('file.txt', { validate: true });
      // Si la función no lanza un error, la prueba falla
      expect(true).toBe(false);
    } catch (error) {
      // Verificar que el error sea manejado correctamente
      expect(error).toBe('El archivo proporcionado no tiene extensión .md.');
    }
  });

  test('debería manejar el error cuando no hay links en el archivo', async () => {
    // Mock de las funciones
    infoPath.mockReturnValue(true);
    convertToAbsolutePath.mockReturnValue('/path/to/file.md');
    pathIsAFile.mockResolvedValue(true);
    isMarkdownFile.mockReturnValue(true);
    readFileContent.mockReturnValue('Content without links');
    findLinksInMarkdown.mockReturnValue([]);

    // Llamar a la función mdLinks
    try {
      await mdLinks('file.md', { validate: true });
      // Si la función no lanza un error, la prueba falla
      expect(true).toBe(false);
    } catch (error) {
      // Verificar que el error sea manejado correctamente
      expect(error).toBe('No se encontraron links en el texto del archivo.');
    }
  });
});