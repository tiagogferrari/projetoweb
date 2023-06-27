const express = require('express')
const router = express.Router()
const UsuarioModel = require('../model/Usuario')
const ValidaUsuario = require('../validators/ValidaUsuario')
const { sucess, fail } = require("../helpers/resp")
const jwt = require('jsonwebtoken')
const path = require('path');

//se o usuario já tiver cadastro realiza o login
router.post('/login', ValidaUsuario.validaUsuario, async (req, res) => {
  try {
    const { nomeusuario, senha } = req.body;
    const usuario = await UsuarioModel.buscarNome(nomeusuario);

    if (usuario.senha === senha) {
      const token = jwt.sign({ nomeusuario: nomeusuario, senha: senha }, process.env.SECRET, { expiresIn: "3h" });
      res.json(sucess(token, 'token'));
    } else {
      res.status(401).json(fail("Senha errada!"));
    }
  } catch (error) {
    res.status(401).json(fail("Nome de usuario errado!"));
  }
});

//realiza o cadastro do usuario
router.post('/cadastro', ValidaUsuario.validaUsuario, async (req, res) => {
  try {
    const usuario = await UsuarioModel.salvar(req.body);
    const token = jwt.sign({ nomeusuario: usuario.nomeusuario, senha: usuario.senha }, process.env.SECRET, { expiresIn: "3h" });
    res.json(sucess(token, 'token'));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(403).json({ status: false, message: "Nome de usuario já utilizado!" });
    } else {
      res.status(400).json(fail("Erro ao realizar cadastro"));
    }
  }
});

module.exports = router