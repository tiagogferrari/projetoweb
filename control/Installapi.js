const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")

const UsuarioModel = require('../model/Usuario')
const AutorModel = require('../model/Autor')
const CategoriaModel = require('../model/Categoria')
const CursoModel = require('../model/Curso')
const UsuariocursoModel = require('../model/Usuariocurso')

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true })
    res.json({status: false, msg: "Banco Instalado"})
})

module.exports = router

