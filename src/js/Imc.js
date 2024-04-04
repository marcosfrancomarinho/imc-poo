class Imc {
    constructor() {
        this.info = {}
        this.type = {
            1: "Muito abaixo do peso",
            2: "Abaixo do peso",
            3: "Peso normal",
            4: "Acima do peso",
            5: "Obesidade I",
            6: "Obesidade II",
            7: "Obesidade III (mórbida)"
        }
    }
    _(selector) {
        const element = document.querySelectorAll(selector)
        return element.length > 1 ? element : element[0]
    }
    caculateImc() {
        return Number.parseFloat(this.info.weight) / (Number.parseFloat(this.info.height) ** 2);
    }
    readForm(elm) {
        this.info = Object.fromEntries(new FormData(elm))
    }
    situation() {
        const imc = this.caculateImc()
        if (imc < 17) return 1
        else if (imc > 17 && imc <= 18.49) return 2
        else if (imc >= 18.5 && imc <= 24.99) return 3
        else if (imc >= 25 && imc <= 29.99) return 4
        else if (imc >= 30 && imc <= 34.99) return 5
        else if (imc >= 35 && imc <= 39.99) return 6
        else return 7
    }
    checkInput() {
        const reponse = Object.keys(this.info).some(elm => this._(`#${elm}`).value.length <= 0)
        if (reponse) alert("preencha todos os campos")
        return reponse
    }
    showAlert() {
        this._(".alert-link").innerText = this.caculateImc().toFixed(2)
        this._(".alert-name").innerText = this.info.name
        this._(".alert").classList.remove("hide")
        this._(".alert").classList.toggle("alert-success", this.situation() <= 3)
        this._(".alert").classList.toggle("alert-danger", this.situation() > 3)
    }
    animateCards() {
        const arr = Array.from(this._(".card"))
        arr.forEach(card => card.classList.remove("card-animate"))
        const response = arr.find(card => Number(card.dataset.imc) === this.situation())
        response.classList.add("card-animate")
    }
    reponseObject() {
        return {
            name: this.info.name,
            imc: this.caculateImc().toFixed(2),
            type: this.type[this.situation()]
        }
    }
    setTable(data) {
        this._("tbody").innerHTML +=
            `<tr>
                <td>${data.name}</td>
                <td>${data.imc}</td>
                <td>${data.type}</td>
            <tr>`
    }
    setDataDB() {
        fetch("https://api-imc.onrender.com/", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(this.reponseObject())
        })
    }
    getDataDB() {
        fetch("https://api-imc.onrender.com/")
            .then(res => res.json())
            .then(arr => {
                arr.forEach(elm => this.setTable(elm))
            })
    }
    set start(elm) {
        this.readForm(elm)
        if (!this.checkInput()) {
            this.setTable(this.reponseObject())
            this.showAlert()
            this.animateCards()
            this.setDataDB()
        }
    }
}
const imc = new Imc()
export { imc }