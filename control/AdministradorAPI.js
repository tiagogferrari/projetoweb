const express = require('express')

//criar um roteador no Express que fornece métodos para definir rotas e lidar com as solicitações HTTP
const router = express.Router()

//importa modelos necessários
const UsuarioModel = require('../model/Usuario')
const ValidaUsuario = require('../validators/ValidaUsuario')
const Autenticacao = require('../helpers/Autenticacao')
const {sucess, fail} = require("../helpers/resp")

//Verifica se o usuário é administrador
router.get('/', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const administrador = await UsuarioModel.verificarAdm(req.usuario.nomeusuario);
        res.json({ status: true, nomeusuario: req.usuario.nomeusuario, verificarAdm });
    } catch (error) {
        res.status(400).json(fail('Não foi possível verificar!' + error.message));
    }
})

//Se o campo 'administrador' for true cria um administrador, caso contrário, cria usuário nomral
router.post('/criar', ValidaUsuario.validaUsuario, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const usuario = await UsuarioModel.salvar(req.body);

        if (req.body.administrador == true) {
            await UsuarioModel.tornarAdm(usuario.nomeusuario);
            res.json(sucess('Criou um administrador'));
        } else {
            res.json(sucess('Criou usuario'));
        }
    } catch (error) {
        res.status(401).json(fail('Erro ao criar'));
    }
})

//lista todos os usuarios
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

//busca um usuario passando nome de usuario
router.get('/buscar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const nomeusuario = req.query.nomeusuario;

        if (nomeusuario != null && nomeusuario != '') {
            const usuario = await UsuarioModel.buscarNome(nomeusuario);

            if (usuario != null) {
                res.json({ status: true, nomeusuario: usuario.nomeusuario, administrador: usuario.administrador });
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

//se o usuário for administrador pode atualizar outros usuarios, se não só atualiza ele mesmo
router.put('/atualizar', ValidaUsuario.validaUsuario, Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const nomeusuario = req.query.nomeusuario;

        if (nomeusuario != null && nomeusuario != '') {
            const usuario = await UsuarioModel.buscarNome(nomeusuario);

            if (usuario) {
                const obj = { nomeusuario: req.body.nomeusuario, senha: req.body.senha };

                if (!usuario.administrador || req.usuario.nomeusuario === usuario.nomeusuario) {
                    const atualizaUsuario = await UsuarioModel.atualizar(usuario.nomeusuario, obj);
                    res.json(sucess('Usuario alterado!'));
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

//se o usuário for administrador pode deletar outros usuarios, se não só deleta ele mesmo
router.delete('/deletar', Autenticacao.autenticador, Autenticacao.autenticadorAdmin, async (req, res) => {
    try {
        const nomeusuario = req.query.nomeusuario;

        if (nomeusuario != null && nomeusuario != '') {
            const usuario = await UsuarioModel.buscarNome(nomeusuario);

            if (usuario) {
                if (usuario.administrador != true || req.usuario.nomeusuario == usuario.nomeusuario) {
                    const result = await UsuarioModel.excluir(usuario.nomeusuario);
                    res.json(sucess("Usuario excluido!"));
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

//exporta o objeto router e torná-lo acessível em outros arquivos do seu projeto
module.exports = router