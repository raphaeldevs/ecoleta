const sqlite3 = require('sqlite3').verbose()

// criar objeto que irá fazer operações no database
const db = new sqlite3.Database("./src/database/database.db")

// utilizar o objeto database para nossas operações
db.serialize(() => {
  // com comandos SQL:
  
  // criar uma tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

  // inserir dados na tabela
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    "https://images.unsplash.com/photo-1480359014333-3935abd88252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "Colectoria",
    "Uma rua qualquer, Um bairro",
    "N° 11",
    "Maranhão",
    "São Luís",
    "Resíduos Eletrônicos, Lâmpadas"
  ]

  function afterInsertData(error) {
    if (error) return console.log(error)

    console.log("Cadastrado com sucesso")
    console.log(this)
  }

  db.run(query, values, afterInsertData)
  // consultar dados da tabela

  // deletar um dado da tabele
})