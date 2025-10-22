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

//retorna a porta do servidor atual ou colocamos um porta local 
const PORT = process.PORT || 8080

//Criando uma instancia de uma classe do express 
const app = express()

//Configuração de permissões
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') //Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') //Verbos permitidos na API
    //Carrega as configurações no CORS da API
    app.use(cors())
    next() //Próximo, carregar os próximos endpoints
})

//Import das controllers
const controllerfilme = require('./controller/filme/controller_filme.js')


//Endpointss para a rota de filme 
app.get('/v1/locadora/filme', cors(), async function(request, response){
    
    
    //Chama a função para listar os filmes do BD
    let filme = await controllerfilme.listarFilmes()
    response.status(filme.status_code).json(filme)
    console.log(filme)

})
//Retorna o filme filtrando por I.D
app.get('/v1/locadora/filme/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    //Chama a função para listar os filmes do BD
    let filme = await controllerfilme.buscarFilmeID(idFilme)
    response.status(filme.status_code).json(filme)
    console.log(filme)

})
//Insere um novo filme
app.post('/v1/locadora/filme',cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o tipo de  dados da requisição (JSON OU XML ou...)
    let contentType = request.headers['content-type']

    //Chama a função de econtroller para inserir o novo filme, encaminha os daados e o content-type
    let filme = await controllerfilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})
//Atualiza um filme existente
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do filme
    let idFilme = request.params.id

    //Recbe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar o filme e encaminha osdados, o id e o content type
    let filme = await controllerfilme.atualizarFilme(dadosBody, idFilme, contentType)
    response.status (filme.status_code)
    response.json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    //Chama a função para listar os filmes do BD
    let filme = await controllerfilme.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})
/*******************************************************************************************/

const controller_cargos = require('./controller/filme/controller_cargos.js')

//Endpointss para a rota de gênero
app.get('/v1/locadora/genero', cors(), async function(request, response){
    
    
    //Chama a função para listar os filmes do BD
    let genero = await controller_genero.listarGeneros()
    response.status(genero.status_code).json(genero)
    console.log(genero)

})
//Retorna o filme filtrando por I.D
app.get('/v1/locadora/genero/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    //Chama a função para listar os filmes do BD
    let genero = await controller_genero.buscarGenerosID(idGenero)
    response.status(genero.status_code).json(genero)
    console.log(genero)

})
//Insere um novo filme
app.post('/v1/locadora/genero',cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o tipo de  dados da requisição (JSON OU XML ou...)
    let contentType = request.headers['content-type']

    //Chama a função de econtroller para inserir o novo filme, encaminha os daados e o content-type
    let genero = await controller_genero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})
//Atualiza um filme existente
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do filme
    let idGenero = request.params.id

    //Recbe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar o filme e encaminha osdados, o id e o content type
    let genero = await controller_genero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status (genero.status_code)
    response.json(genero)
})

app.delete('/v1/locadora/genero/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    //Chama a função para listar os filmes do BD
    let genero = await controller_genero.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})
/*******************************************************************************************/

const controller_genero = require('./controller/filme/controller_genero.js')

//Endpointss para a rota de gênero
app.get('/v1/locadora/genero', cors(), async function(request, response){
    
    
    //Chama a função para listar os filmes do BD
    let genero = await controller_genero.listarGeneros()
    response.status(genero.status_code).json(genero)
    console.log(genero)

})
//Retorna o filme filtrando por I.D
app.get('/v1/locadora/genero/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    //Chama a função para listar os filmes do BD
    let genero = await controller_genero.buscarGenerosID(idGenero)
    response.status(genero.status_code).json(genero)
    console.log(genero)

})
//Insere um novo filme
app.post('/v1/locadora/genero',cors(), bodyParserJSON, async function (request,response){
    //Recebe os dados do body de requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body

    //Recebe o tipo de  dados da requisição (JSON OU XML ou...)
    let contentType = request.headers['content-type']

    //Chama a função de econtroller para inserir o novo filme, encaminha os daados e o content-type
    let genero = await controller_genero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})
//Atualiza um filme existente
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe o id do filme
    let idGenero = request.params.id

    //Recbe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função para atualizar o filme e encaminha osdados, o id e o content type
    let genero = await controller_genero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status (genero.status_code)
    response.json(genero)
})

app.delete('/v1/locadora/genero/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    //Chama a função para listar os filmes do BD
    let genero = await controller_genero.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

app.listen(PORT, function(){
    console.log('API aguardando requisições !!!')
})