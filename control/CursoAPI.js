const express = require('express')
const router = express.Router()
const CursoModel = require('../model/Curso')
const ValidaCurso = require('../validators/ValidaCurso')
const Autenticacao = require('../helpers/Autenticacao')

router.get('/listar', Autenticacao.autenticador, async (req, res) => {
    try {
        const limite = parseInt(req.query.limite) || 10
        const pagina = parseInt(req.query.pagina) || 1

        if (limite === 5 || limite === 10 || limite === 30) {
            const lista = await CursoModel.listarPag(limite, pagina);
            res.json(lista);
        } else {
            res.status(416).json(fail('O limite deve ser de 5, 10 ou 30'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao listar: ' + error.message));
    }
})

router.get('/listar/categoria', Autenticacao.autenticador, async (req, res) => {
    try {
        const limite = parseInt(req.query.limite) || 10
        const pagina = parseInt(req.query.pagina) || 1
        const filterId = parseInt(req.query.filterId) || 1

        if (limite === 5 || limite === 10 || limite === 30) {
            const lista = await CursoModel.listarPagCat(limite, pagina, categoriaId);
            res.json(lista);
        } else {
            res.status(416).json(fail('O limite deve ser de 5, 10 ou 30'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao listar: ' + error.message));
    }
})

router.get('/listar/autor', Autenticacao.autenticador, async (req, res) => {
    const limite = parseInt(req.query.limite) || 10
    const pagina = parseInt(req.query.pagina) || 1
    const autorId = parseInt(req.query.autorId) || 1

    try {
        if (limite === 5 || limite === 10 || limite === 30) {
            const lista = await CursoModel.listarPagAut(limite, pagina, autorId);
            res.json(lista);
        } else {
            res.status(416).json(fail("O limite deve ser de 5, 10 ou 30"));
        }
    } catch (erro) {
        res.status(400).json(fail("Erro ao listar: " + erro.message));
    }
})

router.get('/buscar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const nomecurso = req.query.nomecurso;

    if (nomecurso != null && nomecurso != '') {
        try {
            const curso = await CursoModel.buscarNome(nomecurso);
            if (curso != null) {
                res.json({ status: true, curso: curso });
            } else {
                res.status(400).json(fail("Curso não encontrado"));
            }
        } catch (erro) {
            res.status(400).json(fail("Erro ao buscar curso: " + erro.message));
        }
    } else {
        res.status(416).json(fail("informe o nome do curso"));
    }
})

router.post('/criar', ValidaCurso.validaCurso, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, (req, res) => {
    const curso = req.body;

    CursoModel.salvarObjeto(curso)
        .then(curso => {
            res.json(sucess("O curso " + curso.nomecurso + " foi cadastrado!"));
        })
        .catch(erro => {
            res.status(401).json(fail("Falha ao criar curso: " + erro.message));
        });
})

router.delete('/deletar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, (req, res) => {
    const nomecurso = req.query.nomecurso;
    const id = parseInt(req.query.id);

    if (nomecurso != null && nomecurso != '') {
        ProductModel.delete(nomecurso)
            .then(curso => {
                res.json(success("O curso foi deletado!"));
            })
            .catch(erro => {
                res.status(400).json(fail("Não foi possível deletar curso: " + erro.message));
            });
    } else if (id != null && id != '') {
        CursoModel.excluirPorId(id)
            .then(curso => {
                res.json(success("O curso foi deletado!"));
            })
            .catch(erro => {
                res.status(400).json(fail("Não foi possível deletar curso: " + erro.message));
            });
    } else {
        res.status(412).json(fail("Informe o nome ou id"));
    }
})

router.put('/atualizar', ValidaCurso.validaCurso, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const nomecurso = req.query.nomecurso;
    const id = parseInt(req.query.id);

    try {
        let curso;
        let descricao;

        if (nomecurso != null && nomecurso !== '') {
            curso = await CursoModel.atualizar(nomecurso, req.body);
            message = "O curso foi alterado!";
        } else if (id != null && !isNaN(id)) {
            curso = await CursoModel.atualizarPorId(id, req.body);
            message = "O curso foi alterado!";
        } else {
            res.status(412).json(fail("informe o nome ou Id!"));
            return;
        }

        res.json(success(message));
    } catch (error) {
        res.status(400).json(fail("Erro ao atualizar curso: " + error.message));
    }
});

module.exports = router


