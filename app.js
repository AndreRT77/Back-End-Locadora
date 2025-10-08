/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes
 * Data:07/10/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express') //Responsável pela API
const cors = require('cors') //Responsável pelas Permissões da API (APP)
const bodyParser = require('body-parser') //Responsável por Gerenciar a chegada dos dados da API com o front 


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

app.get('/v1/locadora/filme/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id
    //Chama a função para listar os filmes do BD
    let filme = await controllerfilme.buscarFilmeID(idFilme)
    response.status(filme.status_code).json(filme)
    console.log(filme)

})


app.listen(PORT, function(){
    console.log('API aguardando requisições !!!')
})