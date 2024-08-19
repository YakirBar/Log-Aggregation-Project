const http = require("http");

const { app, port } = require("./core");

http
    .createServer(app)
    .listen(port, () => console.log(`Server listening on port ${port}`)); 