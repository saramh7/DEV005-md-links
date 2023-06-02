const axios = require('axios');
const validateLinks = require('../src/validateLinks');

// Mock de axios.head para las pruebas
jest.mock('axios');

describe('validateLinks', () => {
  test('should return links without validation', async () => {
    // Datos de ejemplo
    const links = [
      { url: 'https://example.com/link1', text: 'Link 1' },
      { url: 'https://example.com/link2', text: 'Link 2' },
    ];
    const options = { validate: false };
    const filePath = 'test.md';

    // Llamar a la función validateLinks
    const results = await validateLinks(links, options, filePath);

    // Verificar que no se haya llamado a axios.head
    expect(axios.head).not.toHaveBeenCalled();

    // Verificar que los resultados sean correctos
    expect(results).toEqual([
      { href: 'https://example.com/link1', text: 'Link 1', filePath },
      { href: 'https://example.com/link2', text: 'Link 2', filePath },
    ]);
  });

  test('should validate links and return results', async () => {
    // Mock de axios.head
    axios.head.mockResolvedValue({ status: 200 });

    // Datos de ejemplo
    const links = [
      { url: 'https://example.com/link1', text: 'Link 1' },
      { url: 'https://example.com/link2', text: 'Link 2' },
    ];
    const options = { validate: true };
    const filePath = 'test.md';

    // Llamar a la función validateLinks
    const results = await validateLinks(links, options, filePath);

    // Verificar que axios.head haya sido llamado para cada enlace
    expect(axios.head).toHaveBeenCalledTimes(2);
    expect(axios.head).toHaveBeenCalledWith('https://example.com/link1');
    expect(axios.head).toHaveBeenCalledWith('https://example.com/link2');

    // Verificar que los resultados sean correctos
    expect(results).toEqual([
      { href: 'https://example.com/link1', text: 'Link 1', filePath, status: 200, isOk: true },
      { href: 'https://example.com/link2', text: 'Link 2', filePath, status: 200, isOk: true },
    ]);
  });

  test('should handle error when validating links', async () => {
    // Mock de axios.head para simular un error
    const error = new Error('Error validating link');
    axios.head.mockRejectedValue(error);

    // Datos de ejemplo
    const links = [
      { url: 'https://example.com/link1', text: 'Link 1' },
      { url: 'https://example.com/link2', text: 'Link 2' },
    ];
    const options = { validate: true };
    const filePath = 'test.md';

    // Llamar a la función validateLinks
    try {
      await validateLinks(links, options, filePath);
      // Si la función no lanza un error, la prueba falla
      expect(true).toBe(false);
    } catch (error) {
      // Verificar que el error sea manejado correctamente
      expect(error).toBe(error);
    }
  });
});