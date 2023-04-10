// armazena todas os campos que contenham "required"
const fields = document.querySelectorAll("[required]")

function validateField(field) {
    // lógica para verificar se existem erros
    function verifyErrors() {
        let foundError = false

        // validity é uma propriedade do objeto field
        for (let error in field.validity) {
            
            // se não for customError (pq realmente vai estar ativado pq estou usando setCustomValidity) e tiver algum outro erro e o erro não for "valid"
            // então verifica se tem erro
            if (/*error != "customError" &&*/ field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }

        return foundError
    }

    const error = verifyErrors()
    
    console.log("Error exists: ", error)

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error") // do input, sobe para o nó pai (div class="input") e pesquisa pelo span.error

        // verifica se tem mensagem
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    if (error) {
        const message = customMessage(error)

        field.style.borderColor = "red"
        setCustomMessage(message)
    } else {
        field.style.borderColor = "green"
        setCustomMessage()
    }

}


function customValidation(event) {

    const field = event.target

    validateField(field)

    /* usar essa lógica quando quiser usar o bubble default do navegador
    // se tiver erro
    if (error) {
        // trocar a mensagem de required. ou seja, a mensagem que aparece quando o campo está inválido
        field.setCustomValidity("Esse campo é obrigatório")
    } else {
        field.setCustomValidity("") // reinicio. então, o customError não vai mais existir para o campo que não tiver erro. o customError vai passar para o próximo campo que tiver erro
    }
    */
    
}

for (field of fields) {
    field.addEventListener("invalid", event => {
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })

    field.addEventListener("blur", customValidation)
}

document.querySelector("form").addEventListener("submit", (event) => {
    console.log("Enviar o formulário")

    // não aplica o submit. ou seja, não envia o formulário
    event.preventDefault()
})