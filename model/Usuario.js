const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")
const { func } = require("joi")

const UsuarioModel = sequelize.define('Usuario', {
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

module.exports = {
    listar: async function () {
        const usuarios = await UsuarioModel.findAll()
        return usuarios;
    },

    listarPorPag: async function (limite, pagina) {
        const usuarios = await UsuarioModel.findAndCountAll({
            attributes:{
                exclude: ['password', 'id'],
            },
            offset: limite * (pagina - 1),
            limite: limite
        })
        return usuarios
    },

    salvar: async function (obj) {
        return await UsuarioModel.create({
            nomeusuario: obj.nomeusuario,
            senha: obj.senha,
        })
    },

    atualizar: async function (nomeusuario, obj) {
        return await UsuarioModel.atualizar(
            { nomeusuario: obj.nomeusuario, senha: obj.senha },
            { where: { nomeusuario: nomeusuario } }
        )
    },

    trocarNome: async function (nomeusuario, nomeusuario) {
        return await UsuarioModel.atualizar(
            { nomeusuario: nomeusuario },
            { where: { nomeusuario: nomeusuario } }
        )
    },

    trocarSenha: async function (nomeusuario, senha) {
        return await UsuarioModel.atualizar(
            { senha: senha },
            { where: { nomeusuario: nomeusuario } }
        )
    },

    excluir: async function (nomeusuario) {
        return await UsuarioModel.destroy(
            { where: { nomeusuario: nomeusuario } }
        )
    },

    buscarId: async function (id) {
        return await UsuarioModel.findByPk(id)
    },

    buscarNome: async function (nomeusuario) {
        return await UsuarioModel.findOne(
            { where: { nomeusuario: nomeusuario } }
        )
    },

    verificarCadastro: async function (obj) {
        return await UsuarioModel.findOne(
            {
                where: {
                    nomeusuario: obj.nomeusuario,
                    senha: obj.senha,
                }
            }
        )
    },

    verificarAdm: async function (nomeusuario) {
        return (
            await UsuarioModel.findOne(
                { where: { nomeusuario: nomeusuario } }

            )
        ).admnistrador

    },

    tornarAdm: async function (nomeusuario) {
        return await UsuarioModel.update(
            { admnistrador: true },
            { where: { nomeusuario: nomeusuario } }
        )
    },

    retirarAdm: async function (nomeusuario) {
        return await UsuarioModel.update(
            { admnistrador: false },
            { where: { nomeusuario: nomeusuario } }
        )    
    },

    Model: UsuarioModel
}