const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")
const UserModel = require('../model/usuario')

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true })
    res.json({status: false, msg: "Banco Instalado"})
})

module.exports = router