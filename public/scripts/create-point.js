function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( response => response.json())
  .then( states => {

    states.sort((a, b) => {
      const returnValue = value => {
        value = value.replace(/[àáâãäå]/, "a");

        return value;
      } //Substitui caracteres especiais para igualdade na verificação

      if (returnValue(a.nome) > returnValue(b.nome)) return 1
      else return -1

      return 0
    }) //Ordena os estados em ordem alfabética

    for (const state of states) {
      ufSelect.innerHTML += `
        <option data-sigla="${state.sigla}" value="${state.id}">${state.nome}</option>
      `
    }
  } )
}

populateUFs()

function getCities(event, state, city) {
  const citiesSelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")
  const ufSelect = document.querySelector("select[name=uf]")

  const ufValue = event == null ? state : event.target.value;

  const indexOfSelectedState = ufSelect.selectedIndex
  stateInput.value = ufSelect.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  //Mensagem de carregamento
  citiesSelect.innerHTML = `<option>Carregando..</option>`
  citiesSelect.disabled = true;

  fetch(url)
    .then(response => response.json())
    .then(cities => {

      citiesSelect.innerHTML = `<option>Selecione a cidade</option>`

      for (const city of cities) {
        citiesSelect.innerHTML += `
      <option id="${city.nome}">${city.nome}</option>
    `
      }
      citiesSelect.disabled = false


      if (city) {
        const options = [...citiesSelect.options]
        const index = options.find(cidade => cidade.id == city).index

        citiesSelect.selectedIndex = index;
        console.log('ok')
      }
    })
}

document
  .querySelector("[name=uf]")
  .addEventListener("change", getCities)

//Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  const itemId = itemLi.dataset.id
  const collectedItems = document.querySelector("[name=items]")
  
  //toggle class
  itemLi.classList.toggle("selected")

  /* VERIFICAÇÕES
   
    * Verificar se existem items selecionados
      * se sim, pegar os itens selecionados */
    
  const alreadySelected = selectedItems.findIndex(item => item === itemId)
  
  /* 
    * Verificar se o item já existe na coleção
    * se sim, remover da seleção
    * se não, adicioná-lo à seleção
  */
  if (alreadySelected >= 0) {
    //Filtra/Remove o item que é diferente.
    const filteredItems = selectedItems.filter(item => item !== itemId)

    selectedItems = filteredItems

  } else selectedItems.push(itemId)

  // * Atualizar o input: hidden com os campos selecionados 
  collectedItems.value = selectedItems.join(', ') // o método join() vai adicionar um espaço a direita da virgula

}

// CEP Promise

document
  .querySelector("[name=cep]")
  .addEventListener("keyup", handleKeyUp)

let time;
function handleKeyUp(event) {
  if(event.target.value.length < 8) {
    clearTimeout(time)

    time = setTimeout(() => {
      fetchCep()
    }, 1000);
  }
}

function fetchCep() {
  const cepInput = document.querySelector("[name=cep]")
  const ufSelect = document.querySelector("[name=uf]")
  const addressInput = document.querySelector("[name=address]")
  const cepValue = cepInput.value;

  cep(cepValue)
    .then(response => {
      const options = [...ufSelect.options]
      const index = options.find(state => state.dataset.sigla == response.state).index

      cepInput.className = 'success'

      
      ufSelect.selectedIndex = index;
      getCities(null, response.state, response.city)

      addressInput.value = `${response.street}, ${response.neighborhood}`
    })
    .catch(e => {
      cepInput.className = 'error'
    })
}

document
  .querySelector("form")
  .addEventListener("submit", validateCep)

function validateCep(event) {
  const cepInput = document.querySelector("[name=cep]")

  if (cepInput.className == 'error' || cepInput.className == "") {
    event.preventDefault();
    cepInput.focus()
    cepInput.animate([
      { opacity: 0 },
      { opacity: 100 },
    ], {
      iterations: 3,
      duration: 80,
      delay: 200
    })
    
    return false
  }
}