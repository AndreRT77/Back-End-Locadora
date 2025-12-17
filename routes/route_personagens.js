/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API de personagens
 * Data: 16/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const express    = require('express') //Responsável pela API
const cors       = require('cors') //Responsável pelas Permissões da API (APP)
const bodyParser = require('body-parser') //Responsável por Gerenciar a chegada dos dados da API com o front 

//Cria um objeto especialista do formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const controller_personagem = require('../controller/filme/controller_personagem.js') 

const router = express.Router()

//Endpoints para a rota de personagem
router.get('/v1/locadora/personagem', cors(), async function(request, response){
    
    //Chama a função para listar os personagens do BD
    let dados = await controller_personagem.listarPersonagens()
    response.status(dados.status_code).json(dados)
    console.log(dados)

})

//Retorna o personagem filtrando por I.D
router.get('/v1/locadora/personagem/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idPersonagem = request.params.id

    //Chama a função para listar o personagem do BD
    let dados = await controller_personagem.buscarPersonagemID(idPersonagem)
    response.status(dados.status_code).json(dados)
    console.log(dados)

})

//Insere um novo personagem
router.post('/v1/locadora/personagem', cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição
    let dadosBody = request.body

    //Recebe o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Chama a função de controller para inserir o novo personagem
    let dados = await controller_personagem.inserirPersonagem(dadosBody, contentType)

    response.status(dados.status_code)
    response.json(dados)
})

//Atualiza um personagem existente
router.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do personagem
    let idPersonagem = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar o personagem
    let dados = await controller_personagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)
    response.status(dados.status_code)
    response.json(dados)
})

router.delete('/v1/locadora/personagem/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idPersonagem = request.params.id

    //Chama a função para excluir o personagem do BD
    let dados = await controller_personagem.excluirPersonagem(idPersonagem)
    response.status(dados.status_code)
    response.json(dados)
})

/*******************************************************************************************/

module.exports = router