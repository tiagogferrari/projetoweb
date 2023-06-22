const express = require("express")
const path = require("path")
require("dotenv").config()
const sequelize = require("./helpers/bd")

const app = express()
app.use(express.json())
app.use('/install', require("./control/installapi"))

app.listen(3000, () => {
    console.log('Working... http://localhost:3000')
})
