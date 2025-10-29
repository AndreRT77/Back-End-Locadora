/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes
 * Data:07/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const express    = require('express') //Responsável pela API
const cors       = require('cors') //Responsável pelas Permissões da API (APP)
const bodyParser = require('body-parser') //Responsável por Gerenciar a chegada dos dados da API com o front 

//Cria um objeto especialista do formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()




const controller_cargos = require('../controller/filme/controller_cargos.js')

const router = express.Router()

//Endpointss para a rota de gênero
router.get('/v1/locadora/cargos', cors(), async function(request, response){
    
    
    //Chama a função para listar os cargos do BD
    let cargo = await controller_cargos.listarCargos()
    response.status(cargo.status_code).json(cargo)
    console.log(cargo)

})
//Retorna o filme filtrando por I.D
router.get('/v1/locadora/cargos/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idCargo = request.params.id

    //Chama a função para listar os filmes do BD
    let cargo = await controller_cargos.buscarCargosID(idCargo)
    response.status(cargo.status_code).json(cargo)
    console.log(cargo)

})
//Insere um novo filme
router.post('/v1/locadora/cargos',cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o tipo de  dados da requisição (JSON OU XML ou...)
    let contentType = request.headers['content-type']

    //Chama a função de econtroller para inserir o novo filme, encaminha os daados e o content-type
    let cargo = await controller_cargos.inserirCargo(dadosBody, contentType)

    response.status(cargo.status_code)
    response.json(cargo)
})
//Atualiza um filme existente
router.put('/v1/locadora/cargos/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do filme
    let idCargo = request.params.id

    //Recbe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar o filme e encaminha osdados, o id e o content type
    let cargo = await controller_cargos.atualizarCargo(dadosBody, idCargo, contentType)
    response.status (cargo.status_code)
    response.json(cargo)
})

router.delete('/v1/locadora/cargos/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idCargo = request.params.id

    //Chama a função para listar os filmes do BD
    let cargo = await controller_cargos.excluirCargo(idCargo)
    response.status(cargo.status_code)
    response.json(cargo)
})
/*******************************************************************************************/

module.exports = router