const Joi = require("joi")

const UsuarioSchema = Joi.object({
    id: Joi.number()
        .integer()
        .greater(0),
    nomeusuario: Joi.string()
        .min(3)
        .required()
        .max(25),
    senha: Joi.string()
        .min(5)
        .required()
        .max(12),
    administrador: Joi.boolean(),
})

module.exports = {
    /*Valida o objeto req.body usando o UsuarioSchema e envia uma resposta de erro de
    validação ou repassa os dados validados para o próximo middleware/manipulador de rota.*/
    validaUsuario: function (req, res, next) {
        const { error, value } = UsuarioSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, message: "Nome de usuário ou senha errados!", m2: error })
        }
        req.body = value
        return next()
    },
}