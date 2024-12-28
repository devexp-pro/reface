(function () {
  const log = (message) => {
    console.log(`[LiveReload] ${message}`);
  };

  const connect = (port, host) => {
    log(`Connecting to ${host}:${port}...`);
    const ws = new WebSocket(`ws://${host}:${port}`);

    ws.onopen = () => {
      log("Connected successfully");
    };

    ws.onmessage = (event) => {
      if (event.data === "reload") {
        log("Reloading page...");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    ws.onclose = () => {
      log("Connection lost. Reconnecting...");
      setTimeout(() => connect(port, host), 5000);
    };

    ws.onerror = (error) => {
      log("WebSocket error occurred");
      console.error("[LiveReload] Error:", error);
    };
  };

  // Start connection
  connect(REFACE_LIVE_RELOAD_PORT, REFACE_LIVE_RELOAD_HOST);
})();
