/*******************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao
 *          relacionamento entre filme e genero
 * Data: 10/11/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 ******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// Retorna uma lista de todas as relações de filmes e generos do banco de dados
const getSelectAllMoviesGenre = async () => {
    try {

        let sql = `select * from tbl_filme_genero order by id desc`

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

// Retorna uma relação entre filme e genero filtrando pelo id do banco de dados
const getSelectGenreMoviesByID = async (id) => {
    try {
        let sql = `select * from tbl_filme_genero where id = ${id}`

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

// Retorna uma lista de generos filtrando pelo id do filme
const getSelectGenresByIdMovies = async (idFilme) => {
    try {
        let sql = `select tbl_genero.id, tbl_genero.nome
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                        where tbl_filme.id = ${idFilme}`

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

// Retorna uma lista de filmes filtrando pelo id do genero
const getSelectMoviesByIdGenres = async (idGenero) => {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome, tbl_filme.sinopse
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                        where tbl_genero.id = ${idGenero}`

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

// Retorna o ultimo ID gerado no BD
const getSelectLastGenreByID = async () => {
    try {
        let sql = `select id from tbl_filme_genero order by id desc limit 1`

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

// Insere uma nova relação de filme com genero no banco de dados
const setInsertMoviesGenres = async (filmeGenero) => {
    try {
        let sql = `INSERT INTO tbl_filme_genero (
                id_filme, 
                id_genero
            ) VALUES (
                ${filmeGenero.id_filme}, 
                ${filmeGenero.id_genero}
            )`

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

// Atualiza uma relação de filme com genero no banco de dados
const setUpdateMoviesGenres = async (filmeGenero) => {
    try {
        let sql = `update tbl_filme_genero set
                        id_filme = ${filmeGenero.id_filme},
                        id_genero = ${filmeGenero.id_genero}

                    where id = ${filmeGenero.id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        console.log(error)

        return false
    }
}

// Exclui uma relação de filme com genero no banco de dados
const setDeleteMoviesGenres = async (id) => {
    try {
        let sql = `delete from tbl_filme_genero where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        console.log(error)

        return false
    }
}

module.exports = {
    getSelectAllMoviesGenre,
    getSelectGenreMoviesByID,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenres,
    getSelectLastGenreByID,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres
}