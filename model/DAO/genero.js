/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao gênero
 * Data:22/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os generos do banco de dados
const getSelectAllGenres = async () => {

    try {
        //Sricpt SQL
        let sql = 'select * from tbl_genero order by id desc'

        //Encaminhe para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    }
    catch (error) {
        console.log(error)

        return false
    }

}

//Retorna um genero filtrando pelo id do banco de dados
const getSelectByIdGenres = async function (id) {
    try {
        //Sricpt SQL
        let sql = `select * from tbl_genero where id= ${id}`

        //Encaminhe para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    }
    catch (error) {
        console.log(error)

        return false
    }
}
//Retorna o último ID gerado no BD
const getSelectLastID = async function () {
    try {
        //Script SQL para retornar apenas o último ID do BD
        let sql = `select id from tbl_genero order by id desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        console.log(error)

        return false
    }
}

//Insere um genero no banco de dados
const setInsertGenres = async function(genero){
    try {
        let sql = `INSERT INTO tbl_genero (nome) VALUES ('${genero.nome}')`

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

//Altera um genero no banco de dados
const setUpdateGenres = async function(genero){
    try {
        let sql = `UPDATE tbl_genero SET nome = '${genero.nome}' WHERE id = ${genero.id}`
            
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
//Exclui um genero pelo ID no banco de dados
const setDeleteGenres = async function (id) {
    try {
        //Script SQL
        let sql = `delete from tbl_genero where id=${id}`

        //Encaminha para o BD o srcipt SQL
        let result = await prisma.$executeRawUnsafe(sql)

        //console.log(Array.isArray(result))
        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
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