/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a tabela de relacionamento Personagem_Filme
 * Data: 16/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script sql no banco de dados
const { PrismaClient } = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os registros da tabela intermediária
const getSelectAllPersonagemFilme = async function() {
    try {
        //Sricpt SQL
        let sql = 'select * from tbl_personagem_filme order by id desc'

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
const getSelectByIdPersonagemFilme = async function(id) {
    try {
        //Sricpt SQL
        let sql = `select * from tbl_personagem_filme where id = ${id}`

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
        let sql = `select id from tbl_personagem_filme order by id desc limit 1`
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

//Insere um novo relacionamento
const setInsertPersonagemFilme = async function(dados) {
    try {
        let sql = `INSERT INTO tbl_personagem_filme (
            filme_id,
            personagem_id
        ) VALUES (
            ${dados.filme_id},
            ${dados.personagem_id}
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

//Altera um relacionamento existente
const setUpdatePersonagemFilme = async function(dados) {
    try {
        let sql = `UPDATE tbl_personagem_filme SET
            filme_id = ${dados.filme_id},
            personagem_id = ${dados.personagem_id}
            WHERE id = ${dados.id}`

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
const setDeletePersonagemFilme = async function(id) {
    try {
        //Script SQL
        let sql = `delete from tbl_personagem_filme where id = ${id}`

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
    getSelectAllPersonagemFilme,
    getSelectByIdPersonagemFilme,
    getSelectLastID,
    setInsertPersonagemFilme,
    setUpdatePersonagemFilme,
    setDeletePersonagemFilme
}