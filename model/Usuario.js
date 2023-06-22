const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const UsuarioModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeusuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admnistrador: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
})