const express = require('express')
const router = express.Router()
const AutorModel = require('../model/Autor')
const ValidaAutor = require('../validators/ValidaAutor')
const Autenticacao = require('../helpers/Autenticacao')
const {sucess, fail} = require("../helpers/resp")

router.get('/listar', Autenticacao.autenticador, async (req, res) => {
    const limite = parseInt(req.query.limite) || 10;
    const pagina = parseInt(req.query.pagina) || 1; 

    if (limite == 5 || limite == 10 || limite == 30){
        try {
            const lista = await AutorModel.listarPag(limite, pagina);
            res.json(lista);
        } catch (error) {
            res.status(400).json(fail('Erro ao listar: ' + error.message));
        }
    } else {
        res.status(416).json(fail('O limite deve ser 5, 10 ou 30'));
    }
})

router.get('/buscar', ValidaAutor.validaNome, Autenticacao.autenticador, async (req, res) => {
    const nomeautor = req.body.nomeautor;

    if (nomeautor) {
        try {
            const autor = await AutorModel.buscarNome(nomeautor);
            
            if (autor) {
                res.json({ status: true, id: autor.id, supplier: autor.nomeautor });
            } else {
                res.status(400).json(fail('Não encontrado!'));
            }
        } catch (error) {
            res.status(400).json(fail('Erro ao buscar o autor:' + nomeautor + ': ' + error.message));
        }
    } else {
        res.status(416).json(fail('Informe o nome do autor'));
    }
})

router.post('/criar', ValidaAutor.validaNome, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const autor = await AutorModel.save(req.body.nomeautor);
        res.json(success('Autor inserido!:' + autor.nomeautor));
    } catch (error) {
        res.status(400).json(fail('Erro na inserção: ' + error.message));
    }
})

router.put('/atualizar', ValidaAutor.validaNome, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const nomeautor = req.query.nomeautor;
    const id = parseInt(req.query.id);

    if (nomeautor) {
        try {
            const autor = await AutorModel.atualizar(nomeautor, req.body.nomeautor);
            res.json(success("Alterou o autor" + autor.nomeautor));
        } catch (error) {
            res.status(400).json(fail("Erro ao alterar! Verifique os dados" + error.message));
        }
    } else if (id) {
        try {
            const autor = await AutorModel.atualizarPorId(id, req.body.nomeautor);
            res.json(success("Alterou o autor" + autor.nomeautor));
        } catch (error) {
            res.status(400).json(fail("Erro ao alterar! Verifique os dados" + error.message));
        }
    } else {
        res.status(416).json(fail("Informe o nome ou id do autor"));
    }
})

router.delete('/excluir', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const nomeautor = req.query.nomeautor;
    const id = parseInt(req.query.id);

    if (nomeautor) {
        try {
            const autor = await AutorModel.delete(nomeautor);
            res.json(success("Excluiu o autor" + autor.nomeautor));
        } catch (error) {
            res.status(400).json(fail("Erro ao excluir! Verifique os dados" + error.message));
        }
    } else if (id) {
        try {
            const autor = await AutorModel.excluirPorId(id);
            res.json(success("Excluiu o autor" + autor.nomeautor));
        } catch (error) {
            res.status(400).json(fail("Erro ao excluir! Verifique os dados" + error.message));
        }
    } else {
        res.status(416).json(fail("Informe o nome ou id do autor"));
    }
})

module.exports = router