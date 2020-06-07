<h1 align="center">
  <img width="300px" src="public/assets/logo.svg"/>
</h1>

<h3 align="center">
  Projeto desenvolvido na Next Level Week #1
</h3>

<br />

<blockquote align="center">
  O Ecoleta foi o projeto proposto na trilha Starter da Next Level Week #1, organizada pela Rocketseat durante a semana internacional do meio ambiente
</blockquote> <br/>


#### Minha história na Next Level Week
Eu me inscrevi na trilha Starter da Next Level Week, assim que foi anunciada. Eu realmente estava com GRANDES espectativas com esse evento e todas elas foram atendidas.
Eu queria focar no Javascript e aprender novas abordagens ao fazer um projeto. Quando entrei no evento já tinha boas noções de HTML, CSS e Javascript, então foi muito gostoso acompanhar a criação do projeto e me permiti aprender novas coisas, foi demais!

##### Nesse evento, eu...
<ul>
  <li>Aprendi abordagens diferentes no CSS como:
    <ul>
      <li>Organização dos arquivos</li>
      <li>Diferentes aplicações do flexbox</li>
      <li>Aplicação do background-image para icones</li>
      <li>Usar o flex: 1; 😅</li>
    </ul>
  </li>

  <li>Aprendi a usar a Fetch API, uma forma mais elegante de fazer buscas se comparado ao que eu já fazia com o XMLHttpRequest.</li>

  <li>Usei o conceito de Debounce quando fiz a integração com o CEP Promise criado pelo Filipe Deschamps (e colaboradores).</li>

  <li>Tive o meu primeiro contato com o back-end em Node.JS e foi incrível usar o Express 🤩</li>

  <li>Tive o primeiro contato com um banco de dados, no caso, o SQLite. Inclusive, usei o <code>DB Browser for SQLite</code> pra fazer várias coisas como:
    <ul>
      <li>Ver as tabelas do banco de dados.</li>
      <li>Rodar código SQL, os mesmos que usei no método run() no Javascript (foi legal porque as coisas fizeram MUITO sentido).</li>
    </ul>
  </li>

  <li>Tive a oportunidade de participar da comunidade e ajudar outros devs na medida do possível. Houve momentos que eu entrava no Discord procurando por alguém que estava pedindo ajuda, a sensação de ajudar é muito boa.</li>

  <li>Pratiquei Git e consegui fazer o deploy desse projeto no Heroku. Inclusive usei o vídeo da Rocketseat sobre isso que está no Youtube</li>
</ul>

##### CEP Promise
  Uma coisa que eu achei legal foi usar o CEP Promise criado pelo Filipe Deschamps (e colaboradores) no formulário de criação de um novo ponto de coleta. A lógica que eu elaborei foi a seguinte:
  <ol>
    <li>Adicionar um <code>eventListener</code> junto com uma função de debounce no input que recebe o CEP.</li>
    <li>Recuperar os dados e chamar a função <code>cep()</code> do CEP Promise.</li>
    <li>Recuperar a resposta do CEP Promise e se for válida, preencher os campos de endereço, estado e cidade.</li>
    <li>Se o CEP não for válido, uso a função <code>preventDefault()</code> para impedir o envio do formulário e adiciono uma representação visual do erro com CSS.</li>
  </ol>

<h3>A minha versão está na branch myVersion</h3>
<h4>
👨‍💻 <a href="https://ecoleta-raphaeldevs.herokuapp.com/">Link para o projeto no Heroku</a>
</h4>