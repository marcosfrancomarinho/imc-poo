import { imc } from "./Imc.js"
const _ = imc._
window.onload = () => imc.getDataDB()
_(".btn-close").onclick = () => {
    _(".alert").classList.add("hide")
    _(".card").forEach(card => card.classList.remove("card-animate"))
}
_("form").onsubmit = function (event) {
    event.preventDefault()
    imc.start = this
}

