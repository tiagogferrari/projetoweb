const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const CategoriaModel = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

})