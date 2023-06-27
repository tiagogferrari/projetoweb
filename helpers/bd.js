//biblioteca ORM para interagir com bancos de dados relacionais, como MySQL
const Sequelize = require('sequelize')

//criando uma instância do objeto Sequelize e configurando-a para estabelecer uma conexão com o banco de dados.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: process.env.DB_DIALECT }
)

//método authenticate() da instância sequelize para verifica a conexão com o banco de dados 
sequelize.authenticate()
    .then(() => console.log("Conectou se ao BD!"))
    .catch(error => console.log(error))

//exportando a instância sequelize para torná-la disponível para outros módulos
module.exports = sequelize
