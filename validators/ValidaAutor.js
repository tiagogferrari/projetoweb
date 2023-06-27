//módulo joi; pacote utilizado para validação de dados em JavaScript
const Joi = require("joi")

//cria um esquema de validação usando o módulo Joi para validar objetos do tipo definido
const AutorSchema = Joi.object({
    nomeautor: Joi.string()
        .min(3)
        .required()
        .max(25),
})

module.exports = {
    validaNome: function(req, res,next){
        const {error, value} = AutorSchema.validate(req.body);
        if(error){
            return res.status(400).json({status: false, message: "O nome do autor deve ter entre 3 e 25 caracteres!"})
        }
        return next()
    }
}