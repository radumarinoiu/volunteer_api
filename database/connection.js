const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  connection:
    process.env.MONGODB_URI ||
    "mongodb://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASS +
      "@ds261377.mlab.com:61377/asii-join-api"
};
