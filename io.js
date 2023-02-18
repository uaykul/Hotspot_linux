const { publishClientEvent } = require("./publish");

const workerOnline = "workeronline";

global.io.on("connection", (socket) => {
  const socketId = socket.id;
  socket.on(workerOnline, () => {
    global.ee.emit(workerOnline);
  });

  if (socket.handshake.query.device) {
    // Worker module socket id
    workerId(socketId).then(() => {
      global.wsid = socketId;
      console.log("Worker connected");
    });
    socket.on("disconnect", function () {
      global.wsid = null;
      console.log("Worker disconnected");
    });
  } else if (socket.handshake.query.tray) {
    // Tray module socket ids
    global.tsids = trayIds();
    socket.on("disconnect", function () {
      global.tsids = trayIds();
    });
  } else {
    // Client module socket ids
    global.csids = clientIds();
    socket.on("disconnect", function () {
      global.csids = clientIds();
    });
  }

  socket.on(client.PROCESSING, () => {
    global.io.emit(client.PROCESSING);
  });

  socket.on(client.PROCESSED, (msg) => {
    global.ee.emit(msg.txid, msg);
    global.io.emit(client.PROCESSED);
  });

  socket.on(worker.SYSTEM, (msg) => {
    global.ee.emit(msg.txid, msg);
  });

  socket.on(unit.RESTARTING, () => {
    publishClientEvent(unit.RESTARTING);
    logger.info("Restarting");
  });

  socket.on(unit.RESTARTED, () => {
    publishClientEvent(unit.RESTARTED);
    logger.info("Restarted");
  });

  // TODO: ksg-tray event fix
  socket.on("avproxy", async () => {
    try {
      const { result } = await proxyService.getState();
      global.io.to(socketId).emit("avproxy", { toggle: result.state });
    } catch (error) {
      logger.error(error);
    }
  });

  socket.on("pulse", () => {
    process.exit(2);
  });
});

function workerId(socketId) {
  let timer = null;
  return new Promise((resolve) => {
    global.ee.on(workerOnline, function fn() {
      global.ee.removeListener(workerOnline, fn);
      clearInterval(timer);
      resolve();
    });
    timer = setInterval(() => {
      global.io.to(socketId).emit(workerOnline);
    }, 500);
  });
}

function clientIds() {
  return Array.from(global.io.sockets.sockets, ([id, socket]) => ({ id, socket }))
    .filter((x) => !x.socket.handshake.query.device)
    .map((x) => x.id);
}

function trayIds() {
  return Array.from(global.io.sockets.sockets, ([id, socket]) => ({ id, socket }))
    .filter((x) => x.socket.handshake.query.tray)
    .map((x) => x.id);
}