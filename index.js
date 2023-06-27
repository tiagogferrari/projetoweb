const express = require("express")
const path = require("path")
require("dotenv").config()
const sequelize = require("./helpers/bd")

const app = express()
app.use(express.json())

app.use('/install', require("./control/InstallAPI"))
app.use('/administrador', require("./control/AdministradorAPI"))
app.use('/autor', require("./control/AutorAPI"))
app.use('/categoria', require("./control/CategoriaAPI"))
app.use('/curso', require("./control/CursoAPI"))
app.use('/login', require("./control/LoginAPI"))
app.use('/usuario', require("./control/UsuarioAPI"))
app.use('/usuariocurso', require("./control/UsuariocursoAPI"))

app.listen(3000, () => {
    console.log('Working... http://localhost:3000')
})

