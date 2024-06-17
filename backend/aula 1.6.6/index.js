/**
 * Modulo HTTP
 */

import http from "http";
const port = 8080;
http
	.createServer((req, res) => {
    if (req.method == "GET" && req.url == "/teste") {
      res.write("Get /teste executado com sucesso");
		} else {
      res.write("Hello World!");
		}
    
		res.statusCode = 200;
		res.end();
	})
  .listen(port, () => {
    console.log("Server listen at " + port);
    
  });
