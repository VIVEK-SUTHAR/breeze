process.on("message", async (data: Record<string, any>) => {
  console.log("DCA Execute order:", data);

  setTimeout(() => {
    if (process.send) {
      process.send("EXE_SUCCESS");
    }

    process.exit(0);
  }, 1000);
});
