/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de filmes 
 * Data:07/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do filme
const profissionalDAO = require('../../model/DAO/profissional.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os filmes 
const listarProfissionais = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultProfissionais = await profissionalDAO.getSelectAllProfessionals()
        if (resultProfissionais) {
            if (resultProfissionais.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.profissionais = resultProfissionais

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
const buscarProfissionalID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultProfissionais = await profissionalDAO.getSelectByIdProfessional(Number(id))

            if (resultProfissionais.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.profissionais = resultProfissionais

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


//Insere um filme
const inserirProfissional = async function (profissional, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Cgana a função de validar todos os dados de filme
            let validar = await validarDadosProfissional(profissional)
            if (!validar) {


                //Processamento
                //Chama a função para inserir um novo filme no banco de dados
                let  resultProfissionais= await profissionalDAO.setInsertProfessional(profissional)
                if (resultProfissionais) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await profissionalDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON com os dados do filme
                    profissional.id = lastID
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items = profissional

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

//Atualiza um filme buscando pelo ID
const atualizarProfissional = async function (profissional, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Cgana a função de validar todos os dados de filme
            let validar = await validarDadosProfissional(profissional)
            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no db se o id existe e valida o ID
                let validarID = await buscarProfissionalID(id)

                if (validarID.status_code == 200) {

                    profissional.id = Number(id)
                    //Validação do ID, se existe no BD 

                    //Validação de ID válido
                    //Processamento
                    //Chama a função para inserir um novo filme no banco de dados
                    let resultProfissionais = await profissionalDAO.setUpdateMovies(profissional)
                    if (resultProfissionais) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.profissionais  = profissional

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //A função buscarFilmeID poderá retornar (400 ou 404 ou 500)
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
const excluirProfissional = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarProfissionalID(id)

            if(validarID.status_code == 200){

                let resultProfissionais = await filmeDAO.setDeleteProfessionals(Number(id))

                if(resultProfissionais){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.profissional = resultProfissionais
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
//validação dos dados de cadastro e atualização do filme
const validarDadosProfissional = async function (profissional) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas entradas de dados

    if (profissional.nome == '' || profissional.nome == undefined || profissional.nome == null || profissional.nome.length > 500) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.biografia == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Biografia incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.nacionalidade == '' || profissional.nacionalidade == undefined || profissional.nacionalidade == null || profissional.nacionalidade.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[nacionalidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
   listarProfissionais,
    buscarProfissionalID,
    inserirProfissional,
    atualizarProfissional,
    excluirProfissional
}