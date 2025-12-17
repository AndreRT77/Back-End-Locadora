/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da tabela de relacionamento Ator
 * Data: 16/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const express    = require('express') 
const cors       = require('cors') 
const bodyParser = require('body-parser') 

//Cria um objeto especialista do formato JSON
const bodyParserJSON = bodyParser.json()

const controller_ator = require('../controller/filme/controller_ator.js') 

const router = express.Router()

//Endpoints para a rota de ator
router.get('/v1/locadora/ator', cors(), async function(request, response){
    
    //Chama a função para listar
    let dados = await controller_ator.listarAtores()
    response.status(dados.status_code).json(dados)
    console.log(dados)

})

//Retorna filtrando por ID
router.get('/v1/locadora/ator/:id', cors(), async function(request, response){
    
    //Recebe o ID
    let idAtor = request.params.id

    //Chama a função para buscar
    let dados = await controller_ator.buscarAtorID(idAtor)
    response.status(dados.status_code).json(dados)
    console.log(dados)

})

//Insere um novo relacionamento
router.post('/v1/locadora/ator', cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o content type
    let contentType = request.headers['content-type']

    //Chama a função para inserir
    let dados = await controller_ator.inserirAtor(dadosBody, contentType)

    response.status(dados.status_code)
    response.json(dados)
})

//Atualiza um registro existente
router.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id
    let idAtor = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar
    let dados = await controller_ator.atualizarAtor(dadosBody, idAtor, contentType)
    response.status(dados.status_code)
    response.json(dados)
})

router.delete('/v1/locadora/ator/:id', cors(), async function(request, response){
    
    //Recebe o ID
    let idAtor = request.params.id

    //Chama a função para excluir
    let dados = await controller_ator.excluirAtor(idAtor)
    response.status(dados.status_code)
    response.json(dados)
})

/*******************************************************************************************/

module.exports = router