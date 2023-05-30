const pathInfo = require("./routes");

const path1 = '././../modulos/data1.txt';
const path2 = './././../README.md';

const pathInfo1 = pathInfo(path1);
const pathInfo2 = pathInfo(path2);

console.log('Path 1:', pathInfo1);
console.log('Path 2:', pathInfo2);