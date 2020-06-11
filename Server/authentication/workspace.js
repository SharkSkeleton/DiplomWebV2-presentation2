const
  http = require("http"),
  express = require("express"),
  socketio = require("socket.io");

const SERVER_PORT = 8080;

let nextVisitorNumber = 1;
let onlineClients = new Set();

function onNewWebsocketConnection(socket) {
  console.info(`Socket ${socket.id} has connected.`);
  onlineClients.add(socket.id);

  socket.on('helloword_admin', () => {
    socket.emit('helloword_admin', 'daaaa')
  })

  socket.on("disconnect", () => {
    onlineClients.delete(socket.id);
    console.info(`Socket ${socket.id} has disconnected.`);
  });
}

function startServer() {
  // create a new express app
  const app = express();
  // create http server and wrap the express app
  const server = http.createServer(app);
  // bind socket.io to that server
  const io = socketio(server);

  // will fire for every new websocket connection
  io.on("connection", onNewWebsocketConnection);
  io.set('origins', '*:*');

  // important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
  server.listen(SERVER_PORT, () => console.info(`Listening on port ${SERVER_PORT}.`));

  // will send one message per second to all its clients
  let secondsSinceServerStarted = 0;
  setInterval(() => {
    secondsSinceServerStarted++;
    io.emit("seconds", secondsSinceServerStarted);
    io.emit("online", onlineClients.size);
  }, 1000);
}

startServer();
