const express = require("express")
const server = express()
const nunjucks = require("nunjucks") // template engine

//configuração nunjucks
// parâmetros: configure(pasta public, objeto com configurações)
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//configuração da pasta Public
server.use(express.static("public"))

//liga o servidor
server.listen(3000) //ouve a porta:3000

//  * Configurar caminhos da aplicação
//    PAGE: home
server.get("/", (request, response) => {
  return response.render("index.html")
})

//    PAGE: create-point
server.get("/create-point", (request, response) => {
  return response.render("create-point.html")
})

//    PAGE: search-results
server.get("/search", (request, response) => {
  return response.render("search-results.html")
})