const { infoPath } = require("../src/validateRoutes");

const path1 = './jajaja';
const path2 = './README.md';

const pathInfo1 = infoPath(path1);
const pathInfo2 = infoPath(path2);

console.log('Path 1:', pathInfo1);
console.log('Path 2:', pathInfo2);