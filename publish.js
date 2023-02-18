const publishClientEvent = (event, data) => {
  let timeout = 20;
  (function publish() {
    if (!timeout) {
      return;
    }
    if (global.csids && global.csids.length) {
      global.io.to(global.csids).emit(event, data);
    } else {
      timeout -= 1;
      setTimeout(publish, 1000);
    }
  })();
};


module.exports = {
  publishClientEvent,
};
