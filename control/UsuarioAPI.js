const express = require('express')
const router = express.Router()
const UsuarioModel = require('../model/Usuario')
const ValidaUsuario = require('../validators/ValidaUsuario')
const Autenticacao = require('../helpers/Autenticacao')
const {sucess, fail} = require("../helpers/resp")

//verifica permissoes
router.get('/verificar', Autenticacao.autenticador, async (req, res) => {
    try {
        const verificaAdmin = await UsuarioModel.verificarAdm(req.usuario.nomeusuario);
        return res.json({ status: true, nomeusuario: req.usuario.nomeusuario, verificaAdmin });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao verificar permissões do usuário' });
    }
})

//atualiza o usuario
router.put('/atualizar', ValidaUsuario.validaUsuario, Autenticacao.autenticador, async (req, res) => {
    try {
        const obj = { nomeusuario: req.body.nomeusuario, senha: req.body.senha };
        const usuario = await UsuarioModel.buscarNome(req.usuario.nomeusuario);
        const resp = await UsuarioModel.atualizar(usuario.nomeusuario, obj);
        res.json(sucess('A alteração foi um sucesso!'));
    } catch (error) {
        res.status(400).json(fail('Erro ao alterar: ' + error.message));
    }
})

//deleta o usuario
router.delete('/deletar', Autenticacao.autenticador, async (req, res) => {
    const nomeusuario = req.query.nomeusuario;

    if (nomeusuario != null && nomeusuario != '') {
        try {
            const usuario = await UsuarioModel.buscarNome(nomeusuario);

            if (req.usuario.nomeusuario === usuario.nomeusuario) {
                const resultado = await UsuarioModel.excluir(usuario.nomeusuario);
                res.json(sucess("Excluiu: " + usuario.nomeusuario + "com êxito!"));
            } else {
                res.status(401).json(fail('Não foi possível deletar!'));
            }
        } catch (error) {
            res.status(400).json(fail('Não foi possível deletar!: ' + error.message));
        }
    } else {
        res.status(416).json(fail('Informe o nome de usuario!'));
    }
})

module.exports = router