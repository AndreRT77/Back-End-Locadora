/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD da tabela intermediária personagem_filme
 * Data: 16/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO
const personagemFilmeDAO = require('../../model/DAO/personagem_filme.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os registros
const listarPersonagemFilme = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO
        let result = await personagemFilmeDAO.getSelectAllPersonagemFilme()
        if (result) {
            if (result.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items = result

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
const buscarPersonagemFilmeID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let result = await personagemFilmeDAO.getSelectByIdPersonagemFilme(Number(id))

            if (result.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items = result

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
const inserirPersonagemFilme = async function (dados, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função de validar todos os dados
            let validar = await validarDados(dados)
            if (!validar) {
                //Processamento
                let result = await personagemFilmeDAO.setInsertPersonagemFilme(dados)
                if (result) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await personagemFilmeDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON
                        dados.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = dados

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
const atualizarPersonagemFilme = async function (dados, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função de validar todos os dados
            let validar = await validarDados(dados)
            if (!validar) {
                //Validação de ID válido
                let validarID = await buscarPersonagemFilmeID(id)

                if (validarID.status_code == 200) {
                    dados.id = Number(id)
                    
                    //Chama a função para atualizar no BD
                    let result = await personagemFilmeDAO.setUpdatePersonagemFilme(dados)
                    if (result) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = dados

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
const excluirPersonagemFilme = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){
            //Validação de ID válido
            let validarID = await buscarPersonagemFilmeID(id)

            if(validarID.status_code == 200){
                let result = await personagemFilmeDAO.setDeletePersonagemFilme(Number(id))

                if(result){
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
const validarDados = async function (dados) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    //Valida se os IDs estrangeiros são números válidos
    if (dados.filme_id == '' || dados.filme_id == undefined || isNaN(dados.filme_id)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Filme ID incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (dados.personagem_id == '' || dados.personagem_id == undefined || isNaN(dados.personagem_id)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Personagem ID incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    
    } else {
        return false
    }
}

module.exports = {
    listarPersonagemFilme,
    buscarPersonagemFilmeID,
    inserirPersonagemFilme,
    atualizarPersonagemFilme,
    excluirPersonagemFilme
}