const express = require('express')
const router = express.Router()
const UsuariocursoModel = require('../model/Usuariocurso')
const Autenticacao = require('../helpers/Autenticacao')
const {sucess, fail} = require("../helpers/resp")

//lista as inscrições realizadas
router.get('/listar', Autenticacao.autenticador, async (req, res) => {
    try {
        const limite = parseInt(req.query.limite) || 10
        const pagina = parseInt(req.query.pagina) || 1

        if (limite === 5 || limite === 10 || limite === 30) {
            const lista = await UsuariocursoModel.listarPag(limite, pagina);
            res.json(lista);
        } else {
            res.status(416).json(fail('O limite deve ser de 5, 10 ou 30'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao listar: ' + error.message));
    }
})

//busca uma inscrição pelo id do usuario
router.get('/buscar/usuario', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const id = req.query.id;

    if (id != null && id != '') {
        try {
            const usuariocurso = await UsuariocursoModel.buscarIdUsuario(id);
            if (usuariocurso != null) {
                res.json({ status: true, usuariocurso: usuariocurso });
            } else {
                res.status(400).json(fail("Inscrição não encontrada"));
            }
        } catch (erro) {
            res.status(400).json(fail("Erro ao buscar inscrição: " + erro.message));
        }
    } else {
        res.status(416).json(fail("Informe o ID do usuario"));
    }
})

//busca uma inscrição pelo id do curso
router.get('/buscar/curso', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const id = req.query.id;

    if (id != null && id != '') {
        try {
            const usuariocurso = await UsuariocursoModel.buscarIdCurso(id);
            if (usuariocurso != null) {
                res.json({ status: true, usuariocurso: usuariocurso });
            } else {
                res.status(400).json(fail("Inscrição não encontrada"));
            }
        } catch (erro) {
            res.status(400).json(fail("Erro ao buscar inscrição: " + erro.message));
        }
    } else {
        res.status(416).json(fail("Informe o ID do curso"));
    }
})

//realiza a inscrição em um curso
router.post('/inscrever', Autenticacao.autenticador, (req, res) => {
    UsuariocursoModel.salvarObjeto(req.body).then(inscricao => {
        res.json(sucess("Inscrição realizada!"))
    }).catch(erro => {
        res.status(401).json(fail("Falha ao inscrever-se"))
    })
})

//cancela a inscrição em um curso
router.delete('/desinscrever', Autenticacao.autenticador, (req, res) => {
    UsuariocursoModel.excluirId(req.body).then(desinscricao => {
        res.json(sucess("Desinscrição realizada!"));
    }).catch(erro => {
        res.status(401).json(fail("Falha ao desinscrever-se"));
    });
});


module.exports = router