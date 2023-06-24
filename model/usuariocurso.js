const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")
const UsuarioModel = require("./Usuario").Model
const CursoModel = require("./Curso").Model

const UsuariocursoModel = sequelize.define('Usuariocurso', {

})

UsuariocursoModel.belongsTo(UsuarioModel, {
    foreignKey: 'usuario'
})
UsuarioModel.hasMany(UsuariocursoModel, { foreignKey: 'usuario' })

UsuariocursoModel.belongsTo(CursoModel, {
    foreignKey: 'curso'
})
CursoModel.hasMany(UsuariocursoModel, { foreignKey: 'curso' })

module.exports = {
    listar: async function () {
        const inscricoes = await UsuariocursoModel.findAll()
        return inscricoes
    },

    salvar: async function (usuario, curso) {
        const inscricao = await UsuariocursoModel.create(
            {
                usuario: usuario,
                curso: curso
            }
        )
        return inscricao
    },

    salvarObjeto: async function (obj) {
        const inscricao = await UsuariocursoModel.create(
            {
                usuario: obj.usuario,
                curso: obj.curso
            }
        )
    },

    excluirId: async function (idusuario, idcurso) {
        return await UsuariocursoModel.destroy(
            {
                where: {
                    idusuario: idusuario,
                    idcurso: idcurso
                }
            }
        )
    },

    Model: UsuariocursoModel
}