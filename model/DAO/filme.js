/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme
 * Data:01/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/
/*
    Exemplos de dependencias para conexão com o BD
        Bancos de Dados relacionais
            Sequelize -> Foi utilizado em muitos projetos desde o inicio do node
            Prisma    -> É uma dependencia atual que trabalha com BD (MYSQL, PostgreSQL, SQL Server) (SQL ou ORM)
                npm install prisma ---save              -> instalar prisma (Conexão com o database) 
                npm install @prisma/client --save       -> instalar o cliente do prisma (Executar scripts SQL no banco)
                npx prisma init                         -> promt de comando para inicializar o prisma
                npx prisma migrate dev                  -> Realiza o sincronismo entre o prisma e o BD (CUIDADO, nesse processo você poderá perder dados reais do BD, pois ele pega e cria as tabelas programadas no ORM schema.prisma)
                npx prisma generate                     -> Apenas realiza o sncronismo entre o prisma e o BD, geralmente usamos para rodar o projeto em um PC novo 
            Knex      -> É uma dependencia atual que trabalha com MYSQl
        Banco de Dados não Relacional
            Mongoose  -> É uma dependencia para o Mongo DB (Não Relacional)

    // $queryRawUnsafe *() -> permite executar um script SQl de uma variável e que retorna valores do banco (SELECT)
    // $ExecuteRawUnsafe *() -> permite executar um script SQl de uma variável e que não retorna dados do banco (INSERT, UPDATE E DELETE)
    // $queryRaw *() -> permite executar um script SQl Sem estar em uma variável e que retorna valores do banco (SELECT) e faz tratametos de segurança contra SQL Injection
*/
//Import da dependencua do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async() =>{

    try{
    //Sricpt SQL
    let sql =  'select * from tbl_filme order by id desc'

    //Encaminhe para o BD o script SQL
    let result = await prisma.$queryRawUnsafe(sql)

    if(Array.isArray(result))
        return result
    else
        return false
}
catch (error) {
    return false
}

}

//Retorna um filme filtrando pelo id do banco de dados
const getSelectByIdMovies = async function(id){
    try{
        //Sricpt SQL
        let sql =  `select * from tbl_filme where id= ${id}`
    
        //Encaminhe para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(Array.isArray(result))
            return result
        else
            return false
    }
    catch (error) {
        return false
    }
}

//Insere um filme no banco de dados
const setInsertMovies = async function(){

}

//Altera um filme no banco de dados
const setUpdateMovies = async function(id){

}

//Exclui um filme por id no banco de dados
const setDeleteMovies = async function(id){

}

module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies
}