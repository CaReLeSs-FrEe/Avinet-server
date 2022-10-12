const express = require("express");
const app = express();
const dirtyRoutes = require("./routes/dirty.routes");

app.use("/api", dirtyRoutes);

app.get("/", (req, res, next) => {
  res.send("whats uppppppp");
});

app.listen("6969", () => {
  console.log("hey lets get dirty on 3000!");
});
