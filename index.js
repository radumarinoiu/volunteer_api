const dotenv_result = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const asii = express();
const volunteersRouter = require("./routes/volunteers");
const authRoute = require("./routes/auth");
const postsRouter = require("./routes/posts");
// import db connection
const db = require("./database/connection");

const PORT = process.env.PORT;

console.log(dotenv);

asii.use(bodyParser.urlencoded({ extended: false }));
asii.use(bodyParser.json());

//  CORS
asii.use(cors());
// Connect to Database
mongoose
  .connect(db.connection)
  .then(conn => console.log("ASII Is ON."))
  .catch(err => {
    const { name, message, code, codeName } = err;
    console.error("DB:", db);
    console.error({ error: { name, message, code, codeName } });
  });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
asii.use(limiter);

// Middleware
asii.use((req, res, next) => {
  // ASII allow
  res.header("Access-Control-Allow-Origin", "*");

  // ASII allow headers like:
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // ASII and Options
  if (req.method === "OPTIONS") {
    // ASII and Methods
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

    // ASII response with status OK
    return res.status(200).json({
      message: "ok"
    });
  }
  next();
});

asii.get("/", (req, res) => {
  res.send(
    "volunteer api, go to <a href='/api/v1/volunteers'>/api/v1/volunteers</a>"
  );
});
asii.use("/api/v1/volunteers", volunteersRouter);
asii.use("/api/v1/users", authRoute);
asii.use("/api/v1/posts", postsRouter);
// ASII - Not Found 404
asii.use((req, res, next) => {
  const error = new Error("ASII is unable to manage the request!");

  // ASII response with status code 404
  error.status = 404;
  next(error);
});

// ASII - server error
asii.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error"
  });
});

asii.listen(PORT || 5000, console.log(`Server is running at port : ${PORT}`));
