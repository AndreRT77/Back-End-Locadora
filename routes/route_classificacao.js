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




const controller_classificacao = require('../controller/filme/controller_classificacao.js')

const router = express.Router()

//Endpointss para a rota de gênero
router.get('/v1/locadora/classificacao', cors(), async function(request, response){
    
    
    //Chama a função para listar os cargos do BD
    let classificacao = await controller_classificacao.listarClassificacoes()
    response.status(classificacao.status_code).json(classificacao)
    console.log(classificacao)

})
//Retorna o filme filtrando por I.D
router.get('/v1/locadora/classificacao/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let id = request.params.id

    //Chama a função para listar os filmes do BD
    let classificacao = await controller_classificacao.buscarClassificacoesID(id)
    response.status(classificacao.status_code).json(classificacao)
    console.log(classificacao)

})
//Insere um novo filme
router.post('/v1/locadora/classificacao',cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o tipo de  dados da requisição (JSON OU XML ou...)
    let contentType = request.headers['content-type']

    //Chama a função de econtroller para inserir o novo filme, encaminha os daados e o content-type
    let classificacao = await controller_classificacao.inserirClassificacao(dadosBody, contentType)

    response.status(classificacao.status_code)
    response.json(classificacao)
})
//Atualiza um filme existente
router.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do filme
    let id = request.params.id

    //Recbe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar o filme e encaminha osdados, o id e o content type
    let classificacao = await controller_classificacao.atualizarClassificacao(dadosBody, id, contentType)
    response.status (classificacao.status_code)
    response.json(classificacao)
})

router.delete('/v1/locadora/classificacao/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let id = request.params.id

    //Chama a função para listar os filmes do BD
    let classificacao = await controller_classificacao.excluirClassificacao(id)
    response.status(classificacao.status_code)
    response.json(classificacao)
})
/*******************************************************************************************/

module.exports = router