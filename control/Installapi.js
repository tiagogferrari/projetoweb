const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/bd")

const UsuarioModel = require('../model/Usuario')
const AutorModel = require('../model/Autor')
const CategoriaModel = require('../model/Categoria')
const CursoModel = require('../model/Curso')
const UsuariocursoModel = require('../model/Usuariocurso')

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true })
    res.json({ status: false, msg: "Banco Instalado" })
    try {

        await UsuarioModel.salvar({ nomeusuario: 'tiago', senha: 'tiago' })
        await UsuarioModel.salvar({ nomeusuario: 'Jorge', senha: '123456' })
        await UsuarioModel.salvar({ nomeusuario: 'Claudio', senha: '789101' })
        await UsuarioModel.salvar({ nomeusuario: 'Gabriel', senha: '112131' })
        await UsuarioModel.salvar({ nomeusuario: 'Vinicius', senha: '415161' })
        await UsuarioModel.tornarAdm('tiago')

        await CategoriaModel.salvar('Desenvolvimento de Software')
        await CategoriaModel.salvar('Design Gráfico')
        await CategoriaModel.salvar('Desenvolvimento Web')
        await CategoriaModel.salvar('Marketing Digital')
        await CategoriaModel.salvar('Banco de Dados e SQL')

        await AutorModel.salvar('Rita Mulcahy')
        await AutorModel.salvar('Neil Patel')
        await AutorModel.salvar('Don Norman')
        await AutorModel.salvar('Martin Fowler')
        await AutorModel.salvar('Colt Steele')

        await CursoModel.salvarObjeto({ nomecurso: 'Desenvolvimento Web Completo', descricao: 'Domine Web - 20 Cursos - HTML5, CSS3, Bootstrap, JS, MySQL, e muito mais', autor: 1, categoria: 3 })
        await CursoModel.salvarObjeto({ nomecurso: 'Design Gráfico e UI/UX Design', descricao: 'Aprenda Photoshop, Illustrator, InDesign, XD e Adobe Portfólio.', autor: 2, categoria: 2 })
        await CursoModel.salvarObjeto({ nomecurso: 'API Restful Javascript com Node.js', descricao: 'Construindo uma API Restful Javascript com Node.js, ExpressJS, Typescript', autor: 3, categoria: 1 })
        await CursoModel.salvarObjeto({ nomecurso: 'Marketing Digital COMPLETO', descricao: 'Aprenda a vender mais no Google Ads, Facebook e Instagram e muito mais.', autor: 5, categoria: 4 })
        await CursoModel.salvarObjeto({ nomecurso: 'SQL para Análise de Dados', descricao: 'Aprenda a analisar bancos de dados de negócio com SQL ', autor: 4, categoria: 5 })

        await UsuariocursoModel.salvarObjeto({ usuario: 1, curso: 5 })
        await UsuariocursoModel.salvarObjeto({ usuario: 2, curso: 4 })
        await UsuariocursoModel.salvarObjeto({ usuario: 3, curso: 3 })
        await UsuariocursoModel.salvarObjeto({ usuario: 4, curso: 2 })
        await UsuariocursoModel.salvarObjeto({ usuario: 5, curso: 1 })

    } catch (error) {
        console.log("Erro ao instalar BD")
    }
    console.log("BD instalado")
})

module.exports = router

