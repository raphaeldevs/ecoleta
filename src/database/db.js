const sqlite3 = require('sqlite3').verbose()

// criar objeto que irá fazer operações no database
const db = new sqlite3.Database("./src/database/database.db")

// utilizar o objeto database para nossas operações
db.serialize(() => {
  // com comandos SQL:
  
  // criar uma tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    );
  `)

  // inserir dados na tabela

  // consultar dados da tabela

  // deletar um dado da tabele
})