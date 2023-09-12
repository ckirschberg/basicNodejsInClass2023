const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3003;

let uri = 'mongodb://localhost:27017';


 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('We are the best web class ever! 333333847youi32y43uiyou32y');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});