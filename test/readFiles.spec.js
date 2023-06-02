const fs = require('fs');
const path = require('path');
const {
  readFileContent,
  isMarkdownFile,
  findLinksInMarkdown,
  pathIsAFile,
} = require('../src/readFile');

// Mock de fs.readFileSync para las pruebas
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  stat: jest.fn(),
}));

describe('readFileContent', () => {
  test('should read file content correctly', () => {
    // Mock de fs.readFileSync
    fs.readFileSync.mockReturnValue('File content');

    // Llamar a la función readFileContent
    const content = readFileContent('test.md');

    // Verificar que fs.readFileSync haya sido llamado con el archivo correcto
    expect(fs.readFileSync).toHaveBeenCalledWith('test.md', 'utf8');

    // Verificar que la función devuelva el contenido del archivo
    expect(content).toBe('File content');
  });
});

describe('isMarkdownFile', () => {
  test('should return true for .md file', () => {
    // Llamar a la función isMarkdownFile
    const result = isMarkdownFile('test.md');

    // Verificar que la función devuelva true
    expect(result).toBe(true);
  });

  test('should return false for non-.md file', () => {
    // Llamar a la función isMarkdownFile
    const result = isMarkdownFile('test.txt');

    // Verificar que la función devuelva false
    expect(result).toBe(false);
  });
});

describe('findLinksInMarkdown', () => {
  test('should find links in markdown content', () => {
    // Mock del contenido del archivo .md
    const content = '[Link 1](https://example.com/link1) [Link 2](https://example.com/link2)';

    // Llamar a la función findLinksInMarkdown
    const links = findLinksInMarkdown(content);

    // Verificar que la función devuelva un array con los enlaces encontrados
    expect(links).toEqual([
      { text: 'Link 1', url: 'https://example.com/link1' },
      { text: 'Link 2', url: 'https://example.com/link2' },
    ]);
  });
});

describe('pathIsAFile', () => {
  test('should resolve true for file path', async () => {
    // Mock de fs.stat
    fs.stat.mockImplementation((filePath, callback) => {
      const stats = {
        isFile: () => true,
      };
      callback(null, stats);
    });

    // Llamar a la función pathIsAFile
    const result = await pathIsAFile('test.md');

    // Verificar que la función resuelva con true
    expect(result).toBe(true);
  });

  test('should reject false for directory path', async () => {
    // Mock de fs.stat
    fs.stat.mockImplementation((filePath, callback) => {
      const stats = {
        isFile: () => false,
      };
      callback(null, stats);
    });

    // Llamar a la función pathIsAFile
    try {
      await pathIsAFile('test-directory');
      // Si la función no lanza un error, la prueba falla
      expect(true).toBe(false);
    } catch (error) {
      // Verificar que la función rechace con false
      expect(error).toBe(false);
    }
  });

  test('should handle error when getting file information', async () => {
    // Mock de fs.stat para simular un error
    const error = new Error('Error getting file information');
    fs.stat.mockImplementation((filePath, callback) => {
      callback(error);
    });

    // Llamar a la función pathIsAFile
    try {
      await pathIsAFile('test.md');
      // Si la función no lanza un error, la prueba falla
      expect(true).toBe(false);
    } catch (error) {
      // Verificar que la función rechace con el error
      expect(error).toBe(error);
    }
  });
});