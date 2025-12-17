/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de atores (relacionamento)
 * Data: 07/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do ator
const atorDAO = require('../../model/DAO/ator.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os registros
const listarAtores = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO
        let resultAtores = await atorDAO.getSelectAllAtores()
        if (resultAtores) {
            if (resultAtores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.atores = resultAtores

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna um registro filtrando pelo ID
const buscarAtorID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultAtores = await atorDAO.getSelectByIdAtor(Number(id))

            if (resultAtores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.atores = resultAtores

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        console.log(error)  
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um novo relacionamento
const inserirAtor = async function (ator, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função de validar todos os dados
            let validar = await validarDadosAtor(ator)
            if (!validar) {
                //Processamento
                let resultAtores = await atorDAO.setInsertAtor(ator)
                if (resultAtores) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await atorDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON
                        ator.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = ator

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Atualiza um registro buscando pelo ID
const atualizarAtor = async function (ator, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função de validar todos os dados
            let validar = await validarDadosAtor(ator)
            if (!validar) {
                //Validação de ID válido
                let validarID = await buscarAtorID(id)

                if (validarID.status_code == 200) {
                    ator.id = Number(id)
                    
                    //Chama a função para atualizar no BD
                    let resultAtores = await atorDAO.setUpdateAtor(ator)
                    if (resultAtores) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.atores = ator

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //400, 404 ou 500
                }
            } else {
                return validar //400 referente a validação dos dados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //400
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Excluir um registro buscando pelo ID
const excluirAtor = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){
            //Validação de ID válido
            let validarID = await buscarAtorID(id)

            if(validarID.status_code == 200){
                let resultAtores = await atorDAO.setDeleteAtor(Number(id))

                if(resultAtores){
                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//validação dos dados
const validarDadosAtor = async function (ator) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    //Valida se os IDs estrangeiros são números válidos
    if (ator.profissional_id == '' || ator.profissional_id == undefined || isNaN(ator.profissional_id)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Profissional ID incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.personagem_id == '' || ator.personagem_id == undefined || isNaN(ator.personagem_id)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Personagem ID incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    
    } else {
        return false
    }
}

module.exports = {
    listarAtores,
    buscarAtorID,
    inserirAtor,
    atualizarAtor,
    excluirAtor
}