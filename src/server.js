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
server.listen(process.env.PORT || 3000) //ouve a porta:3000

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
  // insere dados na tabela
  const query = `
    INSERT INTO places (
      image,
      cep,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?,?);
  `

  const values = [
    request.body.image,
    request.body.cep,
    request.body.name,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items
  ]

  function afterInsertData(error) {
    if (error) return console.log(error)

    console.log("Cadastrado com sucesso")
    console.log(this)

    return response.render("create-point.html", { saved: true })
  }

  database.run(query, values, afterInsertData)
})

//    PAGE: search-results
server.get("/search", (request, response) => {
  let search = request.query.search
  let seachQuery = `SELECT * FROM places WHERE city LIKE '%${search}%'`
  let viewAll = false;

  //se pesquisa vazia
  if (search === "") return response.render("search-results.html", { total: 0 })

  if (search === "all") {
    seachQuery = `SELECT * FROM places`
    viewAll = true
  }

  //pegar os dados do banco de dados
  database.all(seachQuery, function (error, rows) {
    if (error) return console.log(error)

    const total = rows.length

    //nunjucks
    return response.render("search-results.html", { places: rows, total, search, viewAll })
  })

})

//    PAGE: 404
server.get('*', (request, response)=> {
  response.render("404.html")
})