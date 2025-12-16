/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API referente a relação Filme/Genero
 * Data: 16/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const express    = require('express') //Responsável pela API
const cors       = require('cors') //Responsável pelas Permissões da API (APP)
const bodyParser = require('body-parser') //Responsável por Gerenciar a chegada dos dados da API com o front 

//Cria um objeto especialista do formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//Import das controllers
const controllerFilmeGenero = require('../controller/filme/controller_filme_genero') // Ajuste o caminho se necessário

const router = express.Router()

//Endpoints para a rota de filme_genero

//Retorna a lista de todos os relacionamentos
router.get('/v1/locadora/filme_genero', cors(), async function(request, response){
    
    //Chama a função para listar os relacionamentos do BD
    let dados = await controllerFilmeGenero.listarFilmesGeneros()
    response.status(dados.status_code).json(dados)
    console.log(dados)
})

//Retorna o relacionamento filtrando por ID da tabela intermediária
router.get('/v1/locadora/filme_genero/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let id = request.params.id

    //Chama a função para buscar pelo ID
    let dados = await controllerFilmeGenero.buscarFilmeGeneroId(id)
    response.status(dados.status_code).json(dados)
    console.log(dados)
})

//Retorna os gêneros de um determinado filme
router.get('/v1/locadora/filme_genero/filme/:id', cors(), async function(request, response){
    //Recebe o ID do filme
    let idFilme = request.params.id

    let dados = await controllerFilmeGenero.listarGenerosIdFilme(idFilme)
    response.status(dados.status_code).json(dados)
})

//Retorna os filmes de um determinado gênero
router.get('/v1/locadora/filme_genero/genero/:id', cors(), async function(request, response){
    //Recebe o ID do gênero
    let idGenero = request.params.id

    let dados = await controllerFilmeGenero.listarFilmesIdGenero(idGenero)
    response.status(dados.status_code).json(dados)
})

//Insere um novo relacionamento (Filme <-> Genero)
router.post('/v1/locadora/filme_genero', cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição
    let dadosBody = request.body

    //Recebe o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir
    let dados = await controllerFilmeGenero.inserirFilmeGenero(dadosBody, contentType)

    response.status(dados.status_code)
    response.json(dados)
})

//Atualiza um relacionamento existente
router.put('/v1/locadora/filme_genero/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do relacionamento
    let id = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar
    let dados = await controllerFilmeGenero.atualizarFilmeGenero(dadosBody, contentType, id)
    response.status(dados.status_code)
    response.json(dados)
})

//Exclui um relacionamento
router.delete('/v1/locadora/filme_genero/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let id = request.params.id

    //Chama a função para excluir
    let dados = await controllerFilmeGenero.excluirFilmeGenero(id)
    response.status(dados.status_code)
    response.json(dados)
})

module.exports = router