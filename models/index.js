const dbConfig = require("../config/config");
const Login = require("./Login");
const Tasks = require("./Tasks");
const Crypto = require("crypto-js/sha256");

dbConfig
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log("Error: " + err));

Login.hasMany(Tasks, { as: "task", foreignKey: "user_id" });
Tasks.belongsTo(Login, { foreignKey: "user_id" });

// dbConfig.sync({ force: true }).catch((err) => {
//   console.log(err);
// });
// Login.create({
//   username: "sameer.soni9227@gmail.com",
//   password: JSON.stringify(Crypto("password").words),
// });
