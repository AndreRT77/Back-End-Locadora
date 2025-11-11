/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de filmes 
 * Data:07/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do filme
const distribuidoraDAO = require('../../model/DAO/distribuidora.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os distribuidora 
const listarDistribuidoras = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultDistribuidoras = await distribuidoraDAO.getSelectAllDistributors()
        if (resultDistribuidoras) {
            if (resultDistribuidoras.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.distribuidoras = resultDistribuidoras

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }


    } catch (error) {
        return MESSAGES.ERROR.INTERNAL.SERVER.CONTROLLER //500
    }
}
//Retorna um filme filtrando pelo ID
const buscarDistribuidoraID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultDistribuidoras = await distribuidoraDAO.getSelectByIdDistributors(Number(id))

            if (resultDistribuidoras.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.distribuidora = resultDistribuidoras

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    
    } catch (error) {
    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}


//Insere um filme
const inserirDistribuidora = async function (distribuidora, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Cgana a função de validar todos os dados de distribuidora
            let validar = await validarDadosDistribuidora(distribuidora)
            if (!validar) {


                //Processamento
                //Chama a função para inserir um novo distribuidora no banco de dados
                let resultDistribuidoras = await distribuidoraDAO.setInsertDistributors(distribuidora)
                if (resultDistribuidoras) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await distribuidoraDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON com os dados do distribuidora
                    distribuidora.id = lastID
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = distribuidora

                    return MESSAGES.DEFAULT_HEADER //201

                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER //201
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

//Atualiza um distribuidora buscando pelo ID
const atualizarDistribuidora = async function (distribuidora, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Cgana a função de validar todos os dados de distribuidora
            let validar = await validarDadosDistribuidora(distribuidora)
            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no db se o id existe e valida o ID
                let validarID = await buscarDistribuidoraID(id)

                if (validarID.status_code == 200) {

                    distribuidora.id = Number(id)
                    //Validação do ID, se existe no BD 

                    //Validação de ID válido
                    //Processamento
                    //Chama a função para inserir um novo distribuidora no banco de dados
                    let resultDistribuidoras = await distribuidoraDAO.setUpdateDistributors(distribuidora)
                    if (resultDistribuidoras) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.distribuidora  = distribuidora

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //A função buscardistribuidoraID poderá retornar (400 ou 404 ou 500)
                }
            } else {
                return validar //400 referente a validação dos dados

            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //400 referente a validação do ID
        }

    } catch (error) {
        console.log(error)
        
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Excluir um filme buscando pelo ID
const excluirDistribuidora = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarDistribuidoraID(id)

            if(validarID.status_code == 200){

                let resultDistribuidoras = await distribuidoraDAO.setDeleteDistributors(Number(id))

                if(resultDistribuidoras){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.distribuidora = resultDistribuidoras
                        delete MESSAGES.DEFAULT_HEADER.items
                        return MESSAGES.DEFAULT_HEADER //200
            
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//validação dos dados de cadastro e atualização do distribuidora
const validarDadosDistribuidora = async function (distribuidora) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas entradas de dados

    if (distribuidora.nome == '' || distribuidora.nome == undefined || distribuidora.nome == null || distribuidora.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (distribuidora.site == '' || distribuidora.site == undefined || distribuidora.site == null || distribuidora.site.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Site incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarDistribuidoras,
    buscarDistribuidoraID,
    inserirDistribuidora,
    atualizarDistribuidora,
    excluirDistribuidora
}