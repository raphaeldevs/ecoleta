const buttonSearch = document.querySelector("#page-home main button")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header button")

buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide")
})

close.addEventListener("click", () => {
  modal.classList.add("hide")
})