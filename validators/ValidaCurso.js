//módulo joi; pacote utilizado para validação de dados em JavaScript
const Joi = require("joi")
const AutorModel = require('../model/Autor')

//cria módulo de validação customizado
const validaAutorExistente = async (id) => {
    const autor = await AutorModel.buscarId(id);
    if (!autor) {
        throw new Error("Autor não encontrado");
    }
};

//cria um esquema de validação usando o módulo Joi para validar objetos do tipo definido
const CursoSchema = Joi.object({
    id: Joi.number()
        .integer()
        .greater(0),
    nomecurso: Joi.string()
        .min(4)
        .required()
        .max(30),
    descricao: Joi.string()
        .min(5)
        .required()
        .max(50),
    autor: Joi.number()
        .integer()
        .required()
        .greater(0)
        .custom(validaAutorExistente),
    categoria: Joi.number()
        .integer()
        .required()
        .greater(0)
})

//cria um esquema de validação usando o módulo Joi para validar objetos do tipo definido
const AtualizaCursoSchema = Joi.object({
    id: Joi.number()
        .integer()
        .greater(0),
    nomecurso: Joi.string()
        .min(4)
        .required()
        .max(25),
    descricao: Joi.string()
        .min(5)
        .required()
        .max(50),
})

module.exports = {
    /*Valida o objeto req.body usando o CursoSchema e envia uma resposta de erro de
    validação ou repassa os dados validados para o próximo middleware/manipulador de rota.*/
    validaCurso: function (req, res, next) {
        const { error, value } = CursoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, message: "Dados faltando ou incorretos!", m2: error })
        }
        req.body = value
        return next()
    },

    validaAtualizaCurso: function (req, res, next) {
        const { error, value } = AtualizaCursoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: false, message: "Dados faltando ou incorretos!", m2: error })
        }
        req.body = value
        return next()
    },
}