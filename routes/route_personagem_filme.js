/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da tabela de relacionamento Personagem_Filme
 * Data: 07/10/2025
 * Autor: [Seu Nome]
 * Versão: 1.0
 *******************************************************************************************/

const express    = require('express') 
const cors       = require('cors') 
const bodyParser = require('body-parser') 

//Cria um objeto especialista do formato JSON
const bodyParserJSON = bodyParser.json()

const controller_personagem_filme = require('../controller/filme/controller_personagem_filme.js') 

const router = express.Router()

//Endpoints para a rota
router.get('/v1/locadora/personagem_filme', cors(), async function(request, response){
    
    //Chama a função para listar
    let dados = await controller_personagem_filme.listarPersonagemFilme()
    response.status(dados.status_code).json(dados)
    console.log(dados)

})

//Retorna filtrando por ID
router.get('/v1/locadora/personagem_filme/:id', cors(), async function(request, response){
    
    //Recebe o ID
    let id = request.params.id

    //Chama a função para buscar
    let dados = await controller_personagem_filme.buscarPersonagemFilmeID(id)
    response.status(dados.status_code).json(dados)
    console.log(dados)

})

//Insere um novo relacionamento
router.post('/v1/locadora/personagem_filme', cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o content type
    let contentType = request.headers['content-type']

    //Chama a função para inserir
    let dados = await controller_personagem_filme.inserirPersonagemFilme(dadosBody, contentType)

    response.status(dados.status_code)
    response.json(dados)
})

//Atualiza um registro existente
router.put('/v1/locadora/personagem_filme/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id
    let id = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar
    let dados = await controller_personagem_filme.atualizarPersonagemFilme(dadosBody, id, contentType)
    response.status(dados.status_code)
    response.json(dados)
})

router.delete('/v1/locadora/personagem_filme/:id', cors(), async function(request, response){
    
    //Recebe o ID
    let id = request.params.id

    //Chama a função para excluir
    let dados = await controller_personagem_filme.excluirPersonagemFilme(id)
    response.status(dados.status_code)
    response.json(dados)
})

/*******************************************************************************************/

module.exports = router