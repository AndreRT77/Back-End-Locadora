/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos cargos
 * Data:22/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const {PrismaClient} = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os filmes do banco de dados
const getSelectAllGenres = async() =>{

    try{
    //Sricpt SQL
    let sql =  'select * from tbl_genero order by id desc'

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
const getSelectByIdGenres = async function(id){
    try{
        //Sricpt SQL
        let sql =  `select * from tbl_genero where id= ${id}`
    
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
//Retorna o último ID gerado no BD
const getSelectLastID = async function(){
    try {
        //Script SQL para retornar apenas o último ID do BD
        let sql = `select id from tbl_genero order by id desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

//Insere um filme no banco de dados
const setInsertGenres = async function(genero){
    try {
        let sql = `INSERT INTO tbl_genero (
            nome
        ) VALUES
        (
            '${genero.nome}'
        )`
        //executeRawUnsafe() -> Executa o scipt SQL que não tem retorno de valores
       let result = await prisma.$executeRawUnsafe(sql)

       if(result) 
        return true
       else
        return false
    } catch (error) {
        console.log(error)
        return false
        
    }
}

//Altera um filme no banco de dados
const setUpdateGenres = async function(genero){
    try {
        let sql = `UPDATE tbl_genero SET
            nome='${genero.nome}'
            WHERE id=${genero.id};
            `
            
        //executeRawUnsafe() -> Executa o scipt SQL que não tem retorno de valores
       let result = await prisma.$executeRawUnsafe(sql)
       if(result) 
        return true
       else
        return false
    } catch (error) {
        
        return false
        
    }
}

//Exclui um filme pelo ID no banco de dados
const setDeleteGenres = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_genero where id=${id}`
        
        //Encaminha para o BD o srcipt SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(Array.isArray(result))
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }
}

module.exports = {
    getSelectAllGenres,
    getSelectByIdGenres,
    getSelectLastID,
    setInsertGenres,
    setUpdateGenres,
    setDeleteGenres
}