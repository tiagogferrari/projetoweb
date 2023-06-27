//importar o módulo DataType do pacote sequelize 
const { DataTypes } = require("sequelize")

//importa modelos necessários
const sequelize = require("../helpers/bd")
const UsuarioModel = require("./Usuario").Model
const CursoModel = require("./Curso").Model

const UsuariocursoModel = sequelize.define('Usuariocurso', {
})

//chaves estrangeiras
UsuariocursoModel.belongsTo(UsuarioModel, {
    foreignKey: 'usuario'
})
UsuarioModel.hasMany(UsuariocursoModel, { foreignKey: 'usuario' })

//chaves estrangeiras
UsuariocursoModel.belongsTo(CursoModel, {
    foreignKey: 'curso'
})
CursoModel.hasMany(UsuariocursoModel, { foreignKey: 'curso' })

module.exports = {
    listar: async function () {
        const inscricoes = await UsuariocursoModel.findAll()
        return inscricoes
    },

    listarPag: async function (limite, pagina) {
        const offset = limite * (pagina - 1)
        return await UsuariocursoModel.findAndCountAll({
            offset,
            limite
        })
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
        return inscricao
    },

    excluirId: async function (obj) {
        await UsuariocursoModel.destroy({
            where: {
                usuario: obj.usuario,
                curso: obj.curso
            }
        });
    },

    buscarIdUsuario: async function (id) {
        return await UsuariocursoModel.findAndCountAll({
            where:
            {
                usuario: id
            }
        }
        )
    },

    buscarIdCurso: async function (id) {
        return await UsuariocursoModel.findAndCountAll({
            where:
            {
                curso: id
            }
        }
        )
    },

    Model: UsuariocursoModel
}