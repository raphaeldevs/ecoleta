const express = require("express")
const server = express()
const nunjucks = require("nunjucks") // template engine

//Database
const database = require("./database/db")

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
  //pegar os dados do banco de dados
  database.all(`SELECT * FROM places`, function (error, rows) {
    if (error) return console.log(error)

    console.log("Aqui estão seus registros")
    console.log(rows)

    //nunjucks
    return response.render("search-results.html", { places: rows })
  })

})