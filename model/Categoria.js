//importar o módulo DataType do pacote sequelize 
const { DataTypes } = require("sequelize")

//biblioteca ORM para interagir com bancos de dados relacionais, como MySQL
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

    listarPag: async function (limite, pagina) {
        const offset = limite * (pagina - 1)
        return await CategoriaModel.findAndCountAll({
            offset,
            limite
        })
    },

    salvar: async function (nomecategoria) {
        const categoria = await CategoriaModel.create(
            { nomecategoria: nomecategoria }
        )
        return categoria
    },

    atualizar: async function (nomecategoria, nomenovo) {
        return await CategoriaModel.update(
            { nomecategoria: nomenovo },
            { where: { nomecategoria: nomecategoria } }
        )
    },

    atualizarPorId: async function (id, nomecategoria) {
        return await CategoriaModel.atualizar(
            { nomecategoria: nomecategoria },
            { where: { id: id } }
        )
    },

    excluir: async function (nomecategoria) {
        return await CategoriaModel.destroy(
            { where: { nomecategoria: nomecategoria } }
        )
    },

    excluirPorId: async function () {
        return await CategoriaModel.destroy(
            { where: { id: id}}    
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

    Model: CategoriaModel
}