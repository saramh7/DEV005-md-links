# Markdown Links

## 1. Instalación
### Package manager

Usando npm:

```bash
$ npm install 
```

## 2. Resumen del proyecto

Este proyecto es una herramienta de línea de comando que te permite validar links de archivos **tipo markdown** en un entorno de Node.js. El programa extrae los links del texto del archivo markdown y te entregará un array con el listado completo de links encontrados. Si deseas que el programa valide los links también puedes hacerlo.
 

## 3. Para usar este librería

Una vez clonado e instalado el proyecto, debes abrir el archivo _index.js_ y modificar la ruta que se encuentra en la línea 3 reemplazándola por la ruta del archivo que desees validar.

```javascript
const path = './README.md';
```

Adicionalmente puedes cambiar el argumento _validate_ de la línea 4 para que el programa ejecute el proceso de validación de links encontrados. El valor _true_ activará la validación de links y el valor _false_ no validar links.

```javascript
const options = { validate: true };
```

Existes otros archivos testeadores de funciones dentro de la carpeta _testers_. Siéntase libre de utilizarlos si así lo desea.

### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo markdown**.
Si la ruta entregada es relativa, el programa resolverá la ruta a absoluta.
**Sólo acepta archivos tipo Markdown**. Si la ruta entregada es otro tipo de archivos o es un directorio el programa finalizará su ejecución indicando esta advertencia.

* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

### Valor de retorno

La función **retornará una promesa** (`Promise`) que **resuelve a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparece dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparece dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.



### General

* [x] Puede instalarse via `npm install <github-user>/md-links`

### `README.md`

* [x] Un board con el backlog para la implementación de la librería.
* [X] Documentación técnica de la librería.
* [X] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [X] El módulo exporta una función con la interfaz (API) esperada.
* [X] Implementa soporte para archivo individual
* [X] Implementa `options.validate`

### Pruebas / tests

* [X] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [X] Pasa tests (y linters) (`npx jest --coverage`).
