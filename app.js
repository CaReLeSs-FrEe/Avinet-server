require("dotenv").config();
// require('dotenv')
const { isAuthenticated } = require("./middleware/jwt.middleware");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
// const { config } = require('dotenv');

const express = require("express");
// const { default: mongoose } = require('mongoose');
const morgan = require("morgan");
const app = express();
const cors = require("cors");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connectObject) => {
    console.log(`ready for lift off ${connectObject.connections[0].name}`);
  })
  .catch((err) => console.log(err));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);
// require('./config')(config);

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan("dev"));
app.set("trust proxy", 1);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const employeeRoutes = require("./routes/employee.routes");
app.use("/employee", employeeRoutes);

const companyRoutes = require("./routes/company.routes");
app.use("/company", companyRoutes);

// const projectName = 'avinet';
// const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

// app.locals.title = `${capitalized(projectName)}`;

// const index = require('./routes/index');
// app.use('/', index);

require("./error-handling")(app);

app.listen(process.env.PORT, () => {
  console.log("hey lets get dirty on " + process.env.PORT);
});

module.exports = app;
