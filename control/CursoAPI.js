const express = require('express')

//criar um roteador no Express que fornece métodos para definir rotas e lidar com as solicitações HTTP
const router = express.Router()

//importa modelos necessários
const CursoModel = require('../model/Curso')
const ValidaCurso = require('../validators/ValidaCurso')
const Autenticacao = require('../helpers/Autenticacao')
const { sucess, fail } = require("../helpers/resp")

//lista os cursos existentes
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

//lista os cursos filtrando pelo id da categoria
router.get('/listar/categoria', Autenticacao.autenticador, async (req, res) => {
    try {
        const limite = parseInt(req.query.limite) || 10
        const pagina = parseInt(req.query.pagina) || 1
        const categoriaId = parseInt(req.query.categoriaId) || 1

        if (limite == 5 || limite == 10 || limite == 30) {
            const lista = await CursoModel.listarPagCat(limite, pagina, categoriaId);
            res.json(lista);
        } else {
            res.status(416).json(fail('O limite deve ser de 5, 10 ou 30'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao listar: ' + error.message));
    }
})

//lista os cursos filtrando pelo id do autor
router.get('/listar/autor', Autenticacao.autenticador, async (req, res) => {
    const limite = parseInt(req.query.limite) || 10
    const pagina = parseInt(req.query.pagina) || 1
    const autorId = parseInt(req.query.autorId) || 1

    try {
        if (limite == 5 || limite == 10 || limite == 30) {
            const lista = await CursoModel.listarPagAut(limite, pagina, autorId);
            res.json(lista);
        } else {
            res.status(416).json(fail("O limite deve ser de 5, 10 ou 30"));
        }
    } catch (erro) {
        res.status(400).json(fail("Erro ao listar: " + erro.message));
    }
})

//busca um curso pelo nome do curso
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

//cria um curso
router.post('/criar', ValidaCurso.validaCurso, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, (req, res) => {

    CursoModel.salvarObjeto(req.body)
        .then(curso => {
            res.json(sucess("O curso foi cadastrado!"));
        })
        .catch(erro => {
            res.status(401).json(fail("Falha ao criar curso: " + erro.message));
        });
});

//deleta um curso pelo nome do curso ou id
router.delete('/deletar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, (req, res) => {
    const nomecurso = req.query.nomecurso;
    const id = parseInt(req.query.id);

    if (nomecurso != null && nomecurso != '') {
        CursoModel.excluir(nomecurso)
            .then(curso => {
                res.json(sucess("O curso foi deletado!"));
            })
            .catch(erro => {
                res.status(400).json(fail("Não foi possível deletar curso: " + erro.message));
            });
    } else if (id != null && id != '') {
        CursoModel.excluirPorId(id)
            .then(curso => {
                res.json(sccess("O curso foi deletado!"));
            })
            .catch(erro => {
                res.status(400).json(fail("Não foi possível deletar curso: " + erro.message));
            });
    } else {
        res.status(412).json(fail("Informe o nome ou id"));
    }
})

//atualiza um curso pelo nome do curso ou id
router.put('/atualizar', ValidaCurso.validaCurso, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const nomecurso = req.query.nomecurso;
    const id = parseInt(req.query.id);

    try {
        let curso;

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

        res.json(sucess(message));
    } catch (error) {
        res.status(400).json(fail("Erro ao atualizar curso: " + error.message));
    }
});

//exporta o objeto router e torná-lo acessível em outros arquivos do seu projeto
module.exports = router


