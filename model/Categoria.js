const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const CategoriaModel = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomecategoria: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

})

module.exports = {
    listar: async function () {
        const categorias = await CategoriaModel.findAll()
        return categorias
    },

    salvar: async function (nomecategoria) {
        const categoria = await CategoriaModel.create(
            { nomecategoria: nomecategoria}
        )
        return categoria 
    },

    atualizar: async function (nomecategoria, nomenovo) {
        return await CategoriaModel.atualizar(
            { nomecategoria: nomenovo },
            { where: { nomecategoria: nomecategoria } }
        )
    },

    excluir: async function (nomecategoria) {
        return await CategoriaModel.destroy(
            { where: { nomecategoria: nomecategoria } }
        )
    },

    buscarId: async function (id) {
        return await CategoriaModel.findByPk(id)
    },

    buscarNome: async function (nomecategoria) {
        return await CategoriaModel.findOne(
            { where: { nomecategoria: nomecategoria } }
        )
    },

    Model : CategoriaModel
}