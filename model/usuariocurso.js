const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const UsuariocursoModel = sequelize.define('Usuariocurso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
})