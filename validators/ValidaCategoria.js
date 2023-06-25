const Joi = require("joi")

const CategoriaSchema = Joi.object({
    nomecategoria: Joi.string()
        .min(4)
        .required()
        .max(25),
})

module.exports = {
    validaNome: function(req, res,next){
        const {error, value} = AutorSchema.validate(req.body);
        if(error){
            return res.status(400).json({status: false, message: "O nome da categoria deve ter entre 4 e 25 caracteres!"})
        }
        return next()
    }
}