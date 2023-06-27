//modulo express, framework web para Node.js que facilita a criação de aplicativos web e APIs
const express = require("express")

//módulo path; incorporado no Node.js que fornece utilitários para trabalhar com caminhos de arquivos e diretórios
const path = require("path")

//módulo que permite carregar variáveis de ambiente de um arquivo .env para o processo do Node.js
require("dotenv").config()

// importa o conteúdo do arquivo bd.js e atribui à constante sequelize
const sequelize = require("./helpers/bd")

//express() é uma função que inicializa o aplicativo Express e retorna uma instância dele
const app = express()

/*middleware embutido no Express que analisa o corpo das solicitações HTTP com o formato JSON e o converte em
 um objeto JavaScript acessível através de req.body*/
app.use(express.json())

//configura rotas no aplicativo Express para lidar com diferentes endpoints da API.
app.use('/install', require("./control/InstallAPI"))
app.use('/administrador', require("./control/AdministradorAPI"))
app.use('/autor', require("./control/AutorAPI"))
app.use('/categoria', require("./control/CategoriaAPI"))
app.use('/curso', require("./control/CursoAPI"))
app.use('/login', require("./control/LoginAPI"))
app.use('/usuario', require("./control/UsuarioAPI"))
app.use('/usuariocurso', require("./control/UsuariocursoAPI"))

//testar conexão
app.listen(3000, () => {
    console.log('Working... http://localhost:3000')
})

