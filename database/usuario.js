const mongoose = require("./connect");
var USUARIOSCHEMA = {
  nombre:     String,
  password: String,
  email:    String,
  fechaRegistro:   Date,
}

const USUARIO = mongoose.model("usuario", USUARIOSCHEMA);
module.exports = {model: USUARIO, schema: USUARIOSCHEMA};
