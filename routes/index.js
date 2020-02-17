
const users = require("./api/users");

module.exports = app => {
  app.use("/", (req, res) => {
    res.send('API ok!');
  });

  app.use("/api/users", users);
};
