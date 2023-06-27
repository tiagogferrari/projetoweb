const UsuarioModel = require('../model/Usuario')
const jwt = require('jsonwebtoken')

module.exports = {
    autenticador: async function (req, res, next) {
        //extrai o token de autorização do cabeçalho da solicitação
        const token = req.headers['authorization']
        if (!token) {
            return res.status(401).json({ status: false, mensagem: 'Dados não encontrados' })
        }

        //retorna um array com a palavra bearer e o valor do token separados
        const [bearer, tokenValue] = token.split(' ')
        if (bearer !== 'Bearer') {
            return res.status(400).json({ status: false, mensagem: 'Não é Bearer' })
        }

        try {
            //verifica e decodifica um token JWT, e atribui seu conteudo à usuario
            const usuario = jwt.verify(tokenValue, process.env.SECRET)
            req.usuario = usuario

            //utiliza a função verificarCadastro para validar o usuario
            const registrado = await UsuarioModel.verificarCadastro(
                { nomeusuario: usuario.nomeusuario, senha: usuario.senha }
            )
            
            //envia uma resposta de erro de validação ou repassa os dados validados para o próximo middleware/manipulador de rota.
            if (registrado){
                next()
            } else {
                return res.status(401).json({status: false, mensagem: 'Dados errados'})
            }
        } catch (error) {
            return res.status(401).json({status: false, mensagem: error.mensagem})
        }
    },

    autenticadorAdmin: async function(req, res, next){
        try {

            //utiliza a função verificarAdm para verificar se o usuario é administrador
            const admnistrador = await UsuarioModel.verificarAdm(req.usuario.nomeusuario)

            if (admnistrador){
                next()
            } else {
                return res.status(403).json({status:false, mensagem:'não é administrador!'})
            }
        } catch {
            return res.status(500).json({status: false, mensagem: 'Erro do servidor'})
        }    
    }

}