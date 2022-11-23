class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text
        this.onComplete = onComplete
        this.element = null
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TextMessage")

        this.element.innerHTML = (`
            <p class="TextMessage_p">${this.text}</p>
            <button class ="TextMessage_button">Next</button>
        `)

        this.element.querySelector("button").addEventListener("click", () => {
            // close text message
            this.done()
        })

        this.actionListener = new KeyPressListener("Enter", () => {
            this.actionListener.unbind() // stop listening since text message will close upon pressing
            this.done()
        })
    }

    done() {
        this.element.remove()
        this.onComplete()
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
    }
}