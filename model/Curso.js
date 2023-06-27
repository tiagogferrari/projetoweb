const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")
const { func } = require("joi")
const AutorModel = require("./Autor").Model
const CategoriaModel = require("./Categoria").Model
//const UsuariocursoModel = require("./Usuariocurso").Model

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

CursoModel.belongsTo(AutorModel, {
    foreignKey: 'autor'
})
AutorModel.hasMany(CursoModel, { foreignKey: 'autor' })

CursoModel.belongsTo(CategoriaModel, {
    foreignKey: 'categoria'
})
CategoriaModel.hasMany(CursoModel, { foreignKey: 'categoria' })

module.exports = {
    listar: async function () {
        const cursos = await CursoModel.findAll()
        return cursos
    },

    listarPag: async function (limite, pagina) {
        const offset = limite * (pagina - 1)
        return await CursoModel.findAndCountAll({
            offset,
            limite
        })
    },

    listarPagCat: async function (limite, pagina, categoriaId) {
        const curso = await CursoModel.findAndCountAll({
            where: {
                categoria: categoriaId
            },
            offset: limite * (pagina - 1),
            limite: limite
        })
        return curso
    },

    listarPagAut: async function (limite, pagina, autorId) {
        const curso = await CursoModel.findAndCountAll({
            where: {
                autor: autorId
            },
            offset: limite * (pagina - 1),
            limite: limite
        });
        return curso;
    },

    salvar: async function (nomecurso, descricao, autor, categoria) {
        const curso = await CursoModel.create(
            {
                nomecurso: nomecurso,
                descricao: descricao,
                autor: autor,
                categoria: categoria
            }
        )
    },

    salvarObjeto: async function (obj) {
        const curso = await CursoModel.create(
            {
                nomecurso: obj.nomecurso,
                descricao: obj.descricao,
                autor: obj.autor,
                categoria: obj.categoria
            }
        )
    },

    atualizar: async function (nomecurso, obj) {
        return await CursoModel.update(
            { nomecurso: obj.nomecurso, descricao: obj.descricao },
            { where: { nomecurso: nomecurso } })
    },

    atualizarPorId: async function (id, obj) {
        return await CursoModel.atualizar(
            { nomecurso: obj.nomecurso, descricao: obj.descricao },
            { where: { id: id } }
        )
    },

    mudarNome: async function (nomecurso, nomenovo) {
        return await CursoModel.mudanome(
            { nomecurso: nomenovo },
            { where: { nomecurso: nomecurso } }
        )
    },

    mudarDescricao: async function (descricao, descricaonova) {
        return await CursoModel.mudardscricao(
            { descricao: descricaonova },
            { where: { descricao: descricao } }
        )
    },

    excluir: async function (nomecurso) {
        return await CursoModel.destroy(
            { where: { nomecurso: nomecurso } }
        )
    },

    excluirPorId: async function (id) {
        return await CursoModel.destroy(
            { where: { id: id } }
        )
    },

    buscarId: async function (id) {
        return await CursoModel.findByPk(id)
    },

    buscarNome: async function (nomecurso) {
        return await CursoModel.findOne(
            { where: { nomecurso: nomecurso } }
        )
    },

    Model: CursoModel
}