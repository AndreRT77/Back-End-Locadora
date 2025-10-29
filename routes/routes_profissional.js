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




const controller_profissional = require('../controller/filme/controller_profissional.js') 

const router = express.Router()

//Endpointss para a rota de gênero
router.get('/v1/locadora/profissional', cors(), async function(request, response){
    
    
    //Chama a função para listar os cargos do BD
    let profissional = await controller_profissional.listarProfissionais()
    response.status(profissional.status_code).json(profissional)
    console.log(profissional)

})
//Retorna o filme filtrando por I.D
router.get('/v1/locadora/profissional/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idProfissional = request.params.id

    //Chama a função para listar os filmes do BD
    let profissional = await controller_profissional.buscarProfissionalID(idProfissional)
    response.status(profissional.status_code).json(profissional)
    console.log(profissional)

})
//Insere um novo filme
router.post('/v1/locadora/profissional',cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o tipo de  dados da requisição (JSON OU XML ou...)
    let contentType = request.headers['content-type']

    //Chama a função de econtroller para inserir o novo filme, encaminha os daados e o content-type
    let profissional = await controller_profissional.inserirProfissional(dadosBody, contentType)

    response.status(profissional.status_code)
    response.json(profissional)
})
//Atualiza um filme existente
router.put('/v1/locadora/profissional/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do filme
    let idProfissional = request.params.id

    //Recbe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar o filme e encaminha osdados, o id e o content type
    let profissional = await controller_profissional.atualizarProfissional(dadosBody, idProfissional, contentType)
    response.status (profissional.status_code)
    response.json(profissional)
})

router.delete('/v1/locadora/profissional/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idProfissional = request.params.id

    //Chama a função para listar os filmes do BD
    let profissional = await controller_profissional.excluirProfissional(idProfissional)
    response.status(profissional.status_code)
    response.json(profissional)
})
/*******************************************************************************************/

module.exports = router