var express = require('express');
const usuario = require('../database/usuario');
const USUARIO = usuario.model;
const USUARIOSCHEMA = usuario.schema;
var router = express.Router();
var jwt = require("jsonwebtoken");


router.post("/token", async(req, res, next) => {
  var params = req.body;
  var docs = await USUARIO.find({name: params.nombre, email: params.email, password: params.password});
  if (docs.length == 0) {
    res.status(300).json({msn: "Error, usuario no registrado"});
    return;
  }
  if (docs.length == 1){
    jwt.sign({name: params.nombre, email: params.email, password: params.password}, "password",(err,token) => {
      if(err){
        res.status(300).json({msn: "Error dentro del jwt"});
      }
      res.status(200).json({token: token});
    });
    return;
  }
});

router.post("/usuario", async(req, res) => {
  var params = req.body;
  params["register"] = new Date();

  var user = new USUARIO(params);
  var result = await user.save();
  res.status(200).json(result);
});

router.get('/usuario',async(req,res, next) => {
  var params = req.query;
  var limit = 100;
  if(params.limit != null){
    limit = parseInt(params.limit);
  }
  var order = -1;
  if(params.sort != null){
    if(params.sort == "desc") {
      order = -1;
    }else if (params.sort == "asc") {
      order = 1;
    }
  }
  var filter = {};
  if(params.id != null){
    filter= {_id: params.id};
    }
  var skip = 0;
  if (params.skip != null) {
    skip = parseInt(params.skip);
  }
  var list = await USUARIO.find(filter).limit(limit).sort({_id: order}).skip(skip);
  res.status(200).json(list);
});

module.exports = router;
