const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const AutorModel = sequelize.define('Autor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeautor: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
})