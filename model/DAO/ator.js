/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a tabela de relacionamento Ator (Profissional <-> Personagem)
 * Data: 07/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os registros da tabela ator
const getSelectAllAtores = async function() {
    try {
        //Sricpt SQL
        let sql = 'select * from tbl_ator order by id desc'

        //Encaminhe para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Retorna um registro filtrando pelo id
const getSelectByIdAtor = async function(id) {
    try {
        //Sricpt SQL
        let sql = `select * from tbl_ator where id = ${id}`

        //Encaminhe para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Retorna o último ID gerado no BD
const getSelectLastID = async function() {
    try {
        //Script SQL para retornar apenas o último ID do BD
        let sql = `select id from tbl_ator order by id desc limit 1`
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

//Insere um novo relacionamento ator
const setInsertAtor = async function(ator) {
    try {
        let sql = `INSERT INTO tbl_ator (
            profissional_id,
            personagem_id
        ) VALUES (
            ${ator.profissional_id},
            ${ator.personagem_id}
        )`

        //executeRawUnsafe() -> Executa o scipt SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Altera um relacionamento ator existente
const setUpdateAtor = async function(ator) {
    try {
        let sql = `UPDATE tbl_ator SET
            profissional_id = ${ator.profissional_id},
            personagem_id = ${ator.personagem_id}
            WHERE id = ${ator.id}`

        //executeRawUnsafe() -> Executa o scipt SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Exclui um relacionamento pelo ID
const setDeleteAtor = async function(id) {
    try {
        //Script SQL
        let sql = `delete from tbl_ator where id = ${id}`

        //Encaminha para o BD o srcipt SQL
        let result = await prisma.$queryRawUnsafe(sql)

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
    getSelectAllAtores,
    getSelectByIdAtor,
    getSelectLastID,
    setInsertAtor,
    setUpdateAtor,
    setDeleteAtor
}