const express = require('express')
const router = express.Router()
const CategoriaModel = require('../model/Categoria')
const ValidaCategoria = require('../validators/ValidaCategoria')
const Autenticacao = require('../helpers/Autenticacao')
const {sucess, fail} = require("../helpers/resp")

router.get('/listar', Autenticacao.autenticador, (req, res) => {
    const limite = parseInt(req.query.limite) || 10
    const pagina = parseInt(req.query.pagina) || 1

    if (![5, 10, 30].includes(limite)) {
        return res.status(416).json(fail("O limite deve ser 5, 10 ou 30"))
    }

    CategoriaModel.listarPag(limite, pagina)
        .then(lista => {
            res.json(lista)
        })
        .catch(error => {
            res.sendStatus(400).json(fail("Não foi possível listar" + error.message))
        });
})

router.get('/buscar', ValidaCategoria.validaNome, Autenticacao.autenticador, (req, res) => {
    const nomecategoria = req.body.nomecategoria

    if (!nomecategoria) {
        return res.status(416).json(fail("Informe o nome!"))
    }

    CategoriaModel.buscarNome(nomecategoria)
        .then(categoria => {
            if (categoria) {
                res.json({ status: true, id: categoria.id, nomecategoria: categoria.nomecategoria })
            }
        })
        .catch(error => {
            res.status(400).json(fail("Erro ao solicitar Categoria: " + nomecategoria + "erro:" + error.message))
        })
})

router.post('/criar', ValidaCategoria.validaNome, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, (req, res) => {
    CategoriaModel.salvar(req.body.nomecategoria)
        .then(categoria => {
            res.json(sucess("Categoria criada: " + categoria.nomecategoria))
        })
        .catch(error => {
            res.status(400).json(fail("Falha ao criar!" + error.message))
        })
})

router.put('/atualizar', ValidaCategoria.validaNome, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const nomecategoria = req.query.nomecategoria;
        const id = parseInt(req.query.id);

        if (nomecategoria != null && nomecategoria != '') {
            const categoria = await CategoriaModel.atualizar(nomecategoria, req.body.nomecategoria);
            res.json(sucess("Categoria alterada!"));
        } else if (id != null && id != '') {
            const categoria = await CategoriaModel.atualizarPorId(id, req.body.nomecategoria);
            res.json(sucess("Categoria " + categoria.nomecategoria + "alterada!"));
        } else {
            res.status(416).json(fail("Dados faltando"));
        }
    } catch (error) {
        res.status(400).json(fail("Categoria não alterada! Verifique se já não existe.." + error.message));
    }
})

router.delete('/deletar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    const nomecategoria = req.query.nomecategoria;
    const id = parseInt(req.query.id);

    try {
        if (nomecategoria != null && nomecategoria != '') {
            const categoria = await CategoriaModel.excluir(nomecategoria);
            res.json(sucess("Categoria excluída!"));
        } else if (id != null && id != '') {
            const categoria = await CategoriaModel.excluirPorId(id);
            res.json(sucess("Categoria  excluída!"));
        } else {
            res.status(416).json(fail("Digite o nome ou o id da categoria"));
        }
    } catch (error) {
        res.status(400).json(fail("Falha ao deletar: " + error.message));
    }
});


module.exports = router