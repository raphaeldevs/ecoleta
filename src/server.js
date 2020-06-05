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

//habilita o uso do request.body
server.use(express.urlencoded({extended: true}))

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

//    PAGE: save-point
server.post("/savepoint", (request, response) => {
  // request.body: corpo do formulário
  console.log(request.body)

  return response.send('ok')
})

//    PAGE: search-results
server.get("/search", (request, response) => {
  //pegar os dados do banco de dados
  database.all(`SELECT * FROM places`, function (error, rows) {
    if (error) return console.log(error)

    console.log("Aqui estão seus registros")
    console.log(rows)

    const total = rows.length

    //nunjucks
    return response.render("search-results.html", { places: rows, total })
  })

})