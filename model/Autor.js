//importa os módulos DataTypes e Model do pacote sequelize 
const { DataTypes, Model } = require("sequelize")

//biblioteca ORM para interagir com bancos de dados relacionais, como MySQL
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

module.exports = {
    listar: async function () {
        const autores = await AutorModel.findAll()
        return autores
    },

    listarPag: async function (limite, pagina) {
        const autor = await AutorModel.findAndCountAll({
            offset: limite * (pagina - 1),
            limite: limite
        })
        return autor
    },

    salvar: async function (nomeautor) {
        const autor = await AutorModel.create(
            { nomeautor: nomeautor }
        )
        return autor;
    },

    atualizar: async function (nomeautor, nomenovo) {
        return await AutorModel.update(
            { nomeautor: nomenovo },
            { where: { nomeautor: nomeautor } }
        )
    },

    atualizarPorId: async function (id, nomenovo) {
        return await AutorModel.atualizar(
            { nomeautor: nomenovo },
            { where: { id: id } }
        )
    },

    excluir: async function (nomeautor) {
        return await AutorModel.destroy(
            { where: { nomeautor: nomeautor } }
        )
    },

    excluirPorId: async function (id) {
        return await AutorModel.destroy(
            { where: { id: id } }
        )
    },

    buscarId: async function (id) {
        return await AutorModel.findByPk(id)
    },

    buscarNome: async function (nomeautor) {
        return await AutorModel.findOne(
            { where: { nomeautor: nomeautor } }
        )
    },

    Model: AutorModel
}