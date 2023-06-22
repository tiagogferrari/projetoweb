const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const CursoModel = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomecurso: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})