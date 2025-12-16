/*******************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a
 *          MODEL para o CRUD na relação entre filme e genero.
 * Data: 10/11/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 ******************************************************************************/

//Import da model do DAO do filme Genero
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// Retorna uma lista de todas as relações de filme e genero
const listarFilmesGeneros = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultFilmesGenero = await filmeGeneroDAO.getSelectAllMoviesGenre()

        if (resultFilmesGenero) {
            if (resultFilmesGenero.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGenero

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna uma relação entre filme e genero filtrando pelo ID
const buscarFilmeGeneroId = async (id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != null && id != '' && id != undefined && id > 0) {
            let resultFilmesGenerosID = await filmeGeneroDAO.getSelectGenreMoviesByID(Number(id))
            if (resultFilmesGenerosID) {
                if (resultFilmesGenerosID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGenerosID
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna generos filtrando pelo ID do filme
const listarGenerosIdFilme = async (idFilme) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(idFilme) && idFilme != null && idFilme != '' && idFilme != undefined && idFilme > 0) {
            let resultFilmesGenerosID = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(idFilme))
            if (resultFilmesGenerosID) {
                if (resultFilmesGenerosID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items = resultFilmesGenerosID
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna generos filtrando pelo ID do filme
const listarFilmesIdGenero = async (idGenero) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(idGenero) && idGenero != null && idGenero != '' && idGenero != undefined && idGenero > 0) {
            let resultFilmesGenerosID = await filmeGeneroDAO.getSelectMoviesByIdGenres(Number(idGenero))

            if (resultFilmesGenerosID) {
                if (resultFilmesGenerosID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGenerosID

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Insere uma nova relação entre filme e genero
const inserirFilmeGenero = async (filmeGenero, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            let validacao = await validarDadosFilmeGenero(filmeGenero)

            if (!validacao) {

                let resultFilmeGenre = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero)

                if (resultFilmeGenre) {
                    let lastID = await filmeGeneroDAO.getSelectLastGenreByID()
                    if (lastID) {
                        filmeGenero.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items = filmeGenero

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validacao
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualiza uma relação entre filme e genero
const atualizarFilmeGenero = async (filmeGenero, contentType, id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDadosFilmeGenero(filmeGenero)

            if (!validacao) {

                let confirmarId = await buscarFilmeGeneroId(id)

                if (confirmarId.status_code == 200) {
                    filmeGenero.id = Number(id)

                    let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)

                    if (resultFilmesGeneros) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.filme_genero = filmeGenero

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return confirmarId
                }
            } else {
                return validacao
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Excluir uma relação entre filme e genero
const excluirFilmeGenero = async (id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await buscarFilmeGeneroId(id)

        if (validarID.status_code == 200) {

            id = Number(id)
            let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(id)

            if (resultFilmesGeneros) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            validarID
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Excluir generos pelo ID do filme (para atualizar ou excluir filme)
const excluirGeneroPorIdFilme = async (idFilme) => {
    try {
        let result = await filmeGeneroDAO.setDeleteMoviesGenresByMovieId(idFilme)
        return result
    } catch (error) {
        return false
    }
}

const validarDadosFilmeGenero = async (filmeGenero) => {
    if (filmeGenero.id_filme <= 0 || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme == "" || filmeGenero.id_filme == null || filmeGenero.id_filme == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Filme Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filmeGenero.id_genero <= 0 || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero == "" || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS += '[Id_Genero Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    excluirGeneroPorIdFilme
}