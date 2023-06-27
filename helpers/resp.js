//funções utilizadas para retornar respostas padronizadas de sucesso ou falha
module.exports = {
    sucess: function(obj, nome) {
        let resp = {status: true}
        if (nome) resp[nome] = obj
        else resp.obj = obj

        return resp
    },
    fail: function(message) {
        return {status: false, message: message}
    }
}