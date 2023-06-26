const express = require('express')
const router = express.Router()
const UsuarioModel = require('../model/Usuario')
const ValidaUsuario = require('../validators/ValidaUsuario')
const Autenticacao = require('../helpers/Autenticacao')

router.get('/', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const administrador = await UsuarioModel.verificarAdm(req.usuario.nomeusuario);
        res.json({ status: true, nomeusuario: req.usuario.nomeusuario, verificarAdm });
    } catch (error) {
        res.status(400).json(fail('Não foi possível verificar!' + error.message));
    }
})

router.post('/criar', ValidaUsuario.validaUsuario, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const usuario = await UsuarioModel.salvar(req.body);

        if (req.body.administrador === true) {
            await UsuarioModel.tornarAdm(usuario.nomeusuario);
            res.json(success('Criou um administrador'));
        } else {
            res.json(success('Criou usuario'));
        }
    } catch (error) {
        res.status(401).json(fail('Erro ao criar'));
    }
})

router.get('/listar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {

    const limite = parseInt(req.query.limite) || 10; 
    const pagina = parseInt(req.query.pagina) || 1;

    const limitesPermitidos = [5, 10, 30];

    if (limitesPermitidos.includes(limite)) {
        try {
            const lista = await UsuarioModel.listarPorPag(limite, pagina);
            res.json(lista);
        } catch (error) {
            res.status(400).json(fail('Erro ao listar: ' + error.message));
        }
    } else {
        res.status(416).json(fail('O limite deve ser de 5, 10 ou 30'));
    }
})

router.get('/buscar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const nomeusuario = req.query.nomeusuario;

        if (nomeusuario != null && nomeusuario != '') {
            const usuario = await UsuarioModel.buscarNome(nomeusuario);

            if (usuario != null) {
                res.json({ status: true, nomeusuario: user.nomeusuario, administrador: user.administrador });
            } else {
                res.status(400).json(fail('Não foi possivel buscar esse usuário'));
            }
        } else {
            res.status(416).json(fail('Informe o nome de usuário'));
        }
    } catch (error) {
        res.status(400).json(fail('Não foi possivel buscar esse usuário' + error.message));
    }
})

router.put('/atualizar', ValidaUsuario.validaUsuario, Autenticacao.autenticador, Autenticacao.autenticador, async (req, res) => {
    try {
        const nomeusuario = req.query.nomeusuario;

        if (nomeusuario != null && nomeusuario != '') {
            const usuario = await UsuarioModel.buscarNome(nomeusuario);

            if (usuario) {
                const obj = { nomeusuario: req.body.nomeusuario, senha: req.body.senha };

                if (usuario.administrador !== true || req.user.nomeusuario === user.nomeusuario) {
                    const atualizaUsuario = await UsuarioModel.atualizar(user.nomeusuario, obj);
                    res.json(success('Usuario alterado!'));
                } else {
                    res.status(401).json(fail('Você não pode alterar esse usuário'));
                }
            } else {
                res.status(400).json(fail('Não achamos esse usuário!'));
            }
        } else {
            res.status(416).json(fail('Informe o nome de usuario!'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao buscar esse usuário: ' + error.message));
    }
})

router.delete('/deletar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const nomeusuario = req.query.nomeusuario;

        if (nomeusuario != null && nomeusuario != '') {
            const usuario = await UsuarioModel.buscarNome(nomeusuario);

            if (usuario) {
                if (usuario.administrador !== true || req.user.nomeusuario === user.nomeusuario) {
                    const result = await UsuarioModel.excluir(usuario.nomeusuario);
                    res.json(success("Usuario excluido!"));
                } else {
                    res.status(401).json(fail('Você não pode deletar esse usuário'));
                }
            } else {
                res.status(400).json(fail('Não achamos esse usuário!'));
            }
        } else {
            res.status(416).json(fail('Informe o nome de usuario!'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao buscar esse usuário: ' + error.message));
    }
})

module.exports = router