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
        <option value="${state.id}">${state.nome}</option>
      `
    }
  } )
}

populateUFs()

function getCities(event) {
  const citiesSelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value;
  
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text
  
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  //Mensagem de carregamento
  citiesSelect.innerHTML = `<option>Carregando..</option>`
  citiesSelect.disabled = true;

  fetch(url)
  .then(response => response.json())
  .then(cities => {
    citiesSelect.innerHTML = `<option>Selecione a cidade</option>`

    for (const city of cities) {
      citiesSelect.innerHTML += 
      `<option value="${city.nome}">${city.nome}</option>`
    }
    citiesSelect.disabled = false

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
  const itemId = Number(itemLi.dataset.id) //Converte o id: String pra tipo Number
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
    console.log(selectedItems)

    const filteredItems = selectedItems.filter(item => item !== itemId)

    selectedItems = filteredItems

  } else selectedItems.push(itemId)

  // * Atualizar o input: hidden com os campos selecionados 
  collectedItems.value = selectedItems

  console.log(collectedItems.value);
  

}